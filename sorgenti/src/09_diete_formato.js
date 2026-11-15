// ============================================================
// V10 · DIETE — modelli e preset
// ============================================================
const DIET_TYPES = [{
  id: 'allenamento',
  label: 'Allenamento',
  color: '#6BBF8A'
}, {
  id: 'riposo',
  label: 'Riposo',
  color: '#86A8E6'
}, {
  id: 'refeed',
  label: 'Refeed',
  color: '#D9B25E'
}];
const DIET_PRESETS = [{
  name: 'Giorno allenamento',
  type: 'allenamento',
  target: {
    p: 200,
    c: 170,
    f: 55
  }
}, {
  name: 'Giorno riposo',
  type: 'riposo',
  target: {
    p: 200,
    c: 130,
    f: 55
  }
}, {
  name: 'Refeed',
  type: 'refeed',
  target: {
    p: 180,
    c: 380,
    f: 50
  }
}];
const newDiet = preset => ({
  format: 'v8d/1',
  id: uid('diet'),
  name: preset ? preset.name : 'Nuova dieta',
  subtitle: '',
  dayType: preset ? preset.type : 'allenamento',
  target: preset ? {
    ...preset.target
  } : {
    p: 180,
    c: 200,
    f: 60
  },
  meals: [{
    id: uid('m'),
    name: 'Colazione',
    time: '08:00',
    items: []
  }, {
    id: uid('m'),
    name: 'Pranzo',
    time: '13:00',
    items: []
  }, {
    id: uid('m'),
    name: 'Spuntino',
    time: '16:00',
    items: []
  }, {
    id: uid('m'),
    name: 'Cena',
    time: '20:00',
    items: []
  }]
});
const validateV8d = o => {
  if (!o || typeof o !== 'object') return 'File non valido.';
  if (!Array.isArray(o.meals)) return 'Manca la lista "meals" (i pasti).';
  return null;
};
