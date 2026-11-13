import { useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { OUTFITS, STYLES, SWATCH, upcomingSeason, nextSearchUrl } from './data';
import './App.css';

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
        <div className="swatches">
          {outfit.colours.map((c) => (
            <span key={c} className="swatch" style={{ background: SWATCH[c] }} title={c} />
          ))}
          <span className="swatch-label">{outfit.colours.join(' · ')}</span>
        </div>
      </div>
    </motion.div>
  );
}

function Results({ likes, onRestart }) {
  const season = upcomingSeason();

  if (likes.length === 0) {
    return (
      <div className="results">
        <h1>No matches yet</h1>
        <p>You didn't like any of the outfits. Have another go?</p>
        <button className="primary" onClick={onRestart}>Start again</button>
      </div>
    );
  }

  const styleCount = {};
  const colourCount = {};
  likes.forEach((o) => {
    styleCount[o.style] = (styleCount[o.style] || 0) + 1;
    o.colours.forEach((c) => (colourCount[c] = (colourCount[c] || 0) + 1));
  });
  const ranked = Object.entries(styleCount).sort((a, b) => b[1] - a[1]);
  const topStyle = STYLES[ranked[0][0]];
  const topColours = Object.entries(colourCount).sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="results">
      <p className="eyebrow">Your style is</p>
      <h1>{topStyle.name}</h1>
      <p className="blurb">{topStyle.blurb}</p>

      <div className="bars">
        {ranked.map(([key, n]) => (
          <div key={key} className="bar-row">
            <span>{STYLES[key].name}</span>
            <div className="bar"><div style={{ width: `${(n / likes.length) * 100}%` }} /></div>
            <span>{Math.round((n / likes.length) * 100)}%</span>
          </div>
        ))}
      </div>

      <h3>Your colours</h3>
      <div className="swatches big">
        {topColours.map(([c]) => (
          <span key={c} className="colour-chip">
            <span className="swatch" style={{ background: SWATCH[c] }} /> {c}
          </span>
        ))}
      </div>

      <h3>Shop {season.label} at Next</h3>
      <div className="shop-links">
        {topStyle.picks[season.key].map((term) => (
          <a key={term} href={nextSearchUrl(term)} target="_blank" rel="noreferrer">
            {term.replace('mens ', '')} →
          </a>
        ))}
        {topColours[0] && (
          <a href={nextSearchUrl(`mens ${topColours[0][0].toLowerCase()} ${season.key === 'aw' ? 'coat' : 'shirt'}`)} target="_blank" rel="noreferrer">
            {topColours[0][0].toLowerCase()} {season.key === 'aw' ? 'coats' : 'shirts'} →
          </a>
        )}
      </div>

      <button className="primary" onClick={onRestart}>Swipe again</button>
    </div>
  );
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [dir, setDir] = useState('right');

  const swipe = (direction) => {
    const outfit = OUTFITS[index];
    setDir(direction);
    if (direction === 'right') setLikes((l) => [...l, outfit]);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setIndex(0);
    setLikes([]);
  };

  const done = index >= OUTFITS.length;

  return (
    <div className="app">
      <header>
        <span className="logo">StyleSwipe</span>
        {!done && <span className="progress">{index + 1} / {OUTFITS.length}</span>}
      </header>

      {done ? (
        <Results likes={likes} onRestart={restart} />
      ) : (
        <>
          <div className="deck">
            {OUTFITS[index + 1] && (
              <div className="card behind">
                <img src={OUTFITS[index + 1].img} alt="" draggable={false} />
              </div>
            )}
            <AnimatePresence custom={dir}>
              <SwipeCard key={OUTFITS[index].id} outfit={OUTFITS[index]} onSwipe={swipe} />
            </AnimatePresence>
          </div>
          <div className="buttons">
            <button className="round nope" onClick={() => swipe('left')} aria-label="Nope">✕</button>
            <button className="round like" onClick={() => swipe('right')} aria-label="Like">♥</button>
          </div>
          <p className="hint">Swipe right if you'd wear it, left if not</p>
        </>
      )}
    </div>
  );
}
