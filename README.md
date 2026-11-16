# Portfolio

Dark, carbon-fiber style portfolio for a gameplay programmer. Plain HTML, CSS and JavaScript, no build step.

## Run it locally

Open `index.html` in a browser.

## Put it on GitHub Pages

1. Create a repository (`yourusername.github.io` gives you the cleanest URL).
2. Put the contents of this folder in the repository root and push.
3. In the repository, go to Settings, then Pages. Choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute the site is live.

## Where to edit things

| What | File |
| --- | --- |
| Name, role, pitch, about text, skills, social links, hero animation timing | `js/config.js` |
| Project cards and their detail pages | `js/projects.js` |
| Colors, spacing, animation | `css/style.css` |
| Page structure | `index.html` |

## Hero portrait animation

Put 3-4 transparent PNGs of yourself (waist-up cutout, same canvas size, roughly 4:5) in `assets/hero/` and name them `frame1.png` to `frame4.png`. When the page loads they play once with a squash-and-bounce warp between frames and settle on the last one, so order them so the final frame is the pose you want to keep. Hovering or clicking the portrait replays it. If the images are missing, a placeholder silhouette plays instead. Using 3 frames? Remove the unused path from `hero.frames` in `config.js`.

## Project categories

Groups are defined at the top of `js/projects.js` (`PROJECT_CATEGORIES`). Give each project a `category` matching a group id. Groups with no projects are hidden, and you can add a third one by adding another entry.

## Adding a project

Copy one object in `js/projects.js`, give it a new unique `id`, and fill in the fields. Put images, GIFs and videos in `assets/projects/`. Each project gets its own shareable link: `yoursite/#project=your-id`.

Tip: keep GIFs small (a few MB). MP4 or WebM files are much lighter than GIFs and work for both the hover preview and the detail view.
