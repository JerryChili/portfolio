// Site-wide settings. Edit this file to personalise the site.
window.SITE_CONFIG = {
  name: "Your Name",
  role: "Gameplay Programmer",
  pitch: "Your one-line pitch goes here.",
  about:
    "A few sentences about you: where you study, what draws you to gameplay programming, " +
    "and what you are working on right now.",

  // Intro animation: 3-4 still images of you turning around.
  // Use transparent PNGs of the same height and canvas size so they line up.
  intro: {
    enabled: true,
    frames: [
      "assets/intro/frame1.png",
      "assets/intro/frame2.png",
      "assets/intro/frame3.png",
      "assets/intro/frame4.png"
    ],
    frameMs: 650,      // how long each frame is shown
    endHoldMs: 900,    // pause on the last frame before the page appears
    playEveryVisit: false // false = once per browser session
  },

  skills: {
    primary: ["Unity", "C#", "Gameplay systems", "Git"],
    learning: ["Unreal Engine", "C++", "Godot", "GDScript"]
  },

  // Shown in the Contact section. Replace the URLs.
  links: [
    { label: "Email", url: "mailto:you@example.com" },
    { label: "GitHub", url: "https://github.com/" },
    { label: "itch.io", url: "https://itch.io/" },
    { label: "Steam", url: "https://store.steampowered.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" }
  ]
};
