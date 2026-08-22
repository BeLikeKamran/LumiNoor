# LumiNoor

A single-page storefront for colored contact lenses, built with plain HTML/CSS/JS
— no build step, no dependencies to install. Customers browse the grid, filter
by shade, and "Buy on WhatsApp" opens a pre-filled WhatsApp chat instead of a
traditional checkout.

## File structure

```
.
├── index.html      # page structure, links style.css and script.js
├── style.css       # all styling (colors, layout, responsive rules)
├── script.js       # product data + filtering/search + WhatsApp buy flow
└── assets/         # product photos referenced by script.js
```

## Running it locally

This is a static site — no npm install, no server required. Either:

- Double-click `index.html` to open it directly in a browser, **or**
- Serve it locally (recommended, avoids browser file:// restrictions):
  ```bash
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

## Before you publish: set your WhatsApp number

Open `script.js` and edit this line near the top:

```js
const WHATSAPP_NUMBER = "923001234567"; // TODO: replace with your real number
```

It must be **digits only, international format** — country code + number, no
`+`, no spaces, no leading `0`. Example: a Pakistani number `0300 1234567`
becomes `"923001234567"`.

## Deploying with GitHub Pages

1. Create a new repository on GitHub and push this folder to it (see
   **Pushing to a new repo** below).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
5. GitHub gives you a live URL a minute or two later, usually
   `https://<your-username>.github.io/<repo-name>/`.

No workflow file or Actions setup is needed — GitHub serves the static files
directly from the branch.

## Pushing to a new repo

From inside this folder:

```bash
git init
git add .
git commit -m "Initial commit — LumiNoor storefront"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first, without a README/.gitignore, so there's
no history to merge with.)

## Customizing

- **Brand colors** — edit the `:root` variables at the top of `style.css`
  (`--bg` and `--fg` are the two brand colors the site was built around).
- **Products** — edit the `PRODUCTS` array in `script.js`. Each entry needs an
  `image` path (drop new photos in `assets/`), a `color` category for the
  filter pills, and a price.
- **Copy** — hero text, footer links, and trust-strip copy are plain text in
  `index.html`.
