// Outfit photos are from Unsplash (free to use). Every look is modern smart
// casual (no suits). Each style has 3 looks: dark/neutral, light/earthy, bold.
const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;

export const STYLES = {
  blazer: {
    name: 'Blazer & Trainers',
    blurb: 'An unstructured blazer over a tee or shirt, with jeans or chinos and clean trainers.',
    picks: {
      aw: ['mens unstructured blazer', 'mens textured blazer', 'mens slim jeans', 'mens leather trainers'],
      ss: ['mens linen blazer', 'mens cotton blazer', 'mens stone chinos', 'mens white trainers'],
    },
  },
  knitwear: {
    name: 'Modern Knitwear',
    blurb: 'Roll necks, crew neck jumpers and textured knits over relaxed trousers.',
    picks: {
      aw: ['mens roll neck jumper', 'mens merino crew neck', 'mens textured knit jumper', 'mens relaxed chinos'],
      ss: ['mens cotton jumper', 'mens knitted polo', 'mens lightweight knit', 'mens tapered chinos'],
    },
  },
  overshirt: {
    name: 'Overshirts & Layers',
    blurb: 'Overshirts and shackets layered over tees and roll necks. Easy, modern layering.',
    picks: {
      aw: ['mens check overshirt', 'mens wool overshirt', 'mens shacket', 'mens cargo trousers'],
      ss: ['mens linen overshirt', 'mens cotton overshirt', 'mens heavyweight t-shirt', 'mens relaxed trousers'],
    },
  },
  minimal: {
    name: 'Clean Minimal',
    blurb: 'Crisp shirts, sharp trousers and a pared-back palette. Simple, confident and modern.',
    picks: {
      aw: ['mens oxford shirt', 'mens black tapered trousers', 'mens dark jeans', 'mens minimal trainers'],
      ss: ['mens white shirt', 'mens linen shirt', 'mens smart trousers', 'mens white trainers'],
    },
  },
  preppy: {
    name: 'Modern Preppy',
    blurb: 'Polos, printed shirts and chinos with a pop of colour. Clean-cut and fresh.',
    picks: {
      aw: ['mens long sleeve polo', 'mens knitted polo', 'mens chinos', 'mens loafers'],
      ss: ['mens polo shirt', 'mens printed shirt', 'mens white chinos', 'mens suede loafers'],
    },
  },
  earthy: {
    name: 'Earth Tones & Suede',
    blurb: 'Suede jackets, rust, tan and cream. Warm textures with a modern cut.',
    picks: {
      aw: ['mens suede jacket', 'mens corduroy overshirt', 'mens tan chinos', 'mens suede boots'],
      ss: ['mens suede harrington', 'mens cream trousers', 'mens linen shirt', 'mens suede trainers'],
    },
  },
};

export const OUTFITS = [
  { id: 1, img: img('1774813958486-4c180dcda729'), title: 'Navy Blazer & Jeans', style: 'blazer', colours: ['Navy', 'White', 'Denim'] },
  { id: 2, img: img('1642886512785-b5fee9faad7f'), title: 'Red Roll Neck & Black Trousers', style: 'knitwear', colours: ['Red', 'Black'] },
  { id: 3, img: img('1719418730257-a9da9282da37'), title: 'Stone Overshirt', style: 'overshirt', colours: ['Stone', 'Grey'] },
  { id: 4, img: img('1621072156002-e2fccdc0b176'), title: 'White Shirt, Black Trousers', style: 'minimal', colours: ['White', 'Black'] },
  { id: 5, img: img('1600364768634-797baa6a8af3'), title: 'Pink Polo & Navy Jeans', style: 'preppy', colours: ['Pink', 'Navy'] },
  { id: 6, img: img('1617114919297-3c8ddb01f599'), title: 'Suede Jacket & Jeans', style: 'earthy', colours: ['Tan', 'Black', 'Denim'] },
  { id: 7, img: img('1552374196-1ab2a1c593e8'), title: 'Camel Blazer & Stone Jeans', style: 'blazer', colours: ['Camel', 'White', 'Stone'] },
  { id: 8, img: img('1618418405974-4cd2be167e73'), title: 'Oatmeal Jumper & Chinos', style: 'knitwear', colours: ['Beige', 'Cream'] },
  { id: 9, img: img('1662578354822-f8b43ecaeaaa'), title: 'Check Overshirt & Olive Trousers', style: 'overshirt', colours: ['Pink', 'Grey', 'Olive'] },
  { id: 10, img: img('1624835589323-442670703bc0'), title: 'Light Blue Shirt & Navy Trousers', style: 'minimal', colours: ['Light Blue', 'Navy'] },
  { id: 11, img: img('1788500304857-256ab412295c'), title: 'Navy Polo & Chinos', style: 'preppy', colours: ['Navy', 'Beige'] },
  { id: 12, img: img('1615538363919-8e5724f16d20'), title: 'Brown Jacket & Cream Trousers', style: 'earthy', colours: ['Brown', 'Cream'] },
  { id: 13, img: img('1622450180332-3da1126f10a4'), title: 'Cornflower Blazer & Grey Chinos', style: 'blazer', colours: ['Blue', 'White', 'Grey'] },
  { id: 14, img: img('1790270492019-8cd019ee4cf6'), title: 'Black Crew Neck & Olive Trousers', style: 'knitwear', colours: ['Black', 'Olive'] },
  { id: 15, img: img('1633199518179-55ea38bb9f0e'), title: 'Roll Neck & Check Overshirt', style: 'overshirt', colours: ['Black', 'Brown', 'Khaki'] },
  { id: 16, img: img('1616804827035-f4aa814c14ac'), title: 'White Shirt & Jeans', style: 'minimal', colours: ['White', 'Denim'] },
  { id: 17, img: img('1626557981101-aae6f84aa6ff'), title: 'Print Shirt & White Chinos', style: 'preppy', colours: ['White', 'Light Blue'] },
  { id: 18, img: img('1540907389453-f0e0a8dc70eb'), title: 'Rust Overshirt & Khaki Trousers', style: 'earthy', colours: ['Rust', 'Khaki'] },
];

// Colours used for the little swatches on each card.
export const SWATCH = {
  Navy: '#1f2a44', White: '#f5f5f5', Camel: '#c19a6b', Stone: '#d6cfc4', Black: '#111',
  Brown: '#6b4a2f', Denim: '#3b5b85', Blue: '#5b84c4', Tan: '#b5835a', 'Light Blue': '#a9c7e8',
  Grey: '#808080', Red: '#a3172a', Beige: '#c8b89a', Cream: '#efe6d2', Pink: '#f2b8c0',
  Khaki: '#a89a6e', Rust: '#8a3b24', Olive: '#5b5a36',
};

// Upcoming season: Aug–Jan shop Autumn/Winter, Feb–Jul shop Spring/Summer.
export function upcomingSeason(date = new Date()) {
  const m = date.getMonth(); // 0 = Jan
  const yy = String(m === 0 ? date.getFullYear() - 1 : date.getFullYear()).slice(2);
  if (m >= 7 || m === 0) return { key: 'aw', label: `Autumn/Winter '${yy}` };
  return { key: 'ss', label: `Spring/Summer '${String(date.getFullYear()).slice(2)}` };
}

export const nextSearchUrl = (term) =>
  `https://www.next.co.uk/search?w=${encodeURIComponent(term)}`;
