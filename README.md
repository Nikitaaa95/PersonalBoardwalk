# Personal Boardwalk

A browsable bookshelf. Spines are the homepage; click one and the book opens.

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
| `photo` | flips in place | `image, alt, tilt, back: {date, place, note}` |
| `end` | — | `volumes` — how many volumes of room to leave |

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
  `volumes` × one invented-book width of empty plank. There is no blank book —
  that would preempt the next project. All planks are levelled to one width so the
  unit reads as a bookcase rather than as ragged shelves.
- **A book may appear on both shelves.** Reuse the same entry on both — repeating
  an `id` is supported. It survived; that is the point.

## Still to do (from the brief)

- [ ] Choose the chapters for the invented books (4–5)
- [ ] Write the spine titles — hardest part, and where this lands or goes soft
- [ ] Write the poems (10–12 lines)
- [ ] Pick the real books, pull quotes, and the concrete scene for each
- [ ] Decide the standard spine format — the values under `--inv-*` in `css/shelf.css`
- [ ] Replace the placeholder SVGs in `assets/`

## Deploying

Settings → Pages → Deploy from branch → `main` / root. No build step, so it works
as-is.
