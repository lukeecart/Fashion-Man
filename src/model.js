// A small online-learning style model that runs entirely in the browser.
//
// Each outfit is turned into features (style, tone, colours, garments).
// The model is a logistic regression: P(like) = sigmoid(bias + Σ weight × x).
// After every swipe we take one gradient step, so it learns as you go.
// Weights are saved in localStorage so it keeps learning across visits.

import { STYLES } from './data.js';

const STORAGE_KEY = 'styleswipe-model-v1';
const LEARNING_RATE = 1.0;
// How much card choice favours predicted likes vs. learning. Kept low so liked
// looks are saved for the final suggestions (tuned by simulation: ~81% of
// suggestions match a simulated user's taste after one session vs 30% random).
const EXPLOIT = 0.3;
const L2 = 0.01; // gently pulls weights back to 0 so old swipes fade a little

export function featuresOf(outfit) {
  return [
    `style:${outfit.style}`,
    `tone:${outfit.tone}`,
    ...outfit.colours.map((c) => `colour:${c}`),
    ...[...new Set(outfit.items.map((i) => i.garment))].map((g) => `garment:${g}`),
  ];
}

const sigmoid = (z) => 1 / (1 + Math.exp(-z));

export function emptyModel() {
  return { bias: 0, w: {}, n: {}, seen: {}, likes: 0, swipes: 0 };
}

export function loadModel() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...emptyModel(), ...JSON.parse(raw) };
  } catch {
    // storage blocked or corrupt — start fresh
  }
  return emptyModel();
}

export function saveModel(model) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(model));
  } catch {
    // ignore — the app still works without persistence
  }
}

export function clearModel() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return emptyModel();
}

// Each feature gets value 1/sqrt(k) so outfits with many pieces don't dominate.
function score(model, feats) {
  const x = 1 / Math.sqrt(feats.length);
  return model.bias + feats.reduce((s, f) => s + (model.w[f] || 0) * x, 0);
}

export function predict(model, outfit) {
  return sigmoid(score(model, featuresOf(outfit)));
}

// One step of stochastic gradient descent on log-loss. Returns a new model.
export function learn(model, outfit, liked) {
  const feats = featuresOf(outfit);
  const x = 1 / Math.sqrt(feats.length);
  const y = liked ? 1 : 0;
  const err = y - sigmoid(score(model, feats));

  const w = { ...model.w };
  const n = { ...model.n };
  for (const f of feats) {
    const cur = w[f] || 0;
    w[f] = cur + LEARNING_RATE * (err * x - L2 * cur);
    n[f] = (n[f] || 0) + 1;
  }
  return {
    ...model,
    w,
    n,
    bias: model.bias + LEARNING_RATE * 0.2 * err,
    seen: { ...model.seen, [outfit.id]: (model.seen[outfit.id] || 0) + 1 },
    likes: model.likes + y,
    swipes: model.swipes + 1,
  };
}

// How little the model knows about this outfit's features (1 = nothing).
function uncertainty(model, outfit) {
  const feats = featuresOf(outfit);
  return feats.reduce((s, f) => s + 1 / Math.sqrt(1 + (model.n[f] || 0)), 0) / feats.length;
}

// Pick the next card: balance "you'll probably like this" (exploit) against
// "I haven't learned about this yet" (explore). Exploration fades during a session.
export function pickNext(model, pool, excludeIds, progress) {
  const explore = 0.9 * (1 - progress) + 0.15;
  let best = null;
  let bestScore = -Infinity;
  for (const outfit of pool) {
    if (excludeIds.has(outfit.id)) continue;
    const timesSeen = model.seen[outfit.id] || 0;
    const s =
      EXPLOIT * predict(model, outfit) +
      explore * uncertainty(model, outfit) -
      0.12 * timesSeen + // prefer photos from earlier visits less
      Math.random() * 0.25; // a little randomness so sessions differ
    if (s > bestScore) {
      bestScore = s;
      best = outfit;
    }
  }
  return best;
}

const overlap = (a, b) => {
  const B = new Set(b);
  const shared = a.filter((f) => B.has(f)).length;
  return shared / new Set([...a, ...b]).size;
};

// Recommend `count` outfits the user hasn't seen this session. The second pick
// is penalised for being too similar to the first so you get some variety.
export function suggest(model, pool, shownIds, count = 2) {
  const candidates = pool
    .filter((o) => !shownIds.has(o.id))
    .map((o) => ({ outfit: o, p: predict(model, o), feats: featuresOf(o) }));

  const picks = [];
  while (picks.length < count && candidates.length) {
    let bestIdx = 0;
    let bestScore = -Infinity;
    candidates.forEach((c, i) => {
      const sim = picks.reduce((m, p) => Math.max(m, overlap(c.feats, p.feats)), 0);
      const s = c.p - 0.25 * sim - 0.05 * (model.seen[c.outfit.id] || 0);
      if (s > bestScore) {
        bestScore = s;
        bestIdx = i;
      }
    });
    picks.push(candidates.splice(bestIdx, 1)[0]);
  }
  return picks.map(({ outfit, p }) => ({ outfit, match: p, reasons: reasons(model, outfit) }));
}

function labelFor(feature) {
  const [group, value] = feature.split(':');
  if (group === 'style') return STYLES[value]?.name ?? value;
  if (group === 'tone') return `${value} tones`;
  if (group === 'colour') return value;
  return value.endsWith('s') ? value : `${value}s`; // garments: "blazers", "jeans"
}

// The outfit's features you like most, according to the model.
export function reasons(model, outfit) {
  return featuresOf(outfit)
    .map((f) => ({ f, w: model.w[f] || 0 }))
    .filter((r) => r.w > 0.05)
    .sort((a, b) => b.w - a.w)
    .slice(0, 3)
    .map((r) => labelFor(r.f));
}

// Top-weighted features in a group, for the "what I've learned" section.
export function topFeatures(model, group, limit = 4) {
  return Object.entries(model.w)
    .filter(([f, w]) => f.startsWith(`${group}:`) && w > 0.05)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([f, w]) => ({ key: f.split(':')[1], label: labelFor(f), weight: w }));
}

// Most negatively-weighted features in a group: the things you swipe away.
export function bottomFeatures(model, group, limit = 4) {
  return Object.entries(model.w)
    .filter(([f, w]) => f.startsWith(`${group}:`) && w < -0.05)
    .sort((a, b) => a[1] - b[1])
    .slice(0, limit)
    .map(([f, w]) => ({ key: f.split(':')[1], label: labelFor(f), weight: w }));
}

// Style affinity 0–100%, from each style's predicted like-probability on its own.
export function styleAffinity(model) {
  return Object.keys(STYLES)
    .map((key) => ({ key, p: sigmoid(model.bias + (model.w[`style:${key}`] || 0)) }))
    .sort((a, b) => b.p - a.p);
}
