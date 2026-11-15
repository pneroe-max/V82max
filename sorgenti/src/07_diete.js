// ============= ALIMENTAZIONE & INTEGRAZIONE =============

const DIET_TIMELINE = [{
  time: '06:00',
  phase: 'FASTED',
  color: '#A893EC',
  food: 'Stack lipolisi: Baldini 3cap + L-Tirosina 1,5g + Sinefrina + Forskolina + R-ALA + HMB 1,5g. 600ml acqua + sale + Vit C.',
  macro: '~10 kcal',
  veloce: null
}, {
  time: '13:00',
  phase: 'PRANZO',
  color: '#86A8E6',
  food: '230g pollo/merluzzo + 20g EVO + 400g verdure basso IG + 25g noci. DFH Multi + Omega-3.',
  macro: 'P60 C20 F32 · 620',
  veloce: '2 scatolette tonno naturale Rio Mare + busta insalata pronta + 25g mandorle + 10g EVO · oppure petto pollo Amadori già cotto + zuppa verdure + 25g noci.'
}, {
  time: '15:45',
  phase: 'PRE-WO',
  color: '#D9B25E',
  food: '1 banana + 15g miele (CHO pre-WO). Compensati con -40g riso a cena.',
  macro: 'P1 C40 F0 · 165',
  veloce: '1 barretta dattero/cocco (Naturalia/Probios) · oppure gel maltodestrine Enervit Pre-Sport.'
}, {
  time: '16:30',
  phase: 'PRE-WO',
  color: '#D9B25E',
  food: 'Ghost Pump + Citrullina 8g + β-Alanina 3,2g. Caffeina 200mg + EGCG 200mg.',
  macro: '~25 kcal',
  veloce: null
}, {
  time: '18:30',
  phase: 'POST-WO',
  color: '#6BBF8A',
  food: '40g Whey + 5g Creatina + 2g Carnitina + HMB 1,5g. 1 banana grande + 30g miele. (UNICO spike insulinico)',
  macro: 'P33 C55 F1 · 370',
  veloce: 'No shaker: bevanda RTD Optimum Nutrition (40g P) + banana + 30g miele bustina + cap carnitina/HMB.'
}, {
  time: '20:30',
  phase: 'CENA',
  color: '#E57A73',
  food: '230g salmone/manzo/pollo + 80g riso basmati + 300g verdure + 10g EVO. KSM-66 300mg.',
  macro: 'P58 C35 F18 · 510',
  veloce: 'Salmone affumicato Foppen 150g + riso basmati pronto Rizopia 90sec + busta insalata + 10g EVO · oppure pollo Amadori grigliato + riso pronto + verdure surgelate Findus (microonde 5 min).'
}, {
  time: '21:30',
  phase: 'SONNO',
  color: '#A9A9B2',
  food: 'Magnesio Bisglicinato 400mg + Glicina 3g. Opz: 200g yogurt greco 0%.',
  macro: 'P20 C8 F0 · 120',
  veloce: 'Yogurt greco Fage Total 0% 200g + 20g miele + KSM-66 cap.'
}];
const QUICK_SNACKS = [{
  n: 'Spuntino proteico A',
  d: 'Yogurt greco Fage 0% 200g + 30g miele + 1 banana',
  m: 'P20 C50 F2 · 290'
}, {
  n: 'Spuntino proteico B',
  d: '50g cracker integrali Galbusera + 30g bresaola pre-affettata',
  m: 'P20 C30 F4 · 250'
}, {
  n: 'Proteico secco',
  d: '1 barretta proteica + 20g mandorle',
  m: 'P20 C20 F10 · 250'
}, {
  n: 'Albume boost',
  d: '200g albume + 80g pane integrale + marmellata',
  m: 'P28 C50 F2 · 340'
}];
const SUPP_STACK = [{
  n: 'Creatina Creapure',
  d: '5g post-WO',
  e: '+5-15% lavoro, +1-2kg LBM',
  t: '#6BBF8A'
}, {
  n: 'Whey Isolate',
  d: '40g post-WO',
  e: 'Target proteico 200g',
  t: '#6BBF8A'
}, {
  n: 'HMB',
  d: '1,5g AM + 1,5g post-WO',
  e: '+0,3-0,5kg LBM preservata',
  t: '#6BBF8A'
}, {
  n: 'Caffeina',
  d: '150 AM + 200 pre-WO',
  e: '+2-7% forza',
  t: '#D9B25E'
}, {
  n: 'EGCG (Baldini)',
  d: '~388mg/die',
  e: '+80-100 kcal/die EE',
  t: '#D9B25E'
}, {
  n: 'L-Citrullina',
  d: '8g pre-WO',
  e: '+1-2 rep, pump',
  t: '#D9B25E'
}, {
  n: 'β-Alanina',
  d: '3,2g pre-WO',
  e: 'Buffer lattato set 12-20',
  t: '#D9B25E'
}, {
  n: 'L-Carnitina',
  d: '2g post-WO + CHO',
  e: '-45% CK, -40% mioglobina',
  t: '#86A8E6'
}, {
  n: 'KSM-66 Ashwagandha',
  d: '300mg cena',
  e: 'Cortisolo -20-25%',
  t: '#A893EC'
}, {
  n: 'Omega-3 TG',
  d: '1,5g pranzo',
  e: 'Antinfiammatorio, mood',
  t: '#86A8E6'
}, {
  n: 'Mg Bisglicinato + Glicina',
  d: '400mg + 3g sera',
  e: 'Latenza -17min, qualità +20%',
  t: '#A9A9B2'
}, {
  n: 'DFH Multi',
  d: '2cap pranzo',
  e: 'Micronutrienti',
  t: '#A9A9B2'
}];

// ============================================================
// V10 · DATABASE ALIMENTI (valori per 100 g)
// ============================================================
const FOOD_DB = [
// --- PROTEINE ---
{
  id: 'f_pollo',
  n: 'Petto di pollo (crudo)',
  cat: 'Proteine',
  p: 23,
  c: 0,
  f: 1.5
}, {
  id: 'f_tacchino',
  n: 'Fesa di tacchino (cruda)',
  cat: 'Proteine',
  p: 24,
  c: 0,
  f: 1.2
}, {
  id: 'f_bresaola',
  n: 'Bresaola',
  cat: 'Proteine',
  p: 32,
  c: 0.5,
  f: 2
}, {
  id: 'f_manzo',
  n: 'Manzo magro / fesa',
  cat: 'Proteine',
  p: 21,
  c: 0,
  f: 4
}, {
  id: 'f_macinato',
  n: 'Macinato bovino 5%',
  cat: 'Proteine',
  p: 21,
  c: 0,
  f: 5
}, {
  id: 'f_uovo',
  n: 'Uovo intero',
  cat: 'Proteine',
  p: 12.5,
  c: 0.7,
  f: 9.5,
  nota: '1 uovo medio ≈ 55 g'
}, {
  id: 'f_albume',
  n: 'Albume',
  cat: 'Proteine',
  p: 11,
  c: 0.7,
  f: 0.2,
  nota: '1 albume ≈ 33 g'
}, {
  id: 'f_tonno',
  n: 'Tonno naturale (sgocciolato)',
  cat: 'Proteine',
  p: 25,
  c: 0,
  f: 1,
  nota: '1 scatoletta ≈ 52 g'
}, {
  id: 'f_salmone',
  n: 'Salmone fresco',
  cat: 'Proteine',
  p: 20,
  c: 0,
  f: 13
}, {
  id: 'f_salmaff',
  n: 'Salmone affumicato',
  cat: 'Proteine',
  p: 24,
  c: 0,
  f: 9
}, {
  id: 'f_merluzzo',
  n: 'Merluzzo / platessa',
  cat: 'Proteine',
  p: 17,
  c: 0,
  f: 1
}, {
  id: 'f_gamberi',
  n: 'Gamberi',
  cat: 'Proteine',
  p: 20,
  c: 0,
  f: 1
}, {
  id: 'f_sgombro',
  n: 'Sgombro al naturale',
  cat: 'Proteine',
  p: 22,
  c: 0,
  f: 11
}, {
  id: 'f_crudo',
  n: 'Prosciutto crudo sgrassato',
  cat: 'Proteine',
  p: 28,
  c: 0,
  f: 6
}, {
  id: 'f_cotto',
  n: 'Prosciutto cotto magro',
  cat: 'Proteine',
  p: 20,
  c: 1,
  f: 4
},
// --- LATTICINI ---
{
  id: 'f_greco0',
  n: 'Yogurt greco 0% (Fage)',
  cat: 'Latticini',
  p: 10,
  c: 4,
  f: 0,
  nota: 'Vasetto 170 g'
}, {
  id: 'f_skyr',
  n: 'Skyr',
  cat: 'Latticini',
  p: 11,
  c: 4,
  f: 0.2
}, {
  id: 'f_fiocchi',
  n: 'Fiocchi di latte (cottage)',
  cat: 'Latticini',
  p: 12,
  c: 3,
  f: 4
}, {
  id: 'f_ricotta',
  n: 'Ricotta vaccina',
  cat: 'Latticini',
  p: 8,
  c: 3,
  f: 11
}, {
  id: 'f_parmigiano',
  n: 'Parmigiano / Grana',
  cat: 'Latticini',
  p: 33,
  c: 0,
  f: 28
}, {
  id: 'f_mozzlight',
  n: 'Mozzarella light',
  cat: 'Latticini',
  p: 20,
  c: 1,
  f: 9
}, {
  id: 'f_lattescr',
  n: 'Latte scremato',
  cat: 'Latticini',
  p: 3.4,
  c: 5,
  f: 0.2
}, {
  id: 'f_spalmlight',
  n: 'Formaggio spalmabile light',
  cat: 'Latticini',
  p: 8,
  c: 5,
  f: 11
},
// --- CARBOIDRATI ---
{
  id: 'f_basmati',
  n: 'Riso basmati (crudo)',
  cat: 'Carbo',
  p: 8,
  c: 78,
  f: 0.6
}, {
  id: 'f_riso',
  n: 'Riso bianco (crudo)',
  cat: 'Carbo',
  p: 7,
  c: 79,
  f: 0.5
}, {
  id: 'f_risopronto',
  n: 'Riso pronto già cotto',
  cat: 'Carbo',
  p: 3,
  c: 26,
  f: 1.5,
  nota: 'Busta 250 g'
}, {
  id: 'f_pasta',
  n: 'Pasta di semola (cruda)',
  cat: 'Carbo',
  p: 12,
  c: 71,
  f: 1.5
}, {
  id: 'f_pastaint',
  n: 'Pasta integrale (cruda)',
  cat: 'Carbo',
  p: 13,
  c: 64,
  f: 2.5
}, {
  id: 'f_paneint',
  n: 'Pane integrale',
  cat: 'Carbo',
  p: 9,
  c: 45,
  f: 2
}, {
  id: 'f_pane',
  n: 'Pane bianco',
  cat: 'Carbo',
  p: 8,
  c: 55,
  f: 2
}, {
  id: 'f_avena',
  n: 'Avena / fiocchi',
  cat: 'Carbo',
  p: 13,
  c: 62,
  f: 7
}, {
  id: 'f_patate',
  n: 'Patate',
  cat: 'Carbo',
  p: 2,
  c: 17,
  f: 0.1
}, {
  id: 'f_patatedolci',
  n: 'Patate dolci',
  cat: 'Carbo',
  p: 1.6,
  c: 20,
  f: 0.1
}, {
  id: 'f_couscous',
  n: 'Cous cous (crudo)',
  cat: 'Carbo',
  p: 12,
  c: 72,
  f: 1
}, {
  id: 'f_farro',
  n: 'Farro perlato (crudo)',
  cat: 'Carbo',
  p: 12,
  c: 70,
  f: 2
}, {
  id: 'f_lenticchie',
  n: 'Lenticchie cotte / scatola',
  cat: 'Carbo',
  p: 9,
  c: 17,
  f: 0.5
}, {
  id: 'f_ceci',
  n: 'Ceci in scatola (sgocc.)',
  cat: 'Carbo',
  p: 7,
  c: 16,
  f: 3
}, {
  id: 'f_fagioli',
  n: 'Fagioli borlotti (scatola)',
  cat: 'Carbo',
  p: 7,
  c: 15,
  f: 0.6
}, {
  id: 'f_gallette',
  n: 'Gallette di riso',
  cat: 'Carbo',
  p: 8,
  c: 81,
  f: 1,
  nota: '1 galletta ≈ 8 g'
}, {
  id: 'f_crackerint',
  n: 'Cracker integrali',
  cat: 'Carbo',
  p: 10,
  c: 65,
  f: 12
},
// --- FRUTTA ---
{
  id: 'f_banana',
  n: 'Banana',
  cat: 'Frutta',
  p: 1.1,
  c: 23,
  f: 0.3,
  nota: '1 media ≈ 120 g sbucciata'
}, {
  id: 'f_mela',
  n: 'Mela',
  cat: 'Frutta',
  p: 0.3,
  c: 14,
  f: 0.2
}, {
  id: 'f_frutbosco',
  n: 'Frutti di bosco',
  cat: 'Frutta',
  p: 1,
  c: 8,
  f: 0.4
}, {
  id: 'f_arancia',
  n: 'Arancia',
  cat: 'Frutta',
  p: 0.9,
  c: 12,
  f: 0.1
}, {
  id: 'f_kiwi',
  n: 'Kiwi',
  cat: 'Frutta',
  p: 1.1,
  c: 15,
  f: 0.5
}, {
  id: 'f_ananas',
  n: 'Ananas',
  cat: 'Frutta',
  p: 0.5,
  c: 13,
  f: 0.1
}, {
  id: 'f_pesca',
  n: 'Pesca / albicocca',
  cat: 'Frutta',
  p: 0.9,
  c: 10,
  f: 0.2
},
// --- VERDURA ---
{
  id: 'f_zucchine',
  n: 'Zucchine',
  cat: 'Verdura',
  p: 1.3,
  c: 3,
  f: 0.3
}, {
  id: 'f_broccoli',
  n: 'Broccoli',
  cat: 'Verdura',
  p: 2.8,
  c: 7,
  f: 0.4
}, {
  id: 'f_spinaci',
  n: 'Spinaci',
  cat: 'Verdura',
  p: 2.9,
  c: 3.6,
  f: 0.4
}, {
  id: 'f_insalata',
  n: 'Insalata mista',
  cat: 'Verdura',
  p: 1.5,
  c: 2.5,
  f: 0.2
}, {
  id: 'f_pomodori',
  n: 'Pomodori',
  cat: 'Verdura',
  p: 0.9,
  c: 3.9,
  f: 0.2
}, {
  id: 'f_cetrioli',
  n: 'Cetrioli',
  cat: 'Verdura',
  p: 0.7,
  c: 3.6,
  f: 0.1
}, {
  id: 'f_peperoni',
  n: 'Peperoni',
  cat: 'Verdura',
  p: 1,
  c: 6,
  f: 0.3
}, {
  id: 'f_fagiolini',
  n: 'Fagiolini',
  cat: 'Verdura',
  p: 1.8,
  c: 7,
  f: 0.1
}, {
  id: 'f_melanzane',
  n: 'Melanzane',
  cat: 'Verdura',
  p: 1,
  c: 6,
  f: 0.2
}, {
  id: 'f_carote',
  n: 'Carote',
  cat: 'Verdura',
  p: 0.9,
  c: 10,
  f: 0.2
}, {
  id: 'f_funghi',
  n: 'Funghi champignon',
  cat: 'Verdura',
  p: 3,
  c: 3,
  f: 0.3
}, {
  id: 'f_cavolfiore',
  n: 'Cavolfiore',
  cat: 'Verdura',
  p: 1.9,
  c: 5,
  f: 0.3
},
// --- GRASSI ---
{
  id: 'f_evo',
  n: 'Olio EVO',
  cat: 'Grassi',
  p: 0,
  c: 0,
  f: 100,
  nota: '1 cucchiaio ≈ 10 g'
}, {
  id: 'f_mandorle',
  n: 'Mandorle',
  cat: 'Grassi',
  p: 21,
  c: 22,
  f: 50
}, {
  id: 'f_noci',
  n: 'Noci',
  cat: 'Grassi',
  p: 15,
  c: 14,
  f: 65
}, {
  id: 'f_burroarach',
  n: 'Burro di arachidi 100%',
  cat: 'Grassi',
  p: 25,
  c: 20,
  f: 50
}, {
  id: 'f_avocado',
  n: 'Avocado',
  cat: 'Grassi',
  p: 2,
  c: 9,
  f: 15
}, {
  id: 'f_chia',
  n: 'Semi di chia',
  cat: 'Grassi',
  p: 17,
  c: 42,
  f: 31
}, {
  id: 'f_fondente',
  n: 'Cioccolato fondente 85%',
  cat: 'Grassi',
  p: 10,
  c: 19,
  f: 46
},
// --- INTEGRATORI / ALTRO ---
{
  id: 'f_wheyiso',
  n: 'Whey isolate (polvere)',
  cat: 'Integratori',
  p: 86,
  c: 4,
  f: 1,
  nota: '1 misurino ≈ 30 g'
}, {
  id: 'f_wheyconc',
  n: 'Whey concentrate (polvere)',
  cat: 'Integratori',
  p: 78,
  c: 7,
  f: 6
}, {
  id: 'f_caseine',
  n: 'Caseine micellari',
  cat: 'Integratori',
  p: 78,
  c: 7,
  f: 3
}, {
  id: 'f_miele',
  n: 'Miele',
  cat: 'Integratori',
  p: 0.3,
  c: 82,
  f: 0,
  nota: '1 cucchiaino ≈ 7 g'
}, {
  id: 'f_malto',
  n: 'Maltodestrine',
  cat: 'Integratori',
  p: 0,
  c: 95,
  f: 0
}, {
  id: 'f_marmzero',
  n: 'Marmellata senza zuccheri',
  cat: 'Integratori',
  p: 0.5,
  c: 30,
  f: 0.2
}, {
  id: 'f_cacao',
  n: 'Cacao amaro in polvere',
  cat: 'Integratori',
  p: 20,
  c: 15,
  f: 22
}, {
  id: 'f_bevsoia',
  n: 'Bevanda soia non zuccherata',
  cat: 'Integratori',
  p: 3.3,
  c: 0.5,
  f: 1.8
}, {
  id: 'f_zucchero',
  n: 'Zucchero',
  cat: 'Integratori',
  p: 0,
  c: 100,
  f: 0
}];
const FOOD_BY_ID = {};
FOOD_DB.forEach(f => {
  FOOD_BY_ID[f.id] = f;
});
const FOOD_CATS = ['Proteine', 'Latticini', 'Carbo', 'Frutta', 'Verdura', 'Grassi', 'Integratori'];

// ============================================================
// V10 · CALCOLO MACRO
// ============================================================
const kcalOf = (p, c, f) => Math.round(p * 4 + c * 4 + f * 9);

// Macro per 100 g di un item (ref al DB oppure alimento personalizzato)
const per100Of = item => {
  if (item.per100) return item.per100;
  const f = FOOD_BY_ID[item.ref];
  return f ? {
    p: f.p,
    c: f.c,
    f: f.f
  } : {
    p: 0,
    c: 0,
    f: 0
  };
};
const nameOf = item => item.name || (FOOD_BY_ID[item.ref] ? FOOD_BY_ID[item.ref].n : 'Alimento');

// Macro effettivi di un item dati i grammi
const macrosOf = item => {
  const per = per100Of(item);
  const g = parseFloat(item.g) || 0;
  const p = per.p * g / 100,
    c = per.c * g / 100,
    f = per.f * g / 100;
  return {
    p,
    c,
    f,
    kcal: p * 4 + c * 4 + f * 9
  };
};
const sumMacros = items => items.reduce((a, it) => {
  const m = macrosOf(it);
  return {
    p: a.p + m.p,
    c: a.c + m.c,
    f: a.f + m.f,
    kcal: a.kcal + m.kcal
  };
}, {
  p: 0,
  c: 0,
  f: 0,
  kcal: 0
});
const dietTotals = diet => sumMacros((diet.meals || []).reduce((a, m) => a.concat(m.items || []), []));
const r0 = n => Math.round(n);
const r1 = n => Math.round(n * 10) / 10;

// Scarica un file generato al volo (usato per export .v8w / .v8d / lista spesa)
const downloadFile = (filename, text, mime) => {
  try {
    const blob = new Blob([text], {
      type: mime || 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  } catch (e) {
    return false;
  }
};
const copyText = t => {
  try {
    navigator.clipboard.writeText(t);
    return true;
  } catch (e) {
    return false;
  }
};
