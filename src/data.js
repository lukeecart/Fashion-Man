// Outfit photos are from Unsplash (free to use). Looks are mostly smart casual
// with some casual (no suits) — see formalityScore below. Each outfit lists its
// pieces (garment + colour), all everyday menswear lines that Next carries; the
// model learns from these, and they become Next search links.
const img = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80&fit=crop`;

export const STYLES = {
  blazer: {
    name: 'Smart Blazers',
    blurb: 'An unstructured blazer over a tee or shirt, with jeans or chinos and clean trainers.',
    picks: {
      aw: ['mens unstructured blazer', 'mens textured blazer', 'mens slim jeans', 'mens leather trainers'],
      ss: ['mens linen blazer', 'mens cotton blazer', 'mens stone chinos', 'mens white trainers'],
    },
  },
  knitwear: {
    name: 'Modern Knitwear',
    blurb: 'Roll necks, crew neck jumpers and cardigans over relaxed trousers.',
    picks: {
      aw: ['mens roll neck jumper', 'mens merino crew neck', 'mens cardigan', 'mens relaxed chinos'],
      ss: ['mens cotton jumper', 'mens knitted polo', 'mens lightweight knit', 'mens tapered chinos'],
    },
  },
  overshirt: {
    name: 'Overshirts & Layers',
    blurb: 'Overshirts, chore jackets and coats layered over tees and roll necks.',
    picks: {
      aw: ['mens check overshirt', 'mens wool overshirt', 'mens chore jacket', 'mens cargo trousers'],
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
    blurb: 'Polos, printed shirts, cardigans and chinos with a pop of colour.',
    picks: {
      aw: ['mens long sleeve polo', 'mens knitted polo', 'mens chinos', 'mens loafers'],
      ss: ['mens polo shirt', 'mens printed shirt', 'mens white chinos', 'mens suede loafers'],
    },
  },
  earthy: {
    name: 'Earth Tones & Suede',
    blurb: 'Suede, leather, rust, tan and camel. Warm textures with a modern cut.',
    picks: {
      aw: ['mens suede jacket', 'mens camel coat', 'mens tan chinos', 'mens suede boots'],
      ss: ['mens suede harrington', 'mens cream trousers', 'mens linen shirt', 'mens suede trainers'],
    },
  },
  denim: {
    name: 'Smart Denim',
    blurb: 'Denim shirts, jackets and gilets worn with clean lines. Relaxed but considered.',
    picks: {
      aw: ['mens denim jacket', 'mens denim shirt', 'mens dark jeans', 'mens harrington jacket'],
      ss: ['mens light wash denim jacket', 'mens denim overshirt', 'mens wide leg trousers', 'mens canvas trainers'],
    },
  },
  outerwear: {
    name: 'Coats & Jackets',
    blurb: 'Bombers, gilets, field jackets and smart coats. Your outfit starts with the outer layer.',
    picks: {
      aw: ['mens wool overcoat', 'mens bomber jacket', 'mens padded jacket', 'mens field jacket'],
      ss: ['mens trench coat', 'mens harrington jacket', 'mens lightweight bomber', 'mens shacket'],
    },
  },
};

// tone: dark | light | bold | earthy. items: [garment, colour].
const o = (id, photo, title, style, tone, items) => ({
  id, img: img(photo), title, style, tone,
  items: items.map(([garment, colour]) => ({ garment, colour })),
  colours: [...new Set(items.map(([, c]) => c))],
});

export const OUTFITS = [
  o(1, '1774813958486-4c180dcda729', 'Navy Blazer & Jeans', 'blazer', 'dark', [['blazer', 'Navy'], ['shirt', 'White'], ['jeans', 'Indigo']]),
  o(2, '1642886512785-b5fee9faad7f', 'Red Roll Neck & Black Trousers', 'knitwear', 'bold', [['roll neck', 'Red'], ['trousers', 'Black'], ['chelsea boots', 'Black']]),
  o(3, '1719418730257-a9da9282da37', 'Stone Overshirt', 'overshirt', 'light', [['overshirt', 'Stone'], ['t-shirt', 'Black']]),
  o(4, '1621072156002-e2fccdc0b176', 'White Shirt, Black Trousers', 'minimal', 'dark', [['shirt', 'White'], ['trousers', 'Black']]),
  o(5, '1600364768634-797baa6a8af3', 'Pink Polo & Navy Jeans', 'preppy', 'bold', [['polo', 'Pink'], ['jeans', 'Indigo']]),
  o(6, '1617114919297-3c8ddb01f599', 'Suede Jacket & Jeans', 'earthy', 'earthy', [['suede jacket', 'Tan'], ['shirt', 'Black'], ['jeans', 'Light Wash'], ['boots', 'Brown']]),
  o(7, '1552374196-1ab2a1c593e8', 'Camel Blazer & Stone Chinos', 'blazer', 'light', [['blazer', 'Camel'], ['t-shirt', 'White'], ['chinos', 'Stone'], ['trainers', 'White']]),
  o(8, '1618418405974-4cd2be167e73', 'Oatmeal Jumper & Chinos', 'knitwear', 'light', [['jumper', 'Oatmeal'], ['chinos', 'Khaki'], ['trainers', 'White']]),
  o(9, '1662578354822-f8b43ecaeaaa', 'Check Overshirt & Olive Trousers', 'overshirt', 'bold', [['check overshirt', 'Pink'], ['t-shirt', 'White'], ['trousers', 'Olive']]),
  o(10, '1624835589323-442670703bc0', 'Light Blue Shirt & Navy Trousers', 'minimal', 'light', [['shirt', 'Light Blue'], ['trousers', 'Navy']]),
  o(11, '1788500304857-256ab412295c', 'Navy Polo & Chinos', 'preppy', 'dark', [['polo', 'Navy'], ['chinos', 'Beige']]),
  o(12, '1615538363919-8e5724f16d20', 'Brown Jacket & Cream Trousers', 'earthy', 'earthy', [['jacket', 'Brown'], ['trousers', 'Cream'], ['boots', 'Brown']]),
  o(13, '1622450180332-3da1126f10a4', 'Cornflower Blazer & Grey Chinos', 'blazer', 'bold', [['blazer', 'Blue'], ['shirt', 'White'], ['chinos', 'Grey'], ['loafers', 'Brown']]),
  o(14, '1790270492019-8cd019ee4cf6', 'Black Crew Neck & Olive Trousers', 'knitwear', 'dark', [['jumper', 'Black'], ['trousers', 'Olive']]),
  o(15, '1633199518179-55ea38bb9f0e', 'Roll Neck & Check Overshirt', 'overshirt', 'dark', [['roll neck', 'Black'], ['check overshirt', 'Brown']]),
  o(16, '1616804827035-f4aa814c14ac', 'White Shirt & Jeans', 'minimal', 'light', [['shirt', 'White'], ['jeans', 'Indigo']]),
  o(17, '1626557981101-aae6f84aa6ff', 'Print Shirt & White Chinos', 'preppy', 'light', [['printed shirt', 'Light Blue'], ['chinos', 'White'], ['trainers', 'White']]),
  o(18, '1540907389453-f0e0a8dc70eb', 'Rust Overshirt & Khaki Trousers', 'earthy', 'bold', [['overshirt', 'Rust'], ['trousers', 'Khaki'], ['boots', 'Brown']]),
  o(19, '1653812564600-56291b1add3b', 'Mustard Chore Jacket', 'overshirt', 'bold', [['chore jacket', 'Mustard'], ['trousers', 'Black']]),
  o(20, '1724335141947-a63578d5d118', 'Cream Chore Jacket & White Tee', 'overshirt', 'light', [['chore jacket', 'Cream'], ['t-shirt', 'White']]),
  o(21, '1700059425529-411240553003', 'Tan Chore Jacket & Black Trousers', 'earthy', 'earthy', [['chore jacket', 'Tan'], ['t-shirt', 'Navy'], ['trousers', 'Black']]),
  o(22, '1786141251777-c48309702838', 'Striped Cardigan & White Tee', 'preppy', 'light', [['cardigan', 'Cream'], ['t-shirt', 'White'], ['trousers', 'Navy']]),
  o(23, '1791308835255-7612e1a8d419', 'Green Cardigan & White Tee', 'knitwear', 'bold', [['cardigan', 'Green'], ['t-shirt', 'White']]),
  o(24, '1627686011747-74adda3d2343', 'Cream Linen Shirt & Black Trousers', 'minimal', 'light', [['linen shirt', 'Cream'], ['trousers', 'Black']]),
  o(25, '1620228922597-cca58f177310', 'Tan Leather Jacket & Jeans', 'earthy', 'earthy', [['leather jacket', 'Tan'], ['t-shirt', 'White'], ['jeans', 'Indigo'], ['trainers', 'White']]),
  o(26, '1621335829175-95f437384d7c', 'Grey Check Blazer & Dark Jeans', 'blazer', 'light', [['check blazer', 'Grey'], ['shirt', 'White'], ['jeans', 'Indigo'], ['loafers', 'Brown']]),
  o(27, '1741892600043-141ab7357735', 'Red Jumper & Dusty Pink Trousers', 'knitwear', 'bold', [['jumper', 'Red'], ['trousers', 'Pink']]),
  o(28, '1581376781301-e95a3ae2a33f', 'Cream Knit & Charcoal Trousers', 'knitwear', 'light', [['jumper', 'Cream'], ['trousers', 'Charcoal']]),
  o(29, '1637868841955-4a1dfb0a1545', 'Orange Jumper & Chinos', 'knitwear', 'bold', [['jumper', 'Orange'], ['chinos', 'Beige'], ['loafers', 'Brown']]),
  o(30, '1619659712390-c0ffe7eec650', 'Black Harrington & Jeans', 'denim', 'dark', [['harrington jacket', 'Black'], ['jeans', 'Light Wash']]),
  o(31, '1776007087050-dbc004f5d17c', 'Green Plaid Overshirt & Cargos', 'overshirt', 'bold', [['check overshirt', 'Green'], ['t-shirt', 'Black'], ['cargo trousers', 'Black']]),
  o(32, '1580968744774-74b3888b402d', 'Denim Shirt & Grey Cargos', 'denim', 'light', [['denim shirt', 'Blue'], ['cargo trousers', 'Grey']]),
  o(33, '1516257984-b1b4d707412e', 'Light Denim Jacket & Print Shirt', 'denim', 'light', [['denim jacket', 'Light Wash'], ['printed shirt', 'White']]),
  o(34, '1738543737166-05c5145dd1b8', 'Denim Gilet & Wide Tan Trousers', 'denim', 'bold', [['denim gilet', 'Light Wash'], ['wide leg trousers', 'Tan']]),
  o(35, '1792793534587-aab009facb8c', 'Denim Shirt & Black Tee', 'denim', 'dark', [['denim shirt', 'Light Wash'], ['t-shirt', 'Black'], ['jeans', 'Light Wash']]),
  o(36, '1622519407650-3df9883f76a5', 'Black Tee & Jeans', 'denim', 'dark', [['t-shirt', 'Black'], ['jeans', 'Light Wash']]),
  o(37, '1584865288642-42078afe6942', 'White Shirt & Cropped Black Trousers', 'minimal', 'dark', [['shirt', 'White'], ['trousers', 'Black'], ['trainers', 'White']]),
  o(38, '1791573391881-98b6b072e7ff', 'Black Polo & Beige Trousers', 'preppy', 'dark', [['polo', 'Black'], ['trousers', 'Beige']]),
  o(39, '1787045098569-2e17ae871df4', 'Grey Overcoat & Beige Trousers', 'overshirt', 'light', [['overcoat', 'Grey'], ['trousers', 'Beige'], ['boots', 'Brown']]),
  o(40, '1599542829769-9ab0c324b4dd', 'Black Roll Neck & Stone Trousers', 'knitwear', 'dark', [['roll neck', 'Black'], ['trousers', 'Stone']]),
  o(41, '1559582798-678dfc71ccd8', 'Camel Overcoat & Black Jeans', 'earthy', 'earthy', [['overcoat', 'Camel'], ['jeans', 'Black'], ['trainers', 'White']]),
  o(42, '1785088559111-44034aed38d1', 'Sage Blazer & Black Tee', 'blazer', 'bold', [['blazer', 'Sage'], ['t-shirt', 'Black']]),
  o(43, '1611000784352-a67afb821041', 'Grey Blazer & Black Tee', 'blazer', 'dark', [['blazer', 'Grey'], ['t-shirt', 'Black'], ['trainers', 'White']]),
  o(44, '1662758949073-56537345d85d', 'Rust Overshirt Co-ord', 'earthy', 'bold', [['overshirt', 'Rust'], ['trousers', 'Rust']]),
  o(45, '1620834767726-61b1986287ff', 'Cream Trucker Jacket & Striped Shirt', 'overshirt', 'light', [['trucker jacket', 'Cream'], ['striped shirt', 'Black'], ['trousers', 'Black']]),
  o(46, '1536243298747-ea8874136d64', 'Black Leather Jacket & Black Jeans', 'outerwear', 'dark', [['leather jacket', 'Black'], ['jeans', 'Black'], ['boots', 'Black']]),
  o(47, '1713943189183-c5a9dde63b45', 'Dark Denim Jacket & Red Tee', 'denim', 'bold', [['denim jacket', 'Indigo'], ['t-shirt', 'Red'], ['jeans', 'Black']]),
  o(48, '1642886513308-d21acc15057d', 'Belted Black Coat', 'outerwear', 'dark', [['overcoat', 'Black'], ['jeans', 'Black'], ['boots', 'Black']]),
  o(49, '1581381685617-4dc270458aa6', 'Grey Jacket & Black Trousers', 'outerwear', 'light', [['jacket', 'Grey'], ['t-shirt', 'White'], ['trousers', 'Black']]),
  o(50, '1636590416708-68a4867918f1', 'Grey Coat, White Tee & Jeans', 'outerwear', 'light', [['overcoat', 'Grey'], ['t-shirt', 'White'], ['jeans', 'Light Wash'], ['trainers', 'White']]),
  o(51, '1619603364937-8d7af41ef206', 'Camel Coat & Brown Roll Neck', 'earthy', 'earthy', [['overcoat', 'Camel'], ['roll neck', 'Brown']]),
  o(52, '1737508945707-ebdccee97cc5', 'Stone Trench Coat', 'outerwear', 'light', [['trench coat', 'Stone'], ['trousers', 'Stone']]),
  o(53, '1602525582399-7ef5f604ff7e', 'Black Bomber & White Tee', 'outerwear', 'dark', [['bomber jacket', 'Black'], ['t-shirt', 'White']]),
  o(54, '1585418244972-54930a08ce24', 'Navy Padded Jacket & Grey Jumper', 'outerwear', 'dark', [['padded jacket', 'Navy'], ['jumper', 'Grey']]),
  o(55, '1629353689974-af4d5c70440f', 'Green Field Jacket', 'outerwear', 'bold', [['field jacket', 'Green'], ['jeans', 'Black']]),
  o(56, '1788500304842-710d18642b77', 'Black Jacket & White Shirt', 'minimal', 'dark', [['jacket', 'Black'], ['shirt', 'White'], ['trousers', 'Black']]),
  o(57, '1600574691453-499962cc0611', 'Denim Jacket & Graphic Tee', 'denim', 'light', [['denim jacket', 'Light Wash'], ['t-shirt', 'White'], ['jeans', 'Black']]),
  o(58, '1764593008673-af6056758b4a', 'Brown Jacket & Sage Wide Trousers', 'earthy', 'bold', [['jacket', 'Brown'], ['wide leg trousers', 'Sage']]),
  o(59, '1772817565731-cfae0f2c1552', 'Blue Chore Jacket & Jeans', 'denim', 'bold', [['chore jacket', 'Blue'], ['shirt', 'Black'], ['jeans', 'Indigo']]),
  o(60, '1762708546645-65ee9ccedfae', 'Pink Oxford Shirt', 'preppy', 'light', [['oxford shirt', 'Pink']]),
  o(61, '1506634572416-48cdfe530110', 'Burgundy Jumper & Black Trousers', 'knitwear', 'bold', [['jumper', 'Burgundy'], ['trousers', 'Black']]),
  o(62, '1554936823-dc697a3083ff', 'Black Textured Knit', 'knitwear', 'dark', [['jumper', 'Black']]),
  o(63, '1597143720583-bbbf44a6677d', 'Striped Jumper & Jeans', 'preppy', 'bold', [['striped jumper', 'Navy'], ['jeans', 'Indigo']]),
  o(64, '1599032909736-0155c1d43a6c', 'Plum V-Neck Over Shirt', 'preppy', 'dark', [['v-neck jumper', 'Burgundy'], ['shirt', 'White'], ['jeans', 'Black']]),
  o(65, '1615851947829-3641ababa187', 'Rust Stripe Jumper', 'knitwear', 'bold', [['striped jumper', 'Rust']]),
  o(66, '1604073536770-8a33e332f830', 'Pink Overshirt & Brown Trousers', 'overshirt', 'light', [['overshirt', 'Pink'], ['t-shirt', 'Grey'], ['trousers', 'Brown']]),
  o(67, '1614533835924-043a0974d1ad', 'Black Polo & Khaki Chinos', 'preppy', 'dark', [['polo', 'Black'], ['chinos', 'Khaki']]),
  o(68, '1634136912882-61fd36144a3a', 'Mustard Jacket & Grey Tee', 'outerwear', 'bold', [['harrington jacket', 'Mustard'], ['t-shirt', 'Grey'], ['jeans', 'Indigo']]),
  o(69, '1642259403032-45d7d3997b36', 'Black Shirt & Jeans', 'minimal', 'dark', [['shirt', 'Black'], ['jeans', 'Light Wash']]),
  o(70, '1787436025288-874f0696fcca', 'Grey Coat & Scarf', 'outerwear', 'light', [['overcoat', 'Grey'], ['scarf', 'Grey'], ['trousers', 'Grey']]),
  o(71, '1761126085595-c9b8a83912cd', 'Brown Shirt & White Trousers', 'earthy', 'earthy', [['shirt', 'Brown'], ['trousers', 'White']]),
  o(72, '1701318227205-227aee07476c', 'Brown Henley & Grey Trousers', 'earthy', 'dark', [['henley', 'Brown'], ['trousers', 'Grey']]),
  o(73, '1665832102183-b232574131ff', 'Tan Coat & Black Roll Neck', 'earthy', 'earthy', [['overcoat', 'Tan'], ['roll neck', 'Black']]),
  o(74, '1630952588138-941bc6baf18c', 'White Polo & Black Trousers', 'minimal', 'light', [['polo', 'White'], ['trousers', 'Black'], ['loafers', 'Black']]),
  o(75, '1620834767673-19f69709a716', 'Light Grey Overshirt & Trousers', 'overshirt', 'light', [['overshirt', 'Grey'], ['trousers', 'Grey'], ['trainers', 'White']]),
];

// Colours used for the little swatches on each card.
export const SWATCH = {
  Navy: '#1f2a44', White: '#f5f5f5', Indigo: '#2b3a5c', Red: '#a3172a', Black: '#111',
  Stone: '#d6cfc4', Pink: '#e8a9b3', Tan: '#b5835a', 'Light Wash': '#8eaed1', Brown: '#6b4a2f',
  Camel: '#c19a6b', Oatmeal: '#d9ccb4', Khaki: '#a89a6e', Olive: '#5b5a36', 'Light Blue': '#a9c7e8',
  Beige: '#c8b89a', Cream: '#efe6d2', Blue: '#5b84c4', Grey: '#808080', Rust: '#8a3b24',
  Mustard: '#c9a227', Green: '#2f5a3c', Charcoal: '#36454f', Orange: '#d9541e', Sage: '#8a9a7b',
  Burgundy: '#6d1a2b',
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

export const itemSearchTerm = ({ garment, colour }) => `mens ${colour.toLowerCase()} ${garment}`;

// --- Formality & occasions -------------------------------------------------
// Each garment nudges an outfit smarter (+) or more casual (−). Outfits that
// net out at 0 or above count as smart casual, below 0 as casual.
const FORMALITY = {
  blazer: 2, 'check blazer': 2, overcoat: 2, 'trench coat': 2, loafers: 2,
  'oxford shirt': 1, shirt: 1, 'linen shirt': 1, trousers: 1, chinos: 1, polo: 1,
  'chelsea boots': 1, 'roll neck': 1, 'v-neck jumper': 1, cardigan: 1,
  't-shirt': -1, jeans: -1, trainers: -1, 'denim jacket': -1, 'denim shirt': -1,
  'bomber jacket': -1, 'padded jacket': -1, 'trucker jacket': -1, 'field jacket': -1,
  'chore jacket': -1, 'check overshirt': -1, 'cargo trousers': -2, 'denim gilet': -2,
};
export const formalityScore = (outfit) =>
  outfit.items.reduce((s, i) => s + (FORMALITY[i.garment] || 0), 0);
export const isSmartCasual = (outfit) => formalityScore(outfit) >= 0;

const has = (outfit, garments) => outfit.items.some((i) => garments.includes(i.garment));

export const OCCASIONS = {
  any: { name: 'Anything', test: () => true },
  work: {
    name: 'Work',
    test: (o) => formalityScore(o) >= 1 &&
      !has(o, ['t-shirt', 'cargo trousers', 'denim gilet', 'denim jacket', 'bomber jacket']),
  },
  date: { name: 'Date night', test: (o) => formalityScore(o) >= 0 && o.tone !== 'light' },
  weekend: { name: 'Weekend', test: (o) => formalityScore(o) <= 1 },
  dressy: {
    name: 'Dressed up',
    test: (o) => formalityScore(o) >= 2 || has(o, ['blazer', 'check blazer', 'overcoat', 'trench coat', 'loafers']),
  },
};

export const outfitsFor = (occasion) => OUTFITS.filter(OCCASIONS[occasion].test);

// --- Garment families (for "Build around a piece") -------------------------
export const FAMILIES = {
  Blazers: ['blazer', 'check blazer'],
  Coats: ['overcoat', 'trench coat'],
  Jackets: ['jacket', 'leather jacket', 'suede jacket', 'harrington jacket', 'bomber jacket',
    'field jacket', 'padded jacket', 'denim jacket', 'trucker jacket', 'denim gilet'],
  'Overshirts & chore jackets': ['overshirt', 'check overshirt', 'chore jacket'],
  Shirts: ['shirt', 'oxford shirt', 'linen shirt', 'printed shirt', 'striped shirt', 'denim shirt'],
  'Tops & polos': ['t-shirt', 'polo', 'henley'],
  Knitwear: ['jumper', 'roll neck', 'cardigan', 'striped jumper', 'v-neck jumper'],
  Trousers: ['trousers', 'chinos', 'wide leg trousers', 'cargo trousers', 'jeans'],
  Shoes: ['trainers', 'loafers', 'boots', 'chelsea boots'],
  Accessories: ['scarf'],
};
export const familyOf = (garment) =>
  Object.keys(FAMILIES).find((f) => FAMILIES[f].includes(garment)) ?? 'Other';
