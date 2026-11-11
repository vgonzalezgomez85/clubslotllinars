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

  // Reglaments (pdf: null = encara no disponible)
  rules: [
    { pdf: "pdf/reglaments/reglament-esportiu.pdf",
      title: { ca: "Reglament esportiu", es: "Reglamento deportivo" },
      desc:  { ca: "Format de cursa, puntuació i sancions.", es: "Formato de carrera, puntuación y sanciones." } },
    { pdf: "pdf/reglaments/reglament-tecnic.pdf",
      title: { ca: "Reglament tècnic", es: "Reglamento técnico" },
      desc:  { ca: "Especificacions dels cotxes i components permesos.", es: "Especificaciones de los coches y componentes permitidos." } },
    { pdf: "pdf/reglaments/Reglamento_Copa_Slot-it_2026_ES-CA.pdf",
      title: { ca: "Reglament tècnic · Campionat Copa Slot.it", es: "Reglamento técnico · Campeonato Copa Slot.it" },
      desc:  { ca: "LMP · Hypercar 2026: models permesos, carrosseries, pes i components.", es: "LMP · Hypercar 2026: modelos permitidos, carrocerías, peso y componentes." } },
    { pdf: null,
      title: { ca: "Normes de pista", es: "Normas de pista" },
      desc:  { ca: "Comportament, torns de comissari i seguretat.", es: "Comportamiento, turnos de comisario y seguridad." } }
  ],

  // Resultats. "verification" és el PDF de verificacions tècniques d'aquella cursa
  // (deixa-ho a null fins que es publiquin).
  results: [
    { date: "2026-11-06",
      name: { ca: "DTM", es: "DTM" },
      pdf: "pdf/resultats/dtm_6112026.html",
      verification: null },
    { date: "2026-10-23",
      name: { ca: "GT3", es: "GT3" },
      pdf: "pdf/resultats/gt3_23102026.html",
      verification: null }
  ]
};
