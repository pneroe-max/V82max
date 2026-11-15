"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useContext = _React.useContext,
  createContext = _React.createContext,
  useCallback = _React.useCallback;

// ============= DATABASE TECNICHE (cliccabili da qualsiasi pagina) =============
const TECH_INFO = {
  'C': {
    badge: 'C',
    name: 'Compound principale',
    desc: 'Esercizio multi-articolare di base che rimane fisso per tutte le 8 settimane. Cambia solo carico e rep, non l\'esercizio. Necessario per applicare la double progression in modo affidabile e per misurare i progressi del ciclo.',
    when: 'Tutto il ciclo. Mai sostituirli con varianti.'
  },
  'SMH': {
    badge: 'SMH',
    name: 'Stretch-Mediated Hypertrophy',
    desc: 'Esecuzione che enfatizza la posizione di stretch del muscolo. ROM esteso, pausa 1 sec nella posizione di massimo allungamento. Maeo 2023, Kassiano 2024, Beardsley 2024: produce fascicle lengthening. Eccezioni: gluteo e trapezio rispondono meglio alla contrazione.',
    when: 'Croci cavi, tricipiti overhead, curl inclinato, RDL, leg ext.'
  },
  'LLP': {
    badge: 'LLP',
    name: 'Long-Length Partials',
    desc: 'Dopo cedimento ROM pieno, continui per 5-8 rep solo nella metà bassa. Goto 2017: +48% CSA tricipite. Sato 2021: ~3× ipertrofia bicipite. Solo isolamento, MAI sui compound.',
    when: 'Ultimo set di leg ext, curl preacher, tricipiti overhead.'
  },
  'MYO': {
    badge: 'MYO',
    name: 'Myo-reps cluster',
    desc: 'Set attivazione 12-15 rep RIR 0-1 → riposo 15-30s → mini-set 3-5 rep × 3-4 volte. Borge Fagerli, validato Helms 2017. Equivalente a set tradizionali con 30-40% meno tempo.',
    when: 'Finisher di muscoli piccoli (laterali, polpacci, pushdown).'
  },
  'ECC': {
    badge: 'ECC',
    name: 'Eccentric emphasis',
    desc: 'Discesa controllata 2-3 secondi. Schoenfeld 2017: produce più danno miofibrillare e attivazione mTOR vs eccentrica veloce.',
    when: 'Default sui compound (bench, squat, RDL, dip, pull-up).'
  },
  'AMRAP': {
    badge: 'AMRAP',
    name: 'As Many Reps As Possible',
    desc: 'Ultimo set massimo numero rep a RIR 0 con carico sub-massimale. Stima 1RM via Epley: peso × (1 + reps/30). Affidabile 3-10 rep.',
    when: 'SOLO sett 8 del Blocco C, SOLO sui 5 compound principali.'
  },
  'ROT-A': {
    badge: 'ROT-A',
    name: 'Rotazione bisettimanale A/B',
    desc: 'Compound fissi 8 settimane. Accessori (1-2 per giorno) ruotano: ROT-A su sett 1-3-5-7, ROT-B su sett 2-4-6-8. Mantiene specificità motoria + varietà stimolo (Fonseca 2014, Baz-Valle 2019).',
    when: 'Solo dove indicato come "ROT-A / ROT-B" nelle schede.'
  },
  'ROT-B': {
    badge: 'ROT-B',
    name: 'Rotazione bisettimanale A/B',
    desc: 'Compound fissi 8 settimane. Accessori (1-2 per giorno) ruotano: ROT-A su sett 1-3-5-7, ROT-B su sett 2-4-6-8. Mantiene specificità motoria + varietà stimolo (Fonseca 2014, Baz-Valle 2019).',
    when: 'Solo dove indicato come "ROT-A / ROT-B" nelle schede.'
  }
};

// Hook per gestire il tasto indietro hardware Android.
// Ogni schermata interna chiama useAndroidBack(goBack), che:
//  1) al mount, fa history.pushState (così c'è un entry da poppare)
//  2) ascolta popstate: quando l'utente preme back, chiama goBack()
//  3) al unmount, rimuove il listener
// BackStack globale: LIFO di handler. Il TOP riceve il prossimo back.
// Schermate interne e modal pushano un handler quando si aprono e lo poppano quando si chiudono.
// Un solo listener popstate a livello globale, niente race condition.
const BackStackContext = createContext(null);

// Hook: registra un handler quando 'enabled' è true. Quando enabled diventa false o il componente smonta,
// l'handler viene rimosso. Quando l'utente preme back e l'handler è in cima allo stack, viene chiamato.
function useAndroidBack(handler) {
  let enabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  const ctx = useContext(BackStackContext);
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);
  useEffect(() => {
    if (!enabled || !ctx) return;
    const id = ctx.pushHandler(() => handlerRef.current && handlerRef.current());
    return () => ctx.popHandler(id);
  }, [enabled, ctx]);
}
