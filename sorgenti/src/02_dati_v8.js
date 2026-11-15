// ============= DATA — V8 ESERCIZI CON DESCRIZIONI =============
const EXERCISES = {
  push: [{
    id: 'lun_1',
    name: 'Bench DB inclinato 30°',
    sets: 4,
    reps: '8-10',
    rir: '2-3',
    rest: '3:00',
    isCompound: true,
    tags: ['PETTO', 'D.ANT'],
    badges: ['C', 'ECC'],
    shortNote: "Fisso 8 sett. Eccentrica 2-3 sec, fermo 1 sec petto. Angolo 30° = fibre clavicolari (Rodríguez-Ridao 2020).",
    execution: ["Imposta panca a 30° (più alto = più spalle, meno petto)", "Manubri sopra le spalle con presa neutra leggermente prona", "Eccentrica controllata 2-3 secondi fino a sfiorare il petto alto", "Fermo 1 secondo nella posizione bassa per stretch", "Spinta esplosiva senza bloccare i gomiti", "Scapole retratte e depresse per tutta la serie"],
    cues: "I gomiti scendono leggermente sotto il livello della panca. Niente arco lombare eccessivo."
  }, {
    id: 'lun_2',
    name: 'Military press DB seduto panca recl. 80°',
    sets: 3,
    reps: '8-10',
    rir: '2',
    rest: '2:30',
    isCompound: true,
    tags: ['D.ANT', 'D.MED'],
    badges: ['C'],
    shortNote: "Schiena protetta. Manubri = ROM più naturale del bilanciere a spalla.",
    execution: ["Panca reclinabile a 80° (quasi verticale)", "Manubri partenza all'altezza delle spalle, gomiti sotto i polsi", "Spinta verso l'alto seguendo arco naturale", "Manubri si avvicinano in alto senza scontrarsi", "Eccentrica controllata, niente rimbalzi"],
    cues: "Niente iperestensione lombare. Core attivo. Gomiti puntati a 30° dal corpo, non a 90°."
  }, {
    id: 'lun_3',
    name: 'Croci cavi (ROT-A bassi-in-alto / ROT-B alti-in-basso)',
    sets: 3,
    reps: '10-12',
    rir: '1-2',
    rest: '90s',
    isCompound: false,
    tags: ['PETTO'],
    badges: ['SMH', 'ROT-A', 'ROT-B'],
    shortNote: "Estensione completa, gomiti oltre tronco. Pec major risponde a stretch (Beardsley 2024).",
    execution: ["ROT-A (sett 1-3-5-7): cavi da bassi verso l'alto = enfasi clavicolare", "ROT-B (sett 2-4-6-8): cavi da alti verso il basso = enfasi sternale", "Gomiti leggermente flessi e bloccati per tutta la rep", "Apertura controllata fino a sentire stretch", "Pausa 1 sec nel massimo allungamento", "Chiusura senza far toccare le mani"],
    cues: "Movimento dalle spalle, non dalle braccia. Niente kickback con i pesi."
  }, {
    id: 'lun_4',
    name: 'Lateral raise cavo single-arm cross-body',
    sets: 4,
    reps: '10-12',
    rir: '1-2',
    rest: '75s',
    isCompound: false,
    tags: ['D.MED'],
    badges: ['SMH'],
    shortNote: "Cavo dietro la coscia opposta = ROM esteso. Larsen 2020. No momentum.",
    execution: ["Cavo basso, cavo passa dietro la gamba opposta", "Partenza con braccio incrociato davanti al corpo", "Salita laterale fino all'altezza della spalla", "Pausa 1 sec in alto, eccentrica controllata 2 sec", "Spalla bassa per tutta la serie"],
    cues: "Niente body english (oscillazione del busto). Polso neutro o leggermente verso il basso."
  }, {
    id: 'lun_5',
    name: 'Tricipiti corda overhead',
    sets: 3,
    reps: '9-11',
    rir: '1-2',
    rest: '75s',
    isCompound: false,
    tags: ['TRI'],
    badges: ['SMH', 'LLP'],
    shortNote: "Long head in stretch massimo. Maeo 2023: +40% CSA capo lungo. Ultime rep LLP solo metà bassa.",
    execution: ["Corda al cavo basso, dorsi alla puleggia", "Gomiti puntati in avanti e fermi ai lati della testa", "Estensione completa sopra la testa", "Stretch profondo nella discesa (capo lungo allungato)", "Ultima serie: dopo cedimento, 5-8 rep solo metà bassa (LLP)"],
    cues: "Solo gli avambracci si muovono. Gomiti immobili come cardini."
  }, {
    id: 'lun_6',
    name: 'ROT-A Pushdown corda / ROT-B Francese DB panca',
    sets: 2,
    reps: '10-12',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['TRI'],
    badges: ['MYO', 'SMH', 'ROT-A', 'ROT-B'],
    shortNote: "Finisher. Ultimo set myo-reps 12+4+3+3 (rest 15s) su ROT-A.",
    execution: ["ROT-A: pushdown corda con apertura finale, gomiti ai fianchi", "ROT-B: francese DB su panca, gomiti puntati al soffitto, eccentrica 2 sec", "Ultimo set ROT-A: 12 rep RIR 0 → riposo 15s → 4 rep → 15s → 3 rep → 15s → 3 rep", "Pump finale, no aggiunta carico"],
    cues: "Gomiti immobili anche qui. Stretch profondo soprattutto sul francese."
  }],
  pull: [{
    id: 'mar_1',
    name: 'Pull-up zavorrato (rack a muro) o lat pulldown',
    sets: 4,
    reps: '7-9',
    rir: '2',
    rest: '3:00',
    isCompound: true,
    tags: ['DORSO', 'BI'],
    badges: ['C', 'SMH'],
    shortNote: "Fisso 8 sett. Dead hang fine rep = stretch lat. Se <6 rep BW: lat pulldown progression.",
    execution: ["Presa larga prona o neutra (cintura zavorra se >6 rep BW)", "Partenza dead hang con scapole rilassate (stretch lat)", "Tirata fino a portare il petto alla barra", "Eccentrica controllata 2-3 sec fino a dead hang completo", "Niente kipping o slancio"],
    cues: "Pensa a 'tirare i gomiti verso le tasche posteriori'. Petto in fuori a fine rep."
  }, {
    id: 'mar_2',
    name: 'Rematore bilanciere busto 45°',
    sets: 4,
    reps: '8-10',
    rir: '2',
    rest: '2:30',
    isCompound: true,
    tags: ['DORSO', 'D.POST'],
    badges: ['C', 'ECC'],
    shortNote: "Fisso 8 sett. Eccentrica 3 sec. Spessore dorsali medi + trapezi medi/bassi.",
    execution: ["Busto inclinato a 45° (non parallelo a terra)", "Presa larghezza spalle, prona", "Tirata verso ombelico/basso ventre (non al petto)", "Squeeze 1 sec in contrazione", "Eccentrica 3 sec controllata"],
    cues: "Schiena neutra, niente curva lombare. Gomiti scorrono lungo i fianchi."
  }, {
    id: 'mar_3',
    name: 'Pullover cavi alti braccia tese',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '90s',
    isCompound: false,
    tags: ['DORSO'],
    badges: ['SMH'],
    shortNote: "Lat in stretch massimo. Vartanian 2023: fascicle lengthening > pulldown.",
    execution: ["Cavo alto, corda o sbarra dritta", "Braccia tese (gomito leggermente flesso e bloccato)", "Partenza con braccia in alto (stretch lat)", "Tirata con archi delle spalle fino alle cosce", "Eccentrica lenta tornando in stretch completo"],
    cues: "Niente pieghe del gomito durante la rep. È un movimento di estensione di spalla puro."
  }, {
    id: 'mar_4',
    name: 'Reverse fly cavi',
    sets: 3,
    reps: '10-12',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['D.POST'],
    badges: ['SMH'],
    shortNote: "Posteriori: volume + freq alta. Inizio braccia incrociate al petto = stretch iniziale.",
    execution: ["Cavi all'altezza delle spalle, presa incrociata", "Partenza con braccia incrociate davanti al petto (stretch deltoide post)", "Apertura laterale gomiti leggermente flessi", "Pausa 1 sec a fine ROM", "Ritorno controllato fino a stretch"],
    cues: "Movimento dalle spalle, niente squeeze trapezi. Gomiti più alti dei polsi."
  }, {
    id: 'mar_5',
    name: 'Curl bicipiti (ROT-A inclinato 60° / ROT-B Bayesian cavo)',
    sets: 3,
    reps: '9-11',
    rir: '1',
    rest: '90s',
    isCompound: false,
    tags: ['BI'],
    badges: ['SMH', 'LLP', 'ROT-A', 'ROT-B'],
    shortNote: "Capo lungo bicipite in stretch (Oliveira 2009). LLP ultime rep su ROT-A.",
    execution: ["ROT-A: curl DB su panca inclinata 60°, braccia che cadono dietro = stretch capo lungo", "ROT-B: Bayesian curl monolaterale al cavo, cavo dietro corpo = stretch ancora maggiore", "Eccentrica 2 sec, no momentum", "Ultima serie ROT-A: 5-8 rep LLP solo metà bassa post-cedimento"],
    cues: "Spalle in posizione anatomica neutra. Niente front raise (gomiti che vanno avanti)."
  }, {
    id: 'mar_6',
    name: 'Curl panca Scott con EZ',
    sets: 2,
    reps: '9-11',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['BI'],
    badges: ['LLP'],
    shortNote: "Bottom-half partial Sato 2021: 3× ipertrofia vs top-half. Ultimo set LLP.",
    execution: ["Scott bench, ascelle ben appoggiate", "Bilanciere EZ presa standard", "Ascesa fino a 90° (no oltre, perde tensione)", "Discesa controllata fino a stretch quasi completo", "Ultimo set: post cedimento, 5-8 rep solo metà bassa (LLP)"],
    cues: "Niente apertura della spalla. Polsi neutri."
  }],
  legs: [{
    id: 'gio_1',
    name: 'Squat bilanciere ROM pieno (rack a muro)',
    sets: 4,
    reps: '7-9',
    rir: '2-3',
    rest: '3:30',
    isCompound: true,
    tags: ['QUAD', 'GLUTE'],
    badges: ['C', 'SMH'],
    shortNote: "Fisso 8 sett. Coscia sotto parallelo (Kubo 2019). Safety bar a muro per RIR basso senza spotter.",
    execution: ["Rack a muro a livello clavicole, safety bar appena sotto profondità target", "Stance media (poco più larga delle spalle), punte 15-30° fuori", "Bilanciere su trapezi medi-bassi", "Discesa controllata 2-3 sec, coscia sotto parallelo", "Spinta dai talloni, ginocchia che seguono punte piedi"],
    cues: "Petto alto, schiena neutra. Niente collasso ginocchia interne. Respira in alto, blocca, scendi."
  }, {
    id: 'gio_2',
    name: 'Stacco rumeno bilanciere',
    sets: 4,
    reps: '8-10',
    rir: '2',
    rest: '3:00',
    isCompound: true,
    tags: ['HAM', 'GLUTE'],
    badges: ['C', 'SMH', 'ECC'],
    shortNote: "Fisso 8 sett. Re hamstring (Maeo 2024: 2× ipertrofia vs contracted-position). Ecc 3 sec.",
    execution: ["Stance anche, presa prona poco più larga delle spalle", "Ginocchia leggermente flesse (15°) e bloccate", "Hip hinge: anche indietro, schiena neutra", "Discesa fino a metà tibia o quando i femorali bloccano (stretch profondo)", "Eccentrica 3 sec, salita esplosiva"],
    cues: "Bilanciere scivola lungo le cosce. Petto in fuori. Niente piegamento ginocchia tipo squat."
  }, {
    id: 'gio_3',
    name: 'Affondo bulgaro manubri (sostituto pressa)',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '2:00',
    isCompound: true,
    tags: ['QUAD', 'GLUTE'],
    badges: ['SMH'],
    shortNote: "Quad-dominant unilaterale. Sostituisce la pressa 45° (non in dotazione). Rep PER GAMBA.",
    execution: ["Piede posteriore appoggiato sulla panca dietro di te", "Manubri ai lati del corpo, busto leggermente avanti", "Scendi finché la coscia anteriore è sotto il parallelo", "Spingi col tallone della gamba anteriore", "Completa tutte le rep su una gamba, poi cambia"],
    cues: "Profondità massima = più stretch del quad. Ginocchio segue la punta del piede, non cede dentro."
  }, {
    id: 'gio_4',
    name: 'Leg curl seduto',
    sets: 3,
    reps: '10-12',
    rir: '1',
    rest: '2:00',
    isCompound: false,
    tags: ['HAM'],
    badges: ['SMH', 'ECC'],
    shortNote: "Maeo 2021: seduto > sdraiato (stretch passivo migliore biceps femoris).",
    execution: ["Schienale seduto regolato, ginocchia allineate al perno", "Schiena premuta contro lo schienale per tutto il movimento", "Flessione completa fino a 90°+ (squeeze hamstring)", "Eccentrica 3 sec lenta", "ROM completo, niente mezzi rep"],
    cues: "Polpacci che cadono, niente flessione attiva del piede. Punte leggermente in dorsiflessione."
  }, {
    id: 'gio_5',
    name: 'Hip thrust bilanciere (panca piana come appoggio)',
    sets: 3,
    reps: '8-10',
    rir: '2',
    rest: '2:30',
    isCompound: true,
    tags: ['GLUTE'],
    badges: ['C'],
    shortNote: "Fisso 8 sett. Pausa 1 sec contrazione. Gluteo max risponde a contrazione (Kassiano 2024).",
    execution: ["Schiena su panca piana, scapole appoggiate al bordo", "Bilanciere su anche con padding", "Piedi piatti, ginocchia 90° in cima", "Spinta dai talloni, anche fino alla linea retta spalle-ginocchia", "Pausa 1 sec contrazione massima (squeeze glutei)"],
    cues: "Niente iperestensione lombare in cima. Mento al petto. È glutei NON lombari."
  }, {
    id: 'gio_6',
    name: 'Standing calf raise (DB o macchina)',
    sets: 3,
    reps: '8-10',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['POLP'],
    badges: ['SMH'],
    shortNote: "Stretch sotto gradino 2 sec. Gastrocnemio richiede stretch profondo (Maeo 2024).",
    execution: ["Avampiede su gradino o disco, talloni nel vuoto", "Ginocchia tese (gastrocnemio attivo)", "Discesa lenta 2 sec fino a stretch massimo", "Pausa 1 sec in stretch", "Salita controllata fino a estensione massima caviglia"],
    cues: "Niente molleggio. ROM completo, lo stretch è dove cresce il muscolo."
  }],
  upper: [{
    id: 'ven_1',
    name: 'Panca piana bilanciere',
    sets: 4,
    reps: '7-9',
    rir: '2',
    rest: '3:00',
    isCompound: true,
    tags: ['PETTO', 'TRI'],
    badges: ['C', 'ECC'],
    shortNote: "Fisso 8 sett. Complementare all'inclinato di lunedì. Scapole retratte e depresse.",
    execution: ["Panca piana, occhi sotto il bilanciere allo stacco", "Presa poco più larga delle spalle", "Scapole retratte e depresse, leggero arco lombare naturale", "Discesa al centro del petto eccentrica 2 sec", "Spinta esplosiva, traiettoria leggermente diagonale verso le spalle"],
    cues: "Gomiti a 60° dal corpo (non 90°). Tutto in tensione: glutei, dorsali, gambe."
  }, {
    id: 'ven_2',
    name: 'Lat pulldown presa neutra larga',
    sets: 3,
    reps: '9-11',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['DORSO', 'BI'],
    badges: ['C'],
    shortNote: "Fisso 8 sett. Seconda dose dorsali pattern verticale. Tirare al petto alto.",
    execution: ["Sbarra a presa neutra (palmi che si guardano) larga", "Cosce sotto i fermi, busto leggermente inclinato (10°)", "Tirata al petto alto, gomiti puntati al pavimento", "Squeeze 1 sec in contrazione", "Risalita controllata fino a stretch lat completo"],
    cues: "Pensa al petto che 'va incontro alla sbarra', non alle braccia che tirano."
  }, {
    id: 'ven_3',
    name: 'Spinta complementare (ROT-A Dip parallele zavorrato / ROT-B DB press declinata)',
    sets: 3,
    reps: '8-10',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['PETTO', 'TRI'],
    badges: ['C', 'SMH', 'ROT-A', 'ROT-B'],
    shortNote: "Busto inclinato avanti = petto + tricipiti. Stretch petto inferiore.",
    execution: ["ROT-A (sett 1-3-5-7): Dip parallele con cintura zavorra. Busto inclinato 30° avanti = petto-dominant. Discesa fino a stretch profondo, salita senza bloccare gomiti", "ROT-B (sett 2-4-6-8): DB press su panca declinata inversa (testa in alto, piedi in basso). ROM esteso, eccentrica 2 sec", "Entrambi: stretch enfatizzato in fondo"],
    cues: "ROT-A: niente tilt avanti-indietro a metà rep. ROT-B: niente arco lombare eccessivo."
  }, {
    id: 'ven_4',
    name: 'Face pull cavi alti corda',
    sets: 3,
    reps: '12-15',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.POST'],
    badges: [],
    shortNote: "Salute spalla con 5 WO/sett. Sopra-spinoso + rotatori esterni. Gomiti più alti delle mani.",
    execution: ["Cavo alto, corda con presa prona", "Tirata verso il viso (fronte/occhi)", "Gomiti più alti delle mani durante tutta la rep", "Apertura corda massima a fine ROM (rotazione esterna)", "Ritorno controllato"],
    cues: "Posa finale: come un 'doppio bicipite'. Squeeze tra le scapole."
  }, {
    id: 'ven_5',
    name: 'Curl cavo + Hammer DB superset',
    sets: 3,
    reps: '10+8',
    rir: '0-1',
    rest: '90s',
    isCompound: false,
    tags: ['BI', 'AVB'],
    badges: ['MYO'],
    shortNote: "Curl cavo (long head) → hammer DB (brachiale + brachioradiale) senza pausa.",
    execution: ["A: curl al cavo basso 10 rep RIR 1", "Subito (no pausa): B: hammer curl DB 8 rep RIR 0", "Riposo 90s, ripetere 3 volte", "Hammer = presa neutra (palmi che si guardano)"],
    cues: "Sul cavo: gomiti incollati ai fianchi. Sull'hammer: niente swing."
  }, {
    id: 'ven_6',
    name: 'Tricipiti francese DB panca',
    sets: 2,
    reps: '9-11',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['TRI'],
    badges: ['SMH'],
    shortNote: "Long head dietro testa = stretch capo lungo. Seconda dose tricipiti.",
    execution: ["Sdraiato su panca piana, manubrio in alto", "Gomiti puntati al soffitto, fissi", "Discesa controllata dietro la testa (stretch profondo)", "Estensione fino a quasi blocco gomito", "Solo gli avambracci si muovono"],
    cues: "Niente apertura dei gomiti. Se non riesci a tenerli fermi, il peso è troppo."
  }],
  full: [{
    id: 'sab_1',
    name: 'Affondo bulgaro o hack squat (quad refresh)',
    sets: 3,
    reps: '12-15',
    rir: '1-2',
    rest: '2:00',
    isCompound: false,
    tags: ['QUAD'],
    badges: ['SMH'],
    shortNote: "48h post-Legs. Pump + stretch, no cedimento. Recupero attivo.",
    execution: ["Affondo bulgaro leggero o hack squat", "Carico ridotto rispetto al giovedì", "Focus pump + ROM, NON cedimento", "Eccentrica 2 sec controllata"],
    cues: "Sentire il quad lavorare, non distruggerlo. RIR onesto."
  }, {
    id: 'sab_2',
    name: 'Rear delt fly DB (weak point)',
    sets: 3,
    reps: '10-12',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.POST'],
    badges: ['SMH'],
    shortNote: "Posteriori → terza dose settimanale. Volume alto + RIR basso.",
    execution: ["Busto inclinato 90° in avanti, schiena neutra", "Manubri partono incrociati davanti (stretch deltoide post)", "Apertura laterale, gomiti leggermente flessi", "Pausa 1 sec a fine ROM", "Ritorno controllato"],
    cues: "Pollici verso il basso a fine rep aiuta a isolare il deltoide post."
  }, {
    id: 'sab_3',
    name: 'Lateral raise leaning-away cavo (weak)',
    sets: 3,
    reps: '10-12',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.MED'],
    badges: ['SMH'],
    shortNote: "Inclinato lateralmente = +ROM effettiva deltoide mediale (Larsen 2020).",
    execution: ["Cavo basso, mano libera che tiene la macchina", "Inclinarsi lateralmente verso il cavo (corpo a 70° dal terreno)", "Salita laterale fino all'altezza spalla", "ROM esteso grazie all'inclinazione = +32% rispetto a posizione neutra", "Eccentrica 2 sec"],
    cues: "Spalla del braccio attivo bassa. Niente trapezio dominante."
  }, {
    id: 'sab_4',
    name: 'Preacher curl EZ',
    sets: 2,
    reps: '9-11',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['BI'],
    badges: ['LLP'],
    shortNote: "Bottom-half partial Sato 2021. Ultimo set LLP solo metà bassa.",
    execution: ["Scott bench, ascelle ben appoggiate", "Bilanciere EZ presa standard", "ROM controllato, no oltre 90° (perde tensione)", "Discesa fino a stretch quasi completo", "Ultimo set: 5-8 rep solo metà bassa (LLP)"],
    cues: "Polsi neutri. Niente apertura spalla per 'aiutarsi'."
  }, {
    id: 'sab_5',
    name: 'Ab wheel rollout o leg raise sospeso',
    sets: 2,
    reps: '10-12',
    rir: '1',
    rest: '75s',
    isCompound: false,
    tags: ['CORE'],
    badges: [],
    shortNote: "Core anti-estensione (rollout) o anti-flessione (leg raise). Addominali visibili in cutting.",
    execution: ["Ab wheel: ginocchia o piedi, rullio fino a stretch addome (anti-estensione)", "Leg raise sospeso: braccia fisse alla sbarra, gambe tese alzate (anti-flessione)", "ROM completo, controllo", "Glutei contratti per evitare iperlordosi"],
    cues: "Lombare sempre piatta o leggermente flessa. Mai inarcare."
  }, {
    id: 'sab_6',
    name: 'Seated calf raise (soleo)',
    sets: 2,
    reps: '10-12',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['POLP'],
    badges: [],
    shortNote: "Ginocchio piegato isola soleo. Maeo 2024: soleo richiede volume alto.",
    execution: ["Macchina seated calf, ginocchia 90°", "Avampiede su gradino, talloni nel vuoto", "Discesa lenta fino a stretch", "Pausa 1 sec in stretch", "Salita controllata fino a max contrazione"],
    cues: "Niente bouncing. Soleo è prevalentemente fibre lente, ama tempo sotto tensione."
  }, {
    id: 'sab_7',
    name: 'Nordic curl (caviglie sotto lat machine)',
    sets: 2,
    reps: '6-10',
    rir: '1-2',
    rest: '2:00',
    isCompound: false,
    tags: ['HAM'],
    badges: ['SMH'],
    shortNote: "NEW V8.3.4 — porta gli hamstring 7→9 set. Andrews 2024: sarcomerogenesi nel bicipite femorale.",
    execution: ["In ginocchio, caviglie ancorate sotto il poggia-ginocchia della lat machine (o sotto un bilanciere zavorrato)", "Busto e cosce in linea, glutei contratti", "Scendi controllando l'eccentrica 3-4 sec il più possibile", "Spingi con le mani a terra solo per risalire", "Se 6 rep complete sono troppe, fai eccentriche assistite"],
    cues: "Tutto il lavoro è nell'eccentrica lenta. Non lasciarti cadere: resisti."
  }, {
    id: 'sab_8',
    name: 'Hip thrust bilanciere (2ª dose glutei)',
    sets: 2,
    reps: '12-15',
    rir: '1',
    rest: '2:00',
    isCompound: false,
    tags: ['GLUTE'],
    badges: [],
    shortNote: "NEW V8.3.4 — porta i glutei 7→9 set. Krause Neto 2025: hip thrust prioritario per il gluteo.",
    execution: ["Schiena appoggiata sulla panca piana", "Bilanciere sul bacino (usa un pad)", "Spingi coi talloni fino ad allineare anche-spalle-ginocchia", "Pausa 1 sec in massima contrazione", "Discesa controllata senza appoggiare a terra"],
    cues: "Mento al petto, costole basse. Spinta dai glutei, non dalla lombare."
  }]
};
const DAYS = [{
  id: 'push',
  label: 'PUSH',
  dayName: 'LUN',
  color: '#62BDB3',
  subtitle: 'Petto / Spalle / Tri',
  dur: '60-65 min'
}, {
  id: 'pull',
  label: 'PULL',
  dayName: 'MAR',
  color: '#86A8E6',
  subtitle: 'Dorsali / Bi / Posteriori',
  dur: '60-65 min'
}, {
  id: 'legs',
  label: 'LEGS',
  dayName: 'GIO',
  color: '#D9B25E',
  subtitle: 'Quad / Ham / Glute / Polp',
  dur: '75 min'
}, {
  id: 'upper',
  label: 'UPPER',
  dayName: 'VEN',
  color: '#6BBF8A',
  subtitle: 'Volume complementare',
  dur: '60-65 min'
}, {
  id: 'full',
  label: 'FULL/W',
  dayName: 'SAB',
  color: '#A893EC',
  subtitle: 'Punti deboli',
  dur: '50 min'
}];

// ===== PROGRAMMA ESTIVO (viaggio: solo manubri + panca, 3 settimane) =====
const SUMMER_DAYS = [{
  id: 's_upperA',
  label: 'UPPER',
  dayName: 'LUN/GIO',
  color: '#86A8E6',
  subtitle: 'Petto / Dorsali / Spalle / Braccia',
  dur: '~45 min'
}, {
  id: 's_lowerB',
  label: 'LOWER',
  dayName: 'MAR/VEN',
  color: '#D9B25E',
  subtitle: 'Quad / Ham / Glutei / Polpacci',
  dur: '~45 min'
}];
const SUMMER_EXERCISES = {
  s_upperA: [{
    id: 'su_1',
    name: 'Distensioni manubri panca piana',
    sets: 3,
    reps: '8-12',
    rir: '2',
    rest: '2:00',
    isCompound: true,
    tags: ['PETTO'],
    badges: [],
    shortNote: "Petto. Compound principale con manubri.",
    execution: ["Sdraiato su panca piana, manubri sopra il petto", "Discesa controllata, gomiti ~45° dal busto", "Fermo 1 sec al punto basso (stretch pettorale)", "Spingi fino quasi all'estensione completa"],
    cues: "Scapole retratte e depresse. Non far toccare i manubri in alto per mantenere tensione."
  }, {
    id: 'su_2',
    name: 'Rematore manubrio 1 braccio',
    sets: 3,
    reps: '8-12',
    rir: '2',
    rest: '2:00',
    isCompound: true,
    tags: ['DORSO'],
    badges: [],
    shortNote: "Dorsali. Ginocchio e mano sulla panca, ROM ampio.",
    execution: ["Ginocchio e mano dello stesso lato sulla panca", "Manubrio nella mano libera, braccio teso (stretch lat)", "Tira il manubrio verso il fianco/anca", "Eccentrica 2 sec controllata"],
    cues: "Tira col gomito, non con la mano. Niente rotazione del busto per 'aiutarsi'."
  }, {
    id: 'su_3',
    name: 'Distensioni manubri inclinata 30°',
    sets: 3,
    reps: '10-13',
    rir: '1-2',
    rest: '90s',
    isCompound: false,
    tags: ['PETTO'],
    badges: ['SMH'],
    shortNote: "Alto petto. Stretch enfatizzato in basso.",
    execution: ["Panca inclinata 30°, manubri sopra il petto alto", "Discesa controllata fino a stretch del pettorale superiore", "Spingi verso l'alto convergendo leggermente"],
    cues: "Non inclinare oltre i 30-45°: oltre diventa spalla-dominante."
  }, {
    id: 'su_4',
    name: 'Alzate laterali manubri',
    sets: 3,
    reps: '13-16',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['D.MED'],
    badges: ['SMH'],
    shortNote: "Deltoide medio. Controlla la discesa, no slancio.",
    execution: ["In piedi, manubri ai lati", "Salita laterale fino all'altezza spalla", "Leggera inclinazione del mignolo verso l'alto", "Eccentrica 2 sec"],
    cues: "Spalle basse, niente trapezio dominante. Il peso è secondario al controllo."
  }, {
    id: 'su_5',
    name: 'Curl martello manubri',
    sets: 2,
    reps: '11-13',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['BI'],
    badges: [],
    shortNote: "Bicipite + brachiale. Presa neutra.",
    execution: ["In piedi, manubri presa neutra (palmi affacciati)", "Curl mantenendo la presa neutra", "Squeeze in alto, eccentrica controllata"],
    cues: "Gomiti fissi ai fianchi. Niente swing del busto."
  }, {
    id: 'su_6',
    name: 'French press manubri su panca',
    sets: 2,
    reps: '11-13',
    rir: '0-1',
    rest: '75s',
    isCompound: false,
    tags: ['TRI'],
    badges: ['SMH'],
    shortNote: "Tricipiti, capo lungo in stretch dietro la testa.",
    execution: ["Sdraiato o seduto, manubri sopra la testa", "Gomiti fissi puntati in avanti/alto", "Discesa dietro la testa (stretch capo lungo)", "Estensione fino a quasi blocco gomito"],
    cues: "Solo gli avambracci si muovono. Gomiti che non si aprono."
  }, {
    id: 'su_7',
    name: 'Croci inverse (busto su inclinata)',
    sets: 2,
    reps: '16-20',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['D.POST'],
    badges: ['SMH'],
    shortNote: "Posteriori spalla. Petto appoggiato sull'inclinata.",
    execution: ["Petto appoggiato su panca inclinata 30°", "Manubri pendenti, partono incrociati (stretch)", "Apertura laterale, gomiti leggermente flessi", "Pausa 1 sec a fine ROM"],
    cues: "Pollici verso il basso a fine rep per isolare il posteriore."
  }],
  s_lowerB: [{
    id: 'sl_1',
    name: 'Affondo bulgaro manubri',
    sets: 3,
    reps: '10-13',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['QUAD', 'GLUTE'],
    badges: ['SMH'],
    shortNote: "Quad+gluteo. Rep PER GAMBA. Il tuo esercizio più prezioso coi manubri.",
    execution: ["Piede posteriore appoggiato sulla panca dietro", "Manubri ai lati, busto leggermente avanti", "Scendi finché la coscia anteriore è sotto il parallelo", "Spingi col tallone anteriore. Completa una gamba poi cambia"],
    cues: "Profondità massima = più stretch del quad. Ginocchio segue la punta, non cede dentro."
  }, {
    id: 'sl_2',
    name: 'Stacco rumeno manubri',
    sets: 3,
    reps: '10-13',
    rir: '1-2',
    rest: '2:00',
    isCompound: true,
    tags: ['HAM'],
    badges: ['SMH'],
    shortNote: "Hamstring. Manubri lungo le gambe, eccentrica 3 sec.",
    execution: ["In piedi, manubri davanti alle cosce", "Hip hinge: spingi il bacino indietro, busto avanti", "Manubri scivolano lungo le gambe fino a stretch", "Eccentrica 3 sec, risali contraendo i glutei"],
    cues: "Schiena neutra, leggera flessione delle ginocchia fissa. Senti lo stretch, non la lombare."
  }, {
    id: 'sl_3',
    name: 'Goblet squat manubrio',
    sets: 3,
    reps: '13-18',
    rir: '0-1',
    rest: '90s',
    isCompound: false,
    tags: ['QUAD'],
    badges: ['SMH'],
    shortNote: "Quad. Un manubrio al petto, sotto il parallelo.",
    execution: ["Un manubrio tenuto verticale al petto", "Scendi in squat sotto il parallelo, busto eretto", "Spingi coi talloni risalendo"],
    cues: "Gomiti dentro le ginocchia in basso. Niente carico leggero: rep alte vicino al cedimento."
  }, {
    id: 'sl_4',
    name: 'Hip thrust manubrio (spalle su panca)',
    sets: 3,
    reps: '13-18',
    rir: '0-1',
    rest: '90s',
    isCompound: false,
    tags: ['GLUTE'],
    badges: [],
    shortNote: "Gluteo. Spalle sulla panca, manubri sul bacino, pausa 1 sec.",
    execution: ["Schiena appoggiata sulla panca piana", "Manubrio/i sul bacino (usa un cuscino)", "Spingi coi talloni fino ad allineare anche-spalle-ginocchia", "Pausa 1 sec in massima contrazione"],
    cues: "Mento al petto, costole basse. Spinta dai glutei, non dalla lombare."
  }, {
    id: 'sl_5',
    name: 'Nordic curl (caviglie sotto la panca)',
    sets: 2,
    reps: '6-9',
    rir: '1-2',
    rest: '2:00',
    isCompound: false,
    tags: ['HAM'],
    badges: ['SMH'],
    shortNote: "Hamstring. Eccentrica 3-4 sec. Andrews 2024: sarcomerogenesi.",
    execution: ["In ginocchio, caviglie bloccate sotto la panca (o un manubrio pesante)", "Busto e cosce in linea, glutei contratti", "Scendi controllando l'eccentrica 3-4 sec il più possibile", "Spingi con le mani a terra per risalire"],
    cues: "Tutto il lavoro è nell'eccentrica lenta. Eccentriche assistite se 6 rep complete sono troppe."
  }, {
    id: 'sl_6',
    name: 'Calf raise manubri (1 gamba)',
    sets: 3,
    reps: '13-18',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['POLP'],
    badges: [],
    shortNote: "Polpacci. Su un gradino, stretch 2 sec in basso.",
    execution: ["Avampiede su un gradino, manubrio nella mano dello stesso lato", "Scendi col tallone sotto il gradino (stretch)", "Pausa 2 sec in stretch", "Salita controllata fino a max contrazione"],
    cues: "Niente bouncing. Tempo sotto tensione: il polpaccio ama le rep alte controllate."
  }, {
    id: 'sl_7',
    name: 'Core: leg raise o plank',
    sets: 2,
    reps: '12-15',
    rir: '0-1',
    rest: '60s',
    isCompound: false,
    tags: ['CORE'],
    badges: [],
    shortNote: "Addome. Controllo, no slancio.",
    execution: ["Leg raise: sdraiato o sospeso, gambe tese sollevate", "Plank: avambracci a terra, corpo in linea, glutei contratti", "ROM completo e controllato"],
    cues: "Lombare piatta. Glutei contratti per evitare iperlordosi."
  }]
};

// Progressione estiva: 3 settimane, stessa logica a singola variabile (accumulo rep, RIR conservativo)
const SUMMER_PHASE = {
  1: {
    name: 'ADATTAMENTO',
    variable: 'Stabilisci i carichi',
    repPos: 'bottom',
    compRir: '2',
    accRir: '1',
    load: 'base'
  },
  2: {
    name: 'ACCUMULO REP',
    variable: '+1 rep · carico fermo',
    repPos: 'mid',
    compRir: '1-2',
    accRir: '0-1',
    load: 'hold'
  },
  3: {
    name: 'PICCO REP',
    variable: '+1 rep → top range',
    repPos: 'top',
    compRir: '1',
    accRir: '0-1',
    load: 'hold'
  }
};
const BLOCKS = [{
  id: 'A',
  label: 'A · ACCUMULO REP',
  weeks: [1, 2, 3],
  color: '#6BBF8A',
  reps: 'salgono al top range',
  rir: 'comp 2-3 · acc 1-2'
}, {
  id: 'B',
  label: 'B · ACCUMULO + CARICO',
  weeks: [4, 5, 6],
  color: '#D9B25E',
  reps: 'S4 +carico, S5-6 +rep',
  rir: 'comp 1-2 · acc 0-1'
}, {
  id: 'C',
  label: 'C · PICCO + DELOAD',
  weeks: [7, 8],
  color: '#62BDB3',
  reps: 'S7 picco · S8 scarico',
  rir: 'S7 comp 1 · S8 3-4'
}];
const TAG_COLORS = {
  'PETTO': {
    bg: 'rgba(244, 143, 177, 0.15)',
    border: 'rgba(244, 143, 177, 0.5)',
    text: '#A893EC'
  },
  'D.ANT': {
    bg: 'rgba(217,178,94,0.15)',
    border: 'rgba(217,178,94,0.5)',
    text: '#D9B25E'
  },
  'D.MED': {
    bg: 'rgba(217,178,94,0.15)',
    border: 'rgba(217,178,94,0.5)',
    text: '#D9B25E'
  },
  'D.POST': {
    bg: 'rgba(149, 117, 205, 0.15)',
    border: 'rgba(149, 117, 205, 0.5)',
    text: '#A893EC'
  },
  'TRI': {
    bg: 'rgba(240, 98, 146, 0.15)',
    border: 'rgba(240, 98, 146, 0.5)',
    text: '#A893EC'
  },
  'BI': {
    bg: 'rgba(77, 208, 225, 0.15)',
    border: 'rgba(77, 208, 225, 0.5)',
    text: '#62BDB3'
  },
  'DORSO': {
    bg: 'rgba(134,168,230,0.15)',
    border: 'rgba(134,168,230,0.5)',
    text: '#86A8E6'
  },
  'AVB': {
    bg: 'rgba(77, 182, 172, 0.15)',
    border: 'rgba(77, 182, 172, 0.5)',
    text: '#62BDB3'
  },
  'QUAD': {
    bg: 'rgba(217,178,94,0.15)',
    border: 'rgba(217,178,94,0.5)',
    text: '#D9B25E'
  },
  'HAM': {
    bg: 'rgba(186, 104, 200, 0.15)',
    border: 'rgba(186, 104, 200, 0.5)',
    text: '#A893EC'
  },
  'GLUTE': {
    bg: 'rgba(98,189,179,0.14)',
    border: 'rgba(98,189,179,0.14)',
    text: '#62BDB3'
  },
  'POLP': {
    bg: 'rgba(161, 136, 127, 0.15)',
    border: 'rgba(161, 136, 127, 0.5)',
    text: '#E0A374'
  },
  'CORE': {
    bg: 'rgba(120, 144, 156, 0.15)',
    border: 'rgba(120, 144, 156, 0.5)',
    text: '#A9A9B2'
  }
};
const BADGE_COLORS = {
  'C': {
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.06)',
    text: '#C0BEC6'
  },
  'SMH': {
    bg: 'rgba(134,168,230,0.18)',
    border: 'rgba(134,168,230,0.5)',
    text: '#86A8E6'
  },
  'LLP': {
    bg: 'rgba(155, 93, 229, 0.18)',
    border: 'rgba(155, 93, 229, 0.5)',
    text: '#A893EC'
  },
  'MYO': {
    bg: 'rgba(107,191,138,0.18)',
    border: 'rgba(107,191,138,0.5)',
    text: '#6BBF8A'
  },
  'ECC': {
    bg: 'rgba(38, 198, 218, 0.18)',
    border: 'rgba(38, 198, 218, 0.5)',
    text: '#62BDB3'
  },
  'AMRAP': {
    bg: 'rgba(217,178,94,0.18)',
    border: 'rgba(217,178,94,0.5)',
    text: '#D9B25E'
  },
  'ROT-A': {
    bg: 'rgba(217,178,94,0.12)',
    border: 'rgba(217,178,94,0.4)',
    text: '#D9B25E'
  },
  'ROT-B': {
    bg: 'rgba(38, 198, 218, 0.12)',
    border: 'rgba(38, 198, 218, 0.4)',
    text: '#62BDB3'
  }
};
const COMPOUNDS = [{
  name: 'Bench DB inclinato 30°',
  day: 'push',
  idx: 0
}, {
  name: 'Military press DB seduto',
  day: 'push',
  idx: 1
}, {
  name: 'Pull-up zavorrato',
  day: 'pull',
  idx: 0
}, {
  name: 'Rematore bilanciere',
  day: 'pull',
  idx: 1
}, {
  name: 'Squat bilanciere',
  day: 'legs',
  idx: 0
}, {
  name: 'Stacco rumeno',
  day: 'legs',
  idx: 1
}, {
  name: 'Hip thrust bilanciere',
  day: 'legs',
  idx: 4
}, {
  name: 'Panca piana bilanciere',
  day: 'upper',
  idx: 0
}];

// ============= IMMAGINI ESERCIZI =============
// Strategia: per ogni esercizio provo Wikimedia Commons (URL pubblici stabili senza CORS),
// poi musclewiki via GitHub raw, fallback SVG colorato.
// L'app prova in cascata e mostra la prima che carica.

const EXERCISE_IMAGES = {
  'gio_1': ['img/gio_1.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZkNTRmIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZkNTRmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHJhY2sgLS0+CiAgPGxpbmUgeDE9IjgwIiB5MT0iNDAiIHgyPSI4MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8bGluZSB4MT0iMzIwIiB5MT0iNDAiIHgyPSIzMjAiIHkyPSIyNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPCEtLSBzYWZldHkgYmFyIChyYWNrIGEgbXVybykgLS0+CiAgPGxpbmUgeDE9IjgwIiB5MT0iMTgwIiB4Mj0iMzIwIiB5Mj0iMTgwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iNSA0Ii8+CiAgPCEtLSBiaWxhbmNpZXJlIC0tPgogIDxsaW5lIHgxPSIxMDAiIHkxPSIxMjAiIHgyPSIzMDAiIHkyPSIxMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSI5NSIgeT0iMTA1IiB3aWR0aD0iMjAiIGhlaWdodD0iMzIiIHJ4PSIzIiBmaWxsPSIjZmZhNzI2Ii8+CiAgPHJlY3QgeD0iMTE1IiB5PSIxMTAiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMiIgcng9IjIiIGZpbGw9IiNiYjZkMTAiLz4KICA8cmVjdCB4PSIyODUiIHk9IjEwNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMyIiByeD0iMyIgZmlsbD0iI2ZmYTcyNiIvPgogIDxyZWN0IHg9IjI3MSIgeT0iMTEwIiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjYmI2ZDEwIi8+CiAgPCEtLSBjb3JwbyBpbiBwb3NpemlvbmUgc3F1YXQgcGFyYWxsZWxvIC0tPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjExNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIHNwYWxsZS90cmFwZXppbyAoc290dG8gc2JhcnJhKSAtLT4KICA8bGluZSB4MT0iMTgwIiB5MT0iMTIwIiB4Mj0iMjIwIiB5Mj0iMTIwIiBzdHJva2U9IiM1YTY0NzgiIHN0cm9rZS13aWR0aD0iNiIvPgogIDwhLS0gYnVzdG8gLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjEyNSIgeDI9IjIwMCIgeTI9IjE3NSIgc3Ryb2tlPSIjNWE2NDc4IiBzdHJva2Utd2lkdGg9IjE0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGdhbWJlIGluIHNxdWF0IHBhcmFsbGVsbyAtLT4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTc1IiB4Mj0iMTcwIiB5Mj0iMjAwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjIwMCIgeDI9IjE3MCIgeTI9IjI0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIxNzUiIHgyPSIyMzAiIHkyPSIyMDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjMwIiB5MT0iMjAwIiB4Mj0iMjMwIiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBoaWdobGlnaHQgcXVhZCAtLT4KICA8ZWxsaXBzZSBjeD0iMTgwIiBjeT0iMTk1IiByeD0iNiIgcnk9IjE1IiBmaWxsPSIjZmZkNTRmIiBvcGFjaXR5PSIwLjciLz4KICA8ZWxsaXBzZSBjeD0iMjIwIiBjeT0iMTk1IiByeD0iNiIgcnk9IjE1IiBmaWxsPSIjZmZkNTRmIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZkNTRmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlNRVUFUIEJJTEFOQ0lFUkUgUk9NIFBJRU5PPC90ZXh0Pgo8L3N2Zz4='],
  'gio_2': ['img/gio_2.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYmE2OGM4IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYmE2OGM4IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluY2xpbmF0byBpbiBoaXAgaGluZ2UgLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE1MCIgcng9IjU1IiByeT0iMjIiIGZpbGw9IiM1YTY0NzgiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAyMDAgMTUwKSIvPgogIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjExNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGdhbWJlIGxlZ2dlcm1lbnRlIGZsZXNzZSwgYW5jaGUgaW5kaWV0cm8gLS0+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjE3MCIgeDI9IjE1NSIgeTI9IjIyNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxODAiIHkxPSIxNzIiIHgyPSIxOTUiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJyYWNjaWEgdGVzZSB2ZXJzbyBpbCBiYXNzbyAtLT4KICA8bGluZSB4MT0iMTcwIiB5MT0iMTYwIiB4Mj0iMTU1IiB5Mj0iMjEwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjE4MCIgeTE9IjE1OCIgeDI9IjE5NSIgeTI9IjIxMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYmlsYW5jaWVyZSBhIGxpdmVsbG8gdGliaWUgLS0+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjIxNSIgeDI9IjI0MCIgeTI9IjIxNSIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxyZWN0IHg9IjkyIiB5PSIyMDUiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMiIgcng9IjIiIGZpbGw9IiNiYTY4YzgiLz4KICA8cmVjdCB4PSIxMDYiIHk9IjIwOCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzdiM2Q4MCIvPgogIDxyZWN0IHg9IjIzMiIgeT0iMjA1IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjYmE2OGM4Ii8+CiAgPHJlY3QgeD0iMjIyIiB5PSIyMDgiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IiM3YjNkODAiLz4KICA8IS0tIGhpZ2hsaWdodCBoYW1zdHJpbmcgKHBhcnRlIHBvc3RlcmlvcmUgY29zY2lhKSAtLT4KICA8ZWxsaXBzZSBjeD0iMTcwIiBjeT0iMTk1IiByeD0iNSIgcnk9IjE0IiBmaWxsPSIjYmE2OGM4IiBvcGFjaXR5PSIwLjciLz4KICA8ZWxsaXBzZSBjeD0iMTk1IiBjeT0iMTk1IiByeD0iNSIgcnk9IjE0IiBmaWxsPSIjYmE2OGM4IiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYmE2OGM4IiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlNUQUNDTyBSVU1FTk88L3RleHQ+Cjwvc3ZnPg=='],
  'gio_4': ['img/gio_4.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYmE2OGM4IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYmE2OGM4IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGxlZyBjdXJsIHNlZHV0byAtLT4KICA8cmVjdCB4PSIxMjAiIHk9IjE3MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSI1MCIgcng9IjgiIGZpbGw9IiMzYTQ0NTgiLz4KICA8bGluZSB4MT0iMTIwIiB5MT0iMTcwIiB4Mj0iMTAwIiB5Mj0iODAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgPGxpbmUgeDE9IjI4MCIgeTE9IjE3MCIgeDI9IjI5NSIgeTI9IjEwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjYiLz4KICA8IS0tIGNvcnBvIHNlZHV0byAtLT4KICA8ZWxsaXBzZSBjeD0iMTM1IiBjeT0iMTYwIiByeD0iMjAiIHJ5PSIzNSIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1IDEzNSAxNjApIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iMTA1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgcGllZ2F0ZSBnacO5IChjdXJsIGluIGNvbnRyYXppb25lKSAtLT4KICA8bGluZSB4MT0iMTU1IiB5MT0iMTgwIiB4Mj0iMjQwIiB5Mj0iMTgwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjI0MCIgeTE9IjE4MCIgeDI9IjI0NSIgeTI9IjIyNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gcnVsbG8gcG9scGFjY2kgLS0+CiAgPGNpcmNsZSBjeD0iMjQ3IiBjeT0iMjI1IiByPSIxNCIgZmlsbD0iI2JhNjhjOCIvPgogIDwhLS0gaGlnaGxpZ2h0IGhhbXN0cmluZyAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTgwIiByeD0iMjAiIHJ5PSI1IiBmaWxsPSIjYmE2OGM4IiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYmE2OGM4IiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPkxFRyBDVVJMIFNFRFVUTzwvdGV4dD4KPC9zdmc+'],
  'gio_5': ['img/gio_5.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZWM0MDdhIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZWM0MDdhIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHBpYW5hIGNvbWUgc3VwcG9ydG8gc2NoaWVuYSAtLT4KICA8bGluZSB4MT0iNjAiIHkxPSIxNjAiIHgyPSIxODAiIHkyPSIxNjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iODAiIHkxPSIxNjAiIHgyPSI4MCIgeTI9IjIwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iMTYwIiB5MT0iMTYwIiB4Mj0iMTYwIiB5Mj0iMjAwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNCIvPgogIDwhLS0gY29ycG8gaW4gbGluZWEgcmV0dGEgdHJhIHNwYWxsZSBlIGdpbm9jY2hpYSAodG9wIGhpcCB0aHJ1c3QpIC0tPgogIDwhLS0gc3BhbGxlIGFwcG9nZ2lhdGUgc3VsbGEgcGFuY2EgLS0+CiAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTM1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnVzdG8gb3JpenpvbnRhbGUgLS0+CiAgPGVsbGlwc2UgY3g9IjE4MCIgY3k9IjE1NSIgcng9IjUwIiByeT0iMTYiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGdhbWJlIHBpZWdhdGUgOTAgLS0+CiAgPGxpbmUgeDE9IjIyNSIgeTE9IjE1NSIgeDI9IjI0MCIgeTI9IjIyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMjAiIHkxPSIxNjAiIHgyPSIyMzUiIHkyPSIyMjAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIHBpZWRpIC0tPgogIDxsaW5lIHgxPSIyMjUiIHkxPSIyMjUiIHgyPSIyNjUiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJpbGFuY2llcmUgc3VsbGUgYW5jaGUgLS0+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjEzNSIgeDI9IjIyMCIgeTI9IjEzNSIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCw1KSIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIxNDAiIHgyPSIyNDAiIHkyPSIxNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSIxMTUiIHk9IjEyOCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iI2VjNDA3YSIvPgogIDxyZWN0IHg9IjI0MSIgeT0iMTI4IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjZWM0MDdhIi8+CiAgPHJlY3QgeD0iMTI5IiB5PSIxMzIiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IiM3YzFkM2YiLz4KICA8cmVjdCB4PSIyMzEiIHk9IjEzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iIzdjMWQzZiIvPgogIDwhLS0gaGlnaGxpZ2h0IGdsdXRlaSAtLT4KICA8ZWxsaXBzZSBjeD0iMjE1IiBjeT0iMTYwIiByeD0iMTQiIHJ5PSIxMCIgZmlsbD0iI2VjNDA3YSIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2VjNDA3YSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5ISVAgVEhSVVNUIEJJTEFOQ0lFUkU8L3RleHQ+Cjwvc3ZnPg=='],
  'gio_6': ['img/gio_6.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYTE4ODdmIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYTE4ODdmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluIHBpZWRpIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNzAiIHJ4PSIyMiIgcnk9IjQwIiBmaWxsPSIjNWE2NDc4Ii8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTE1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnJhY2NpYSBsZWdnZXJtZW50ZSBhYmJhc3NhdGUgYWkgbGF0aSAtLT4KICA8bGluZSB4MT0iMTg2IiB5MT0iMTQwIiB4Mj0iMTgwIiB5Mj0iMTk1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIxNCIgeTE9IjE0MCIgeDI9IjIyMCIgeTI9IjE5NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gbWFudWJyaSBhaSBsYXRpIC0tPgogIDxyZWN0IHg9IjE3MiIgeT0iMTk1IiB3aWR0aD0iMTYiIGhlaWdodD0iMjAiIHJ4PSIyIiBmaWxsPSIjYTE4ODdmIi8+CiAgPHJlY3QgeD0iMjEyIiB5PSIxOTUiIHdpZHRoPSIxNiIgaGVpZ2h0PSIyMCIgcng9IjIiIGZpbGw9IiNhMTg4N2YiLz4KICA8IS0tIGdhbWJlIC0tPgogIDxsaW5lIHgxPSIxOTUiIHkxPSIyMDgiIHgyPSIxOTAiIHkyPSIyNDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjA1IiB5MT0iMjA4IiB4Mj0iMjEwIiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBwZWRhbmEgLyBncmFkaW5vIGNvbiBhdmFtcGllZGUgc29wcmEgLS0+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjI0MCIgeDI9IjIzMCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8bGluZSB4MT0iMTYwIiB5MT0iMjQ1IiB4Mj0iMjQwIiB5Mj0iMjQ1IiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwhLS0gdGFsbG9uaSBjaGUgdmFubm8gc290dG8gKHN0cmV0Y2gpIC0tPgogIDxwYXRoIGQ9Ik0gMTg4IDI0MCBRIDE4OCAyNTIgMTg0IDI1MiIgc3Ryb2tlPSIjYTE4ODdmIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0gMjEyIDI0MCBRIDIxMiAyNTIgMjE2IDI1MiIgc3Ryb2tlPSIjYTE4ODdmIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gaGlnaGxpZ2h0IHBvbHBhY2NpIC0tPgogIDxlbGxpcHNlIGN4PSIxOTAiIGN5PSIyMjUiIHJ4PSI0IiByeT0iMTAiIGZpbGw9IiNhMTg4N2YiIG9wYWNpdHk9IjAuNyIvPgogIDxlbGxpcHNlIGN4PSIyMTAiIGN5PSIyMjUiIHJ4PSI0IiByeT0iMTAiIGZpbGw9IiNhMTg4N2YiIG9wYWNpdHk9IjAuNyIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNhMTg4N2YiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+U1RBTkRJTkcgQ0FMRiBSQUlTRTwvdGV4dD4KPC9zdmc+'],
  'lun_1': ['img/lun_1.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjQ4ZmIxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjQ4ZmIxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIGluY2xpbmF0YSAzMCAtLT4KICA8bGluZSB4MT0iODAiIHkxPSIyMDAiIHgyPSIzMjAiIHkyPSIxMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iODAiIHkxPSIyMDAiIHgyPSI4MCIgeTI9IjIyMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIzMjAiIHkxPSIxMjAiIHgyPSIzMjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGNvcnBvIHNkcmFpYXRvIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTUiIHJ4PSI2MCIgcnk9IjIyIiBmaWxsPSIjNWE2NDc4Ii8+CiAgPGNpcmNsZSBjeD0iMjY1IiBjeT0iMTM1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnJhY2NpYSBjaGUgc3Bpbmdvbm8gbWFudWJyaSBpbiBhbHRvIC0tPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIxNDgiIHgyPSIxNjAiIHkyPSIxMDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTQ4IiB4Mj0iMjQwIiB5Mj0iMTAwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBtYW51YnJpIC0tPgogIDxyZWN0IHg9IjE0OCIgeT0iOTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9IiNlZjUzNTAiLz4KICA8cmVjdCB4PSIxNDMiIHk9Ijg2IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjOWIxZDFjIi8+CiAgPHJlY3QgeD0iMTcwIiB5PSI4NiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iIzliMWQxYyIvPgogIDxyZWN0IHg9IjIyOCIgeT0iOTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9IiNlZjUzNTAiLz4KICA8cmVjdCB4PSIyMjMiIHk9Ijg2IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjOWIxZDFjIi8+CiAgPHJlY3QgeD0iMjUwIiB5PSI4NiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iIzliMWQxYyIvPgogIDwhLS0gaGlnaGxpZ2h0IHBldHRvIC0tPgogIDxlbGxpcHNlIGN4PSIyMjAiIGN5PSIxNTAiIHJ4PSIyMiIgcnk9IjE0IiBmaWxsPSIjZjQ4ZmIxIiBvcGFjaXR5PSIwLjUiLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjQ4ZmIxIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPkJFTkNIIERCIElOQ0xJTkFUTyAzMMKwPC90ZXh0Pgo8L3N2Zz4='],
  'lun_2': ['img/lun_2.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZhNzI2IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZhNzI2IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHZlcnRpY2FsZSAtLT4KICA8bGluZSB4MT0iMTcwIiB5MT0iODAiIHgyPSIxNzAiIHkyPSIyMDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMTcwIiB5MT0iMjAwIiB4Mj0iMTcwIiB5Mj0iMjIwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxsaW5lIHgxPSIxNjAiIHkxPSIyMjAiIHgyPSIyMjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGNvcnBvIHNlZHV0byAtLT4KICA8ZWxsaXBzZSBjeD0iMTkwIiBjeT0iMTYwIiByeD0iMjIiIHJ5PSI0MCIgZmlsbD0iIzVhNjQ3OCIvPgogIDxjaXJjbGUgY3g9IjE5MCIgY3k9IjEwNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGdhbWJlIC0tPgogIDxsaW5lIHgxPSIxOTAiIHkxPSIxOTUiIHgyPSIyNDAiIHkyPSIyMjAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMTkwIiB5MT0iMTk1IiB4Mj0iMjQwIiB5Mj0iMjIwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMCwwKSIvPgogIDwhLS0gYnJhY2NpYSBjaGUgc3Bpbmdvbm8gbWFudWJyaSBzb3ByYSB0ZXN0YSAtLT4KICA8bGluZSB4MT0iMTgwIiB5MT0iMTMwIiB4Mj0iMTU1IiB5Mj0iODAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTMwIiB4Mj0iMjI1IiB5Mj0iODAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIG1hbnVicmkgc29wcmEgLS0+CiAgPHJlY3QgeD0iMTQzIiB5PSI2NSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjEwIiByeD0iMyIgZmlsbD0iI2ZmYTcyNiIvPgogIDxyZWN0IHg9IjEzOCIgeT0iNTkiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMiIgcng9IjIiIGZpbGw9IiNiYjZkMTAiLz4KICA8cmVjdCB4PSIxNjUiIHk9IjU5IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjYmI2ZDEwIi8+CiAgPHJlY3QgeD0iMjEzIiB5PSI2NSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjEwIiByeD0iMyIgZmlsbD0iI2ZmYTcyNiIvPgogIDxyZWN0IHg9IjIwOCIgeT0iNTkiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMiIgcng9IjIiIGZpbGw9IiNiYjZkMTAiLz4KICA8cmVjdCB4PSIyMzUiIHk9IjU5IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjYmI2ZDEwIi8+CiAgPCEtLSBoaWdobGlnaHQgc3BhbGxlIC0tPgogIDxjaXJjbGUgY3g9IjE3OCIgY3k9IjEzNSIgcj0iMTAiIGZpbGw9IiNmZmE3MjYiIG9wYWNpdHk9IjAuNSIvPgogIDxjaXJjbGUgY3g9IjIwMiIgY3k9IjEzNSIgcj0iMTAiIGZpbGw9IiNmZmE3MjYiIG9wYWNpdHk9IjAuNSIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmE3MjYiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+TUlMSVRBUlkgUFJFU1MgREIgU0VEVVRPPC90ZXh0Pgo8L3N2Zz4='],
  'lun_3': ['img/lun_3.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjQ4ZmIxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjQ4ZmIxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdmkgbGF0ZXJhbGkgLS0+CiAgPGxpbmUgeDE9IjQwIiB5MT0iNDAiIHgyPSI0MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8bGluZSB4MT0iMzYwIiB5MT0iNDAiIHgyPSIzNjAiIHkyPSIyNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPCEtLSBwdWxlZ2dlIC0tPgogIDxjaXJjbGUgY3g9IjQwIiBjeT0iNTAiIHI9IjYiIGZpbGw9IiMzYTQ0NTgiLz4KICA8Y2lyY2xlIGN4PSIzNjAiIGN5PSI1MCIgcj0iNiIgZmlsbD0iIzNhNDQ1OCIvPgogIDwhLS0gY2F2aSBvYmxpcXVpIC0tPgogIDxsaW5lIHgxPSI0MCIgeTE9IjUwIiB4Mj0iMTU1IiB5Mj0iMTQwIiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIzNjAiIHkxPSI1MCIgeDI9IjI0NSIgeTI9IjE0MCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8IS0tIGNvcnBvIGluIHBpZWRpIGFsIGNlbnRybyAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTcwIiByeD0iMjAiIHJ5PSI0MCIgZmlsbD0iIzVhNjQ3OCIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjExNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGJyYWNjaWEgYXBlcnRlIC0tPgogIDxsaW5lIHgxPSIxODYiIHkxPSIxNDUiIHgyPSIxNTUiIHkyPSIxNDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjE0IiB5MT0iMTQ1IiB4Mj0iMjQ1IiB5Mj0iMTQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBtYW5pIGNvbiBtYW5pZ2xpZSAtLT4KICA8Y2lyY2xlIGN4PSIxNTUiIGN5PSIxNDAiIHI9IjYiIGZpbGw9IiNmNDhmYjEiLz4KICA8Y2lyY2xlIGN4PSIyNDUiIGN5PSIxNDAiIHI9IjYiIGZpbGw9IiNmNDhmYjEiLz4KICA8IS0tIGdhbWJlIC0tPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIyMDgiIHgyPSIxODUiIHkyPSIyNDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjA4IiB4Mj0iMjE1IiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBoaWdobGlnaHQgcGV0dG8gLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE2MCIgcng9IjE4IiByeT0iMTQiIGZpbGw9IiNmNDhmYjEiIG9wYWNpdHk9IjAuNTUiLz4KICA8IS0tIGZyZWNjZSBzdHJldGNoIC0tPgogIDxwYXRoIGQ9Ik0gMTMwIDEyMCBMIDEzMCAxNjAiIHN0cm9rZT0iIzQyYTVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSIzIDMiLz4KICA8cGF0aCBkPSJNIDI3MCAxMjAgTCAyNzAgMTYwIiBzdHJva2U9IiM0MmE1ZjUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iMyAzIi8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2Y0OGZiMSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5DUk9DSSBDQVZJPC90ZXh0Pgo8L3N2Zz4='],
  'lun_4': ['img/lun_4.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZiNzRkIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZiNzRkIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdmkgLS0+CiAgPGxpbmUgeDE9IjgwIiB5MT0iNDAiIHgyPSI4MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjIyMCIgcj0iNiIgZmlsbD0iIzNhNDQ1OCIvPgogIDwhLS0gY29ycG8gaW4gcGllZGkgLS0+CiAgPGVsbGlwc2UgY3g9IjI0MCIgY3k9IjE3MCIgcng9IjIwIiByeT0iNDAiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIxMTUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBnYW1iZSAtLT4KICA8bGluZSB4MT0iMjQwIiB5MT0iMjA4IiB4Mj0iMjI1IiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjI0MCIgeTE9IjIwOCIgeDI9IjI1NSIgeTI9IjI0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpbyBzeCAoY29uIGNhdm8pIHNvbGxldmF0byBsYXRlcmFsbWVudGUgLS0+CiAgPGxpbmUgeDE9IjIyNiIgeTE9IjE0MCIgeDI9IjE1NSIgeTI9IjEzNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gY2F2byBjaGUgcGFydGUgZGlldHJvIGxhIGNvc2NpYSAtLT4KICA8cGF0aCBkPSJNIDgwIDIyMCBRIDIwMCAyMjAgMTU1IDEzNSIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8Y2lyY2xlIGN4PSIxNTUiIGN5PSIxMzUiIHI9IjYiIGZpbGw9IiNmZmI3NGQiLz4KICA8IS0tIGJyYWNjaW8gZHggZmVybW8gbHVuZ28gaWwgZmlhbmNvIC0tPgogIDxsaW5lIHgxPSIyNTQiIHkxPSIxNDAiIHgyPSIyNjIiIHkyPSIxODAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGhpZ2hsaWdodCBkZWx0b2lkZSBtZWRpYWxlIHN4IC0tPgogIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjEzOCIgcj0iOSIgZmlsbD0iI2ZmYjc0ZCIgb3BhY2l0eT0iMC43Ii8+CiAgPCEtLSBhcnJvdyBST00gZXN0ZXNvIC0tPgogIDxwYXRoIGQ9Ik0gMTY1IDE2NSBMIDE0NSAxNDUiIHN0cm9rZT0iIzQyYTVmNSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSIzIDMiLz4KICA8dGV4dCB4PSIxNTUiIHk9IjE4MCIgZm9udC1zaXplPSI5IiBmaWxsPSIjNDJhNWY1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ST008L3RleHQ+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmYjc0ZCIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5MQVRFUkFMIFJBSVNFIENBVk8gQ1JPU1MtQk9EWTwvdGV4dD4KPC9zdmc+'],
  'lun_5': ['img/lun_5.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluIHBpZWRpIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxODAiIHJ4PSIyMiIgcnk9IjQwIiBmaWxsPSIjNWE2NDc4Ii8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTI1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjIxOCIgeDI9IjE4MCIgeTI9IjI0NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIyMTgiIHgyPSIyMjAiIHkyPSIyNDUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGdvbWl0aSBwdW50YXRpIGluIGFsdG8sIG1hbmkgZGlldHJvIGxhIHRlc3RhIC0tPgogIDxsaW5lIHgxPSIxODYiIHkxPSIxNTUiIHgyPSIxNzAiIHkyPSI4MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMTQiIHkxPSIxNTUiIHgyPSIyMzAiIHkyPSI4MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYXZhbWJyYWNjaSBwaWVnYXRpIGluZGlldHJvIChzdHJldGNoIGNhcG8gbHVuZ28pIC0tPgogIDxsaW5lIHgxPSIxNzAiIHkxPSI4MCIgeDI9IjE5NSIgeTI9IjExNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMzAiIHkxPSI4MCIgeDI9IjIwNSIgeTI9IjExNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gY29yZGEgY29uIG1hbm9wb2xlIC0tPgogIDxsaW5lIHgxPSIxOTAiIHkxPSIxMTUiIHgyPSIyMTAiIHkyPSIxMTUiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGNhdm8gY2hlIHNhbGUgdmVyc28gcHVsZWdnaWEgYWx0YSAtLT4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTE1IiB4Mj0iNjAiIHkyPSI0MCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8bGluZSB4MT0iNjAiIHkxPSI0MCIgeDI9IjYwIiB5Mj0iMjIwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDwhLS0gaGlnaGxpZ2h0IHRyaWNpcGl0aSBjYXBvIGx1bmdvIC0tPgogIDxlbGxpcHNlIGN4PSIxNzgiIGN5PSIxMTgiIHJ4PSI2IiByeT0iMTQiIGZpbGw9IiNmMDYyOTIiIG9wYWNpdHk9IjAuNyIvPgogIDxlbGxpcHNlIGN4PSIyMjIiIGN5PSIxMTgiIHJ4PSI2IiByeT0iMTQiIGZpbGw9IiNmMDYyOTIiIG9wYWNpdHk9IjAuNyIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmMDYyOTIiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+VFJJQ0lQSVRJIENPUkRBIE9WRVJIRUFEPC90ZXh0Pgo8L3N2Zz4='],
  'lun_6': ['img/lun_6.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdmkgcHVsZWdnaWEgYWx0YSAtLT4KICA8bGluZSB4MT0iMTIwIiB5MT0iNDAiIHgyPSIxMjAiIHkyPSIyNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iNTAiIHI9IjYiIGZpbGw9IiMzYTQ0NTgiLz4KICA8IS0tIGNvcnBvIGluIHBpZWRpIGRhdmFudGkgbWFjY2hpbmEgLS0+CiAgPGVsbGlwc2UgY3g9IjIyMCIgY3k9IjE4MCIgcng9IjIyIiByeT0iNDAiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMjUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBnYW1iZSAtLT4KICA8bGluZSB4MT0iMjIwIiB5MT0iMjE4IiB4Mj0iMjAwIiB5Mj0iMjQ1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIyMCIgeTE9IjIxOCIgeDI9IjI0MCIgeTI9IjI0NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpYTogZ29taXRpIGluY29sbGF0aSBhaSBmaWFuY2hpLCBtYW5pIGNoZSBzcGluZ29ubyBnacO5IC0tPgogIDxsaW5lIHgxPSIyMDgiIHkxPSIxNTUiIHgyPSIxOTUiIHkyPSIxOTAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjMyIiB5MT0iMTU1IiB4Mj0iMjQ1IiB5Mj0iMTkwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBjb3JkYSBjb24gbWFuaWdsaWUgLS0+CiAgPGxpbmUgeDE9IjE5MCIgeTE9IjE5MCIgeDI9IjI1MCIgeTI9IjE5MCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gY2F2byB2ZXJzbyBwdWxlZ2dpYSAtLT4KICA8bGluZSB4MT0iMjIwIiB5MT0iMTg1IiB4Mj0iMTIwIiB5Mj0iNTAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSBoaWdobGlnaHQgdHJpY2lwaXRpIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNzUiIHJ4PSI1IiByeT0iMTIiIGZpbGw9IiNmMDYyOTIiIG9wYWNpdHk9IjAuNyIvPgogIDxlbGxpcHNlIGN4PSIyNDAiIGN5PSIxNzUiIHJ4PSI1IiByeT0iMTIiIGZpbGw9IiNmMDYyOTIiIG9wYWNpdHk9IjAuNyIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmMDYyOTIiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+UFVTSERPV04gQ09SREE8L3RleHQ+Cjwvc3ZnPg=='],
  'mar_1': ['img/mar_1.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHNiYXJyYSBhbHRhIC0tPgogIDxsaW5lIHgxPSIxMDAiIHkxPSI3MCIgeDI9IjMwMCIgeTI9IjcwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjcwIiB4Mj0iMTAwIiB5Mj0iNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjMwMCIgeTE9IjcwIiB4Mj0iMzAwIiB5Mj0iNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPCEtLSBtYW5pIGNoZSBhZmZlcnJhbm8gc2JhcnJhIC0tPgogIDxjaXJjbGUgY3g9IjE2MCIgY3k9IjcwIiByPSI4IiBmaWxsPSIjNjRiNWY2Ii8+CiAgPGNpcmNsZSBjeD0iMjQwIiBjeT0iNzAiIHI9IjgiIGZpbGw9IiM2NGI1ZjYiLz4KICA8IS0tIGJyYWNjaWEgdGVzZSBpbiBhbHRvIC0tPgogIDxsaW5lIHgxPSIxNjAiIHkxPSI3OCIgeDI9IjE4MCIgeTI9IjEyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyNDAiIHkxPSI3OCIgeDI9IjIyMCIgeTI9IjEyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gdGVzdGEgLS0+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTEwIiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnVzdG8gc29zcGVzbyAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTcwIiByeD0iMjIiIHJ5PSI0MCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgcGVuZGVudGkgLS0+CiAgPGxpbmUgeDE9IjE5NSIgeTE9IjIwOCIgeDI9IjE4NSIgeTI9IjI0NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMDUiIHkxPSIyMDgiIHgyPSIyMTUiIHkyPSIyNDUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGhpZ2hsaWdodCBkb3Jzby9sYXQgLS0+CiAgPGVsbGlwc2UgY3g9IjE4MCIgY3k9IjE2MCIgcng9IjYiIHJ5PSIyMCIgZmlsbD0iIzY0YjVmNiIgb3BhY2l0eT0iMC43Ii8+CiAgPGVsbGlwc2UgY3g9IjIyMCIgY3k9IjE2MCIgcng9IjYiIHJ5PSIyMCIgZmlsbD0iIzY0YjVmNiIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0YjVmNiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QVUxMLVVQIFpBVk9SUkFUTzwvdGV4dD4KPC9zdmc+'],
  'mar_2': ['img/mar_2.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluY2xpbmF0byA0NSAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNTAiIHJ5PSIyMiIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1IDIwMCAxNTApIi8+CiAgPGNpcmNsZSBjeD0iMjQ1IiBjeT0iMTI1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgbGVnZ2VybWVudGUgcGllZ2F0ZSAtLT4KICA8bGluZSB4MT0iMTcwIiB5MT0iMTcwIiB4Mj0iMTU1IiB5Mj0iMjIwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjE4MCIgeTE9IjE3MCIgeDI9IjE5NSIgeTI9IjIyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpYSBjaGUgdGlyYW5vIGJpbGFuY2llcmUgdmVyc28gb21iZWxpY28gLS0+CiAgPGxpbmUgeDE9IjE3NSIgeTE9IjE2MCIgeDI9IjE3MCIgeTI9IjE5NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxODUiIHkxPSIxNjAiIHgyPSIxOTAiIHkyPSIxOTUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJpbGFuY2llcmUgLS0+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjIwMCIgeDI9IjI0MCIgeTI9IjIwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxyZWN0IHg9IjExNSIgeT0iMTkwIiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjNDJhNWY1Ii8+CiAgPHJlY3QgeD0iMTMwIiB5PSIxOTQiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IiMxNTY1YTgiLz4KICA8cmVjdCB4PSIyMzEiIHk9IjE5MCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iIzQyYTVmNSIvPgogIDxyZWN0IHg9IjIyMCIgeT0iMTk0IiB3aWR0aD0iMTAiIGhlaWdodD0iMTQiIHJ4PSIyIiBmaWxsPSIjMTU2NWE4Ii8+CiAgPCEtLSBoaWdobGlnaHQgZG9yc28gLS0+CiAgPGVsbGlwc2UgY3g9IjIxMCIgY3k9IjE0MCIgcng9IjIwIiByeT0iMTAiIGZpbGw9IiM2NGI1ZjYiIG9wYWNpdHk9IjAuNiIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NGI1ZjYiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+UkVNQVRPUkUgQklMQU5DSUVSRSA0NcKwPC90ZXh0Pgo8L3N2Zz4='],
  'mar_3': ['img/mar_3.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdm8gYWx0byAtLT4KICA8bGluZSB4MT0iNjAiIHkxPSI0MCIgeDI9IjYwIiB5Mj0iMjQwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iNTAiIHI9IjYiIGZpbGw9IiMzYTQ0NTgiLz4KICA8IS0tIGNvcnBvIGluIHBpZWRpIGluY2xpbmF0byBsZWdnZXJtZW50ZSBhdmFudGkgLS0+CiAgPGVsbGlwc2UgY3g9IjI0MCIgY3k9IjE4MCIgcng9IjIyIiByeT0iMzgiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIxMjUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBnYW1iZSAtLT4KICA8bGluZSB4MT0iMjQwIiB5MT0iMjE2IiB4Mj0iMjI1IiB5Mj0iMjQ1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjI0MCIgeTE9IjIxNiIgeDI9IjI1NSIgeTI9IjI0NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpYSB0ZXNlLCBtYW5pIGluIGJhc3NvIGRhdmFudGkgYWwgY29ycG8gLS0+CiAgPGxpbmUgeDE9IjIzMCIgeTE9IjE1NSIgeDI9IjI2NSIgeTI9IjIwMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyNTAiIHkxPSIxNTUiIHgyPSIyNjUiIHkyPSIyMDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIG1hbmlnbGlhIC8gc2JhcnJhIC0tPgogIDxsaW5lIHgxPSIyNTUiIHkxPSIyMDAiIHgyPSIyNzUiIHkyPSIyMDAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGNhdm8gY2hlIHNhbGUgZGFsbGEgbWFuaWdsaWEgYWxsYSBwdWxlZ2dpYSAoYXJjbykgLS0+CiAgPHBhdGggZD0iTSAyNjUgMjAwIFEgMTAwIDEwMCA2MCA1MCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8IS0tIGhpZ2hsaWdodCBsYXQgLS0+CiAgPGVsbGlwc2UgY3g9IjIyMCIgY3k9IjE3MCIgcng9IjgiIHJ5PSIyMiIgZmlsbD0iIzY0YjVmNiIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY0YjVmNiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QVUxMT1ZFUiBDQVZJIEFMVEk8L3RleHQ+Cjwvc3ZnPg=='],
  'mar_4': ['img/mar_4.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIDIgbWFjY2hpbmUgYWkgbGF0aSAtLT4KICA8bGluZSB4MT0iNTAiIHkxPSI0MCIgeDI9IjUwIiB5Mj0iMjQwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSIzNTAiIHkxPSI0MCIgeDI9IjM1MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjEzMCIgcj0iNiIgZmlsbD0iIzNhNDQ1OCIvPgogIDxjaXJjbGUgY3g9IjM1MCIgY3k9IjEzMCIgcj0iNiIgZmlsbD0iIzNhNDQ1OCIvPgogIDwhLS0gY29ycG8gaW4gcGllZGkgLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE3MCIgcng9IjIyIiByeT0iNDAiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMTUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBnYW1iZSAtLT4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjA4IiB4Mj0iMTg1IiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjIwOCIgeDI9IjIxNSIgeTI9IjI0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpYSBhcGVydGUgaW5kaWV0cm8gb3JpenpvbnRhbGkgLS0+CiAgPGxpbmUgeDE9IjE4NiIgeTE9IjE0MCIgeDI9IjEyMCIgeTI9IjEzNSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMTQiIHkxPSIxNDAiIHgyPSIyODAiIHkyPSIxMzUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGNhdmkgb2JsaXF1aSAtLT4KICA8bGluZSB4MT0iMTIwIiB5MT0iMTM1IiB4Mj0iNTAiIHkyPSIxMzAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjI4MCIgeTE9IjEzNSIgeDI9IjM1MCIgeTI9IjEzMCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxMjAiIGN5PSIxMzUiIHI9IjYiIGZpbGw9IiM5NTc1Y2QiLz4KICA8Y2lyY2xlIGN4PSIyODAiIGN5PSIxMzUiIHI9IjYiIGZpbGw9IiM5NTc1Y2QiLz4KICA8IS0tIGhpZ2hsaWdodCBkZWx0b2lkZSBwb3N0IC0tPgogIDxjaXJjbGUgY3g9IjE4MCIgY3k9IjEzNSIgcj0iOCIgZmlsbD0iIzk1NzVjZCIgb3BhY2l0eT0iMC43Ii8+CiAgPGNpcmNsZSBjeD0iMjIwIiBjeT0iMTM1IiByPSI4IiBmaWxsPSIjOTU3NWNkIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTU3NWNkIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlJFVkVSU0UgRkxZIENBVkk8L3RleHQ+Cjwvc3ZnPg=='],
  'mar_5': ['img/mar_5.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIGluY2xpbmF0YSA2MMKwIC0tPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIyMjAiIHgyPSIyODAiIHkyPSI4MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIyMjAiIHgyPSIxMDAiIHkyPSIyNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjI4MCIgeTE9IjgwIiB4Mj0iMjkwIiB5Mj0iNjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPCEtLSBjb3JwbyBzZHJhaWF0byBzdWxsYSBwYW5jYSAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNDIiIHJ5PSIyMCIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoLTQwIDIwMCAxNTApIi8+CiAgPGNpcmNsZSBjeD0iMjQ1IiBjeT0iMTE1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnJhY2NpYSBjaGUgcGVuZG9ubyBkaWV0cm8gKHN0cmV0Y2ggY2FwbyBsdW5nbykgLS0+CiAgPGxpbmUgeDE9IjE5NSIgeTE9IjE3MCIgeDI9IjIyMCIgeTI9IjIyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxODAiIHkxPSIxODAiIHgyPSIyMDAiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIG1hbnVicmkgLS0+CiAgPHJlY3QgeD0iMjA4IiB5PSIyMjIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9IiM0ZGQwZTEiLz4KICA8cmVjdCB4PSIyMDAiIHk9IjIxNiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iIzE2ODU4ZiIvPgogIDxyZWN0IHg9IjIyNiIgeT0iMjE2IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjMTY4NThmIi8+CiAgPHJlY3QgeD0iMTg4IiB5PSIyMjciIHdpZHRoPSIyNCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9IiM0ZGQwZTEiLz4KICA8IS0tIGhpZ2hsaWdodCBiaWNpcGl0aSAtLT4KICA8ZWxsaXBzZSBjeD0iMjA3IiBjeT0iMTk1IiByeD0iNiIgcnk9IjEyIiBmaWxsPSIjNGRkMGUxIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNGRkMGUxIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPkNVUkwgREIgSU5DTElOQVRPIDYwwrA8L3RleHQ+Cjwvc3ZnPg=='],
  'mar_6': ['img/mar_6.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHNjb3R0IC0tPgogIDxsaW5lIHgxPSIxNDAiIHkxPSIyMjAiIHgyPSIyNjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjIwIiB4Mj0iMjAwIiB5Mj0iMjQ1IiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNCIvPgogIDwhLS0gc3VwcG9ydG8gaW5jbGluYXRvIHBlciBhcHBvZ2dpbyBicmFjY2lhIC0tPgogIDxsaW5lIHgxPSIxNTAiIHkxPSIxNjAiIHgyPSIyNTAiIHkyPSIyMDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgPGxpbmUgeDE9IjE1MCIgeTE9IjE2MCIgeDI9IjE1MCIgeTI9IjE5MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIGNvcnBvIHNlZHV0byAtLT4KICA8ZWxsaXBzZSBjeD0iMjcwIiBjeT0iMjAwIiByeD0iMjAiIHJ5PSIzNSIgZmlsbD0iIzVhNjQ3OCIvPgogIDxjaXJjbGUgY3g9IjI2NSIgY3k9IjE1NSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGJyYWNjaWEgYXBwb2dnaWF0ZSwgRVogaW4gc2FsaXRhIC0tPgogIDxsaW5lIHgxPSIyNTUiIHkxPSIxODAiIHgyPSIyMDAiIHkyPSIxNTUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTU1IiB4Mj0iMTkwIiB5Mj0iMTE1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBiaWxhbmNpZXJlIEVaIC0tPgogIDxsaW5lIHgxPSIxNjAiIHkxPSIxMTUiIHgyPSIyMjAiIHkyPSIxMTUiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSIxNTUiIHk9IjEwOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE4IiByeD0iMiIgZmlsbD0iIzRkZDBlMSIvPgogIDxyZWN0IHg9IjIxMyIgeT0iMTA4IiB3aWR0aD0iMTIiIGhlaWdodD0iMTgiIHJ4PSIyIiBmaWxsPSIjNGRkMGUxIi8+CiAgPCEtLSBoaWdobGlnaHQgYmljaXBpdGUgLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjEzOCIgcng9IjYiIHJ5PSIxNCIgZmlsbD0iIzRkZDBlMSIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRkZDBlMSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QUkVBQ0hFUiBDVVJMIEVaPC90ZXh0Pgo8L3N2Zz4='],
  'sab_2': ['img/sab_2.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluY2xpbmF0byBpbiBhdmFudGkgOTDCsCAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTU1IiByeD0iNTUiIHJ5PSIyMCIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyIDIwMCAxNTUpIi8+CiAgPGNpcmNsZSBjeD0iMjQ1IiBjeT0iMTI1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgaW4gcGllZGkgbGVnZ2VybWVudGUgZmxlc3NlIC0tPgogIDxsaW5lIHgxPSIxNzAiIHkxPSIxNzAiIHgyPSIxNjAiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMTgwIiB5MT0iMTcwIiB4Mj0iMTk1IiB5Mj0iMjI1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBicmFjY2lhIGFwZXJ0ZSBsYXRlcmFsbWVudGUgLS0+CiAgPGxpbmUgeDE9IjE3NSIgeTE9IjE0OCIgeDI9IjEwMCIgeTI9IjE3MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxOTUiIHkxPSIxNjAiIHgyPSIyODAiIHkyPSIxOTUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIG1hbnVicmkgLS0+CiAgPHJlY3QgeD0iODgiIHk9IjE2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iMiIgZmlsbD0iIzk1NzVjZCIvPgogIDxyZWN0IHg9IjgwIiB5PSIxNjUiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiM0YTM4NzAiLz4KICA8cmVjdCB4PSIyNzgiIHk9IjE4NSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iMiIgZmlsbD0iIzk1NzVjZCIvPgogIDxyZWN0IHg9IjI5NiIgeT0iMTkwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjNGEzODcwIi8+CiAgPCEtLSBoaWdobGlnaHQgZGVsdG9pZGUgcG9zdCAtLT4KICA8Y2lyY2xlIGN4PSIxNzAiIGN5PSIxNDgiIHI9IjciIGZpbGw9IiM5NTc1Y2QiIG9wYWNpdHk9IjAuNyIvPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjE0OCIgcj0iNyIgZmlsbD0iIzk1NzVjZCIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk1NzVjZCIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5SRUFSIERFTFQgRkxZIERCPC90ZXh0Pgo8L3N2Zz4='],
  'sab_3': ['img/sab_3.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZiNzRkIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZiNzRkIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdm8gYmFzc28gLS0+CiAgPGxpbmUgeDE9IjgwIiB5MT0iNDAiIHgyPSI4MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSI4MCIgY3k9IjIyMCIgcj0iNiIgZmlsbD0iIzNhNDQ1OCIvPgogIDwhLS0gY29ycG8gaW5jbGluYXRvIGxhdGVyYWxtZW50ZSB2ZXJzbyBpbCBjYXZvIC0tPgogIDxlbGxpcHNlIGN4PSIyMjAiIGN5PSIxNzUiIHJ4PSIyMiIgcnk9IjQwIiBmaWxsPSIjNWE2NDc4IiB0cmFuc2Zvcm09InJvdGF0ZSgtMTUgMjIwIDE3NSkiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBtYW5vIGxpYmVyYSBjaGUgdGllbmUgbGEgbWFjY2hpbmEgLS0+CiAgPGxpbmUgeDE9IjIwOCIgeTE9IjE1MCIgeDI9IjE1NSIgeTI9IjE3MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjE1NSIgY3k9IjE3MCIgcj0iNiIgZmlsbD0iIzg4OCIvPgogIDwhLS0gZ2FtYmUgLS0+CiAgPGxpbmUgeDE9IjIyNSIgeTE9IjIxNSIgeDI9IjIzNSIgeTI9IjI0NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyNDAiIHkxPSIyMTgiIHgyPSIyNjUiIHkyPSIyNDUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJyYWNjaW8gZHggY29uIGNhdm8sIHNvbGxldmF0byBsYXRlcmFsbWVudGUgLS0+CiAgPGxpbmUgeDE9IjIzNCIgeTE9IjE0OCIgeDI9IjI5MCIgeTI9IjE0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gY2F2byBkYWwgYmFzc28gLS0+CiAgPHBhdGggZD0iTSA4MCAyMjAgUSAyMDAgMjAwIDI5MCAxNDAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+CiAgPGNpcmNsZSBjeD0iMjkwIiBjeT0iMTQwIiByPSI2IiBmaWxsPSIjZmZiNzRkIi8+CiAgPCEtLSBoaWdobGlnaHQgZGVsdG9pZGUgbWVkaWFsZSAtLT4KICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIxNDIiIHI9IjkiIGZpbGw9IiNmZmI3NGQiIG9wYWNpdHk9IjAuNyIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmI3NGQiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+TEFURVJBTCBSQUlTRSBMRUFOSU5HLUFXQVk8L3RleHQ+Cjwvc3ZnPg=='],
  'sab_4': ['img/sab_4.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMjYiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHNjb3R0IC0tPgogIDxsaW5lIHgxPSIxNDAiIHkxPSIyMjAiIHgyPSIyNjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjIwIiB4Mj0iMjAwIiB5Mj0iMjQ1IiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNCIvPgogIDwhLS0gc3VwcG9ydG8gaW5jbGluYXRvIHBlciBhcHBvZ2dpbyBicmFjY2lhIC0tPgogIDxsaW5lIHgxPSIxNTAiIHkxPSIxNjAiIHgyPSIyNTAiIHkyPSIyMDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2Ii8+CiAgPGxpbmUgeDE9IjE1MCIgeTE9IjE2MCIgeDI9IjE1MCIgeTI9IjE5MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIGNvcnBvIHNlZHV0byAtLT4KICA8ZWxsaXBzZSBjeD0iMjcwIiBjeT0iMjAwIiByeD0iMjAiIHJ5PSIzNSIgZmlsbD0iIzVhNjQ3OCIvPgogIDxjaXJjbGUgY3g9IjI2NSIgY3k9IjE1NSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGJyYWNjaWEgYXBwb2dnaWF0ZSwgRVogaW4gc2FsaXRhIC0tPgogIDxsaW5lIHgxPSIyNTUiIHkxPSIxODAiIHgyPSIyMDAiIHkyPSIxNTUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMTU1IiB4Mj0iMTkwIiB5Mj0iMTE1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBiaWxhbmNpZXJlIEVaIC0tPgogIDxsaW5lIHgxPSIxNjAiIHkxPSIxMTUiIHgyPSIyMjAiIHkyPSIxMTUiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSIxNTUiIHk9IjEwOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE4IiByeD0iMiIgZmlsbD0iIzRkZDBlMSIvPgogIDxyZWN0IHg9IjIxMyIgeT0iMTA4IiB3aWR0aD0iMTIiIGhlaWdodD0iMTgiIHJ4PSIyIiBmaWxsPSIjNGRkMGUxIi8+CiAgPCEtLSBoaWdobGlnaHQgYmljaXBpdGUgLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjEzOCIgcng9IjYiIHJ5PSIxNCIgZmlsbD0iIzRkZDBlMSIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzRkZDBlMSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QUkVBQ0hFUiBDVVJMIEVaPC90ZXh0Pgo8L3N2Zz4='],
  'sab_5': ['img/sab_5.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNzg5MDljIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNzg5MDljIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhdmltZW50byAtLT4KICA8bGluZSB4MT0iNDAiIHkxPSIyMjAiIHgyPSIzNjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPCEtLSBnaW5vY2NoaWEgcG9nZ2lhdGUgKHByb25pKSAtLT4KICA8ZWxsaXBzZSBjeD0iMTIwIiBjeT0iMjAwIiByeD0iMjAiIHJ5PSIxMiIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnVzdG8gaW4gZXN0ZW5zaW9uZSBvcml6em9udGFsZSAtLT4KICA8bGluZSB4MT0iMTM1IiB5MT0iMTk1IiB4Mj0iMjQwIiB5Mj0iMTcwIiBzdHJva2U9IiM1YTY0NzgiIHN0cm9rZS13aWR0aD0iMjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gdGVzdGEgYSBmaW5lIGNvcnBvIC0tPgogIDxjaXJjbGUgY3g9IjI1MCIgY3k9IjE2NSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGJyYWNjaWEgdGVzZSBpbiBhdmFudGkgLS0+CiAgPGxpbmUgeDE9IjI0OCIgeTE9IjE4MCIgeDI9IjMwNSIgeTI9IjIxMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyNTIiIHkxPSIxODAiIHgyPSIzMDUiIHkyPSIyMTAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIHJ1b3RhIC0tPgogIDxjaXJjbGUgY3g9IjMyMCIgY3k9IjIxNSIgcj0iMjAiIGZpbGw9IiMzYTQ0NTgiIHN0cm9rZT0iIzc4OTA5YyIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iMzIwIiBjeT0iMjE1IiByPSI2IiBmaWxsPSIjNzg5MDljIi8+CiAgPCEtLSBpbXB1Z25hdHVyZSBydW90YSAtLT4KICA8bGluZSB4MT0iMzA1IiB5MT0iMjEwIiB4Mj0iMzM1IiB5Mj0iMjEwIiBzdHJva2U9IiM3ODkwOWMiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwhLS0gaGlnaGxpZ2h0IGNvcmUgKGFudGktZXN0ZW5zaW9uZSkgLS0+CiAgPGVsbGlwc2UgY3g9IjE5MCIgY3k9IjE4MCIgcng9IjIwIiByeT0iNiIgZmlsbD0iIzc4OTA5YyIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzc4OTA5YyIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5BQiBXSEVFTCBST0xMT1VUPC90ZXh0Pgo8L3N2Zz4='],
  'sab_6': ['img/sab_6.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYTE4ODdmIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjYTE4ODdmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIHNlYXRlZCBjYWxmIC0tPgogIDxyZWN0IHg9IjEyMCIgeT0iMTcwIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjUwIiByeD0iOCIgZmlsbD0iIzNhNDQ1OCIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIxNzAiIHgyPSIxMDAiIHkyPSI4MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjYiLz4KICA8IS0tIHN1cHBvcnRvIGNvc2NlIGNvbiBwZXNvIC0tPgogIDxyZWN0IHg9IjIwMCIgeT0iMTMwIiB3aWR0aD0iODAiIGhlaWdodD0iMjAiIHJ4PSI0IiBmaWxsPSIjM2E0NDU4Ii8+CiAgPCEtLSBjb3JwbyBzZWR1dG8gY29uIGdpbm9jY2hpYSA5MCAtLT4KICA8ZWxsaXBzZSBjeD0iMTM1IiBjeT0iMTYwIiByeD0iMjAiIHJ5PSIzNSIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1IDEzNSAxNjApIi8+CiAgPGNpcmNsZSBjeD0iMTE1IiBjeT0iMTA1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gY29zY2Ugb3JpenpvbnRhbGkgc290dG8gaWwgcGVzbyAtLT4KICA8bGluZSB4MT0iMTU1IiB5MT0iMTU1IiB4Mj0iMjQwIiB5Mj0iMTU1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iMTEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gdGliaWUgdmVydGljYWxpIC0tPgogIDxsaW5lIHgxPSIyNDAiIHkxPSIxNjUiIHgyPSIyNDUiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGF2YW1waWVkaSBzdSBwZWRhbmEsIHRhbGxvbmkgbmVsIHZ1b3RvIC0tPgogIDxsaW5lIHgxPSIyMzIiIHkxPSIyMjUiIHgyPSIyNjUiIHkyPSIyMjUiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHBhdGggZD0iTSAyNDUgMjI1IEwgMjQ1IDI0MCBMIDIzNSAyNDAiIHN0cm9rZT0iI2ExODg3ZiIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGhpZ2hsaWdodCBzb2xlbyAtLT4KICA8ZWxsaXBzZSBjeD0iMjQ1IiBjeT0iMjAwIiByeD0iNSIgcnk9IjEwIiBmaWxsPSIjYTE4ODdmIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjYTE4ODdmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlNFQVRFRCBDQUxGIFJBSVNFPC90ZXh0Pgo8L3N2Zz4='],
  'sab_8': ['img/sab_8.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTEyMjgiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZWM0MDdhIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZWM0MDdhIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHBpYW5hIGNvbWUgc3VwcG9ydG8gc2NoaWVuYSAtLT4KICA8bGluZSB4MT0iNjAiIHkxPSIxNjAiIHgyPSIxODAiIHkyPSIxNjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iODAiIHkxPSIxNjAiIHgyPSI4MCIgeTI9IjIwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iMTYwIiB5MT0iMTYwIiB4Mj0iMTYwIiB5Mj0iMjAwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNCIvPgogIDwhLS0gY29ycG8gaW4gbGluZWEgcmV0dGEgdHJhIHNwYWxsZSBlIGdpbm9jY2hpYSAodG9wIGhpcCB0aHJ1c3QpIC0tPgogIDwhLS0gc3BhbGxlIGFwcG9nZ2lhdGUgc3VsbGEgcGFuY2EgLS0+CiAgPGNpcmNsZSBjeD0iMTIwIiBjeT0iMTM1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnVzdG8gb3JpenpvbnRhbGUgLS0+CiAgPGVsbGlwc2UgY3g9IjE4MCIgY3k9IjE1NSIgcng9IjUwIiByeT0iMTYiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGdhbWJlIHBpZWdhdGUgOTAgLS0+CiAgPGxpbmUgeDE9IjIyNSIgeTE9IjE1NSIgeDI9IjI0MCIgeTI9IjIyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjkiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMjAiIHkxPSIxNjAiIHgyPSIyMzUiIHkyPSIyMjAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIHBpZWRpIC0tPgogIDxsaW5lIHgxPSIyMjUiIHkxPSIyMjUiIHgyPSIyNjUiIHkyPSIyMjUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJpbGFuY2llcmUgc3VsbGUgYW5jaGUgLS0+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjEzNSIgeDI9IjIyMCIgeTI9IjEzNSIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCw1KSIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIxNDAiIHgyPSIyNDAiIHkyPSIxNDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cmVjdCB4PSIxMTUiIHk9IjEyOCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIyIiByeD0iMiIgZmlsbD0iI2VjNDA3YSIvPgogIDxyZWN0IHg9IjI0MSIgeT0iMTI4IiB3aWR0aD0iMTQiIGhlaWdodD0iMjIiIHJ4PSIyIiBmaWxsPSIjZWM0MDdhIi8+CiAgPHJlY3QgeD0iMTI5IiB5PSIxMzIiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IiM3YzFkM2YiLz4KICA8cmVjdCB4PSIyMzEiIHk9IjEzMiIgd2lkdGg9IjEwIiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iIzdjMWQzZiIvPgogIDwhLS0gaGlnaGxpZ2h0IGdsdXRlaSAtLT4KICA8ZWxsaXBzZSBjeD0iMjE1IiBjeT0iMTYwIiByeD0iMTQiIHJ5PSIxMCIgZmlsbD0iI2VjNDA3YSIgb3BhY2l0eT0iMC43Ii8+Cgo8dGV4dCB4PSIyMDAiIHk9IjI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2VjNDA3YSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjcwMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5ISVAgVEhSVVNUIEJJTEFOQ0lFUkU8L3RleHQ+Cjwvc3ZnPg=='],
  'ven_1': ['img/ven_1.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjZiYjZhIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjZiYjZhIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHBpYW5hIG9yaXp6b250YWxlIC0tPgogIDxsaW5lIHgxPSI4MCIgeTE9IjE4MCIgeDI9IjMyMCIgeTI9IjE4MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxMDAiIHkxPSIxODAiIHgyPSIxMDAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjMwMCIgeTE9IjE4MCIgeDI9IjMwMCIgeTI9IjIyMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIHN1cHBvcnRpIHJhY2sgLS0+CiAgPGxpbmUgeDE9IjEzMCIgeTE9IjEwMCIgeDI9IjEzMCIgeTI9IjE2MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8bGluZSB4MT0iMjcwIiB5MT0iMTAwIiB4Mj0iMjcwIiB5Mj0iMTYwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDwhLS0gY29ycG8gc2RyYWlhdG8gLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE2MCIgcng9IjU1IiByeT0iMjAiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyNjUiIGN5PSIxNTUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBicmFjY2lhIGNoZSBzcGluZ29ubyBiaWxhbmNpZXJlIGluIGFsdG8gLS0+CiAgPGxpbmUgeDE9IjE4MCIgeTE9IjE0OCIgeDI9IjE4MCIgeTI9IjEwMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMjAiIHkxPSIxNDgiIHgyPSIyMjAiIHkyPSIxMDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJpbGFuY2llcmUgc29wcmEgcGV0dG8gLS0+CiAgPGxpbmUgeDE9IjEwMCIgeTE9IjEwMCIgeDI9IjMwMCIgeTI9IjEwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxyZWN0IHg9IjkyIiB5PSI4OCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjI0IiByeD0iMyIgZmlsbD0iIzY2YmI2YSIvPgogIDxyZWN0IHg9IjEwOCIgeT0iOTMiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNCIgcng9IjIiIGZpbGw9IiMyYzZiMzAiLz4KICA8cmVjdCB4PSIyOTIiIHk9Ijg4IiB3aWR0aD0iMTYiIGhlaWdodD0iMjQiIHJ4PSIzIiBmaWxsPSIjNjZiYjZhIi8+CiAgPHJlY3QgeD0iMjgwIiB5PSI5MyIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE0IiByeD0iMiIgZmlsbD0iIzJjNmIzMCIvPgogIDwhLS0gaGlnaGxpZ2h0IHBldHRvIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTUiIHJ4PSIyMCIgcnk9IjEwIiBmaWxsPSIjZjQ4ZmIxIiBvcGFjaXR5PSIwLjYiLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjZiYjZhIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlBBTkNBIFBJQU5BIEJJTEFOQ0lFUkU8L3RleHQ+Cjwvc3ZnPg=='],
  'ven_2': ['img/ven_2.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjRiNWY2IiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdm8gYWx0byAtLT4KICA8bGluZSB4MT0iNjAiIHkxPSI0MCIgeDI9IjYwIiB5Mj0iMjQwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSIzNDAiIHkxPSI0MCIgeDI9IjM0MCIgeTI9IjI0MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjUiLz4KICA8bGluZSB4MT0iNjAiIHkxPSI1MCIgeDI9IjM0MCIgeTI9IjUwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDwhLS0gc2JhcnJhIHByZXNhIG5ldXRyYSAoYSBmb3JtYSBkaSBWKSAtLT4KICA8bGluZSB4MT0iMTcwIiB5MT0iMTAwIiB4Mj0iMTgwIiB5Mj0iODAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjMwIiB5MT0iMTAwIiB4Mj0iMjIwIiB5Mj0iODAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMTgwIiB5MT0iODAiIHgyPSIyMjAiIHkyPSI4MCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjMiLz4KICA8IS0tIGNhdm8gLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjgwIiB4Mj0iMjAwIiB5Mj0iNTAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSBjb3JwbyBzZWR1dG8gLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE4MCIgcng9IjIyIiByeT0iNDAiIGZpbGw9IiM1YTY0NzgiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjUiIHI9IjE0IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPCEtLSBnYW1iZSBwaWVnYXRlIChzb3R0byBpIGZlcm1pKSAtLT4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjE4IiB4Mj0iMTcwIiB5Mj0iMjQwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjIxOCIgeDI9IjIzMCIgeTI9IjI0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYnJhY2NpYSBpbiBhbHRvIGEgdGlyYXJlIGxhIHNiYXJyYSBhbCBwZXR0byAtLT4KICA8bGluZSB4MT0iMTg2IiB5MT0iMTQwIiB4Mj0iMTcwIiB5Mj0iMTAwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIxNCIgeTE9IjE0MCIgeDI9IjIzMCIgeTI9IjEwMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gaGlnaGxpZ2h0IGRvcnNvL2xhdCAtLT4KICA8ZWxsaXBzZSBjeD0iMTgwIiBjeT0iMTcwIiByeD0iNiIgcnk9IjIyIiBmaWxsPSIjNjRiNWY2IiBvcGFjaXR5PSIwLjciLz4KICA8ZWxsaXBzZSBjeD0iMjIwIiBjeT0iMTcwIiByeD0iNiIgcnk9IjIyIiBmaWxsPSIjNjRiNWY2IiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjRiNWY2IiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPkxBVCBQVUxMRE9XTiBQUkVTQSBORVVUUkE8L3RleHQ+Cjwvc3ZnPg=='],
  'ven_3': ['img/ven_3.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNjZiYjZhIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNjZiYjZhIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIDIgc2JhcnJlIHBhcmFsbGVsZSAtLT4KICA8bGluZSB4MT0iMTIwIiB5MT0iODAiIHgyPSIxMjAiIHkyPSIyMjAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPGxpbmUgeDE9IjI4MCIgeTE9IjgwIiB4Mj0iMjgwIiB5Mj0iMjIwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSIxMjAiIHkxPSIxMDAiIHgyPSIxNzAiIHkyPSIxMDAiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjMwIiB5MT0iMTAwIiB4Mj0iMjgwIiB5Mj0iMTAwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBtYW5pIHN1bGxlIHNiYXJyZSAtLT4KICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxMDAiIHI9IjYiIGZpbGw9IiM2NmJiNmEiLz4KICA8Y2lyY2xlIGN4PSIyNDAiIGN5PSIxMDAiIHI9IjYiIGZpbGw9IiM2NmJiNmEiLz4KICA8IS0tIGNvcnBvIHNvc3Blc28gYnVzdG8gaW5jbGluYXRvIGF2YW50aSAtLT4KICA8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTYwIiByeD0iMjIiIHJ5PSI0MCIgZmlsbD0iIzVhNjQ3OCIgdHJhbnNmb3JtPSJyb3RhdGUoOCAyMDAgMTYwKSIvPgogIDxjaXJjbGUgY3g9IjE5NSIgY3k9IjExNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGJyYWNjaWEgY2hlIHNjZW5kb25vIGRhbGxlIHNwYWxsZSBhbGxlIG1hbmkgLS0+CiAgPGxpbmUgeDE9IjE3OCIgeTE9IjEyNSIgeDI9IjE2MCIgeTI9IjEwMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMjIiIHkxPSIxMjUiIHgyPSIyNDAiIHkyPSIxMDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGdhbWJlIHBpZWdhdGUgaW4gYWx0by0tPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIyMDAiIHgyPSIyNDAiIHkyPSIyMjAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjAwIiB4Mj0iMTcwIiB5Mj0iMjI1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBjaW50dXJhIHphdm9ycmEgLS0+CiAgPHJlY3QgeD0iMTg2IiB5PSIxODAiIHdpZHRoPSIyOCIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZhNzI2Ii8+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjE4NiIgeDI9IjIwMCIgeTI9IjIxMCIgc3Ryb2tlPSIjODg4IiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cmVjdCB4PSIxOTQiIHk9IjIxMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE2IiBmaWxsPSIjMmEyZTNhIi8+CiAgPCEtLSBoaWdobGlnaHQgcGV0dG8gLS0+CiAgPGVsbGlwc2UgY3g9IjIwMCIgY3k9IjE0OCIgcng9IjE2IiByeT0iMTAiIGZpbGw9IiNmNDhmYjEiIG9wYWNpdHk9IjAuNiIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NmJiNmEiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+RElQIFBBUkFMTEVMRSBaQVZPUlJBVE88L3RleHQ+Cjwvc3ZnPg=='],
  'ven_4': ['img/ven_4.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTU3NWNkIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIG1hY2NoaW5hIGNhdm8gYWx0byAtLT4KICA8bGluZSB4MT0iNjAiIHkxPSI0MCIgeDI9IjYwIiB5Mj0iMjQwIiBzdHJva2U9IiMzYTQ0NTgiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxjaXJjbGUgY3g9IjYwIiBjeT0iMTIwIiByPSI2IiBmaWxsPSIjM2E0NDU4Ii8+CiAgPCEtLSBjb3JwbyBpbiBwaWVkaSAtLT4KICA8ZWxsaXBzZSBjeD0iMjQwIiBjeT0iMTgwIiByeD0iMjIiIHJ5PSI0MCIgZmlsbD0iIzVhNjQ3OCIvPgogIDxjaXJjbGUgY3g9IjI0MCIgY3k9IjEyNSIgcj0iMTQiIGZpbGw9IiM1YTY0NzgiLz4KICA8IS0tIGdhbWJlIC0tPgogIDxsaW5lIHgxPSIyNDAiIHkxPSIyMTgiIHgyPSIyMjUiIHkyPSIyNDUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjQwIiB5MT0iMjE4IiB4Mj0iMjU1IiB5Mj0iMjQ1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBnb21pdGkgcGnDuSBhbHRpIGRlbGxlIG1hbmk6IGJyYWNjaWEgY2hlIHRpcmFubyBjb3JkYSBhbCB2aXNvIC0tPgogIDxsaW5lIHgxPSIyMjYiIHkxPSIxNDAiIHgyPSIxODAiIHkyPSIxMTUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjU0IiB5MT0iMTQwIiB4Mj0iMTgwIiB5Mj0iMTM1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBjb3JkYSBjb24gMiBtYW5vcG9sZSAtLT4KICA8bGluZSB4MT0iMTgwIiB5MT0iMTE1IiB4Mj0iMTgwIiB5Mj0iMTM1IiBzdHJva2U9IiM4ODgiIHN0cm9rZS13aWR0aD0iMyIvPgogIDwhLS0gY2F2byB2ZXJzbyBwdWxlZ2dpYSAtLT4KICA8bGluZSB4MT0iMTgwIiB5MT0iMTI1IiB4Mj0iNjAiIHkyPSIxMjAiIHN0cm9rZT0iIzg4OCIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSBoaWdobGlnaHQgZGVsdG9pZGUgcG9zdCArIHRyYXBlemlvIC0tPgogIDxlbGxpcHNlIGN4PSIyMjAiIGN5PSIxMzUiIHJ4PSI4IiByeT0iNiIgZmlsbD0iIzk1NzVjZCIgb3BhY2l0eT0iMC43Ii8+CiAgPGVsbGlwc2UgY3g9IjI2MCIgY3k9IjEzNSIgcng9IjYiIHJ5PSI2IiBmaWxsPSIjOTU3NWNkIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTU3NWNkIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPkZBQ0UgUFVMTCBDQVZJIENPUkRBPC90ZXh0Pgo8L3N2Zz4='],
  'ven_5': ['img/ven_5.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNGRkMGUxIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIGNvcnBvIGluIHBpZWRpIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNzAiIHJ4PSIyMiIgcnk9IjQwIiBmaWxsPSIjNWE2NDc4Ii8+CiAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTE1IiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gZ2FtYmUgLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjIwOCIgeDI9IjE4NSIgeTI9IjI0MCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIyMDgiIHgyPSIyMTUiIHkyPSIyNDAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8IS0tIGJyYWNjaWEgaW4gcG9zaXppb25lIGN1cmwgOTDCsCAtLT4KICA8bGluZSB4MT0iMTg2IiB5MT0iMTQwIiB4Mj0iMTgwIiB5Mj0iMTgwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjE4MCIgeTE9IjE4MCIgeDI9IjE1NSIgeTI9IjE1NSIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIyMTQiIHkxPSIxNDAiIHgyPSIyMjAiIHkyPSIxODAiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjIwIiB5MT0iMTgwIiB4Mj0iMjQ1IiB5Mj0iMTU1IiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBtYW51YnJpIHByZXNhIG5ldXRyYSAoaGFtbWVyKSAtLT4KICA8cmVjdCB4PSIxNDMiIHk9IjE0OCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjIwIiByeD0iMiIgZmlsbD0iIzRkZDBlMSIvPgogIDxyZWN0IHg9IjI0NSIgeT0iMTQ4IiB3aWR0aD0iMTIiIGhlaWdodD0iMjAiIHJ4PSIyIiBmaWxsPSIjNGRkMGUxIi8+CiAgPHJlY3QgeD0iMTM4IiB5PSIxNTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzE2ODU4ZiIvPgogIDxyZWN0IHg9IjE1NSIgeT0iMTUwIiB3aWR0aD0iNiIgaGVpZ2h0PSIxNiIgcng9IjIiIGZpbGw9IiMxNjg1OGYiLz4KICA8cmVjdCB4PSIyNDAiIHk9IjE1MCIgd2lkdGg9IjYiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjMTY4NThmIi8+CiAgPHJlY3QgeD0iMjU3IiB5PSIxNTAiIHdpZHRoPSI2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzE2ODU4ZiIvPgogIDwhLS0gaGlnaGxpZ2h0IGJpY2lwaXRpICsgYnJhY2hpYWxlIC0tPgogIDxlbGxpcHNlIGN4PSIxODMiIGN5PSIxNjAiIHJ4PSI1IiByeT0iMTQiIGZpbGw9IiM0ZGQwZTEiIG9wYWNpdHk9IjAuNyIvPgogIDxlbGxpcHNlIGN4PSIyMTciIGN5PSIxNjAiIHJ4PSI1IiByeT0iMTQiIGZpbGw9IiM0ZGQwZTEiIG9wYWNpdHk9IjAuNyIvPgoKPHRleHQgeD0iMjAwIiB5PSIyNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM0ZGQwZTEiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZvbnQtZmFtaWx5PSJBcmlhbCI+Q1VSTCArIEhBTU1FUiBTVVBFUlNFVDwvdGV4dD4KPC9zdmc+'],
  'ven_6': ['img/ven_6.jpg', 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMjgwIiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI4MCI+CjxkZWZzPgogIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4KICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwZTFhMTQiIHN0b3Atb3BhY2l0eT0iMC45NSIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGEwZTFhIiBzdG9wLW9wYWNpdHk9IjAuOTgiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjUwJSIgY3k9IjQwJSI+CiAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAuNCIvPgogICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjA2MjkyIiBzdG9wLW9wYWNpdHk9IjAiLz4KICA8L3JhZGlhbEdyYWRpZW50Pgo8L2RlZnM+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjgwIiBmaWxsPSJ1cmwoI2JnKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxMjAiIHI9IjEyMCIgZmlsbD0idXJsKCNnbG93KSIvPgoKICA8IS0tIHBhbmNhIHBpYW5hIC0tPgogIDxsaW5lIHgxPSI4MCIgeTE9IjIwMCIgeDI9IjMyMCIgeTI9IjIwMCIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxsaW5lIHgxPSIxMDAiIHkxPSIyMDAiIHgyPSIxMDAiIHkyPSIyMjUiIHN0cm9rZT0iIzNhNDQ1OCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjMwMCIgeTE9IjIwMCIgeDI9IjMwMCIgeTI9IjIyNSIgc3Ryb2tlPSIjM2E0NDU4IiBzdHJva2Utd2lkdGg9IjQiLz4KICA8IS0tIGNvcnBvIHNkcmFpYXRvIC0tPgogIDxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxODAiIHJ4PSI1NSIgcnk9IjE4IiBmaWxsPSIjNWE2NDc4Ii8+CiAgPGNpcmNsZSBjeD0iMjY1IiBjeT0iMTcyIiByPSIxNCIgZmlsbD0iIzVhNjQ3OCIvPgogIDwhLS0gYnJhY2NpYTogZ29taXRpIHB1bnRhdGkgYWwgc29mZml0dG8sIG1hbmkgZGlldHJvIHRlc3RhIChzdHJldGNoKSAtLT4KICA8bGluZSB4MT0iMTkwIiB5MT0iMTcwIiB4Mj0iMTk1IiB5Mj0iMTIwIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjIxMCIgeTE9IjE3MCIgeDI9IjIxNSIgeTI9IjEyMCIgc3Ryb2tlPSIjN2E4NDlhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0gYXZhbWJyYWNjaSBmbGVzc2kgaW5kaWV0cm8gZGlldHJvIHRlc3RhIC0tPgogIDxsaW5lIHgxPSIxOTUiIHkxPSIxMjAiIHgyPSIyNDAiIHkyPSIxMzUiIHN0cm9rZT0iIzdhODQ5YSIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMjE1IiB5MT0iMTIwIiB4Mj0iMjQ1IiB5Mj0iMTQyIiBzdHJva2U9IiM3YTg0OWEiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPCEtLSBtYW51YnJpbyBkaWV0cm8gdGVzdGEgLS0+CiAgPHJlY3QgeD0iMjQ1IiB5PSIxMzAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcng9IjMiIGZpbGw9IiNmMDYyOTIiLz4KICA8cmVjdCB4PSIyMzciIHk9IjEzNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzdjMjg0MCIvPgogIDwhLS0gaGlnaGxpZ2h0IHRyaWNpcGl0ZSAtLT4KICA8ZWxsaXBzZSBjeD0iMjA1IiBjeT0iMTQ4IiByeD0iNiIgcnk9IjE0IiBmaWxsPSIjZjA2MjkyIiBvcGFjaXR5PSIwLjciLz4KCjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZjA2MjkyIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iQXJpYWwiPlRSSUNJUElUSSBGUkFOQ0VTRSBEQjwvdGV4dD4KPC9zdmc+']
};
