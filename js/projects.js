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
//   featured    true = wider card
window.PROJECTS = [
  {
    id: "steam-demo",
    title: "Your Steam Game",
    hook: "One sentence that makes someone want to play it.",
    status: "Steam Demo",
    role: "Gameplay Programmer",
    engine: "Unity",
    language: "C#",
    tags: ["Steam", "Team project"],
    thumb: "",
    preview: "",
    media: { type: "image", src: "" },
    year: "2026",
    team: "Team of 4",
    duration: "6 months",
    featured: true,
    overview: [
      "Describe the game: genre, core loop, and what makes it interesting.",
      "Describe the project's story: how it started, where it shipped, what you learned."
    ],
    responsibilities: [
      "Player controller and movement feel",
      "Ability / combat system",
      "Steam integration and build pipeline"
    ],
    technical: [
      { title: "Example: Ability system", text: "Data-driven abilities using ScriptableObjects so designers can add new ones without code." },
      { title: "Example: Input buffering", text: "Buffered inputs and coyote time to make platforming feel responsive." }
    ],
    links: [
      { label: "Play the demo on Steam", url: "https://store.steampowered.com/", primary: true },
      { label: "Source code", url: "https://github.com/" }
    ]
  },
  {
    id: "jam-game",
    title: "Your Game Jam Entry",
    hook: "Built in 48 hours around the theme of ...",
    status: "Game Jam",
    role: "Programmer",
    engine: "Unity",
    language: "C#",
    tags: ["48h", "Solo"],
    thumb: "",
    preview: "",
    media: { type: "image", src: "" },
    year: "2025",
    team: "Solo",
    duration: "48 hours",
    overview: ["What you made, and how you scoped it to fit the jam."],
    responsibilities: ["Everything: design, code, and audio integration"],
    technical: [
      { title: "Example: Procedural level layout", text: "Short explanation of the interesting system." }
    ],
    links: [{ label: "Play on itch.io", url: "https://itch.io/", primary: true }]
  },
  {
    id: "itch-prototype",
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
