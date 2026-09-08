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
          id: "inv-25",
          title: "The Curve",
          author: "Nikita Thomas",
          cloth: "#3a2e24", ink: "#ead9be", rule: "#9d8664",
          width: 38, height: 0.94,
          /* Mission San Jose. */
          poem: `Everyone there was somebody's genius.
The rank was published. We all read it.
I learned to work like I was behind,
because I always was, by some measure.
Nobody said you are not enough.
The curve said it, in numbers,
every single term for four years.
I got out. I did well. I am still
waiting for someone to check my work
and find whatever they are looking for.
That school is the voice I argue with.`,
          image: "assets/plate-the-curve.jpg",
          imageAlt: "Graduation, in the white gown."
        },

        { kind: "book", invented: true,
          id: "inv-04",
          title: "Eleven Out of One Room",
          author: "Nikita Thomas",
          cloth: "#574434", ink: "#efe0c6", rule: "#b2946e",
          width: 52, height: 0.88,
          /* The Chathanatt side: my father and his ten brothers and sisters. */
          poem: `My grandfather's house had one good room.
Eleven of them came out of it
and not one came out empty-handed.
Nobody talks about the years before.
We talk about the years after —
the degrees, the houses, the flights home.
At that table there is no chair for pity,
only for whoever made it next.
I built none of this.
I inherited the finished building
and was handed one instruction: keep it up.`,
          image: "assets/plate-eleven-out-of-one-room.jpg",
          imageAlt: "My parents' wedding, with all eleven of them in the frame."
        },

        { kind: "book", invented: true,
          id: "inv-16",
          title: "Alone on Purpose",
          author: "Nikita Thomas",
          cloth: "#7b6446", ink: "#f4e8d4", rule: "#c8ae86",
          width: 44, height: 1.0,
          /* Independence, introversion, my own space. */
          poem: `I like my own house best.
I like a drive with nowhere to be,
one album the whole way, no talking.
I like a book and an afternoon
nobody else has a claim on.
I feel guilty about it, which is silly.
Needing less is not caring less.
I love people. I go back to them.
But the door closing behind me
at the end of a long day
is the best sound I know.`,
          image: "assets/plate-alone-on-purpose.jpg",
          imageAlt: "Reading in bed as a child, entirely absorbed."
        },

        { kind: "book", invented: true,
          id: "inv-33",
          title: "Married at Twenty-Four",
          author: "Nikita Thomas",
          cloth: "#c4ad86", ink: "#2c2216", rule: "#7a613c",
          width: 34, height: 0.92,
          /* The marriage, and the divorce. */
          poem: `I was twenty-four and certain.
He agreed with everyone, including me,
which I mistook for kindness.
It takes a while to learn that a man
who never disagrees is not being gentle.
He was not honest. I was not listening.
We ended it, and the ending was
the truest thing between us.
I do not regret the marriage.
I regret how long I defended it
to people who could already see.`,
          image: "assets/plate-married-at-24.jpg",
          imageAlt: "The beading and lace of the dress, close up."
        },

        { kind: "book", invented: true,
          id: "inv-18",
          title: "Trash",
          author: "Nikita Thomas",
          cloth: "#4a4232", ink: "#ece2c8", rule: "#a89a72",
          width: 48, height: 0.96,
          /* My best friends, since high school. */
          poem: `That is what we call ourselves.
Fifteen years of it now.
They knew me before I was presentable,
which makes them the only people
I do not have to be excellent for.
Nobody has to explain anything.
The group chat is mostly nonsense
and I would defend it with my life.
I have met a great many people since.
I have never once been tempted
to promote anyone into that room.`,
          image: "assets/plate-trash.jpg",
          imageAlt: "The five of us climbing the band room equipment, in high school."
        },

        { kind: "book", invented: true,
          id: "inv-23",
          title: "First Republic",
          author: "Nikita Thomas",
          cloth: "#6d4f38", ink: "#f1e2c9", rule: "#bd9a71",
          width: 40, height: 0.9,
          /* The first job I loved, and where I found out I was ambitious. */
          poem: `They gave me a desk and I loved it.
Not the desk. The wanting.
I did not know I was ambitious
until they handed me something real
and I stayed late making it better.
I had been told what I ought to want.
Nobody warned me I would want this.
I learned my own appetite there,
which is a strange place to learn it.
For a while I was very good
at something I had actually chosen.`,
          image: "assets/plate-first-republic.jpg",
          imageAlt: "At the First Republic Bank sign."
        },

        { kind: "book", invented: true,
          id: "inv-32",
          title: "A Secret Third Thing",
          author: "Nikita Thomas",
          cloth: "#8c7a63", ink: "#f5ece0", rule: "#cbb79c",
          width: 56, height: 0.98,
          /* Indian, American, or something else. */
          poem: `Indian, they ask, or American?
I have never had an answer ready.
Not both — both is too tidy.
Something built out of the two
that neither side would recognise.
I am the wrong amount of everything
in every room I walk into.
For a long time that felt like failing.
Now I think it is the shape I am:
a third thing, made here,
out of a name from somewhere else.`,
          image: "assets/plate-secret-third-thing.jpg",
          imageAlt: "Me in a kurta and sneakers, striking the Nataraja pose beside the statue."
        },

        { kind: "book", invented: true,
          id: "inv-06",
          title: "The Oldest Job",
          author: "Nikita Thomas",
          cloth: "#d8cbb2", ink: "#33291a", rule: "#8a7550",
          width: 42, height: 0.93,
          /* Being the eldest — my brother, and my sister. */
          poem: `Nobody promoted me. I was first,
and then there were two more,
and the job started without an interview.
My brother is my best friend now,
which is not how it began.
It began with me deciding he was mine.
My sister is why I want anything at all.
When I am tired I picture her watching
and I get up.
There is no version of this life
where I set it down and walk away.
I have never once wanted one.`,
          image: "assets/placeholder-plate.svg",
          imageAlt: "[Describe the picture facing this poem.]"
        },

        { kind: "book", invented: true,
          id: "inv-15",
          title: "The Next Trip",
          author: "Nikita Thomas",
          cloth: "#3a2e24", ink: "#ead9be", rule: "#9d8664",
          width: 46, height: 0.87,
          /* Travel. */
          poem: `Japan. Korea. Morocco. Italy.
France. Spain. Dubai.
I work so that I can leave,
and I am always already planning
the leaving after this one.
It is not escape. I like my life.
It is that I am most awake
in a city that does not know me,
holding a map, deciding.
There is always a next one.
That is the part I need.`,
          image: "assets/plate-next-trip.jpg",
          imageAlt: "Lunch in the souk in Marrakesh: tagine, briouats, fresh juice."
        },

        { kind: "book", invented: true,
          id: "inv-31",
          title: "Lapsed",
          author: "Nikita Thomas",
          cloth: "#574434", ink: "#efe0c6", rule: "#b2946e",
          width: 36, height: 0.99,
          /* Faith, and where it went. */
          poem: `I was a good Catholic. I knew the words,
the kneeling, the order of the year.
I do not go now, and I do not miss it
the way I was told that I would.
The faith did not leave. It relocated.
I believe in people who show up.
I believe in fifteen years of friendship.
I believe in Tuesday, and in the small
repeated things that hold a life up.
That is a creed. It has no building.
I still say grace, most nights, to nobody.`,
          image: "assets/plate-lapsed.jpg",
          imageAlt: "The east window of a church, lit, with the nave in darkness."
        },

        { kind: "book", invented: true,
          id: "inv-26",
          title: "The Castle on the Hill",
          author: "Nikita Thomas",
          cloth: "#7b6446", ink: "#f4e8d4", rule: "#c8ae86",
          width: 50, height: 0.91,
          /* Berkeley — rejected at seventeen, admitted at twenty-five. */
          poem: `I could see it from the freeway.
I applied at seventeen and they said no,
and I let that settle the question
of what I was.
Years later I applied again,
expecting nothing, and they said yes.
I still do not entirely believe it.
I walk that campus like a guest
told to make herself at home.
The castle let me in.
I am still standing in the doorway.`,
          image: "assets/plate-castle-on-the-hill.jpg",
          imageAlt: "Me beside the Berkeley Haas sign."
        },

        { kind: "book", invented: true,
          id: "inv-29",
          title: "Every Single Day",
          author: "Nikita Thomas",
          cloth: "#c4ad86", ink: "#2c2216", rule: "#7a613c",
          width: 44, height: 0.95,
          /* Arthi. */
          poem: `She gets the bullet journal spreads,
the kpop, the flight deals at 1 a.m.
We have talked every day for years
about nothing worth recording,
which is how I know that it is real.
There is no occasion. There is no news.
There is the running conversation
I have kept since middle school
with the person who gets the whole file:
the trip, the obsession, the bad day.
Everything, daily. That is the friendship.`,
          image: "assets/plate-every-single-day.jpg",
          imageAlt: "Arthi on her thirtieth, and me, at the flower wall."
        },

        { kind: "photo",
          id: "ph-01",
          tilt: -3,
          image: "assets/photo-family-three.jpg",
          aspect: 1.333, width: 191,
          alt: "A young family of three.",
          back: { date: "1997", place: "Kuwait" }
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
                /* The volumes not written yet. Same binding as the books above, so they
           read as the next ones in the run rather than as decoration. Not
           openable — there is nothing inside them to read yet. */
        /* The plant stands on the journals, and its vines fall down over
           them. `plant` is optional; drop it and the stack is just a stack. */
                                { kind: "book", invented: true,
          id: "inv-34",
          title: "Put Together",
          author: "Nikita Thomas",
          cloth: "#4a4232", ink: "#ece2c8", rule: "#a89a72",
          width: 38, height: 0.89,
          /* Vanity. */
          poem: `Successful. Intelligent. Presentable.
I have never let anyone see me
before I decide how to look.
If I am not excellent I am failing
someone — I could not tell you who.
Nobody set this standard out loud.
I have simply never tested
what happens if I turn up ordinary.
It is not about being admired.
It is about never being a disappointment.
Those are not the same. I know it.`,
          image: "assets/plate-put-together.jpg",
          imageAlt: "In the audience at a conference, name badge on, listening."
        },

        { kind: "book", invented: true,
          id: "inv-27",
          title: "The Teacher I Didn't Become",
          author: "Nikita Thomas",
          cloth: "#6d4f38", ink: "#f1e2c9", rule: "#bd9a71",
          width: 54, height: 0.97,
          /* The careers I talked myself out of. */
          poem: `First I wanted to teach.
They said: not that, not for you.
Then an NGO, something that mattered,
and then a salary arrived
and I stopped saying the word later.
Then a doctorate, until I counted years.
Every version of me I argued down
is still in here somewhere, filed.
I am not unhappy. That is the strange part.
I keep a room for the other lives
and I visit.`,
          image: "assets/plate-teacher.jpg",
          imageAlt: "A room of middle schoolers throwing peace signs at the camera."
        },

        { kind: "book", invented: true,
          id: "inv-05",
          title: "How to Carry the Tea",
          author: "Nikita Thomas",
          cloth: "#8c7a63", ink: "#f5ece0", rule: "#cbb79c",
          width: 42, height: 0.92,
          /* My mother's parents, and the standard they set. */
          poem: `I know the right words for every aunty.
I know which questions to ask, and when.
I carry the tea before anyone asks.
It is a language. I am fluent in it.
I was raised to be.
In every photograph her back is straight.
My grandfather never raised his voice
because he never once had to.
And still I read a room before I laugh
to work out how loud is allowed.
Nobody ever asked this of me aloud.
That is the part I cannot put down.`,
          image: "assets/plate-carry-the-tea.jpg",
          imageAlt: "My mother and father with me as a baby, in a frame at home."
        },

        { kind: "book", invented: true,
          id: "inv-22",
          title: "Door to Door",
          author: "Nikita Thomas",
          cloth: "#d8cbb2", ink: "#33291a", rule: "#8a7550",
          width: 48, height: 1.0,
          /* Politics. */
          poem: `I have argued at tables I was a guest at.
I have knocked on doors that opened an inch.
Someone always says it makes no difference,
that they are all alike, that nothing moves.
I know the arithmetic of a margin.
I know what a hundred doors is worth,
and I know it is not nothing.
I am not embarrassed to care this much.
The people who taught me to be polite
also taught me what is owed.
So I keep the clipboard.
So I keep knocking.`,
          image: "assets/plate-door-to-door.jpg",
          imageAlt: "Tchalla on the floor with an I Voted sticker on his shoulder."
        },

        { kind: "book", invented: true,
          id: "inv-30",
          title: "The One Who Didn't Want It",
          author: "Nikita Thomas",
          cloth: "#3a2e24", ink: "#ead9be", rule: "#9d8664",
          width: 34, height: 0.88,
          /* Kavi. */
          poem: `She had all of it. The ease, the face,
the doors that open without knocking.
Everything I was breaking myself for
she was handed, and she set it down.
She wanted a small life and her own say.
For years I could not understand it.
I thought she was wasting something.
Now I think she is the only one of us
who ever knew what it was for.
My first sister. My oldest friend.
Still the person I cannot argue with.`,
          image: "assets/plate-didnt-want-it.jpg",
          imageAlt: "The pile of us as children, December 1999."
        },

        { kind: "book", invented: true,
          id: "inv-24",
          title: "The Year We Were Bought",
          author: "Nikita Thomas",
          cloth: "#574434", ink: "#efe0c6", rule: "#b2946e",
          width: 46, height: 0.94,
          /* The acquisition, and what it taught me I need. */
          poem: `One morning it was ours. By spring
it belonged to the largest bank alive.
Nobody asked us. That was the lesson.
I learned what I will trade away
and what I will not.
I want a floor under me.
I want to matter to the room I am in.
The biggest building in the world
still only gives you one desk,
and nobody in it knows your name.
I know what I want now. Smaller.`,
          image: "assets/plate-year-we-were-bought.jpg",
          imageAlt: "My desk: the First Republic pen cup, and JPMorganChase on the screen."
        },

        { kind: "book", invented: true,
          id: "inv-21",
          title: "Homesick Either Way",
          author: "Nikita Thomas",
          cloth: "#7b6446", ink: "#f4e8d4", rule: "#c8ae86",
          width: 40, height: 0.96,
          /* Homesick in both directions — New York, and here. */
          poem: `The martini here is never quite right.
Neither is the pizza, and I have tried.
It will be fall soon in the other place —
the foliage doing it properly,
corn and apple cider in the air.
I would like to stand in that again.
But the food here is better. It is.
And I am not missing my family
every day, the way I used to.
My friends are all somewhere else.
My dog is asleep in the next room.
I am homesick in both directions.`,
          image: "assets/plate-homesick.jpg",
          imageAlt: "The Empire State Building at night, from the street."
        },

        { kind: "book", invented: true,
          id: "inv-17",
          title: "The One I Haven't Met",
          author: "Nikita Thomas",
          cloth: "#c4ad86", ink: "#2c2216", rule: "#7a613c",
          width: 52, height: 0.9,
          /* Wanting a real partner. */
          poem: `I would like to be known all the way down.
Not managed. Not admired. Known.
Someone who sees the whole apparatus —
the ambition, the tiredness, the guard —
and does not flinch or try to fix it.
I do not know how you find that.
There is no application for it,
no curve, no admissions committee.
I have been good at everything
a person can be good at on purpose.
This one I cannot work out how to earn.`,
          image: "assets/plate-one-i-havent-met.jpg",
          imageAlt: "Two cups of tea on a windowsill."
        },

        { kind: "book", invented: true,
          id: "inv-20",
          title: "The Sister Who Came Later",
          author: "Nikita Thomas",
          cloth: "#4a4232", ink: "#ece2c8", rule: "#a89a72",
          width: 44, height: 0.98,
          /* My sister-in-law. */
          poem: `I did not grow up with her.
She arrived the way weather does —
already whole, already herself.
I keep catching myself copying her:
how she says no without apologising,
how she holds a room without raising it.
I have known her a fraction of my life
and I measure myself against her anyway.
The family you are given is a fact.
The family you choose to look up to
is a decision, made daily.
I keep making it.`,
          image: "assets/plate-sister-came-later.jpg",
          imageAlt: "The two of us on the street with ice cream."
        },

        { kind: "photo",
          id: "ph-03",
          tilt: -5,
          image: "assets/photo-family-five.jpg",
          aspect: 1.507, width: 205,
          alt: "A family of five, dressed for a celebration.",
          back: { date: "2011", place: "Fremont" }
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
          quote: `How often have you sailed in my dreams. And now you come in my awakening, which is my deeper dream.

Ready am I to go, and my eagerness with sails full set awaits the wind.

Only another breath will I breathe in this still air, only another loving look cast backward,`,
          source: "Kahlil Gibran, The Prophet (Knopf, 1923), 'The Coming of the Ship'",
          sceneHead: "Before the next thing",
          scene: `I read this at the end of one thing and the start of another, which is when it works. The ship has come. The leaving is not the point. The point is that before you go you are meant to stand still and account for what the years actually gave you.

That is what this shelf is. Everything on it is something I learnt somewhere, from someone, usually the hard way. I wanted to set it all down and look at it once, properly, before whatever comes next.`
        },

        { kind: "photo",
          id: "ph-02",
          tilt: 4,
          image: "assets/photo-turban.jpg",
          aspect: 0.754, width: 140,
          alt: "A small child in a red turban, tongue out, with a drawn-on moustache.",
          back: { date: "1998", place: "Pennsylvania" }
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
          aspect: 0.989, width: 162,
          alt: "A black dog on grass, looking straight at the camera.",
          back: { date: "2025", place: "Tchalla" }
        }
      ]
    }
  ]
};
