// Your projects. Add a new object to this array to add a card.
// Everything here is PLACEHOLDER content: replace it with your real projects.
//
// Fields:
//   id          unique, url-safe. Used for the shareable link  (#project=<id>)
//   title, hook (one sentence shown on the card)
//   status      badge text, e.g. "Steam Demo", "Game Jam", "Prototype"
//   role        what YOU did
//   engine      e.g. "Unity"      language  e.g. "C#"
//   tags        extra chips on the card
//   thumb       still image shown on the card (assets/projects/...)
//   preview     optional GIF or MP4/WebM that plays on card hover
//   media       detail view: { type: "video" | "image" | "embed", src: "..." }
//   year, team, duration   small facts shown in the detail view
//   overview    array of paragraphs (the full overview)
//   responsibilities  array of strings
//   technical   array of { title, text }: systems you built
//   links       array of { label, url, primary? }
//   category    which group it appears in: an id from PROJECT_CATEGORIES below
// Groups shown on the site, in order. A group with no projects is hidden.
// Want a third group? Add e.g. { id: "jams", title: "Game jams", sub: "..." } and use that id as a project's category.
window.PROJECT_CATEGORIES = [
  { id: "shipped", title: "Shipped projects", sub: "Released games and demos" },
  { id: "other",   title: "Other projects",   sub: "Game jams, prototypes and experiments" }
];

window.PROJECTS = [
  {
    id: "steam-demo",
    category: "shipped",
    title: "Ave Goddess",
    hook: "Ave Goddess is a fantasy action roguelike where you play as Einar, an envoy for an enraged god.",
    status: "Steam Demo",
    role: "Gameplay Programmer",
    engine: "Unity",
    language: "C#",
    tags: ["Steam", "Team project"],
    thumb: "assets/projects/ave-goddess-thumbnail.jpg",
    preview: "",
    media: { type: "image", src: "" },
    year: "2026",
    team: "Team of 13",
    duration: "3 months",
    overview: [
      "Fight through one enemy filled room after another by casting spells using an unique system where you play a quick time event minigame to determine the strength of your spell.",
      "Ave Goddess started as a very ambitious idea for the Summer Studies 2026 course in Kajaani University of Applied Sciences."
    ],
    responsibilities: [
      "Code lead",
      "Version control lead",
      "Combat and Spellcasting system",
      "Player controller and movement feel"
    ],
    technical: [
      { title: "Code lead", text: "Managing a team of three programmers, setting coding standards and making sure they are followed, assisting other programmers where needed, and making sure code is sustainable." },
      { title: "Version control lead", text: "Educating the team on how to use Git, GitHub desktop, and how to develop the project in a version control environment while avoiding issues."},
      { title: "Spellcasting system", text: "Fully custom QTE -based minigame system where spells gain power dynamically based on the users success." }
    ],
    links: [
      { label: "Play the demo on Steam", url: "https://store.steampowered.com/app/4915090/Ave_Goddess/", primary: true }
    ]
  },
  {
    id: "jam-game",
    category: "other",
    title: "Under Its Management",
    hook: "Built in 36 hours around the theme of \"Beneath\"",
    status: "Game Jam",
    role: "Programmer",
    engine: "Unity",
    language: "C#",
    tags: ["36h", "Duo"],
    thumb: "assets/projects/assembly-game-thumbnail.jpg",
    preview: "",
    media: { type: "image", src: "" },
    year: "2026",
    team: "2",
    duration: "48 hours",
    overview: ["Under Its Management was an idea that was born for the Assembly 2026 event where the theme was \"Beneath\". In this game we explore what it's like to be the bottom most person in the social hierarchy."],
    responsibilities: ["Everything: design, code, and audio integration"],
    technical: [
      { title: "Task and Quota system", text: "Main gameloop of the game. You get office-related tasks that you must complete to fill a quota in the given time." },
      { title: "Anger system", text: "Failing to complete tasks in the given time will make the BOSS angry. On maximum anger, he will exit his office and begin hunting you down personally." },
      { title: "The BOSS", text: "The main antagonist. He will pathfind towards the player, always knowing where they are." }
    ],
    links: [{ label: "Play on itch.io", url: "https://kaspianseppanen.itch.io/under-its-management", primary: true }]
  },
  {
    id: "itch-prototype",
    category: "other",
    title: "Your itch.io Prototype",
    hook: "A small experiment with an interesting mechanic.",
    status: "Prototype",
    role: "Programmer",
    engine: "Unity",
    language: "C#",
    tags: ["Mechanics"],
    thumb: "",
    preview: "",
    media: { type: "image", src: "" },
    year: "2025",
    team: "Solo",
    duration: "2 weeks",
    overview: ["What you were exploring and what you found out."],
    responsibilities: ["Design and implementation"],
    technical: [
      { title: "Example: Custom physics", text: "Short explanation of the interesting system." }
    ],
    links: [{ label: "Play on itch.io", url: "https://itch.io/", primary: true }]
  }
];
