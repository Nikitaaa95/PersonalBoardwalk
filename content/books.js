/* =============================================================================
   content/books.js  —  THE ONLY FILE YOU EDIT TO CHANGE THE SHELF.
   Everything here is a PLACEHOLDER. Overwrite it. Nothing in css/ or js/
   needs to change when you add, remove, or reorder books.

   THE SPINE STANDARD (section 4 of the brief) is enforced in code, not by you:
   every book with `invented: true` is rendered at the same width, the same
   height, the same cloth, the same type, with the same author line and
   colophon rule. That uniformity IS the quiet visual tell between tiers —
   there is no legend and no filter, on purpose. It is also what lets the
   follow-up project drop in as the next volumes on this same shelf: add
   objects to `invented` and they arrive already matching.

   Real books vary — height, width, cloth, typeface — because real shelves do.
   Vary them freely; that variation is what makes the uniform run noticeable.
============================================================================= */

window.SHELF = {

  /* --- Masthead. Keep it to one line; the spine view is the real homepage. --- */
  title: "[SITE TITLE]",
  line:  "[One line. Not a paragraph — the shelf is the homepage.]",

  /* --- Cloths available to REAL books. Add your own; `ink` must stay legible
         against `cloth` from four feet away. ------------------------------- */
  palettes: {
    oxblood: { cloth: "#6b2b2b", ink: "#e8d5b5", rule: "#b08d5a" },
    navy:    { cloth: "#26364d", ink: "#dfe4ea", rule: "#8fa3bd" },
    ochre:   { cloth: "#9a6f28", ink: "#2a1c0c", rule: "#3d2a10" },
    olive:   { cloth: "#4a5230", ink: "#e6e3cf", rule: "#a9ab78" },
    tan:     { cloth: "#c2a476", ink: "#33260f", rule: "#5c4520" },
    plum:    { cloth: "#4a2c42", ink: "#e9d8e4", rule: "#a67c9b" },
    slate:   { cloth: "#3f4750", ink: "#e2e5e8", rule: "#95a0aa" },
    rust:    { cloth: "#8a4426", ink: "#f0dcc6", rule: "#c98f5e" }
  },

  /* --- Typefaces available to REAL books. Invented books never use these. --- */
  faces: {
    garamond:  '"EB Garamond", Georgia, serif',
    playfair:  '"Playfair Display", Georgia, serif',
    cormorant: '"Cormorant Garamond", Georgia, serif',
    oswald:    '"Oswald", "Arial Narrow", sans-serif'
  },

  /* --- The two shelves. Labels must be phrased as the brief's first column,
         never "past / present / future". A third shelf is NOT in this build. -- */
  shelves: [

    /* =======================================================================
       SHELF ONE — least chosen. Assigned, gifted, inherited, stumbled into.
    ======================================================================= */
    {
      id: "happened",
      label: "Books that happened to me",
      items: [

        { kind: "book", invented: true,
          id: "inv-01",
          title: "[SPINE TITLE — the four-foot test]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[19—]",
          /* 10–12 lines. Readable in one breath, standing up. */
          poem: `[Line one of the poem.]
[Line two.]
[Line three.]
[Line four.]
[Line five.]
[Line six.]
[Line seven.]
[Line eight.]
[Line nine.]
[Line ten.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "photo",
          id: "ph-01",
          tilt: -3,
          image: "assets/placeholder-photo.svg",
          alt: "[Describe the photograph.]",
          /* The handwriting on the back. Half a sentence — no more. */
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        },

        { kind: "book", invented: false,
          id: "real-01",
          title: "[REAL BOOK]",
          author: "[Author]",
          palette: "oxblood", face: "garamond", height: 0.94, width: 46,
          quote: "[The pull quote. Let this half be the abstract one.]",
          source: "[Author, Title, p. —]",
          /* Concrete beats abstract: where you were, how old, who gave it to
             you, what you were avoiding at the time. */
          scene: `[Where you were. How old. Who handed it to you. What you were
avoiding that week. Not "this taught me patience" — the actual room.]`
        },

        { kind: "book", invented: true,
          id: "inv-02",
          title: "[SPINE TITLE — longer, to test the fit]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line one.]
[Line two.]
[Line three.]
[Line four.]
[Line five.]
[Line six.]
[Line seven.]
[Line eight.]
[Line nine.]
[Line ten.]
[Line eleven.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture.]"
        },

        { kind: "book", invented: false,
          id: "real-02",
          title: "[SHORT ONE]",
          author: "[Author]",
          palette: "ochre", face: "oswald", height: 0.8, width: 30,
          quote: "[Pull quote.]",
          source: "[Author, Title]",
          scene: `[The concrete scene.]`
        },

        { kind: "book", invented: false,
          id: "real-03",
          title: "[THE ONE YOU'D NEVER RECOMMEND]",
          author: "[Author]",
          palette: "slate", face: "cormorant", height: 1.0, width: 38,
          quote: "[Pull quote.]",
          source: "[Author, Title]",
          /* Section 5: the gap between "made me" and "would give you" is the
             most revealing space on the shelf. This one stays on this shelf
             only — it never appears on the shelf below. */
          scene: `[Rearranged you at 14. Would embarrass you to hand anyone now.
Say why, concretely.]`
        },

        { kind: "book", invented: true,
          id: "inv-03",
          title: "[SPINE TITLE THREE]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Ten to twelve lines.]
[Two.]
[Three.]
[Four.]
[Five.]
[Six.]
[Seven.]
[Eight.]
[Nine.]
[Ten.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture.]"
        },

        { kind: "photo",
          id: "ph-02",
          tilt: 4,
          image: "assets/placeholder-photo.svg",
          alt: "[Describe the photograph.]",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        }
      ]
    },

    /* =======================================================================
       SHELF TWO — most chosen. A recommendation imagines a reader.
    ======================================================================= */
    {
      id: "handed",
      label: "Books I hand people",
      items: [

        /* Face-out: the "start here". First thing anyone opens, so it should
           be your best one. Nothing labels it — the position is the invitation. */
        { kind: "book", invented: true, faceOut: true,
          id: "inv-04",
          title: "[THE BEST ONE — FACE OUT]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[This is the first poem anyone will read.]
[Make it the strongest one you have.]
[Line three.]
[Line four.]
[Line five.]
[Line six.]
[Line seven.]
[Line eight.]
[Line nine.]
[Line ten.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture.]"
        },

        { kind: "book", invented: false,
          id: "real-04",
          title: "[FROM SOMEONE ELSE'S SHELF]",
          author: "[Author]",
          palette: "navy", face: "playfair", height: 0.97, width: 42,
          quote: "[Pull quote.]",
          source: "[Author, Title]",
          /* Section 5: the whole premise in a single object. */
          scene: `[You first saw this on someone else's shelf and then went and
got it. Whose shelf. What made you write the title down.]`
        },

        /* Section 5: the same book, on both shelves. It survived. The re-read
           is the strongest signal of a value that actually held.
           Repeating an id is supported — reuse it verbatim on both shelves. */
        { kind: "book", invented: false,
          id: "real-01",
          title: "[REAL BOOK]",
          author: "[Author]",
          palette: "oxblood", face: "garamond", height: 0.94, width: 46,
          quote: "[The same book, re-read. You may want a different quote here.]",
          source: "[Author, Title, p. —]",
          scene: `[What was different the second time.]`
        },

        { kind: "photo",
          id: "ph-03",
          tilt: -5,
          image: "assets/placeholder-photo.svg",
          alt: "[Describe the photograph.]",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        },

        { kind: "book", invented: true,
          id: "inv-05",
          title: "[SPINE TITLE FIVE]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Ten to twelve lines.]
[Two.]
[Three.]
[Four.]
[Five.]
[Six.]
[Seven.]
[Eight.]
[Nine.]
[Ten.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture.]"
        },

        { kind: "book", invented: false,
          id: "real-05",
          title: "[A LONGER REAL TITLE THAT HAS TO FIT]",
          author: "[Author]",
          palette: "olive", face: "garamond", height: 0.9, width: 34,
          quote: "[Pull quote.]",
          source: "[Author, Title]",
          scene: `[The concrete scene.]`
        },

        /* A bookend, then room. The shelf ends open on purpose: a full shelf
           reads as finished, a shelf with room reads as still going. No blank
           book — that would preempt the next project. `volumes` sizes the gap
           in invented-book widths, so it is literally room for four more. */
        { kind: "end", volumes: 4 }
      ]
    }
  ]
};
