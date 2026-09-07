# Personal Boardwalk

A browsable bookshelf that fills the window. Spines are the homepage; click one
and the book opens.

Three shelves in one case, sized to the window — and on a narrow one, the runs
spill onto extra planks rather than scrolling sideways:

| Shelf | Holds |
|---|---|
| 1 | Books I wrote |
| 2 | …continued, ending in the journals and the room |
| 3 | Books I've read |

Built from the StoryWalk bookshelf brief. Static HTML, CSS and JS — no build step,
no dependencies. Open `index.html` directly, or serve the folder.

```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Editing the shelf

**`content/books.js` is the only file you edit.** Everything currently in it is a
placeholder. Nothing in `css/` or `js/` needs to change when you add, remove or
reorder books.

Three object types, matching the brief:

| `kind` | Opens to | Fields |
|---|---|---|
| `book` with `invented: true` | plate + poem | `title, author, press, year, poem, image, imageAlt`; `intro` instead of `poem` for prose |
| `book` with `invented: false` | quote + scene | `title, author, palette, face, height, width, quote, source, scene`; optional `imprint` (publisher at the foot) and `spineAuthor` (a shorter name for the spine) |
| …with `spineImage` | quote + scene | a photograph of the real spine: `spineImage, spineAspect, height` — replaces the cloth and lettering entirely |
| either, plus `faceOut: true` | as above | stands face out; add `faceWidth`, `cover` for a real cover image, or `portrait` for a plated photograph |
| `photo` | flips in place | `image, aspect, width, alt, tilt, back: {date, place, note}` |
| `journals` | not openable | `years` — e.g. `["2027", "2028", "2029"]`; optional `plant` |
| `plant` | not openable | `width`, `drape` — how far the vines hang past the pot |
| `end` | — | `volumes` — how many volumes of room to leave |

A shelf with `label: null` reads as a continuation of the run above it, the way
a real bookcase behaves when a section spills onto the next shelf.

Poems keep their line breaks. Scenes and `intro` are prose and reflow; leave a
blank line between paragraphs. The volume at the end of the top shelf carries
an `intro` rather than a poem: it is the introduction to the case, so it is
the one book on the shelf that is about the shelf.

Photographs hang in clean gold frames. `aspect` is the print's width ÷ height
and `width` is how wide the frame sits on the shelf — the frame follows the
picture's proportions, so nothing is cropped to a fixed box. All four frames
are filled; the handwriting on their backs is still placeholder.

## What the code enforces, so you don't have to

- **The spine standard.** Every `invented: true` book renders at the same width,
  height, cloth, typeface, author line and colophon rule — set once in
  `css/shelf.css` under *"The invented-book standard"*. That uniformity **is** the
  quiet visual tell between tiers. There is no legend and no category filter, on
  purpose. It is also what lets the follow-up project arrive as the next volumes
  on this same shelf: add objects with `invented: true` and they already match.
- **Real books vary** — height, width, cloth, typeface — because real shelves do.
  That variation is what makes the uniform run noticeable around the third book
  someone opens.
- **Spines stay legible.** Titles are auto-fitted to their spine, but never below
  10px; a title too long for one line breaks to two rather than shrinking into
  illegibility. *The Year of the Second Apartment* works from four feet away;
  a title shrunk to 8px does not.
- **The shelf is never left.** Books open in a dialog over the shelf and closing
  returns focus to the spine you clicked. No page navigation anywhere.
- **The room at the end is what sets the right margin.** The `end` object leaves
  `volumes` × one book-width of empty plank, and because the scale follows the
  longest run, that room is subtracted from every shelf's right-hand end, not
  just its own. Raise `volumes` and the case stands further off all three runs.
- **Face-out books work on any shelf.** A volume you wrote uses the standard
  binding; a book you've read is stamped instead — caps, wide letterspacing and
  a ruled frame in its palette's `rule` colour, the way a hardcover is lettered.
- **A photograph can be plated onto the board.** `portrait: "assets/….jpg"` on
  a face-out book sets the picture into the cloth above the title, ruled like
  an author plate, with the standard title and name under it. If the file is
  missing the plate simply does not appear and the binding is the standard
  one — no broken image.
- **A spine can carry its real furniture.** `titleInk` and `authorInk` letter
  the two lines in different colours, `imprint` blocks the publisher at the
  foot, and `device` draws a mark above it — *The Return of the King* uses all
  four for the Houghton Mifflin jacket. The device is drawn rather than
  scanned: unlike *The Prophet*, those jackets are not out of copyright, and a
  drawn mark takes the shelf's scale factor anyway. Keep such a drawing coarse
  — at a spine's width it renders about 34px across, and fine detail turns
  into marks that read as lettering.
- **A photograph of the spine beats a drawing of one.** Three books carry
  pictures of their actual spines — *The Return of the King* (Houghton Mifflin),
  *Peter Pan and Wendy* (Folio), *Little Women* (Roberts Brothers) and others — set with
  `spineImage`. `spineAspect` is the photograph's width ÷ height: the shelf gives
  the book its height and that ratio gives its width, so the picture is never
  stretched. Photographed spines skip the drawn furniture entirely — no cloth,
  no bands, no set lettering — but keep the cloth shading over the top so they
  still read as curved boards standing on a shelf rather than flat cut-outs.
  Real spines are thinner than the drawn ones, so swapping several in shortens
  a run noticeably; see the note on levelling below.
- **A real book replaces a placeholder; it does not join them.** The read shelf
  is a fixed number of slots being filled in, not a pile being added to. When a
  real book arrives, a `[REAL BOOK …]` entry comes out. Right now: 9 real, 3
  placeholders. Changing one shelf does not mean changing the others — level the
  runs only when asked, since a shelf ending a little short reads as room.
- **A drawn spine has a budget.** The title takes what the bands, the author
  line and the imprint leave it. A long title on a short spine can end up with
  40px to live in, which clips it — if that happens, widen the book and raise
  its `height` rather than fighting the type. The fitter shrinks to 10px on one
  line, then wraps; and if the board is too narrow to wrap into, it goes back to
  one line and down to 6px, which is what a real spine does with a long title.
- **A real cover image wins over lettering.** *The Prophet* uses a scan of the
  1923 Knopf first edition — black cloth stamped in gilt, with Gibran's own
  device on the front board — in `assets/the-prophet-1923.jpg`. Published 1923,
  so it is public domain; the scan is Internet Archive item `prophet00kahi`.
  `coverAspect` is the scan's width ÷ height: the shelf sets the book's height
  and that ratio sets its width, so the boards are never stretched. Set
  `cover:` + `coverAspect:` on any face-out book to do the same. Without a
  cover, `device: "assets/….svg"` stamps an emblem under the lettering
  instead.
- **The case is a piece of furniture in a room.** It stops growing at
  `--case-max` (1040px) and centres, so on any window wider than that the room
  shows either side of it and the sides of the case (`--stile`) are visible
  edge-on. Raise `--case-max` and the room only appears on wider screens;
  lower it and the case gets smaller but stands further from the walls. Narrow the
  window and that margin closes up until the case is the whole page again.
- **The plant is the one thing allowed over the edge.** Its vines are drawn
  past the bottom of its own box, so they fall over whatever it is standing on
  while every other object stands squarely on its plank. `drape` is in the same
  units as the drawing: standing on the journals it wants about 56, so the
  strands reach the plank; standing on a plank itself it wants about 28, past
  which the shelf below cuts them off.
- **A plant is bounded by the shelf above it.** The stylesheet says what size
  it would like (`--inv-width * 5.25`); the shelf cuts that down to the
  headroom over the stack, because a plant taller than its gap would be sliced
  off by the plank above. On a tall window it gets the size it asked for; on a
  short one it is trimmed. Raising the multiplier alone will not make it bigger
  on a laptop — the gap is the constraint, not the number.
- **A plant on the journals costs the run nothing.** Give the `journals` object
  a `plant` and it stands on the stack, positioned out of flow — so it takes no
  width on the plank and the packing never sees it.
- **The journals are not openable.** They carry the same binding as the books I
  wrote, so they read as the next volumes in that run rather than as decoration,
  and the years are the whole statement — no placard explains them. There is
  nothing inside them to read yet.
- **The books scale to the window.** The case is the whole page, so the books
  are sized to fill it rather than the furniture being sized to the books. Every
  fixed width — spines, frames, journals, the room — is multiplied by one factor
  chosen so the longest run exactly fills the case. Fewer books simply means
  bigger books, which is the brief's "fewer, better" for free; more books means
  smaller ones.
- **Narrow windows wrap instead of scrolling.** Below about two-thirds scale a
  spine stops being readable, so rather than shrink further the shelf gives the
  books their designed size back and spills the run onto another plank — which
  is what a bookcase does when a section outgrows its shelf. The case grows
  downward and the page scrolls; it never scrolls sideways. On a phone the same
  three runs read as a dozen planks. Wrapping only ever *splits* a shelf you
  authored, never joins two: where a run breaks is a decision in
  `content/books.js`, and a narrow window is not allowed to overrule it. Room at
  the end of a run is dropped when it will not fit after the last book, since a
  plank holding nothing but room reads as a bug rather than as room.
- **Keep the three runs about the same length.** On a wide window the scale
  follows the *longest* run, so a short shelf is the one that shows empty plank. They currently
  measure within about 25px of each other. If you add or cut books, even them up
  again — the counts are the three numbers passed to the layout, nothing more.

## Still to do (from the brief)

- [ ] Choose the chapters for the books I wrote — the placeholders currently fill
      two shelves, which is far more than the brief's "4–5, fewer better"
- [ ] Write the spine titles — hardest part, and where this lands or goes soft
- [ ] Write the poems (10–12 lines)
- [ ] Pick the real books, pull quotes, and the concrete scene for each
- [ ] Decide the standard spine format — the values under `--inv-*` in `css/shelf.css`
- [ ] Replace the placeholder SVGs in `assets/`

## Deploying

Settings → Pages → Deploy from branch → `main` / root. No build step, so it works
as-is.
