/* =============================================================================
   content/books.js  —  THE ONLY FILE YOU EDIT TO CHANGE THE SHELF.
   Everything here is a PLACEHOLDER. Overwrite it. Nothing in css/ or js/
   needs to change when you add, remove, or reorder books.

   THREE SHELVES:
     1 + 2  books I wrote    (kind "book", invented: true)
     3      books I've read  (kind "book", invented: false)

   Shelf 2 has no `label` — a shelf without one reads as a continuation of the
   run above it, which is how a real bookcase behaves when a section spills.

   ON THE NUMBER OF VOLUMES: two full shelves of books I wrote is a lot of
   poems, and the brief argued the opposite ("4–5 revised invented books beats
   10 first drafts"). The case sizes itself to its longest run, so deleting
   entries narrows the furniture instead of leaving empty plank — cut freely. Nothing else needs to change.

   THE SPINE STANDARD is enforced in code, not by you: every book with
   `invented: true` renders at the same width, height, cloth, type, author line
   and colophon. That is what lets the follow-up project arrive as the next
   volumes on this same shelf — add objects and they already match. The journal
   stack carries the same binding for the same reason.

   Books I've read vary — height, width, cloth, typeface — because real shelves
   do. Vary them freely.
============================================================================= */

window.SHELF = {

  /* --- Cloths for the books I've read. `ink` must stay legible on `cloth`. -- */
  palettes: {
    oxblood: { cloth: "#6b2b2b", ink: "#e8d5b5", rule: "#b08d5a" },
    navy:    { cloth: "#26364d", ink: "#dfe4ea", rule: "#8fa3bd" },
    ochre:   { cloth: "#9a6f28", ink: "#2a1c0c", rule: "#3d2a10" },
    olive:   { cloth: "#4a5230", ink: "#e6e3cf", rule: "#a9ab78" },
    tan:     { cloth: "#c2a476", ink: "#33260f", rule: "#5c4520" },
    plum:    { cloth: "#4a2c42", ink: "#e9d8e4", rule: "#a67c9b" },
    slate:   { cloth: "#3f4750", ink: "#e2e5e8", rule: "#95a0aa" },
    rust:    { cloth: "#8a4426", ink: "#f0dcc6", rule: "#c98f5e" },
    /* Black cloth stamped in gilt — the 1923 Knopf binding of The Prophet. */
    gilt:    { cloth: "#100f0e", ink: "#c9a961", rule: "#c9a961" },

    /* The black livery of a classics paperback: off-white lettering, and the
       series orange kept for the rules only. */
    classic: { cloth: "#141518", ink: "#f2efe6", rule: "#dd5f2c" }
  },

  /* --- Typefaces for the books I've read. Books I wrote never use these. --- */
  faces: {
    garamond:  '"EB Garamond", Georgia, serif',
    playfair:  '"Playfair Display", Georgia, serif',
    cormorant: '"Cormorant Garamond", Georgia, serif',
    oswald:    '"Oswald", "Arial Narrow", sans-serif'
  },

  shelves: [

    /* =====================================================================
       SHELF ONE — books I wrote. The face-out volume is the "start here":
       the first thing anyone opens, so it should be the best one. Nothing
       labels it; the position is the invitation.
    ===================================================================== */
    {
      id: "wrote-1",
      label: "Books I wrote",
      items: [
        { kind: "book", invented: true,
          id: "inv-04",
          title: "[SPINE TITLE FOUR]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-05",
          title: "[SPINE TITLE FIVE]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-06",
          title: "[SPINE TITLE SIX]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

                { kind: "book", invented: true,
          id: "inv-20",
          title: "[SPINE TITLE TWENTY-THREE]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-21",
          title: "[SPINE TITLE TWENTY-FOUR]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-22",
          title: "[SPINE TITLE TWENTY-FIVE]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-23",
          title: "[SPINE TITLE TWENTY-SIX]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "photo",
          id: "ph-01",
          tilt: -3,
          image: "assets/photo-family-three.jpg",
          aspect: 1.333, width: 106,
          alt: "A young family of three.",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        },

        { kind: "book", invented: true, faceOut: true,
          id: "inv-01",
          title: "The Collected Works, So Far",
          author: "Nikita Thomas",
          portrait: "assets/portrait.jpg",
          portraitAlt: "Nikita Thomas.",
          image: "assets/portrait.jpg",
          imageAlt: "Nikita Thomas.",
          intro: `Every shelf is a self-portrait, whether the person who filled
it meant one or not. This one is on purpose.

The top two shelves hold books I wrote. Most of them do not exist yet. They are
the ones I would write if I had the time and the nerve — a volume for each thing
I have thought about long enough to have given it a title. They are bound alike
deliberately: the same cloth, the same rule, the same press. You will notice
that sameness before you read a single one of the titles, which is the point.
The books I made look like they came from one pair of hands, because they did.

The bottom shelf holds books I have actually read. Those vary — a tall one, a
thin one, one I would never recommend — the way a real shelf does, and the
variation is what makes the uniform run above it noticeable. Open one and you
get a line I kept and where I was standing when I read it.

At the end of the second shelf are three empty journals: 2027, 2028, 2029.
There is nothing inside them. That is the honest part of the case — most of it
is still ahead of me.

Nothing here is behind glass. Pull anything down.`
        },

        ]
    },

    /* =====================================================================
       SHELF TWO — the same run, continued. No label, on purpose. It ends
       with the journals and then room.
    ===================================================================== */
    {
      id: "wrote-2",
      label: null,
      items: [
        { kind: "book", invented: true,
          id: "inv-15",
          title: "[SPINE TITLE FIFTEEN]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-16",
          title: "[SPINE TITLE SIXTEEN]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-17",
          title: "[SPINE TITLE SEVENTEEN]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-18",
          title: "[SPINE TITLE EIGHTEEN]",
          author: "[Your name]",
          press: "[Invented Press]",
          year: "[20—]",
          poem: `[Line 1.]
[Line 2.]
[Line 3.]
[Line 4.]
[Line 5.]
[Line 6.]
[Line 7.]
[Line 8.]
[Line 9.]
[Line 10.]`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        /* The volumes not written yet. Same binding as the books above, so they
           read as the next ones in the run rather than as decoration. Not
           openable — there is nothing inside them to read yet. */
        /* The plant stands on the journals, and its vines fall down over
           them. `plant` is optional; drop it and the stack is just a stack. */
                { kind: "photo",
          id: "ph-03",
          tilt: -5,
          image: "assets/photo-family-five.jpg",
          aspect: 1.507, width: 114,
          alt: "A family of five, dressed for a celebration.",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        },

        { kind: "journals", years: ["2027", "2028", "2029"],
          plant: { drape: 56 } },

        /* Room at the end: a full shelf reads as finished, a shelf with room
           reads as still going. `volumes` is measured in book widths. */
        { kind: "end", volumes: 1 }
      ]
    },

    /* =====================================================================
       SHELF THREE — books I've read.
    ===================================================================== */
    {
      id: "read",
      label: "Books I've read",
      items: [
        { kind: "book", invented: false, faceOut: true,
          id: "real-prophet",
          title: "The Prophet",
          author: "Kahlil Gibran",
          palette: "gilt", face: "garamond",
          height: 0.92,
          cover: "assets/the-prophet-1923.jpg",
          coverAspect: 0.657,
          quote: "Your children are not your children. They are the sons and daughters of Life's longing for itself.",
          source: "Kahlil Gibran, The Prophet (Knopf, 1923), 'On Children'",
          scene: `[Where you were. How old. Who handed it to you. What you were avoiding that week.]`
        },

        { kind: "photo",
          id: "ph-02",
          tilt: 4,
          image: "assets/photo-turban.jpg",
          aspect: 0.754, width: 78,
          alt: "A small child in a red turban, tongue out, with a drawn-on moustache.",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        },

        { kind: "book", invented: false,
          id: "real-little-women",
          title: "Little Women",
          author: "Louisa May Alcott",
          /* Photographed spine: the decorated Roberts Brothers cloth, blocked
             and gilt, with the publisher's device at the foot. */
          spineImage: "assets/spine-little-women.jpg",
          spineAspect: 0.252, height: 0.96,
          quote: "Christmas won't be Christmas without any presents.",
          source: "Louisa May Alcott, Little Women, opening line",
          scene: `[Where you were. How old. Which sister you thought you were, and which one you actually were.]`
        },

        { kind: "book", invented: false,
          id: "real-midnight",
          title: "The Midnight Library",
          author: "Matt Haig",
          /* Photographed spine: the Viking jacket, navy with the gilt script. */
          spineImage: "assets/spine-midnight-library.jpg",
          spineAspect: 0.111, height: 0.93,
          quote: "[Your pull quote.]",
          source: "Matt Haig, The Midnight Library",
          scene: `[Where you were. What you were deciding at the time.]`
        },

        { kind: "book", invented: false,
          id: "real-watchman",
          title: "Go Set a Watchman",
          author: "Harper Lee",
          /* Photographed spine: the Harper jacket, lavender with the branch
             running the length of the board. */
          spineImage: "assets/spine-go-set-a-watchman.jpg",
          spineAspect: 0.127, height: 0.93,
          quote: "[Your pull quote.]",
          source: "Harper Lee, Go Set a Watchman",
          scene: `[Where you were. Whether you read it after Mockingbird, and what it did to that book.]`
        },

        { kind: "book", invented: false,
          id: "real-las-casas",
          title: "A Short Account of the Destruction of the Indies",
          author: "Bartolomé de las Casas",
          /* No photograph of this one, so the spine is drawn: black classics
             livery, the series orange kept to the rules, publisher at the foot. */
          spineAuthor: "Las Casas",
          palette: "classic", face: "garamond", height: 0.99, width: 44,
          imprint: "Penguin Classics",
          quote: "[Your pull quote — I left this blank rather than risk misquoting a translation.]",
          source: "Bartolomé de las Casas, A Short Account of the Destruction of the Indies (1552)",
          scene: `[Where you were. How old. Whether it was assigned. What you did with it afterwards.]`
        },

        { kind: "book", invented: false,
          id: "real-pride",
          title: "Pride and Prejudice",
          author: "Jane Austen",
          /* Photographed spine: the George Allen "Peacock" edition of 1894,
             gilt feathers on dark cloth, illustrated by Hugh Thomson. */
          spineImage: "assets/spine-pride-and-prejudice.jpg",
          spineAspect: 0.230, height: 0.99,
          quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
          source: "Jane Austen, Pride and Prejudice, opening line",
          scene: `[Where you were. How old. Whether you got past the first fifty pages the first time.]`
        },

        { kind: "book", invented: false,
          id: "real-chosen",
          title: "The Chosen",
          author: "Chaim Potok",
          /* Photographed spine: the Simon and Schuster jacket, worn pale. */
          spineImage: "assets/spine-the-chosen.jpg",
          spineAspect: 0.104, height: 0.94,
          quote: "[Your pull quote.]",
          source: "Chaim Potok, The Chosen",
          scene: `[Where you were. How old. Who handed it to you.]`
        },

        { kind: "book", invented: false,
          id: "real-horse",
          title: "The Horse and His Boy",
          author: "C. S. Lewis",
          /* Photographed spine: the boxed-set Chronicles of Narnia, book 3,
             maroon board with the pink block at the foot. */
          spineImage: "assets/spine-horse-and-his-boy.jpg",
          spineAspect: 0.067, height: 0.90,
          quote: "[Your pull quote.]",
          source: "C. S. Lewis, The Horse and His Boy",
          scene: `[Where you were. How old. Whether you read the seven in order.]`
        },

        { kind: "book", invented: false,
          id: "real-peter-pan",
          title: "Peter Pan and Wendy",
          author: "J. M. Barrie",
          /* Photographed spine: the Folio edition, blue cloth blocked in silver. */
          spineImage: "assets/spine-peter-pan.jpg",
          spineAspect: 0.110, height: 0.97,
          quote: "All children, except one, grow up.",
          source: "J. M. Barrie, Peter and Wendy, opening line",
          scene: `[Where you were. How old. Who handed it to you. Not "this taught me about childhood" — the actual room.]`
        },

        /* The three volumes stand together and are lettered alike, which is
           the same trick the books I wrote use one shelf up. */
        { kind: "book", invented: false,
          id: "real-return",
          title: "The Return of the King",
          author: "J. R. R. Tolkien",
          /* Photographed spine: the Houghton Mifflin jacket, cropped from the
             picture of the three together — only this one is shelved. */
          spineImage: "assets/spine-return-of-the-king.jpg",
          spineAspect: 0.105, height: 0.95,
          quote: "I will not say: do not weep; for not all tears are an evil.",
          source: "J. R. R. Tolkien, The Return of the King",
          scene: `[Where you were standing when it ended.]`
        },

        { kind: "book", invented: false,
          id: "real-dictionary",
          title: "The Dictionary of Lost Words",
          author: "Pip Williams",
          /* Photographed spine: the poppies-and-vines jacket over dark ground. */
          spineImage: "assets/spine-dictionary-lost-words.jpg",
          spineAspect: 0.128, height: 0.96,
          quote: "[Your pull quote.]",
          source: "Pip Williams, The Dictionary of Lost Words",
          scene: `[Where you were. Which word you went and looked up afterwards.]`
        },

        { kind: "book", invented: false,
          id: "real-mom-died",
          title: "I'm Glad My Mom Died",
          author: "Jennette McCurdy",
          /* Photographed spine: the yellow board, photographed lying down and
             turned upright so the title reads head to foot like the others. */
          spineImage: "assets/spine-glad-my-mom-died.jpg",
          spineAspect: 0.129, height: 0.90,
          quote: "[Your pull quote.]",
          source: "Jennette McCurdy, I'm Glad My Mom Died",
          scene: `[Where you were. Whether you read it in one sitting, and who you told about it.]`
        },

        { kind: "photo",
          id: "ph-04",
          tilt: 3,
          image: "assets/photo-dog.jpg",
          aspect: 0.989, width: 90,
          alt: "A black dog on grass, looking straight at the camera.",
          back: { date: "[Month, year]", place: "[Place]", note: "[Half a sentence.]" }
        }
      ]
    }
  ]
};
