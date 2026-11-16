// Site-wide settings. Edit this file to personalise the site.
window.SITE_CONFIG = {
  name: "Jeri Juntunen",
  role: "Gameplay Programmer",
  pitch: "Programming is my art, the IDE is my canvas.",
  about:
    "I am a game developer from Finland who is currently studying for a bachelors degree in Game Programming. I have always been drawn to the kind of programming you can feel in the gameplay.",

  // Hero portrait: 3-4 still frames of you (waist-up cutout, transparent PNG, same canvas size).
  // They play once when the page loads with a warp/bounce between frames, then settle on the LAST frame.
  // Hover or click the portrait to replay it.
  hero: {
    frames: [
      "assets/hero/frame1.png",
      "assets/hero/frame2.png",
      "assets/hero/frame3.png",
      "assets/hero/frame4.png"
    ],
    startDelayMs: 700, // wait before the first frame change (lets the page fade in)
    frameMs: 600       // how long each frame is shown
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
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jeri-j-82b56b28a" }
  ]
};
