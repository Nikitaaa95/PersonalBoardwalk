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
      btn._baseW = item.width || 40;
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
           stretched. Height still comes from the shelf, so it needs no scaling. */
        btn.style.setProperty("--cover-aspect", item.coverAspect || "0.657");
      } else {
        btn._baseW = item.faceWidth || 150;
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
    /* Each print keeps its own proportions; the frame follows the picture. */
    inner._baseW = item.width || 124;
    inner._aspect = item.aspect || 1.29;

    var front = el("div", "photo__face");
    var img = el("img");
    img.src = item.image;
    img.alt = item.alt || "";
    front.appendChild(img);

    var back = el("div", "photo__face photo__face--back");
    var backing = el("div", "photo__backing");
    var b = item.back || {};
    backing.appendChild(el("span", "photo__meta", [b.date, b.place].filter(Boolean).join(" · ")));
    backing.appendChild(el("span", "photo__note", b.note || ""));
    back.appendChild(backing);

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
    wrap._isRoom = true;
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

  /* --- render -------------------------------------------------------------
     A run is a labelled sequence of objects. The data may already split one
     across two shelves — a shelf with no label continues the run above it — and
     that is exactly what happens again here when the window is too narrow to
     hold a run on one plank: it spills onto the next, the way a section of a
     real bookcase does, instead of running off the side of the furniture. */
  var spines    = [];
  var scalables = [];   /* fixed-width books, scaled to fill the case */
  var frames    = [];   /* framed photographs, scaled with their aspect */
  var shelves   = [];

  (data.shelves || []).forEach(function (shelf) {
    /* One entry per authored shelf. Wrapping only ever splits one of these
       further — it never joins two, because where a run breaks is a decision
       made in content/books.js, not a consequence of the window. */
    var run = { label: shelf.label, nodes: [] };
    shelves.push(run);

    (shelf.items || []).forEach(function (item) {
      var node;
      if (item.kind === "photo")     node = buildPhoto(item);
      else if (item.kind === "end")  node = buildEnd(item);
      else if (item.kind === "journals") node = buildJournals(item);
      else if (item.faceOut)         node = buildFaceOut(item);
      else                         { node = buildSpine(item); spines.push(node); }
      if (node._baseW) scalables.push(node);
      if (node.firstChild && node.firstChild._baseW) frames.push(node.firstChild);
      run.nodes.push(node);
    });
  });

  /* Planks are rebuilt on every layout, but the objects standing on them are
     built once and moved, so click handlers and a flipped photograph survive a
     resize. */
  function renderRows(rows) {
    mount.innerHTML = "";
    rows.forEach(function (row) {
      var unit   = el("section", "shelf-unit");
      unit.setAttribute("aria-label", row.label || "Continued");
      var scroll = el("div", "shelf-scroll");
      var rack   = el("div", "shelf-rack");
      var board  = el("div", "shelf-board");
      row.nodes.forEach(function (n) { board.appendChild(n); });

      var plank = el("div", "shelf-plank");
      /* Only the first plank of a run is engraved; the rest read as continuation. */
      if (row.label) plank.appendChild(el("h2", "shelf-plank__label", row.label));

      rack.appendChild(board);
      rack.appendChild(plank);
      scroll.appendChild(rack);
      unit.appendChild(scroll);
      mount.appendChild(unit);
    });
  }

  function wholeShelves() {
    return shelves.map(function (r) { return { label: r.label, nodes: r.nodes }; });
  }

  /* The case is the page, so instead of sizing the furniture to its books, the
     books are scaled to the furniture. Widths are all fixed pixels, so a
     full-width case would otherwise trail off into empty plank again.

     Fixed chrome — gaps, photo margins, case padding — does not scale with the
     books, so one pass overshoots; a few iterations converge. */
  var BASE_INV     = 44;
  var BASE_SHELF_H = 232;   /* a plank's height on a laptop, at scale 1 */
  var ONE_ROW_MIN  = 0.66;  /* below this, spines stop reading — wrap instead */
  var WRAP_SCALE   = 1;     /* wrapped, books return to their designed size */
  var GAP          = 3;     /* .shelf-board gap */
  var BOARD_PAD    = 28;    /* .shelf-board padding, both sides */

  function applyScale(k) {
    mount.style.setProperty("--inv-width", (BASE_INV * k).toFixed(2) + "px");
    scalables.forEach(function (el) {
      el.style.width = (el._baseW * k).toFixed(2) + "px";
    });
    frames.forEach(function (inner) {
      var w = inner._baseW * k;
      inner.style.width = w.toFixed(2) + "px";
      inner.style.height = (w / inner._aspect).toFixed(2) + "px";
    });
  }

  /* Margins are chrome and do not scale, but they do take room on the plank.
     offsetWidth, not a bounding rect: the photographs are tilted, and a rect
     measures the tilted box rather than the room the frame actually occupies. */
  function outerWidth(node) {
    var cs = window.getComputedStyle(node);
    return node.offsetWidth +
           parseFloat(cs.marginLeft || 0) + parseFloat(cs.marginRight || 0);
  }

  /* Add the objects up rather than asking for the plank's max-content width:
     a face-out book sized from its cover's proportions takes its width from its
     height, and under max-content that height resolves against nothing, so the
     plank measures short and every book is scaled up to a case it overruns. */
  function boardWidth(board) {
    var w = BOARD_PAD;
    for (var i = 0; i < board.children.length; i++) {
      w += outerWidth(board.children[i]) + (i ? GAP : 0);
    }
    return w;
  }

  function widestRun() {
    var widest = 0;
    [].slice.call(mount.querySelectorAll(".shelf-board")).forEach(function (b) {
      widest = Math.max(widest, boardWidth(b));
    });
    return widest;
  }

  /* Snapshot every object's width while they are all still standing on a
     plank. Packing takes objects off the shelf to try them elsewhere, and a
     node that is not in the document measures zero — which is how a thing wider
     than the plank talks its way back on. */
  function measureAll() {
    shelves.forEach(function (run) {
      run.nodes.forEach(function (n) {
        /* document.contains, not parentNode: a dropped object keeps a parent —
           the discarded plank it was standing on — and measures zero there. */
        if (document.contains(n)) n._w = outerWidth(n);
      });
    });
  }

  function widestObject() {
    var widest = 0;
    shelves.forEach(function (run) {
      run.nodes.forEach(function (n) { widest = Math.max(widest, n._w || 0); });
    });
    return widest;
  }

  /* Fill each plank in order, then start another. Greedy is right here: the
     objects are in a deliberate order and must stay in it. */
  function packShelves(avail) {
    var rows = [];
    shelves.forEach(function (run) {
      var row = null, used = 0, first = true;
      run.nodes.forEach(function (n) {
        var w = n._w || 0;
        /* Room at the end of a run is leftover plank, so it can only ever be
           leftover: if it will not fit after the last book it is dropped
           rather than given a plank of its own, which would read as an empty
           shelf instead of as room. */
        if (n._isRoom && row && used + GAP + w > avail) return;
        if (!row || (row.nodes.length && used + GAP + w > avail)) {
          row = { label: first ? run.label : null, nodes: [] };
          rows.push(row);
          used = 0;
          first = false;
        }
        used += (row.nodes.length ? GAP : 0) + w;
        row.nodes.push(n);
      });
    });
    return rows;
  }

  var scale = 1;

  function shelfHeight(k) {
    mount.style.setProperty("--shelf-h", Math.round(BASE_SHELF_H * k) + "px");
  }

  function fitOneRow(avail) {
    var k = scale;
    for (var pass = 0; pass < 5; pass++) {
      applyScale(k);
      var w = widestRun();
      if (!w) break;
      var next = k * (avail / w);
      next = Math.max(0.3, Math.min(2.2, next));
      if (Math.abs(next - k) < 0.002) { k = next; break; }
      k = next;
    }
    return k;
  }

  function layout() {
    if (!shelves.length) return;
    var cs = window.getComputedStyle(mount);
    var avail = mount.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (avail <= 0) return;

    /* Measure with each run whole: that is the wide case, and it is also what
       says whether one plank per run is still readable. */
    mount.classList.remove("bookcase--wrapped");
    renderRows(wholeShelves());

    var k = fitOneRow(avail);
    if (k >= ONE_ROW_MIN) { scale = k; applyScale(k); return; }

    /* Too narrow. Give the books their designed size back and spend the extra
       width the shelf no longer has on extra planks — the case grows downward
       and the page scrolls, rather than the shelf scrolling sideways. */
    scale = WRAP_SCALE;
    mount.classList.add("bookcase--wrapped");
    shelfHeight(scale);
    applyScale(scale);
    measureAll();

    /* One object wider than the whole plank cannot be wrapped away; shrink
       until it fits rather than leaving it to scroll. */
    var widest = widestObject();
    if (widest > avail - BOARD_PAD) {
      scale = Math.max(0.4, scale * (avail - BOARD_PAD) / widest);
      shelfHeight(scale);
      applyScale(scale);
      measureAll();
    }

    /* Twice: a face-out book sized from its cover's proportions takes its width
       from the plank's height, and the first pass is what settles that. */
    renderRows(packShelves(avail - BOARD_PAD));
    measureAll();
    renderRows(packShelves(avail - BOARD_PAD));
  }

  function fitAll() { layout(); spines.forEach(fitTitle); }

  fitAll();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);

  var t;
  window.addEventListener("resize", function () {
    clearTimeout(t);
    t = setTimeout(fitAll, 150);
  });
})();
