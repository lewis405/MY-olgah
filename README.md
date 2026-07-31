# Happy Girlfriend's Day — Olly ❤️

A single-page, cinematic love-letter website built with plain HTML5, CSS3, and vanilla JavaScript (no frameworks, no build step).

## Folder structure

```
gf-day/
├── index.html              → all page content/sections
├── style.css                → design system, layout, animations
├── script.js                 → interactions, canvas particles, counter, effects
└── assets/
    ├── images/               → drop real photos here for the gallery (optional)
    ├── music/                → put a romantic-theme.mp3 here for the music toggle
    └── fonts/                → unused (Google Fonts are loaded via CDN link tags)
```

Everything is a static file — there is no server-side code and nothing to compile.

## How to run locally

1. Download/unzip the `gf-day` folder.
2. Just double-click `index.html` to open it in your browser — it works standalone.
   - If you want the music toggle to work, add an MP3 file at `assets/music/romantic-theme.mp3` (any royalty-free romantic instrumental works well). Without it, the toggle button simply does nothing when clicked — no errors.
   - If you want real photos in the "Memory Gallery," replace the `<span class="gallery-placeholder">📷</span>` elements in `index.html` with `<img src="assets/images/your-photo.jpg" alt="...">` tags, six of them.
3. Optional (recommended for smoothest local testing): serve it with a tiny local server instead of `file://`, e.g.:
   ```bash
   cd gf-day
   python3 -m http.server 8000
   ```
   Then open `http://localhost:8000`.

## Editing the content

- **Names / letter / reasons / timeline copy** — all in `index.html`, in plain readable sections.
- **Relationship start date** (powers the live "I've Loved You For" counter) — at the very top of `script.js`:
  ```js
  const RELATIONSHIP_START = new Date('2023-02-14T00:00:00');
  ```
  Change this to the real date.
- **Colors** — all defined once at the top of `style.css` under `:root { ... }`, so you can retheme the whole site by editing a handful of hex values.

## Deploy to GitHub Pages

1. Create a new GitHub repository and push the `gf-day` folder contents to the root of the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Save — GitHub will give you a URL like `https://yourusername.github.io/your-repo/` within a minute or two.

## Host on Netlify

1. Go to [netlify.com](https://netlify.com) and log in.
2. Drag and drop the whole `gf-day` folder onto the Netlify "Sites" dashboard (Netlify Drop) — no git required.
   - Or, for git-based deploys: "Add new site" → "Import an existing project" → connect your repo → leave the build command empty and set the publish directory to the repo root.
3. Netlify gives you a live `https://your-site-name.netlify.app` URL immediately, and you can rename it in Site settings.

## Host on Vercel

1. Go to [vercel.com](https://vercel.com) and log in.
2. "Add New… → Project" → import the GitHub repository containing this folder.
3. Framework preset: choose **Other** (no framework/build step needed). Leave the build command blank and set the output directory to `.` (root).
4. Deploy — Vercel gives you a `https://your-project.vercel.app` URL.

Any of the three options work equally well since this is a fully static site.
