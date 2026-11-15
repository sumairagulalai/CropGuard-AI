export const E = { Tomato: '🍅', Potato: '🥔', Wheat: '🌾', Corn: '🌽', Rice: '🌾', Cotton: '☁️' }
export const CR = { Tomato: 12, Potato: 10, Wheat: 8, Corn: 6, Rice: 7, Cotton: 5 }
export const nav = [['dashboard', '🏠', 'Dashboard'], ['detect', '🔍', 'Detect Disease'], ['history', '🕘', 'History'], ['guide', '📖', 'Crop Guide'], ['profile', '👤', 'Profile']]
export const D = {
  early: { n: 'Early Blight', s: 'Alternaria solani', c: 'Tomato', t: 'Fungal Disease', d: 'Early blight is a fungal disease that affects tomato plants. It causes dark, concentric spots on older leaves and can spread to stems and fruits.', sy: ['Dark, circular spots on older leaves', 'Yellowing around the spots', 'May cause defoliation'], tr: ['Use fungicides (e.g., Mancozeb, Chlorothalonil)', 'Remove infected leaves', 'Ensure proper spacing and air circulation'], pr: ['Use disease-free seeds', 'Rotate crops', 'Keep the field clean'] },
  late: { n: 'Late Blight', s: 'Phytophthora infestans', c: 'Potato', t: 'Oomycete Disease', d: 'Late blight spreads rapidly in cool, wet weather and can destroy a potato field within days.', sy: ['Water-soaked dark patches on leaves', 'White mold on leaf undersides', 'Brown rot on tubers'], tr: ['Apply recommended fungicide immediately', 'Destroy infected plants', 'Avoid overhead irrigation'], pr: ['Plant resistant varieties', 'Use certified seed tubers', 'Improve field drainage'] },
  rust: { n: 'Wheat Rust', s: 'Puccinia triticina', c: 'Wheat', t: 'Fungal Disease', d: 'Rust is a fungal disease forming orange-brown pustules on leaves and stems, reducing grain yield.', sy: ['Orange-brown pustules on leaves', 'Leaves turn yellow and dry', 'Shriveled grains'], tr: ['Spray triazole fungicides', 'Remove volunteer wheat plants', 'Monitor neighbouring fields'], pr: ['Grow resistant varieties', 'Sow at recommended time', 'Avoid excess nitrogen'] },
  ok: { n: 'Healthy', s: 'No disease found', c: '', t: '', d: '', sy: [], tr: [], pr: [] },
}
export const SEED = [
  { k: 'early', crop: 'Tomato', date: 'Apr 26, 2025', ago: '2 hours ago' },
  { k: 'late', crop: 'Potato', date: 'Apr 25, 2025', ago: '1 day ago' },
  { k: 'ok', crop: 'Wheat', date: 'Apr 23, 2025', ago: '2 days ago' },
  { k: 'ok', crop: 'Tomato', date: 'Apr 20, 2025', ago: '6 days ago' },
]
