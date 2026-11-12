// ============================================================
//  DADES DEL CLUB / DATOS DEL CLUB  — és l'únic fitxer que cal editar
//  Idiomes: ca (català) i es (castellano)
//  Dates en format AAAA-MM-DD
//  Els PDF es pugen a la carpeta pdf/ i s'hi enllaça pel nom.
// ============================================================
const DATA = {

  // Posa-ho a false quan hi hagi resultats reals (amaga l'avís "dades d'exemple")
  sample: false,

  // Entitat que dona suport al club (surt al peu de pàgina).
  // Posa el logo a la carpeta del web (ajuntament.png). Si "url" està buit, no és un enllaç.
  sponsor: {
    name: "Ajuntament de Llinars del Vallès",
    logo: "ajuntament.png",
    url: ""
  },

  // Calendari de curses · temporada 2026-27
  // date: null = data per confirmar (surt al final de la llista)
  calendar: [
    { date: "2026-09-18", time: "", place: "Llinars del Vallès", name: { ca: "GT3", es: "GT3" } },
    { date: "2026-09-25", time: "", place: "Llinars del Vallès", name: { ca: "C.P", es: "C.P" } },
    { date: "2026-10-09", time: "", place: "Llinars del Vallès", name: { ca: "F1", es: "F1" } },
    { date: "2026-10-23", time: "", place: "Llinars del Vallès", name: { ca: "GT3", es: "GT3" } },
    { date: "2026-11-06", time: "", place: "Llinars del Vallès", name: { ca: "C.P", es: "C.P" } },
    { date: "2026-11-20", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2026-12-11", time: "", place: "Llinars del Vallès", name: { ca: "F1", es: "F1" } },
    { date: "2026-12-18", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-01-08", time: "", place: "Llinars del Vallès", name: { ca: "GT3", es: "GT3" } },
    { date: "2027-01-22", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-02-05", time: "", place: "Llinars del Vallès", name: { ca: "C.P", es: "C.P" } },
    { date: "2027-02-19", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-03-05", time: "", place: "Llinars del Vallès", name: { ca: "F1", es: "F1" } },
    { date: "2027-03-19", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-04-02", time: "", place: "Llinars del Vallès", name: { ca: "GT3", es: "GT3" } },
    { date: "2027-04-16", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-04-30", time: "", place: "Llinars del Vallès", name: { ca: "C.P", es: "C.P" } },
    { date: "2027-05-14", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: "2027-05-28", time: "", place: "Llinars del Vallès", name: { ca: "F1", es: "F1" } },
    { date: "2027-06-04", time: "", place: "Llinars del Vallès", name: { ca: "SLOT.IT", es: "SLOT.IT" } },
    { date: null, time: "", place: "Llinars del Vallès", name: { ca: "RESISDOMI", es: "RESISDOMI" } }
  ],

  // Lloc per defecte: al calendari només es mostra el lloc si és diferent d'aquest.
  defaultPlace: "Llinars del Vallès",

  // Campionats. "match" = noms del calendari que pertanyen a aquest campionat.
  // "rules" = PDF del reglament (null = properament). "color" = color de l'etiqueta.
  championships: [
    { id: "slotit", match: ["SLOT.IT"], color: "#ffe92b", text: "#111",
      name: { ca: "Copa Slot.it", es: "Copa Slot.it" },
      sub:  { ca: "LMP · Hypercar 2026", es: "LMP · Hypercar 2026" },
      rules: "pdf/reglaments/Reglamento_Copa_Slot-it_2026_ES-CA.pdf" },
    { id: "gt3", match: ["GT3"], color: "#e32b1f", text: "#fff",
      name: { ca: "GT3", es: "GT3" }, sub: null, rules: null },
    { id: "cp", match: ["C.P"], color: "#1f4fbf", text: "#fff",
      name: { ca: "C.P", es: "C.P" }, sub: null, rules: null },
    { id: "f1", match: ["F1"], color: "#111111", text: "#fff",
      name: { ca: "F1", es: "F1" }, sub: null, rules: null },
    { id: "resis", match: ["RESISDOMI"], color: "#6b6b6b", text: "#fff",
      name: { ca: "Resisdomi", es: "Resisdomi" }, sub: null, rules: null }
  ],

  // Altres documents generals (pdf: null = encara no disponible)
  rules: [
    { pdf: null,
      title: { ca: "Normes de pista", es: "Normas de pista" } },
    { pdf: null,
      title: { ca: "Reglament esportiu", es: "Reglamento deportivo" } }
  ],

  // Resultats. "pdf" = informe de la cursa (PDF o HTML).
  // "podium" = els 3 primers (nom i voltes); "fastLap" = volta ràpida (opcional).
  // "verification" = PDF de verificacions tècniques (null fins que es publiqui).
  // Si la data coincideix amb una cursa del calendari, hi surt el botó "Resultats".
  results: [
    { date: "2026-11-06",
      name: { ca: "DTM", es: "DTM" },
      pdf: "pdf/resultats/dtm_6112026.html",
      podium: [ { name: "JOAN", laps: 167 }, { name: "EDU", laps: 163 }, { name: "ARNAU", laps: 162 } ],
      fastLap: { time: "12,641", name: "JOAN" },
      verification: null },
    { date: "2026-10-23",
      name: { ca: "GT3", es: "GT3" },
      pdf: "pdf/resultats/gt3_23102026.html",
      podium: [ { name: "BULDETY", laps: 190 }, { name: "EFE", laps: 190 }, { name: "JOAN", laps: 188 } ],
      fastLap: { time: "10,987", name: "EFE" },
      verification: null }
  ]
};
