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
    } else {
      var p = palette(item.palette);
      btn.style.width = (item.width || 40) + "px";
      btn.style.height = ((item.height || 0.9) * 100) + "%";
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

  /* --- face-out ------------------------------------------------------------
     Works for either kind of book. A volume I wrote uses the standard binding;
     a book I've read uses its own cloth, stamped rather than printed. */
  function buildFaceOut(item) {
    var btn = el("button", "face-out");
    btn.type = "button";

    var frame  = el("span", "face-out__frame");
    var title  = el("span", "face-out__title", item.title || "");
    var rules  = el("span", "face-out__rules");
    var author = el("span", "face-out__author",
      item.invented ? [item.author, item.year].filter(Boolean).join("  ·  ") : (item.author || ""));

    if (!item.invented) {
      var p = palette(item.palette);
      btn.classList.add("face-out--stamped");
      if (item.device) btn.classList.add("face-out--device");
      btn.style.height = ((item.height || 0.92) * 100) + "%";
      if (item.cover) {
        /* The scan's own proportions decide the width, so the boards are not
           stretched. Height still comes from the shelf. */
        btn.style.setProperty("--cover-aspect", item.coverAspect || "0.657");
      } else {
        btn.style.width = (item.faceWidth || 150) + "px";
      }
      btn.style.background =
        "linear-gradient(100deg," + shade(p.cloth, -12) + " 0 7px," + p.cloth + " 7px 100%)";
      btn.style.color = p.ink;
      btn.style.fontFamily = face(item.face);
      frame.style.borderColor = p.rule;
      rules.style.borderColor = p.rule;
    }

    /* The 1923 binding carries no ruled frame — it is lettering and a device
       stamped straight into the cloth — so the frame is opt-in. */
    if (item.cover) {
      /* A real cover image, if you have one, replaces the stamped lettering. */
      btn.classList.add("face-out--art");
      var art = el("img", "face-out__art");
      art.src = item.cover;
      art.alt = "";
      btn.appendChild(art);
    } else if (item.device) {
      /* Lettering at the head, device centred in the field below it. */
      var dev = el("img", "face-out__device");
      dev.src = item.device;
      dev.alt = "";
      btn.appendChild(title);
      btn.appendChild(author);
      btn.appendChild(dev);
    } else {
      if (item.frame !== false) btn.appendChild(frame);
      btn.appendChild(title);
      btn.appendChild(rules);
      btn.appendChild(author);
    }

    btn.setAttribute("aria-label", "Open " + (item.title || "book") +
      (item.author ? ", " + item.author : ""));
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

  /* --- the journals: volumes not written yet -----------------------------
     Deliberately not openable — there is nothing inside them to read. They
     carry the same binding as the books I wrote, so they read as the next
     ones in that run rather than as decoration. */
  function buildJournals(item) {
    var years = item.years || [];
    var stack = el("div", "journals");
    stack.setAttribute("role", "img");
    stack.setAttribute("aria-label",
      "A stack of empty journals" + (years.length ? " labelled " + years.join(", ") : "") + ".");

    /* Nearest year on top — the one you would reach for first. */
    years.forEach(function (year, i) {
      var j = el("div", "journal");
      j.style.transform = "translateX(" + (i % 2 ? 4 : -3) + "px)";
      j.style.width = "calc(var(--inv-width) * " + (3.4 - i * 0.12).toFixed(2) + ")";
      j.appendChild(el("span", "journal__year", year));
      stack.appendChild(j);
    });
    return stack;
  }

  /* --- the open end of the shelf ---------------------------------------- */
  function buildEnd(item) {
    var wrap = el("div", "shelf-end");
    wrap.setAttribute("aria-hidden", "true");
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

    var scroll = el("div", "shelf-scroll");
    var rack   = el("div", "shelf-rack");
    var board  = el("div", "shelf-board");
    (shelf.items || []).forEach(function (item) {
      var node;
      if (item.kind === "photo")     node = buildPhoto(item);
      else if (item.kind === "end")  node = buildEnd(item);
      else if (item.kind === "journals") node = buildJournals(item);
      else if (item.faceOut)         node = buildFaceOut(item);
      else                         { node = buildSpine(item); spines.push(node); }
      board.appendChild(node);
    });

    var plank = el("div", "shelf-plank");
    /* A shelf with no label is a continuation of the run above it. */
    if (shelf.label) plank.appendChild(el("h2", "shelf-plank__label", shelf.label));

    rack.appendChild(board);
    rack.appendChild(plank);
    racks.push(rack);
    scroll.appendChild(rack);
    unit.appendChild(scroll);
    mount.appendChild(unit);
  });

  /* Size the case to its longest run, so shelves fill the furniture instead of
     trailing off into empty plank on the right. The deliberate room at the end
     of a run still shows, because it is part of that run's measured width. */
  function fitCase() {
    if (!racks.length) return;

    var pad = 0;
    var cs = window.getComputedStyle(mount);
    pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);

    /* Measure each run at its natural width, not the width it was stretched to. */
    racks.forEach(function (r) { r.style.width = "max-content"; r.style.minWidth = "0"; });
    var widest = 0;
    racks.forEach(function (r) { widest = Math.max(widest, r.getBoundingClientRect().width); });
    racks.forEach(function (r) { r.style.width = ""; r.style.minWidth = ""; });

    var maxAllowed = parseFloat(cs.getPropertyValue("--case-max")) || Infinity;
    var target = Math.min(widest + pad, maxAllowed, document.documentElement.clientWidth - 48);
    mount.style.width = Math.round(target) + "px";
  }

  function fitAll() { fitCase(); spines.forEach(fitTitle); }

  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(fitAll, 150);
  });
})();
