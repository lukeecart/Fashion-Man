// Outfit photos are from Unsplash (free to use). Each one is tagged with a
// style and a colour scheme so swipes can build up the user's profile.
// Every style has 3 looks: one dark/neutral, one light/earthy, one bolder colour.
const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;

export const STYLES = {
  classic: {
    name: 'Classic Tailoring',
    blurb: 'Sharp suits, crisp shirts and polished shoes. You like to look put-together.',
    picks: {
      aw: ['mens navy suit', 'mens wool overcoat', 'mens formal shirt', 'mens oxford shoes'],
      ss: ['mens linen suit', 'mens light grey suit', 'mens formal shirt', 'mens loafers'],
    },
  },
  smartcasual: {
    name: 'Smart Casual',
    blurb: 'Relaxed blazers, chinos and clean trainers. Smart without trying too hard.',
    picks: {
      aw: ['mens unstructured blazer', 'mens chinos', 'mens smart jumper', 'mens chelsea boots'],
      ss: ['mens linen blazer', 'mens stone chinos', 'mens oxford shirt', 'mens white trainers'],
    },
  },
  monochrome: {
    name: 'Modern Monochrome',
    blurb: 'Black, white and clean lines. Minimal, confident and contemporary.',
    picks: {
      aw: ['mens black blazer', 'mens black roll neck', 'mens black slim trousers', 'mens black boots'],
      ss: ['mens white shirt', 'mens black trousers', 'mens white suit', 'mens leather trainers'],
    },
  },
  heritage: {
    name: 'Heritage & Earth Tones',
    blurb: 'Tweed, camel and rich browns. Timeless British texture and warmth.',
    picks: {
      aw: ['mens tweed blazer', 'mens camel overcoat', 'mens flat cap', 'mens brown brogues'],
      ss: ['mens tan blazer', 'mens linen shirt', 'mens cream chinos', 'mens suede loafers'],
    },
  },
  occasion: {
    name: 'Occasion & Statement',
    blurb: 'Bold checks, velvet and three-pieces. You dress for the moment.',
    picks: {
      aw: ['mens three piece suit', 'mens velvet blazer', 'mens tuxedo', 'mens check suit'],
      ss: ['mens wedding suit', 'mens check blazer', 'mens waistcoat', 'mens bow tie'],
    },
  },
  knitwear: {
    name: 'Smart Knitwear & Layers',
    blurb: 'Roll necks under suits, fine-gauge jumpers and texture. Cosy but sharp.',
    picks: {
      aw: ['mens roll neck jumper', 'mens merino jumper', 'mens cardigan', 'mens quarter zip'],
      ss: ['mens cotton jumper', 'mens knitted polo', 'mens lightweight knit', 'mens tailored trousers'],
    },
  },
  preppy: {
    name: 'Preppy',
    blurb: 'Polos, Oxford shirts, chinos and loafers. Clean-cut with a pop of colour.',
    picks: {
      aw: ['mens oxford shirt', 'mens cable knit jumper', 'mens chinos', 'mens loafers'],
      ss: ['mens polo shirt', 'mens printed shirt', 'mens white chinos', 'mens boat shoes'],
    },
  },
  relaxed: {
    name: 'Relaxed Casual',
    blurb: 'Overshirts, denim and suede. Laid-back weekend style that still looks considered.',
    picks: {
      aw: ['mens overshirt', 'mens denim shirt', 'mens suede jacket', 'mens slim jeans'],
      ss: ['mens linen overshirt', 'mens denim jacket', 'mens t-shirt', 'mens canvas trainers'],
    },
  },
  athleisure: {
    name: 'Smart Athleisure',
    blurb: 'Hoodies, joggers and clean trainers. Sporty comfort with a polished edge.',
    picks: {
      aw: ['mens hoodie', 'mens joggers', 'mens padded jacket', 'mens trainers'],
      ss: ['mens tracksuit', 'mens zip through top', 'mens shorts', 'mens running trainers'],
    },
  },
};

export const OUTFITS = [
  { id: 1, img: img('1507679799987-c73779587ccf'), title: 'Navy Business Suit', style: 'classic', colours: ['Navy', 'White', 'Silver'] },
  { id: 2, img: img('1642886512785-b5fee9faad7f'), title: 'Red Roll Neck & Black Trousers', style: 'knitwear', colours: ['Red', 'Black'] },
  { id: 3, img: img('1622866654030-fb0958200023'), title: 'Black Hoodie & Joggers', style: 'athleisure', colours: ['Black', 'White'] },
  { id: 4, img: img('1626557981101-aae6f84aa6ff'), title: 'Print Shirt & White Chinos', style: 'preppy', colours: ['White', 'Light Blue'] },
  { id: 5, img: img('1610312726541-0913012a2d00'), title: 'Burgundy Velvet Blazer', style: 'occasion', colours: ['Burgundy', 'Black'] },
  { id: 6, img: img('1552374196-1ab2a1c593e8'), title: 'Camel Blazer & Stone Chinos', style: 'smartcasual', colours: ['Camel', 'White', 'Stone'] },
  { id: 7, img: img('1617114919297-3c8ddb01f599'), title: 'Suede Jacket & Jeans', style: 'relaxed', colours: ['Tan', 'Black', 'Denim'] },
  { id: 8, img: img('1617127365659-c47fa864d8bc'), title: 'All-Black Blazer', style: 'monochrome', colours: ['Black'] },
  { id: 9, img: img('1559582798-678dfc71ccd8'), title: 'Camel Overcoat', style: 'heritage', colours: ['Camel', 'Black'] },
  { id: 10, img: img('1789141732594-207d0e61cdf8'), title: 'Beige Suit & Cream Roll Neck', style: 'knitwear', colours: ['Beige', 'Cream'] },
  { id: 11, img: img('1604822106141-d9dccd171fad'), title: 'Light Grey Suit', style: 'classic', colours: ['Grey', 'White'] },
  { id: 12, img: img('1558000093-0103c35395ed'), title: 'Green Hoodie & Track Pants', style: 'athleisure', colours: ['Green', 'Black', 'White'] },
  { id: 13, img: img('1600364768634-797baa6a8af3'), title: 'Pink Polo & Navy Jeans', style: 'preppy', colours: ['Pink', 'Navy'] },
  { id: 14, img: img('1627379114594-7aff6664cd94'), title: 'Navy Blazer, Tee & Trainers', style: 'smartcasual', colours: ['Navy', 'White'] },
  { id: 15, img: img('1792793534587-aab009facb8c'), title: 'Denim Shirt & Black Tee', style: 'relaxed', colours: ['Denim', 'Black'] },
  { id: 16, img: img('1621072156002-e2fccdc0b176'), title: 'White Shirt, Black Trousers', style: 'monochrome', colours: ['White', 'Black'] },
  { id: 17, img: img('1579293465947-81bbeafa486a'), title: 'Brown Tweed & Flat Cap', style: 'heritage', colours: ['Brown', 'Charcoal'] },
  { id: 18, img: img('1620511469298-7c119cc6982c'), title: 'Wedding Guest Grey & Red Tie', style: 'occasion', colours: ['Grey', 'Red', 'White'] },
  { id: 19, img: img('1789141297944-8ebfd488b647'), title: 'Charcoal Suit & Black Roll Neck', style: 'knitwear', colours: ['Charcoal', 'Black'] },
  { id: 20, img: img('1621062089461-01f1eaebb66c'), title: 'Teal Double-Breasted Suit', style: 'classic', colours: ['Teal', 'White', 'Brown'] },
  { id: 21, img: img('1788882680272-76ea1251e5b9'), title: 'Stone Anorak & Joggers', style: 'athleisure', colours: ['Beige', 'Khaki'] },
  { id: 22, img: img('1788500304857-256ab412295c'), title: 'Navy Polo & Chinos', style: 'preppy', colours: ['Navy', 'Beige'] },
  { id: 23, img: img('1647580427057-b57917f365de'), title: 'Blue Suit & White Trainers', style: 'smartcasual', colours: ['Blue', 'White'] },
  { id: 24, img: img('1698668768752-49dafc267a46'), title: 'Rust Shirt & Jeans', style: 'relaxed', colours: ['Rust', 'Denim'] },
  { id: 25, img: img('1693071210409-5e196ccda66d'), title: 'All-White Suit', style: 'monochrome', colours: ['White', 'Cream'] },
  { id: 26, img: img('1770622006245-3a53a9f15752'), title: 'Olive Tweed Jacket', style: 'heritage', colours: ['Olive', 'Brown'] },
  { id: 27, img: img('1594938298603-c8148c4dae35'), title: 'Blue Check Three-Piece', style: 'occasion', colours: ['Blue', 'Burgundy', 'White'] },
];

// Colours used for the little swatches on each card.
export const SWATCH = {
  Navy: '#1f2a44', White: '#f5f5f5', Silver: '#c0c0c0', Camel: '#c19a6b', Stone: '#d6cfc4',
  Black: '#111', Brown: '#6b4a2f', Charcoal: '#36454f', Denim: '#3b5b85', Blue: '#2f5fa7',
  Burgundy: '#6d1a2b', Tan: '#b5835a', 'Light Blue': '#a9c7e8', Grey: '#808080', Purple: '#4b3a6b',
  Red: '#a3172a', Beige: '#c8b89a', Cream: '#efe6d2', Green: '#2f4a35', Pink: '#f2b8c0',
  Teal: '#4f7c7a', Khaki: '#a89a6e', Rust: '#8a3b24', Olive: '#5b5a36',
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
