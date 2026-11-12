(function () {
  var UI = {
    ca: {
      nav_cal: "Calendari", nav_res: "Resultats", nav_champ: "Campionats",
      sub: "Curses, reglaments i resultats del club de slot de Llinars del Vallès.",
      b1: "Veure calendari", b2: "Últims resultats",
      last_res: "Últims resultats", cal_title: "Calendari",
      cal_lead: "Totes les curses es fan a {place}, excepte si s'indica.",
      next: "Propera cursa", done: "Disputada", soon: "Propera",
      today: "Avui!", tomorrow: "Demà", left: "Falten {n} dies",
      all: "Totes", filter: "Filtrar per campionat",
      past: "Curses disputades · {n}", past_res: "{n} amb resultats",
      more: "Veure tota la temporada · {n} curses més",
      rules_btn: "Reglament →", ics: "Afegir al calendari",
      pdf: "PDF →", res: "Resultats →", full: "Classificació completa →",
      ver: "Verificacions →", ver_soon: "Verificacions: properament",
      fast: "Volta ràpida", laps: "v.",
      na: "Properament", tbd: "Per confirmar", no_cal: "Encara no hi ha curses al calendari.",
      no_res: "Encara no hi ha resultats publicats.",
      ch_next: "Propera", ch_races: "{n} curses", ch_race1: "1 cursa", ch_rules: "Reglament tècnic (PDF) →",
      ch_rules_na: "Reglament: properament", ch_over: "Temporada acabada",
      docs: "Documents generals",
      sample: "* Dades d'exemple",
      support: "Amb el suport de",
      months: ["GEN","FEB","MAR","ABR","MAI","JUN","JUL","AGO","SET","OCT","NOV","DES"],
      monthsL: ["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"],
      days: ["Dg.","Dl.","Dt.","Dc.","Dj.","Dv.","Ds."],
      daysL: ["diumenge","dilluns","dimarts","dimecres","dijous","divendres","dissabte"]
    },
    es: {
      nav_cal: "Calendario", nav_res: "Resultados", nav_champ: "Campeonatos",
      sub: "Carreras, reglamentos y resultados del club de slot de Llinars del Vallès.",
      b1: "Ver calendario", b2: "Últimos resultados",
      last_res: "Últimos resultados", cal_title: "Calendario",
      cal_lead: "Todas las carreras se disputan en {place}, salvo que se indique.",
      next: "Próxima carrera", done: "Disputada", soon: "Próxima",
      today: "¡Hoy!", tomorrow: "Mañana", left: "Faltan {n} días",
      all: "Todas", filter: "Filtrar por campeonato",
      past: "Carreras disputadas · {n}", past_res: "{n} con resultados",
      more: "Ver toda la temporada · {n} carreras más",
      rules_btn: "Reglamento →", ics: "Añadir al calendario",
      pdf: "PDF →", res: "Resultados →", full: "Clasificación completa →",
      ver: "Verificaciones →", ver_soon: "Verificaciones: próximamente",
      fast: "Vuelta rápida", laps: "v.",
      na: "Próximamente", tbd: "Por confirmar", no_cal: "Todavía no hay carreras en el calendario.",
      no_res: "Todavía no hay resultados publicados.",
      ch_next: "Próxima", ch_races: "{n} carreras", ch_race1: "1 carrera", ch_rules: "Reglamento técnico (PDF) →",
      ch_rules_na: "Reglamento: próximamente", ch_over: "Temporada terminada",
      docs: "Documentos generales",
      sample: "* Datos de ejemplo",
      support: "Con el apoyo de",
      months: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"],
      monthsL: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      days: ["Dom.","Lun.","Mar.","Mié.","Jue.","Vie.","Sáb."],
      daysL: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]
    }
  };

  var lang = "ca";
  try { var s = localStorage.getItem("lang"); if (s === "ca" || s === "es") lang = s; } catch (e) {}
  var filter = "all";       // campionat seleccionat al calendari
  var showAll = false;      // "veure tota la temporada"
  var UPCOMING_MONTHS = 3;  // mesos futurs que es mostren abans de "veure'n més"

  var CHAMPS = DATA.championships || [];
  var PLACE = DATA.defaultPlace || "";

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (c) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return n;
  }
  function fill(str, vars) { return str.replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; }); }
  function parts(d) { var p = d.split("-"); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function dateObj(d) { var p = parts(d); return new Date(p.y, p.m - 1, p.d, 12); }
  function pad(n) { return ("0" + n).slice(-2); }
  function fmt(d) { var p = parts(d); return pad(p.d) + "/" + pad(p.m) + "/" + p.y; }
  function fmtShort(d) { var p = parts(d); return pad(p.d) + "/" + pad(p.m); }
  function todayStr() {
    var n = new Date();
    return n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate());
  }
  function daysBetween(a, b) { return Math.round((dateObj(b) - dateObj(a)) / 86400000); }
  function tr(obj) { return (obj && (obj[lang] || obj.ca || obj.es)) || ""; }

  function champOf(race) {
    var key = (race.name && (race.name.ca || race.name.es) || "").toUpperCase();
    for (var i = 0; i < CHAMPS.length; i++) {
      if (CHAMPS[i].match.some(function (m) { return m.toUpperCase() === key; })) return CHAMPS[i];
    }
    return null;
  }
  function chip(label, ch) {
    var c = el("span", { class: "chip", text: label });
    c.style.background = ch ? ch.color : "#6b6b6b";
    c.style.color = ch ? ch.text : "#fff";
    if (ch && ch.text === "#111") c.classList.add("light");
    return c;
  }
  function resultFor(race) {
    return race.date && DATA.results.filter(function (x) { return x.date === race.date && x.pdf; })[0];
  }
  function countdown(t, date, today) {
    var n = daysBetween(today, date);
    return n <= 0 ? t.today : n === 1 ? t.tomorrow : fill(t.left, { n: n });
  }
  function link(href, cls, text) {
    return el("a", { class: cls, href: href, target: "_blank", rel: "noopener", text: text });
  }

  // Fitxer .ics per afegir la cursa al calendari del mòbil
  function icsFor(race) {
    var p = parts(race.date), d = p.y + pad(p.m) + pad(p.d);
    var nx = new Date(p.y, p.m - 1, p.d + 1), d2 = nx.getFullYear() + pad(nx.getMonth() + 1) + pad(nx.getDate());
    var when = "DTSTART;VALUE=DATE:" + d + "\r\nDTEND;VALUE=DATE:" + d2;
    var tm = /^(\d{1,2}):(\d{2})$/.exec(race.time || "");
    if (tm) {
      var st = d + "T" + pad(+tm[1]) + tm[2] + "00";
      var en = d + "T" + pad(Math.min(+tm[1] + 3, 23)) + tm[2] + "00";
      when = "DTSTART;TZID=Europe/Madrid:" + st + "\r\nDTEND;TZID=Europe/Madrid:" + en;
    }
    var ch = champOf(race), title = "Slot Llinars · " + (ch ? tr(ch.name) : tr(race.name));
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Club Slot Llinars//CA", "BEGIN:VEVENT",
      "UID:" + race.date + "-" + (tr(race.name) || "cursa").replace(/\W/g, "") + "@slotllinars",
      "DTSTAMP:" + d + "T000000Z", when, "SUMMARY:" + title, "LOCATION:" + (race.place || PLACE),
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "slot-llinars-" + race.date + ".ics";
    document.body.appendChild(a); a.click(); a.remove();
  }

  function render() {
    var t = UI[lang], today = todayStr();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = t[e.dataset.i18n]; });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.l === lang);
    });

    var cal = DATA.calendar.slice().sort(function (a, b) {
      if (!a.date || !b.date) return !a.date - !b.date;
      return a.date < b.date ? -1 : 1;
    });
    var next = cal.filter(function (r) { return r.date && r.date >= today; })[0];

    // 1 · Propera cursa (a la portada)
    var nextBox = document.getElementById("next");
    nextBox.innerHTML = "";
    if (next) {
      var p = parts(next.date), ch = champOf(next), dow = dateObj(next.date).getDay();
      var actions = el("div", { class: "nx-act" });
      if (ch && ch.rules) actions.appendChild(link(ch.rules, "", t.rules_btn));
      var icsBtn = el("button", { type: "button", text: t.ics });
      icsBtn.addEventListener("click", function () { icsFor(next); });
      actions.appendChild(icsBtn);
      var where = [];
      if (next.place && next.place !== PLACE) where.push(next.place);
      else where.push(PLACE);
      if (next.time) where.push(next.time);
      nextBox.appendChild(el("article", { class: "nextcard", "aria-label": t.next }, [
        el("div", { class: "nx-top" }, [el("span", { text: t.next }), el("strong", { text: countdown(t, next.date, today) })]),
        el("div", { class: "nx-body" }, [
          el("div", { class: "d" }, [String(p.d), el("small", { text: t.months[p.m - 1] }), el("em", { text: t.daysL[dow] })]),
          el("div", { class: "nx-info" }, [
            chip(tr(next.name), ch),
            el("div", { class: "nx-name", text: ch ? tr(ch.name) + (ch.sub ? " · " + tr(ch.sub) : "") : tr(next.name) }),
            el("div", { class: "nx-where", text: where.join(" · ") })
          ])
        ]),
        actions
      ]));
    }

    // 2 · Últims resultats amb podi
    var res = document.getElementById("results");
    res.innerHTML = "";
    var list = DATA.results.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!list.length) res.appendChild(el("p", { class: "empty", text: t.no_res }));
    list.forEach(function (r) {
      var ch = champOf(r), dow = dateObj(r.date).getDay();
      var card = el("article", { class: "card rescard" }, [
        el("div", { class: "rc-head" }, [chip(tr(r.name), ch), el("strong", { text: t.days[dow] + " " + fmt(r.date) })])
      ]);
      if (r.podium && r.podium.length) {
        var ol = el("ol", { class: "podium" });
        r.podium.slice(0, 3).forEach(function (d, i) {
          ol.appendChild(el("li", { class: "p" + (i + 1) }, [
            el("span", { class: "pos", text: String(i + 1) }),
            el("span", { class: "who", text: d.name }),
            el("span", { class: "laps", text: d.laps != null ? d.laps + " " + t.laps : "" })
          ]));
        });
        card.appendChild(ol);
      }
      var foot = el("div", { class: "rc-foot" });
      if (r.fastLap) foot.appendChild(el("span", { class: "fast" }, [t.fast + " ", el("strong", { text: r.fastLap.time + " s" }), " · " + r.fastLap.name]));
      var links = el("div", { class: "links" });
      if (r.pdf) links.appendChild(link(r.pdf, "pill dark", r.podium ? t.full : t.res));
      if (r.verification) links.appendChild(link(r.verification, "pill", t.ver));
      foot.appendChild(links);
      card.appendChild(foot);
      if (!r.verification) card.appendChild(el("p", { class: "muted", text: t.ver_soon }));
      res.appendChild(card);
    });

    // 3 · Calendari per mesos, amb filtres
    document.getElementById("cal_lead").textContent = PLACE ? fill(t.cal_lead, { place: PLACE }) : "";
    var years = cal.filter(function (r) { return r.date; }).map(function (r) { return parts(r.date).y; });
    if (years.length) {
      var y0 = Math.min.apply(null, years), y1 = Math.max.apply(null, years);
      document.querySelector('#calendari h2').textContent = t.cal_title + " " + y0 + (y1 > y0 ? "-" + String(y1).slice(-2) : "");
    }

    var fbox = document.getElementById("filters");
    fbox.innerHTML = "";
    fbox.setAttribute("aria-label", t.filter);
    var used = CHAMPS.filter(function (c) { return cal.some(function (r) { return champOf(r) === c; }); });
    [{ id: "all" }].concat(used).forEach(function (c) {
      var b = el("button", { type: "button", "aria-pressed": String(filter === c.id),
        text: c.id === "all" ? t.all : (c.match[0] || tr(c.name)) });
      if (c.id !== "all") { b.style.setProperty("--c", c.color); b.style.setProperty("--ct", c.text); }
      b.addEventListener("click", function () { filter = c.id; render(); });
      fbox.appendChild(b);
    });

    var box = document.getElementById("cal");
    box.innerHTML = "";
    var rows = cal.filter(function (r) { return filter === "all" || (champOf(r) || {}).id === filter; });
    if (!rows.length) { box.appendChild(el("p", { class: "empty", text: t.no_cal })); }

    var curMonth = today.slice(0, 7);
    var past = rows.filter(function (r) { return r.date && r.date.slice(0, 7) < curMonth; });
    var rest = rows.filter(function (r) { return past.indexOf(r) < 0; });

    function rowFor(r) {
      var isPast = r.date && r.date < today, isNext = next && r === next, ch = champOf(r);
      var li = el("li", { class: (isPast ? "past" : "") + (isNext ? " isnext" : "") });
      li.appendChild(el("span", { class: "dt", text: r.date ? t.days[dateObj(r.date).getDay()] + " " + fmtShort(r.date) : t.tbd }));
      li.appendChild(chip(tr(r.name), ch));
      var info = [];
      if (ch && ch.sub) info.push(tr(ch.name));
      else if (ch && tr(ch.name).toUpperCase() !== tr(r.name).toUpperCase()) info.push(tr(ch.name));
      if (r.place && r.place !== PLACE) info.push(r.place);
      if (r.time) info.push(r.time);
      li.appendChild(el("span", { class: "info", text: info.join(" · ") }));
      var st = el("span", { class: "st" });
      if (isPast) st.appendChild(el("span", { class: "tag done", text: t.done }));
      if (isNext) st.appendChild(el("span", { class: "tag", text: t.soon + " · " + countdown(t, r.date, today).toLowerCase() }));
      var rr = resultFor(r);
      if (rr) st.appendChild(link(rr.pdf, "tag res", t.res));
      li.appendChild(st);
      return li;
    }
    function monthGroups(list, into) {
      var groups = [];
      list.forEach(function (r) {
        var key = r.date ? r.date.slice(0, 7) : "tbd";
        var g = groups[groups.length - 1];
        if (!g || g.key !== key) groups.push(g = { key: key, items: [] });
        g.items.push(r);
      });
      groups.forEach(function (g) {
        var title = g.key === "tbd" ? t.tbd : t.monthsL[+g.key.slice(5) - 1] + " " + g.key.slice(0, 4);
        var ul = el("ul", { class: "callist" });
        g.items.forEach(function (r) { ul.appendChild(rowFor(r)); });
        into.appendChild(el("div", { class: "month" }, [el("h3", { text: title }), ul]));
      });
    }

    if (past.length) {
      var nres = past.filter(resultFor).length;
      var det = el("details", { class: "pastbox" }, [
        el("summary", { text: fill(t.past, { n: past.length }) + (nres ? " · " + fill(t.past_res, { n: nres }) : "") })
      ]);
      monthGroups(past, det);
      box.appendChild(det);
    }

    var visible = rest, hidden = 0;
    if (!showAll && filter === "all") {
      var months = [];
      rest.forEach(function (r) { var k = r.date ? r.date.slice(0, 7) : "tbd"; if (months.indexOf(k) < 0) months.push(k); });
      var keep = months.slice(0, UPCOMING_MONTHS);
      visible = rest.filter(function (r) { return keep.indexOf(r.date ? r.date.slice(0, 7) : "tbd") >= 0; });
      hidden = rest.length - visible.length;
    }
    monthGroups(visible, box);
    if (hidden > 0) {
      var more = el("button", { type: "button", class: "morebtn", text: fill(t.more, { n: hidden }) });
      more.addEventListener("click", function () { showAll = true; render(); });
      box.appendChild(more);
    }

    // 4 · Campionats
    var cbox = document.getElementById("champs");
    cbox.innerHTML = "";
    CHAMPS.forEach(function (c) {
      var races = cal.filter(function (r) { return champOf(r) === c; });
      if (!races.length && !c.rules) return;
      var up = races.filter(function (r) { return r.date && r.date >= today; })[0];
      var head = el("div", { class: "ch-head" }, [el("div", { class: "ch-name", text: tr(c.name) })]);
      if (c.sub) head.appendChild(el("div", { class: "ch-sub", text: tr(c.sub) }));
      head.style.background = c.color; head.style.color = c.text;
      if (c.text === "#111") head.classList.add("light");
      var nextTxt = up ? [t.ch_next + ": ", el("strong", { text: fmtShort(up.date) })]
                  : races.some(function (r) { return !r.date; }) ? [t.ch_next + ": ", el("strong", { text: t.tbd })]
                  : [t.ch_over];
      var meta = el("div", { class: "ch-meta" }, nextTxt.concat([" · " + (races.length === 1 ? t.ch_race1 : fill(t.ch_races, { n: races.length }))]));
      var body = el("div", { class: "ch-body" }, [meta,
        c.rules ? link(c.rules, "ch-rules", t.ch_rules) : el("span", { class: "muted", text: t.ch_rules_na })]);
      cbox.appendChild(el("article", { class: "champ" }, [head, body]));
    });
    var docs = document.getElementById("docs");
    docs.innerHTML = "";
    if (DATA.rules && DATA.rules.length) {
      docs.appendChild(document.createTextNode(t.docs + ": "));
      DATA.rules.forEach(function (r, i) {
        if (i) docs.appendChild(document.createTextNode(" · "));
        if (r.pdf) docs.appendChild(link(r.pdf, "", tr(r.title)));
        else docs.appendChild(document.createTextNode(tr(r.title) + " (" + t.na.toLowerCase() + ")"));
      });
    }

    // Peu: entitat que dona suport
    var sp = document.getElementById("sponsor");
    sp.innerHTML = "";
    if (DATA.sponsor) {
      var img = el("img", { src: DATA.sponsor.logo, alt: DATA.sponsor.name });
      var sbox = DATA.sponsor.url
        ? el("a", { href: DATA.sponsor.url, target: "_blank", rel: "noopener" }, [img])
        : el("span", { class: "badge" }, [img]);
      img.addEventListener("error", function () {
        img.replaceWith(el("span", { class: "fallback", text: DATA.sponsor.name }));
      });
      sp.appendChild(el("small", { text: t.support }));
      sp.appendChild(sbox);
    }

    document.getElementById("sample2").textContent = DATA.sample ? t.sample : "";
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.l;
      try { localStorage.setItem("lang", lang); } catch (e) {}
      render();
    });
  });
  render();

  // Enllaços interns (#calendari, #resultats...): desplaça sense afegir el # a l'adreça,
  // així en recarregar la pàgina torna a començar a dalt.
  try { history.scrollRestoration = "manual"; } catch (e) {}
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    var target = id === "top" ? document.body : document.getElementById(id);
    if (!target) return;
    ev.preventDefault();
    if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else target.scrollIntoView({ behavior: "smooth" });
  });
  // Si s'arriba amb un enllaç compartit (p. ex. .../#resultats), s'hi va, però es neteja l'adreça.
  if (location.hash) {
    window.addEventListener("load", function () {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    });
  }
})();
