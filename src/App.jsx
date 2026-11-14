import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import {
  OUTFITS, STYLES, SWATCH, OCCASIONS, FAMILIES, upcomingSeason, nextSearchUrl, itemSearchTerm,
  outfitsFor, isSmartCasual, familyOf,
} from './data';
import {
  loadModel, saveModel, clearModel, learn, pickNext, suggest,
  topFeatures, bottomFeatures, styleAffinity, buildAround, predict,
} from './model';
import {
  loadLookbook, saveLookbook, addLook, toggleLook, toggleWanted, pieceKey, parsePiece,
} from './lookbook';
import './App.css';

const SESSION_LENGTH = 20;
const byId = Object.fromEntries(OUTFITS.map((o) => [o.id, o]));

// Leave two unseen outfits in the pool for the final suggestions.
const sessionLengthFor = (pool) => Math.min(SESSION_LENGTH, pool.length - 2);

const cardVariants = {
  enter: { scale: 0.95, opacity: 0, y: 10 },
  center: { scale: 1, opacity: 1, y: 0 },
  exit: (dir) => ({
    x: dir === 'right' ? 600 : -600,
    rotate: dir === 'right' ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

// Start a session: pick the first card and queue up the one behind it.
function startSession(model, occasion) {
  const pool = outfitsFor(occasion);
  const len = sessionLengthFor(pool);
  const current = pickNext(model, pool, new Set(), 0);
  const queued = pickNext(model, pool, new Set([current.id]), 1 / len);
  return { model, occasion, current, queued, swiped: [] };
}

function Swatches({ colours }) {
  return (
    <div className="swatches">
      {colours.map((c) => (
        <span key={c} className="swatch" style={{ background: SWATCH[c] }} title={c} />
      ))}
      <span className="swatch-label">{colours.join(' · ')}</span>
    </div>
  );
}

const formalityLabel = (outfit) => (isSmartCasual(outfit) ? 'Smart casual' : 'Casual');

function SwipeCard({ outfit, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);

  return (
    <motion.div
      className="card"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 500) {
          onSwipe(info.offset.x > 0 ? 'right' : 'left');
        }
      }}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <img src={outfit.img} alt={outfit.title} draggable={false} />
      <motion.div className="stamp like" style={{ opacity: likeOpacity }}>LIKE</motion.div>
      <motion.div className="stamp nope" style={{ opacity: nopeOpacity }}>NOPE</motion.div>
      <div className="card-info">
        <span className="tag">{STYLES[outfit.style].name}</span>{' '}
        <span className="tag">{formalityLabel(outfit)}</span>
        <h2>{outfit.title}</h2>
        <Swatches colours={outfit.colours} />
      </div>
    </motion.div>
  );
}

// One Next search button per piece, with a star to add it to the shopping list.
function ShopLinks({ items, book, onWant }) {
  return (
    <div className="shop-links">
      {items.map((item) => {
        const wanted = book.wanted.includes(pieceKey(item));
        return (
          <div key={pieceKey(item)} className="shop-row">
            <a href={nextSearchUrl(itemSearchTerm(item))} target="_blank" rel="noreferrer">
              <span className="swatch" style={{ background: SWATCH[item.colour] }} />
              {item.colour} {item.garment} →
            </a>
            <button
              className={`star${wanted ? ' on' : ''}`}
              onClick={() => onWant(item)}
              aria-label={wanted ? `Remove ${item.colour} ${item.garment} from shopping list` : `Add ${item.colour} ${item.garment} to shopping list`}
              title={wanted ? 'On your shopping list' : 'Add to shopping list'}
            >
              {wanted ? '★' : '☆'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function SaveLook({ id, book, onToggleLook }) {
  const saved = book.looks.includes(id);
  return (
    <button className={`save-look${saved ? ' on' : ''}`} onClick={() => onToggleLook(id)}>
      {saved ? '♥ In lookbook' : '♡ Save look'}
    </button>
  );
}

// Shown under the swipe deck: what's in the current photo, with Next searches.
function ShopTheLook({ outfit, book, onWant }) {
  return (
    <section className="shop-look">
      <p className="shop-label">Shop the look at Next</p>
      <p className="shop-look-desc">{STYLES[outfit.style].blurb}</p>
      <ShopLinks items={outfit.items} book={book} onWant={onWant} />
      <p className="star-hint">☆ adds a piece to your shopping list</p>
    </section>
  );
}

function Suggestion({ outfit, match, reasons, book, onWant, onToggleLook }) {
  return (
    <div className="suggestion">
      <div className="suggestion-img">
        <img src={outfit.img} alt={outfit.title} />
        <span className="match">{Math.round(match * 100)}% match</span>
      </div>
      <div className="suggestion-body">
        <span className="tag dark">{STYLES[outfit.style].name}</span>{' '}
        <span className="tag dark">{formalityLabel(outfit)}</span>
        <h3>{outfit.title}</h3>
        <p className="why">
          {reasons.length
            ? <>Because you like <strong>{reasons.join(', ')}</strong></>
            : 'A wildcard to test your taste'}
        </p>
        <p className="shop-label">Shop the look at Next</p>
        <ShopLinks items={outfit.items} book={book} onWant={onWant} />
        <SaveLook id={outfit.id} book={book} onToggleLook={onToggleLook} />
      </div>
    </div>
  );
}

function Results({ model, occasion, swiped, book, onWant, onToggleLook, onAgain, onReset }) {
  const season = upcomingSeason();
  const picks = suggest(model, outfitsFor(occasion), new Set(swiped), 2);
  const affinity = styleAffinity(model).slice(0, 4);
  const colours = topFeatures(model, 'colour');
  const garments = topFeatures(model, 'garment', 5);
  const dislikedStyles = bottomFeatures(model, 'style', 3);
  const dislikedColours = bottomFeatures(model, 'colour');
  const dislikedGarments = bottomFeatures(model, 'garment', 5);
  const hasDislikes = dislikedStyles.length + dislikedColours.length + dislikedGarments.length > 0;
  const topStyle = STYLES[affinity[0].key];

  return (
    <div className="results">
      <p className="eyebrow">
        Learned from {model.swipes} swipes{occasion !== 'any' && ` · ${OCCASIONS[occasion].name}`}
      </p>
      <h1>Your 2 outfits</h1>

      {picks.map((p) => (
        <Suggestion key={p.outfit.id} {...p} book={book} onWant={onWant} onToggleLook={onToggleLook} />
      ))}

      <h3>What I've learned about you</h3>
      <div className="bars">
        {affinity.map(({ key, p }) => (
          <div key={key} className="bar-row">
            <span>{STYLES[key].name}</span>
            <div className="bar"><div style={{ width: `${p * 100}%` }} /></div>
            <span>{Math.round(p * 100)}%</span>
          </div>
        ))}
      </div>

      {colours.length > 0 && (
        <div className="chips">
          {colours.map((c) => (
            <span key={c.key} className="colour-chip">
              <span className="swatch" style={{ background: SWATCH[c.key] }} /> {c.label}
            </span>
          ))}
        </div>
      )}
      {garments.length > 0 && (
        <div className="chips">
          {garments.map((g) => <span key={g.key} className="colour-chip">{g.label}</span>)}
        </div>
      )}

      <h3>What you're not into</h3>
      {hasDislikes ? (
        <>
          {dislikedStyles.length > 0 && (
            <div className="chips">
              {dislikedStyles.map((st) => <span key={st.key} className="colour-chip dislike">✕ {st.label}</span>)}
            </div>
          )}
          {dislikedColours.length > 0 && (
            <div className="chips">
              {dislikedColours.map((c) => (
                <span key={c.key} className="colour-chip dislike">
                  <span className="swatch" style={{ background: SWATCH[c.key] }} /> {c.label}
                </span>
              ))}
            </div>
          )}
          {dislikedGarments.length > 0 && (
            <div className="chips">
              {dislikedGarments.map((g) => <span key={g.key} className="colour-chip dislike">✕ {g.label}</span>)}
            </div>
          )}
        </>
      ) : (
        <p className="blurb">No strong dislikes yet. Swipe left more to teach me.</p>
      )}

      <h3>More {topStyle.name} for {season.label}</h3>
      <div className="chips">
        {topStyle.picks[season.key].map((term) => (
          <a key={term} className="colour-chip link" href={nextSearchUrl(term)} target="_blank" rel="noreferrer">
            {term.replace('mens ', '')} →
          </a>
        ))}
      </div>

      <button className="primary" onClick={onAgain}>Swipe more to sharpen it</button>
      <button className="secondary" onClick={onReset}>Reset what I've learned</button>
    </div>
  );
}

function OccasionPicker({ value, onChange }) {
  return (
    <div className="occasions" role="radiogroup" aria-label="Occasion">
      {Object.entries(OCCASIONS).map(([key, { name }]) => (
        <button
          key={key}
          role="radio"
          aria-checked={value === key}
          className={`occasion${value === key ? ' on' : ''}`}
          onClick={() => onChange(key)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}

// Every garment/colour combination in the photo set, for the "I own…" pickers.
const GARMENT_COLOURS = OUTFITS.flatMap((o) => o.items).reduce((acc, { garment, colour }) => {
  (acc[garment] ??= new Set()).add(colour);
  return acc;
}, {});

function BuildAround({ model, book, onWant, onToggleLook }) {
  const [garment, setGarment] = useState('');
  const [colour, setColour] = useState('');
  const colours = garment ? [...GARMENT_COLOURS[garment]].sort() : [];
  const results = garment ? buildAround(model, OUTFITS, { garment, colour }) : [];

  return (
    <div className="build">
      <h1>Build around a piece</h1>
      <p className="blurb">
        Pick something you already own. I'll show looks that use it, picked for your taste,
        and link the pieces you'd need to finish the outfit.
      </p>
      <div className="pickers">
        <label>
          <span>I own a…</span>
          <select value={garment} onChange={(e) => { setGarment(e.target.value); setColour(''); }}>
            <option value="">Choose a piece</option>
            {Object.entries(FAMILIES).map(([family, list]) => (
              <optgroup key={family} label={family}>
                {list.filter((g) => GARMENT_COLOURS[g]).map((g) => <option key={g} value={g}>{g}</option>)}
              </optgroup>
            ))}
          </select>
        </label>
        <label>
          <span>in…</span>
          <select value={colour} onChange={(e) => setColour(e.target.value)} disabled={!garment}>
            <option value="">Any colour</option>
            {colours.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      {results.map(({ outfit, match }) => {
        const rest = outfit.items.filter((i) => i !== match);
        const exact = match.garment === garment;
        return (
          <div key={outfit.id} className="suggestion">
            <div className="suggestion-img short">
              <img src={outfit.img} alt={outfit.title} />
              <span className="match">{Math.round(predict(model, outfit) * 100)}% your taste</span>
            </div>
            <div className="suggestion-body">
              <span className="tag dark">{formalityLabel(outfit)}</span>
              <h3>{outfit.title}</h3>
              <p className="why">
                Uses <strong>{match.colour} {match.garment}</strong>
                {exact ? '' : ` (swap in your ${colour ? colour.toLowerCase() + ' ' : ''}${garment})`}
              </p>
              {rest.length > 0 ? (
                <>
                  <p className="shop-label">Complete the look at Next</p>
                  <ShopLinks items={rest} book={book} onWant={onWant} />
                </>
              ) : (
                <p className="why">Your piece is the whole look.</p>
              )}
              <SaveLook id={outfit.id} book={book} onToggleLook={onToggleLook} />
            </div>
          </div>
        );
      })}
      {garment && results.length === 0 && <p className="blurb">No looks use that yet.</p>}
    </div>
  );
}

function Lookbook({ book, onWant, onToggleLook, onClearList }) {
  const looks = book.looks.map((id) => byId[id]).filter(Boolean);
  const wanted = book.wanted.map(parsePiece);
  const groups = Object.keys(FAMILIES)
    .concat('Other')
    .map((family) => [family, wanted.filter((p) => familyOf(p.garment) === family)])
    .filter(([, list]) => list.length);

  return (
    <div className="lookbook">
      <h1>Lookbook</h1>

      <h3>Shopping list{wanted.length > 0 && ` (${wanted.length})`}</h3>
      {wanted.length === 0 ? (
        <p className="blurb">Tap ☆ next to any piece to add it here.</p>
      ) : (
        <>
          {groups.map(([family, list]) => (
            <div key={family} className="list-group">
              <p className="shop-label">{family}</p>
              <ShopLinks items={list} book={book} onWant={onWant} />
            </div>
          ))}
          <button className="secondary" onClick={onClearList}>Clear shopping list</button>
        </>
      )}

      <h3>Saved looks{looks.length > 0 && ` (${looks.length})`}</h3>
      {looks.length === 0 && <p className="blurb">Looks you swipe right on are saved here.</p>}
      <div className="look-grid">
        {looks.map((outfit) => (
          <div key={outfit.id} className="look">
            <img src={outfit.img} alt={outfit.title} />
            <div className="look-body">
              <h4>{outfit.title}</h4>
              <ShopLinks items={outfit.items} book={book} onWant={onWant} />
              <button className="remove" onClick={() => onToggleLook(outfit.id)}>Remove look</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('swipe');
  const [session, setSession] = useState(() => startSession(loadModel(), 'any'));
  const [book, setBookState] = useState(loadLookbook);
  const [dir, setDir] = useState('right');
  const { model, occasion, current, queued, swiped } = session;
  const pool = outfitsFor(occasion);
  const sessionLength = sessionLengthFor(pool);
  const done = swiped.length >= sessionLength;

  const setBook = (next) => {
    setBookState(next);
    saveLookbook(next);
  };
  const want = (piece) => setBook(toggleWanted(book, piece));
  const toggleSaved = (id) => setBook(toggleLook(book, id));

  const swipe = (direction) => {
    if (!current) return;
    setDir(direction);
    const liked = direction === 'right';
    const nextModel = learn(model, current, liked);
    saveModel(nextModel);
    if (liked) setBook(addLook(book, current.id));

    const nextSwiped = [...swiped, current.id];
    const remaining = sessionLength - nextSwiped.length;
    const nextCurrent = remaining > 0 ? queued : null;
    const nextQueued = remaining > 1
      ? pickNext(nextModel, pool, new Set([...nextSwiped, nextCurrent.id]), (nextSwiped.length + 1) / sessionLength)
      : null;
    setSession({ ...session, model: nextModel, current: nextCurrent, queued: nextQueued, swiped: nextSwiped });
  };

  const again = () => setSession(startSession(model, occasion));
  const reset = () => setSession(startSession(clearModel(), occasion));
  const changeOccasion = (key) => setSession(startSession(model, key));

  return (
    <div className="app">
      <header>
        <span className="logo">StyleSwipe</span>
        {tab === 'swipe' && !done && <span className="progress">{swiped.length + 1} / {sessionLength}</span>}
      </header>
      <nav className="tabs">
        {[['swipe', 'Swipe'], ['build', 'Build a look'], ['lookbook', `Lookbook${book.looks.length ? ` (${book.looks.length})` : ''}`]].map(([key, label]) => (
          <button key={key} className={`tab${tab === key ? ' on' : ''}`} onClick={() => setTab(key)}>{label}</button>
        ))}
      </nav>

      {tab === 'build' && <BuildAround model={model} book={book} onWant={want} onToggleLook={toggleSaved} />}
      {tab === 'lookbook' && (
        <Lookbook book={book} onWant={want} onToggleLook={toggleSaved} onClearList={() => setBook({ ...book, wanted: [] })} />
      )}

      {tab === 'swipe' && (done ? (
        <Results
          model={model} occasion={occasion} swiped={swiped} book={book}
          onWant={want} onToggleLook={toggleSaved} onAgain={again} onReset={reset}
        />
      ) : (
        <>
          <OccasionPicker value={occasion} onChange={changeOccasion} />
          <div className="deck">
            {queued && (
              <div className="card behind">
                <img src={queued.img} alt="" draggable={false} />
              </div>
            )}
            <AnimatePresence custom={dir}>
              <SwipeCard key={current.id} outfit={current} onSwipe={swipe} />
            </AnimatePresence>
          </div>
          <div className="buttons">
            <button className="round nope" onClick={() => swipe('left')} aria-label="Nope">✕</button>
            <button className="round like" onClick={() => swipe('right')} aria-label="Like">♥</button>
          </div>
          <p className="hint">
            {model.swipes > 0
              ? `Learning from ${model.swipes} swipes so far`
              : "Swipe right if you'd wear it, left if not"}
          </p>
          <ShopTheLook outfit={current} book={book} onWant={want} />
        </>
      ))}
    </div>
  );
}
