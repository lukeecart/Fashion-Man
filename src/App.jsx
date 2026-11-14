import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { OUTFITS, STYLES, SWATCH, upcomingSeason, nextSearchUrl, itemSearchTerm } from './data';
import {
  loadModel, saveModel, clearModel, learn, pickNext, suggest,
  topFeatures, bottomFeatures, styleAffinity,
} from './model';
import './App.css';

const SESSION_LENGTH = 20;

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
function startSession(model) {
  const current = pickNext(model, OUTFITS, new Set(), 0);
  const queued = pickNext(model, OUTFITS, new Set([current.id]), 1 / SESSION_LENGTH);
  return { model, current, queued, swiped: [] };
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
        <span className="tag">{STYLES[outfit.style].name}</span>
        <h2>{outfit.title}</h2>
        <Swatches colours={outfit.colours} />
      </div>
    </motion.div>
  );
}

function ShopLinks({ items }) {
  return (
    <div className="shop-links">
      {items.map((item) => (
        <a key={item.garment + item.colour} href={nextSearchUrl(itemSearchTerm(item))} target="_blank" rel="noreferrer">
          <span className="swatch" style={{ background: SWATCH[item.colour] }} />
          {item.colour} {item.garment} →
        </a>
      ))}
    </div>
  );
}

// Shown under the swipe deck: what's in the current photo, with Next searches.
function ShopTheLook({ outfit }) {
  return (
    <section className="shop-look">
      <p className="shop-label">Shop the look at Next</p>
      <p className="shop-look-desc">{STYLES[outfit.style].blurb}</p>
      <ShopLinks items={outfit.items} />
    </section>
  );
}

function Suggestion({ outfit, match, reasons }) {
  return (
    <div className="suggestion">
      <div className="suggestion-img">
        <img src={outfit.img} alt={outfit.title} />
        <span className="match">{Math.round(match * 100)}% match</span>
      </div>
      <div className="suggestion-body">
        <span className="tag dark">{STYLES[outfit.style].name}</span>
        <h3>{outfit.title}</h3>
        <p className="why">
          {reasons.length
            ? <>Because you like <strong>{reasons.join(', ')}</strong></>
            : 'A wildcard to test your taste'}
        </p>
        <p className="shop-label">Shop the look at Next</p>
        <ShopLinks items={outfit.items} />
      </div>
    </div>
  );
}

function Results({ model, swiped, onAgain, onReset }) {
  const season = upcomingSeason();
  const picks = suggest(model, OUTFITS, new Set(swiped), 2);
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
      <p className="eyebrow">Learned from {model.swipes} swipes</p>
      <h1>Your 2 outfits</h1>

      {picks.map((p) => <Suggestion key={p.outfit.id} {...p} />)}

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

      <button className="primary" onClick={onAgain}>Swipe {SESSION_LENGTH} more to sharpen it</button>
      <button className="secondary" onClick={onReset}>Reset what I've learned</button>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(() => startSession(loadModel()));
  const [dir, setDir] = useState('right');
  const { model, current, queued, swiped } = session;
  const done = swiped.length >= SESSION_LENGTH;

  const swipe = (direction) => {
    if (!current) return;
    setDir(direction);
    const nextModel = learn(model, current, direction === 'right');
    saveModel(nextModel);

    const nextSwiped = [...swiped, current.id];
    const remaining = SESSION_LENGTH - nextSwiped.length;
    const nextCurrent = remaining > 0 ? queued : null;
    const nextQueued = remaining > 1
      ? pickNext(nextModel, OUTFITS, new Set([...nextSwiped, nextCurrent.id]), (nextSwiped.length + 1) / SESSION_LENGTH)
      : null;
    setSession({ model: nextModel, current: nextCurrent, queued: nextQueued, swiped: nextSwiped });
  };

  const again = () => setSession(startSession(model));
  const reset = () => setSession(startSession(clearModel()));

  return (
    <div className="app">
      <header>
        <span className="logo">StyleSwipe</span>
        {!done && <span className="progress">{swiped.length + 1} / {SESSION_LENGTH}</span>}
      </header>

      {done ? (
        <Results model={model} swiped={swiped} onAgain={again} onReset={reset} />
      ) : (
        <>
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
          <ShopTheLook outfit={current} />
        </>
      )}
    </div>
  );
}
