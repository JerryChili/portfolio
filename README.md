# Portfolio

Dark, carbon-fiber style portfolio for a gameplay programmer. Plain HTML, CSS and JavaScript, no build step.

## Run it locally

Open `index.html` in a browser. To replay the intro, add `?intro` to the address (for example `index.html?intro`).

## Put it on GitHub Pages

1. Create a repository (`yourusername.github.io` gives you the cleanest URL).
2. Put the contents of this folder in the repository root and push.
3. In the repository, go to Settings, then Pages. Choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute the site is live.

## Where to edit things

| What | File |
| --- | --- |
| Name, role, pitch, about text, skills, social links, intro settings | `js/config.js` |
| Project cards and their detail pages | `js/projects.js` |
| Colors, spacing, animation | `css/style.css` |
| Page structure | `index.html` |

## Intro animation

Put 3-4 transparent PNGs of yourself turning around in `assets/intro/` and name them `frame1.png` to `frame4.png`. Use the same canvas size for every frame so they line up. The site shows each frame in turn with a squash-and-bounce warp between them. If the images are missing, a placeholder silhouette plays instead. Using 3 frames? Remove the unused path from `intro.frames` in `config.js`.

## Adding a project

Copy one object in `js/projects.js`, give it a new unique `id`, and fill in the fields. Put images, GIFs and videos in `assets/projects/`. Each project gets its own shareable link: `yoursite/#project=your-id`.

Tip: keep GIFs small (a few MB). MP4 or WebM files are much lighter than GIFs and work for both the hover preview and the detail view.
