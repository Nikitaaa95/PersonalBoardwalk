/* =============================================================================
   js/shelf.js — renders the shelf and the reader.
   You should not need to touch this to add books. See content/books.js.
============================================================================= */
(function () {
  "use strict";

  var data = window.SHELF;
  if (!data) { console.error("content/books.js did not load."); return; }

  var mount   = document.getElementById("shelves");
  var reader  = document.getElementById("reader");
  var verso   = document.getElementById("reader-verso");
  var recto   = document.getElementById("reader-recto");
  var coloph  = document.getElementById("reader-colophon");
  var lastFocus = null;

  document.getElementById("site-title").textContent = data.title || "";
  document.getElementById("site-line").textContent  = data.line  || "";

  /* --- helpers ---------------------------------------------------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function palette(name) {
    return (data.palettes && data.palettes[name]) ||
           { cloth: "#5a4a3a", ink: "#efe6d2", rule: "#a08e73" };
  }
  function face(name) {
    return (data.faces && data.faces[name]) || '"EB Garamond", Georgia, serif';
  }

  /* --- spine ------------------------------------------------------------ */
  function buildSpine(item) {
    var btn = el("button", "spine");
    btn.type = "button";

    if (item.invented) {
      /* The standard. Nothing per-book is allowed to vary here — that
         uniformity is the tell, and it is what lets later volumes match. */
      btn.classList.add("spine--invented");
      btn.style.height = "calc(var(--shelf-h) * var(--inv-height))";
    } else {
      var p = palette(item.palette);
      btn.style.width = (item.width || 40) + "px";
      btn.style.height = "calc(var(--shelf-h) * " + (item.height || 0.9) + ")";
      btn.style.background =
        "linear-gradient(90deg," + shade(p.cloth, -18) + "," + p.cloth + " 45%," + shade(p.cloth, -14) + ")";
      btn.style.color = p.ink;
      btn.style.fontFamily = face(item.face);
      btn.style.fontWeight = "600";
    }

    var bandTop = el("span", "spine__band");
    var wrap    = el("span", "spine__titlewrap");
    var title   = el("span", "spine__title", item.title || "");
    var bandBot = el("span", "spine__band spine__band--bottom");
    var author  = el("span", "spine__author", item.author || "");

    if (!item.invented) {
      var pr = palette(item.palette).rule;
      bandTop.style.color = pr;
      bandBot.style.color = pr;
    }

    wrap.appendChild(title);
    btn.appendChild(bandTop);
    btn.appendChild(wrap);
    btn.appendChild(bandBot);
    btn.appendChild(author);

    btn.setAttribute("aria-label", "Open " + (item.title || "book") +
      (item.author ? ", " + item.author : ""));
    btn.addEventListener("click", function () { openReader(item); });

    btn._title = title;
    btn._wrap = wrap;
    return btn;
  }

  /* Darken/lighten a hex colour for the spine's curvature shading. */
  function shade(hex, amt) {
    var m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return hex;
    var n = parseInt(m[1], 16);
    var c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(function (v) {
      return Math.max(0, Math.min(255, v + amt));
    });
    return "rgb(" + c.join(",") + ")";
  }

  /* Shrink a spine title until it fits its spine. Spines are legible at a
     glance or the whole homepage fails, so this runs after fonts load and
     again on resize. */
  function fitTitle(btn) {
    var t = btn._title, w = btn._wrap;
    if (!t || !w) return;
    var availH = w.clientHeight, availW = w.clientWidth;
    if (availH <= 0) return;

    var size = btn.classList.contains("spine--invented") ? 18 : 20;
    function set(v) { t.style.fontSize = v + "px"; }
    function h() { return t.getBoundingClientRect().height; }
    function wd() { return t.getBoundingClientRect().width; }

    /* Shrink on one line, but only down to 10px — below that a spine stops
       working from four feet away, which is the whole job of the spine view. */
    t.style.whiteSpace = "nowrap";
    set(size);
    while (h() > availH && size > 10) { size -= 0.5; set(size); }

    /* Still too long? Break to two lines, the way a real spine does, rather
       than shrinking the type into illegibility. */
    if (h() > availH) {
      t.style.whiteSpace = "normal";
      while ((h() > availH || wd() > availW) && size > 8) { size -= 0.5; set(size); }
    }
  }

  /* --- face-out --------------------------------------------------------- */
  function buildFaceOut(item) {
    var btn = el("button", "face-out");
    btn.type = "button";
    btn.style.height = "calc(var(--shelf-h) * var(--inv-height))";
    btn.style.width = "calc(var(--inv-width) * 4.2)";
    btn.appendChild(el("span", "face-out__title", item.title || ""));
    btn.appendChild(el("span", "face-out__rules"));
    btn.appendChild(el("span", "face-out__author",
      [item.author, item.year].filter(Boolean).join("  ·  ")));
    btn.setAttribute("aria-label", "Open " + (item.title || "book"));
    btn.addEventListener("click", function () { openReader(item); });
    return btn;
  }

  /* --- photograph ------------------------------------------------------- */
  function buildPhoto(item) {
    var btn = el("button", "photo");
    btn.type = "button";
    btn.style.transform = "rotate(" + (item.tilt || 0) + "deg)";

    var inner = el("div", "photo__inner");

    var front = el("div", "photo__face");
    var img = el("img");
    img.src = item.image;
    img.alt = item.alt || "";
    front.appendChild(img);

    var back = el("div", "photo__face photo__face--back");
    var b = item.back || {};
    back.appendChild(el("span", "photo__meta", [b.date, b.place].filter(Boolean).join(" · ")));
    back.appendChild(el("span", "photo__note", b.note || ""));

    inner.appendChild(front);
    inner.appendChild(back);
    btn.appendChild(inner);

    btn.setAttribute("aria-label", "Photograph. Turn it over to read the back.");
    btn.setAttribute("aria-pressed", "false");
    btn.addEventListener("click", function () {
      var flipped = btn.classList.toggle("is-flipped");
      btn.setAttribute("aria-pressed", String(flipped));
    });
    return btn;
  }

  /* --- the open end of the shelf ---------------------------------------- */
  function buildEnd(item) {
    var wrap = el("div", "shelf-end");
    wrap.setAttribute("aria-hidden", "true");
    wrap.appendChild(el("div", "bookend"));
    var room = el("div", "shelf-room");
    room.style.width = "calc(var(--inv-width) * " + (item.volumes || 4) + " + 12px)";
    wrap.appendChild(room);
    return wrap;
  }

  /* A poem's line breaks are the poem, so poems render pre-wrap. Prose is
     prose: reflow it, and treat a blank line as a paragraph break. */
  function splitProse(text) {
    return String(text || "")
      .split(/\n\s*\n/)
      .map(function (p) { return p.replace(/\s*\n\s*/g, " ").trim(); })
      .filter(Boolean);
  }

  /* --- the reader ------------------------------------------------------- */
  function openReader(item) {
    lastFocus = document.activeElement;
    verso.innerHTML = "";
    recto.innerHTML = "";

    if (item.invented) {
      /* Invented volume: a plate, and the poem facing it. */
      var plate = el("img", "plate");
      plate.src = item.image;
      plate.alt = item.imageAlt || "";
      verso.appendChild(plate);
      if (item.imageAlt) verso.appendChild(el("p", "plate-caption", item.imageAlt));

      recto.appendChild(el("p", "page-head", "From the collection"));
      var h = el("h2", "book-title", item.title || "");
      h.id = "reader-title";
      recto.appendChild(h);
      recto.appendChild(el("p", "book-byline", item.author || ""));
      recto.appendChild(el("p", "poem", item.poem || ""));

      coloph.textContent = [item.author, item.press, item.year].filter(Boolean).join("  ·  ");
    } else {
      /* Real book: the quote is the abstract half, the scene is the concrete
         half. Quote left, memory right. */
      var q = el("blockquote", "quote");
      q.appendChild(document.createTextNode("“" + (item.quote || "") + "”"));
      q.appendChild(el("cite", "quote__source", item.source || ""));
      verso.appendChild(el("p", "page-head", "From the book"));
      verso.appendChild(q);

      recto.appendChild(el("p", "page-head", "Where I was"));
      var h2 = el("h2", "book-title", item.title || "");
      h2.id = "reader-title";
      recto.appendChild(h2);
      recto.appendChild(el("p", "book-byline", item.author || ""));
      splitProse(item.scene).forEach(function (para) {
        recto.appendChild(el("p", "scene", para));
      });

      coloph.textContent = [item.author, item.title].filter(Boolean).join("  ·  ");
    }

    reader.showModal();
    reader.querySelector(".reader__close").focus();
  }

  /* Closing always returns you to the shelf, and to the book you opened. */
  reader.addEventListener("close", function () {
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  /* Click the backdrop to close. */
  reader.addEventListener("click", function (e) {
    if (e.target === reader) reader.close();
  });

  /* --- render ----------------------------------------------------------- */
  var spines = [];
  var racks  = [];

  (data.shelves || []).forEach(function (shelf) {
    var unit = el("section", "shelf-unit");
    unit.setAttribute("aria-label", shelf.label || shelf.id);

    if (shelf.label) unit.appendChild(el("h2", "shelf-unit__label", shelf.label));

    var scroll = el("div", "shelf-scroll");
    var rack   = el("div", "shelf-rack");
    var board  = el("div", "shelf-board");
    (shelf.items || []).forEach(function (item) {
      var node;
      if (item.kind === "photo")     node = buildPhoto(item);
      else if (item.kind === "end")  node = buildEnd(item);
      else if (item.faceOut)         node = buildFaceOut(item);
      else                         { node = buildSpine(item); spines.push(node); }
      board.appendChild(node);
    });

    rack.appendChild(board);
    rack.appendChild(el("div", "shelf-plank"));
    racks.push(rack);
    scroll.appendChild(rack);
    unit.appendChild(scroll);
    mount.appendChild(unit);
  });

  /* One bookcase, so every plank is the same length. Ragged shelf widths read
     as a broken layout rather than as the deliberate room at the far end —
     that room is marked by the bookend, not by a short plank. */
  function levelRacks() {
    var widest = 0;
    racks.forEach(function (r) { r.style.width = "max-content"; });
    racks.forEach(function (r) { widest = Math.max(widest, r.getBoundingClientRect().width); });
    racks.forEach(function (r) { r.style.width = widest + "px"; });
  }

  function fitAll() { levelRacks(); spines.forEach(fitTitle); }

  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(fitAll, 150);
  });
})();
