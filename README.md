# Personal Boardwalk

A browsable bookshelf. Spines are the homepage; click one and the book opens.

Three shelves in one case, sized to the window:

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
| `book` with `invented: true` | plate + poem | `title, author, press, year, poem, image, imageAlt` |
| `book` with `invented: false` | quote + scene | `title, author, palette, face, height, width, quote, source, scene` |
| either, plus `faceOut: true` | as above | stands face out; add `faceWidth`, or `cover` for a real cover image |
| `photo` | flips in place | `image, alt, tilt, back: {date, place, note}` |
| `journals` | not openable | `years` — e.g. `["2027", "2028", "2029"]` |
| `end` | — | `volumes` — how many volumes of room to leave |

A shelf with `label: null` reads as a continuation of the run above it, the way
a real bookcase behaves when a section spills onto the next shelf.

Poems keep their line breaks. Scenes are prose and reflow; leave a blank line
between paragraphs.

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
- **The room at the end stays.** The `end` object draws a bookend and then leaves
  `volumes` × one book-width of empty plank. The case is one piece of furniture
  with a back and sides, so unfilled plank reads as shelf rather than as a bug.
- **Face-out books work on any shelf.** A volume you wrote uses the standard
  binding; a book you've read is stamped instead — caps, wide letterspacing and
  a ruled frame in its palette's `rule` colour, the way a hardcover is lettered.
  *The Prophet* uses the `gilt` palette: black cloth stamped in gilt, which is
  what the 1923 Knopf first edition actually was. Gibran's own drawings were the
  frontispiece and plates inside, not on the binding — except the gilt device
  stamped on the front board, drawn here as `assets/prophet-device.svg`. Set
  `device: "assets/….svg"` for a stamped emblem below the lettering, or
  `cover: "assets/….jpg"` to replace the whole face with a real cover image.
- **The journals are not openable.** They carry the same binding as the books I
  wrote, so they read as the next volumes in that run rather than as decoration,
  and the years are the whole statement — no placard explains them. There is
  nothing inside them to read yet.
- **The case sizes itself to its longest run.** Add or delete books and the
  furniture narrows or widens to match, so there is no empty plank trailing off
  on the right. Keep the three runs roughly the same length and all three
  shelves reach the edge. `--case-max` in `css/shelf.css` is only an upper cap.
  This means cutting volumes costs nothing visually — it just makes a narrower
  bookcase, which is the brief's "fewer, better" for free.

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
