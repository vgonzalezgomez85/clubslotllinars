(function () {
  var UI = {
    ca: {
      nav_cal: "Calendari", nav_reg: "Reglaments", nav_res: "Resultats",
      sub: "Curses, reglaments i resultats del club de slot de Llinars del Vallès.",
      b1: "Veure calendari", b2: "Últims resultats",
      t_date: "Data", t_race: "Cursa", t_place: "Lloc",
      next: "Propera cursa", done: "Disputada", soon: "Propera",
      pdf: "PDF →", res: "Resultats →", ver: "Verificacions →", ver_soon: "Verificacions: properament",
      na: "Properament", tbd: "Per confirmar", no_cal: "Encara no hi ha curses al calendari.",
      no_res: "Encara no hi ha resultats publicats.",
      sample: "* Dades d'exemple",
      support: "Amb el suport de",
      months: ["GEN","FEB","MAR","ABR","MAI","JUN","JUL","AGO","SET","OCT","NOV","DES"]
    },
    es: {
      nav_cal: "Calendario", nav_reg: "Reglamentos", nav_res: "Resultados",
      sub: "Carreras, reglamentos y resultados del club de slot de Llinars del Vallès.",
      b1: "Ver calendario", b2: "Últimos resultados",
      t_date: "Fecha", t_race: "Carrera", t_place: "Lugar",
      next: "Próxima carrera", done: "Disputada", soon: "Próxima",
      pdf: "PDF →", res: "Resultados →", ver: "Verificaciones →", ver_soon: "Verificaciones: próximamente",
      na: "Próximamente", tbd: "Por confirmar", no_cal: "Todavía no hay carreras en el calendario.",
      no_res: "Todavía no hay resultados publicados.",
      sample: "* Datos de ejemplo",
      support: "Con el apoyo de",
      months: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"]
    }
  };

  var lang = "ca";
  try { var s = localStorage.getItem("lang"); if (s === "ca" || s === "es") lang = s; } catch (e) {}

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    for (var k in (attrs || {})) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "class") n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { n.appendChild(c); });
    return n;
  }
  function parts(d) { var p = d.split("-"); return { y: +p[0], m: +p[1], d: +p[2] }; }
  function fmt(d) { var p = parts(d); return ("0" + p.d).slice(-2) + "/" + ("0" + p.m).slice(-2) + "/" + p.y; }
  function todayStr() {
    var n = new Date();
    return n.getFullYear() + "-" + ("0" + (n.getMonth() + 1)).slice(-2) + "-" + ("0" + n.getDate()).slice(-2);
  }
  function tr(obj) { return (obj && (obj[lang] || obj.ca || obj.es)) || ""; }

  function render() {
    var t = UI[lang], today = todayStr();
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = t[e.dataset.i18n]; });
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.l === lang);
    });

    // Calendari
    var cal = DATA.calendar.slice().sort(function (a, b) {
      if (!a.date || !b.date) return !a.date - !b.date;
      return a.date < b.date ? -1 : 1;
    });
    var next = cal.filter(function (r) { return r.date && r.date >= today; })[0];
    var nextBox = document.getElementById("next");
    nextBox.innerHTML = "";
    if (next) {
      var p = parts(next.date);
      nextBox.appendChild(el("div", { class: "next" }, [
        el("div", { class: "d" }, [document.createTextNode(String(p.d)), el("small", { text: t.months[p.m - 1] })]),
        el("div", {}, [
          el("strong", { text: t.next }), el("br"),
          document.createTextNode(tr(next.name)), el("br"),
          el("small", { text: next.place + (next.time ? " · " + next.time : "") })
        ])
      ]));
    }
    var body = document.getElementById("cal");
    body.innerHTML = "";
    if (!cal.length) {
      body.appendChild(el("tr", {}, [el("td", { colspan: "4", class: "empty", text: t.no_cal })]));
    }
    cal.forEach(function (r) {
      var past = r.date && r.date < today, isNext = next && r === next;
      var tag = past ? el("span", { class: "tag done", text: t.done })
              : isNext ? el("span", { class: "tag", text: t.soon }) : document.createTextNode("");
      var cells = [tag];
      var resOf = r.date && DATA.results.filter(function (x) { return x.date === r.date && x.pdf; })[0];
      if (resOf) cells.push(el("a", { class: "tag res", href: resOf.pdf, target: "_blank", rel: "noopener", text: t.res }));
      body.appendChild(el("tr", past ? { class: "past" } : {}, [
        el("td", { text: r.date ? fmt(r.date) : t.tbd }), el("td", { text: tr(r.name) }),
        el("td", { text: r.place + (r.time ? " · " + r.time : "") }), el("td", { class: "st" }, cells)
      ]));
    });

    // Reglaments
    var rules = document.getElementById("rules");
    rules.innerHTML = "";
    DATA.rules.forEach(function (r) {
      var card = el("div", { class: "card" + (r.pdf ? "" : " soon") }, [
        el("h3", { text: tr(r.title) }), el("p", { text: tr(r.desc) })
      ]);
      card.appendChild(r.pdf
        ? el("div", { class: "links" }, [el("a", { href: r.pdf, target: "_blank", rel: "noopener", text: t.pdf })])
        : el("p", { class: "muted", text: t.na }));
      rules.appendChild(card);
    });

    // Resultats
    var res = document.getElementById("results");
    res.innerHTML = "";
    var list = DATA.results.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    if (!list.length) res.appendChild(el("p", { class: "empty", text: t.no_res }));
    list.forEach(function (r) {
      var links = el("div", { class: "links" }, []);
      if (r.pdf) links.appendChild(el("a", { href: r.pdf, target: "_blank", rel: "noopener", text: t.res }));
      if (r.verification) links.appendChild(el("a", { href: r.verification, target: "_blank", rel: "noopener", text: t.ver }));
      var card = el("div", { class: "card" }, [
        el("h3", { text: tr(r.name) + " · " + fmt(r.date) }), links
      ]);
      if (!r.verification) card.appendChild(el("p", { class: "muted", text: t.ver_soon }));
      res.appendChild(card);
    });

    // Peu: entitat que dona suport
    var sp = document.getElementById("sponsor");
    sp.innerHTML = "";
    if (DATA.sponsor) {
      var img = el("img", { src: DATA.sponsor.logo, alt: DATA.sponsor.name });
      var box = DATA.sponsor.url
        ? el("a", { href: DATA.sponsor.url, target: "_blank", rel: "noopener" }, [img])
        : el("span", { class: "badge" }, [img]);
      img.addEventListener("error", function () {
        img.replaceWith(el("span", { class: "fallback", text: DATA.sponsor.name }));
      });
      sp.appendChild(el("small", { text: t.support }));
      sp.appendChild(box);
    }

    var note = DATA.sample ? t.sample : "";
        document.getElementById("sample2").textContent = note;
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.l;
      try { localStorage.setItem("lang", lang); } catch (e) {}
      render();
    });
  });
  render();
})();
