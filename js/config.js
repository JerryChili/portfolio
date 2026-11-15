// Site-wide settings. Edit this file to personalise the site.
window.SITE_CONFIG = {
  name: "Jeri Juntunen",
  role: "Gameplay Programmer",
  pitch: "Hieno one-lineri wauu oon niin siisti palkatkaa",
  about:
    "Student at KAMK studying for a bachelors in Game Development" + ".",

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
    { label: "Email", url: "mailto:jeri.juntunen@gmail.com" },
    { label: "GitHub", url: "https://github.com/jerrychili" },
    { label: "itch.io", url: "https://jerijuntunen.itch.io/" },
    { label: "Steam", url: "https://steamcommunity.com/id/JerryChili" },
    { label: "LinkedIn", url: "www.linkedin.com/in/jeri-j-82b56b28a" }
  ]
};
