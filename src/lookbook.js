// Saved looks and a shopping list of pieces, kept in localStorage.
const KEY = 'styleswipe-lookbook-v1';

export const pieceKey = ({ garment, colour }) => `${garment}|${colour}`;
export const parsePiece = (key) => {
  const [garment, colour] = key.split('|');
  return { garment, colour };
};

export function loadLookbook() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const { looks = [], wanted = [] } = JSON.parse(raw);
      return { looks, wanted };
    }
  } catch {
    // storage blocked or corrupt — start empty
  }
  return { looks: [], wanted: [] };
}

export function saveLookbook(book) {
  try {
    localStorage.setItem(KEY, JSON.stringify(book));
  } catch {
    // ignore — the lookbook still works for this visit
  }
}

const toggle = (list, value) =>
  list.includes(value) ? list.filter((v) => v !== value) : [value, ...list];

export const addLook = (book, id) =>
  book.looks.includes(id) ? book : { ...book, looks: [id, ...book.looks] };
export const toggleLook = (book, id) => ({ ...book, looks: toggle(book.looks, id) });
export const toggleWanted = (book, piece) => ({ ...book, wanted: toggle(book.wanted, pieceKey(piece)) });
