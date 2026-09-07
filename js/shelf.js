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

  /* --- a potted plant ------------------------------------------------------
     Succulents in a terracotta pot, with strings of pearls trailing over the
     front of the plank. Drawn rather than photographed so it takes the shelf's
     scale factor like everything else, and so the vines can be given lengths
     that suit the plank they hang over.

     Some strands are drawn before the pot and some after it, so a few fall
     behind the clay and a few over the front of it. That layering is most of
     what keeps it from reading as a sticker. */
  function buildPlant(item) {
    var NS = "http://www.w3.org/2000/svg";
    var W = 120, H = 132;                /* the pot and its plants */
    var DRAPE = item.drape || 34;        /* how far the longest vine hangs past */

    var wrap = el("div", "plant");
    wrap.setAttribute("aria-hidden", "true");
    wrap._baseW = item.width || 104;

    function node(name, attrs) {
      var n = document.createElementNS(NS, name);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }

    var svg = node("svg", { viewBox: "0 0 " + W + " " + H, class: "plant__art", focusable: "false" });

    var defs = node("defs");
    var clay = node("linearGradient", { id: "pot-clay", x1: "0", y1: "0", x2: "1", y2: "0" });
    [["0", "#5e3620"], ["0.30", "#a2603c"], ["0.58", "#8b5032"], ["1", "#4d2c19"]]
      .forEach(function (st) { clay.appendChild(node("stop", { offset: st[0], "stop-color": st[1] })); });
    defs.appendChild(clay);
    svg.appendChild(defs);

    /* --- one string of pearls -------------------------------------------- */
    function strand(g, x0, y0, dx, endY, r, tone) {
      var len = endY - y0;
      /* Down the clay first, out only near the end: a strand leaves the soil
         lying against the pot, and it is the weight of the tip that swings it
         clear. Splaying it straight off the rim gives a spider, not a plant. */
      var p1 = [x0 + dx * 0.10, y0 + len * 0.34];
      var p2 = [x0 + dx * 0.95, y0 + len * 0.76];
      var p3 = [x0 + dx, endY];

      g.appendChild(node("path", {
        d: "M" + x0 + "," + y0 +
           " C" + p1[0].toFixed(1) + "," + p1[1].toFixed(1) +
           " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1) +
           " " + p3[0].toFixed(1) + "," + p3[1].toFixed(1),
        fill: "none", stroke: "#5a7850", "stroke-width": "1.3", "stroke-linecap": "round"
      }));

      /* Close-set, and thinning towards the tip the way a growing end does. */
      var beads = Math.max(6, Math.round(len / 5.4));
      for (var b = 0; b <= beads; b++) {
        var t = 0.04 + (b / beads) * 0.96, mt = 1 - t;
        var px = mt*mt*mt*x0 + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t*t*t*p3[0];
        var py = mt*mt*mt*y0 + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t*t*t*p3[1];
        var pr = r * (1 - t * 0.30) * (b % 3 === 1 ? 0.88 : 1);
        g.appendChild(node("circle", { cx: px.toFixed(1), cy: py.toFixed(1), r: pr.toFixed(2), fill: tone }));
        g.appendChild(node("circle", {
          cx: (px - pr * 0.30).toFixed(1), cy: (py - pr * 0.32).toFixed(1),
          r: (pr * 0.32).toFixed(2), fill: "#c3dab3", opacity: "0.7"
        }));
      }
    }

    /* --- a ring of pointed leaves ---------------------------------------- */
    function leaves(g, cx, cy, h, count, fill, turn) {
      var w = h * 0.33;
      for (var i = 0; i < count; i++) {
        var a = turn + (i / count) * 360;
        g.appendChild(node("path", {
          d: "M" + cx + "," + cy +
             " C" + (cx - w) + "," + (cy - h * 0.52) +
             " " + (cx - w * 0.42) + "," + (cy - h) +
             " " + cx + "," + (cy - h) +
             " C" + (cx + w * 0.42) + "," + (cy - h) +
             " " + (cx + w) + "," + (cy - h * 0.52) +
             " " + cx + "," + cy + " Z",
          fill: fill,
          transform: "rotate(" + a.toFixed(1) + " " + cx + " " + cy + ")"
        }));
      }
    }

    /* A rosette is rings of leaves, each shorter and paler than the one under
       it and set between its neighbours, which is how a real one furls. */
    function rosette(cx, cy, rad, turn) {
      var g = node("g", {});
      leaves(g, cx, cy, rad,        11, "#5f7f55", turn);
      leaves(g, cx, cy, rad * 0.76,  9, "#799a6a", turn + 16);
      leaves(g, cx, cy, rad * 0.52,  7, "#93b581", turn + 33);
      g.appendChild(node("circle", { cx: cx, cy: cy, r: rad * 0.13, fill: "#bcd6ab" }));
      return g;
    }

    /* --- the vines that fall behind the pot ------------------------------- */
    /* Uneven spacing and no two the same length: four evenly spaced strands
       read as the wires a hanging basket comes on. Density is what makes it a
       plant, so they are close-set and allowed to cross. */
    var back = node("g", {});
    [[27, -11, 0.44], [34, -6, 0.92], [40, -3, 0.20], [82, 5, 0.66], [90, 10, 1.0]]
      .forEach(function (v, i) {
        strand(back, v[0], 82, v[1], H + DRAPE * v[2], i % 2 ? 3.2 : 3.5, i % 2 ? "#7d9c6c" : "#86a574");
      });
    svg.appendChild(back);

    /* --- the pot ---------------------------------------------------------- */
    svg.appendChild(node("path", {           /* body */
      d: "M33,92 L87,92 L79,127 Q78.5,130.5 75,130.5 L45,130.5 Q41.5,130.5 41,127 Z",
      fill: "url(#pot-clay)"
    }));
    svg.appendChild(node("path", {           /* rim, standing a little proud of it */
      d: "M28,81 L92,81 Q94.5,81 94.5,83.5 L94.5,89.5 Q94.5,92 92,92 L28,92 Q25.5,92 25.5,89.5 L25.5,83.5 Q25.5,81 28,81 Z",
      fill: "url(#pot-clay)"
    }));
    svg.appendChild(node("path", {           /* the shadow the rim throws */
      d: "M33,92 L87,92 L86,96.5 L34,96.5 Z", fill: "#000", opacity: ".22"
    }));
    svg.appendChild(node("ellipse", { cx: "60", cy: "82.5", rx: "32", ry: "3.6", fill: "#241a13" }));

    /* --- the succulents ---------------------------------------------------- */
    svg.appendChild(rosette(38, 74, 11.5, 17));
    svg.appendChild(rosette(83, 75, 11,   33));
    svg.appendChild(rosette(60, 65, 17,    0));

    /* --- and the vines that fall in front of it ----------------------------- */
    var front = node("g", {});
    [[45, -7, 0.83], [53, -2, 0.31], [64, 2, 0.58], [73, 6, 0.15]]
      .forEach(function (v, i) {
        strand(front, v[0], 86, v[1], H + DRAPE * v[2], i % 2 ? 2.9 : 3.2, i % 2 ? "#7b9a6a" : "#88a877");
      });
    svg.appendChild(front);

    wrap.appendChild(svg);
    return wrap;
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
      else if (item.kind === "plant") node = buildPlant(item);
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
      /* A pixel of slack: widths are measured as whole pixels, and a run that
         lands exactly on the case can still round a pixel over it and put a
         scrollbar under the books. */
      var next = k * ((avail - 1) / w);
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
