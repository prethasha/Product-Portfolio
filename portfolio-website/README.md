# K R Prethasha — Product Portfolio

A dark-theme product management portfolio built with plain HTML + Bootstrap 5.
No build tools, no installs — open `index.html` in a browser and it works.

---

## 📁 What's in this folder

```
portfolio-website/
├── index.html              ← All the page text (edit your words here)
├── css/
│   └── style.css           ← Colours, fonts, spacing (top of file = easy settings)
├── js/
│   ├── case-studies.js     ← ⭐ YOUR CASE STUDY LIST — add PDFs here
│   └── main.js             ← Makes things work (no need to edit)
├── assets/
│   ├── case-studies/       ← ⭐ Put your case study PDFs here
│   ├── images/             ← Photos, cover images (placeholders for now)
│   └── resume/
│       └── resume.pdf      ← Replace with your real resume (same name)
├── .nojekyll               ← Tells GitHub Pages to serve files as-is
└── README.md               ← This guide
```

---

## ⭐ Adding a new case study PDF

1. **Copy your PDF** into `assets/case-studies/`
   Name it simply, lowercase with dashes: `zomato-checkout.pdf` ✅  `Zomato Checkout FINAL (2).pdf` ❌
2. **(Optional) Add a cover image** into `assets/images/` — landscape, about **1200 × 750 px**.
3. **Open `js/case-studies.js`**, copy one `{ ... },` block, paste it at the end of the list, and change the text:

```js
  {
    title: "Zomato: Simplifying checkout",
    category: "Consumer app",
    summary: "One or two sentences about the problem and what you did.",
    tags: ["User research", "A/B testing"],
    image: "assets/images/zomato-checkout.jpg",
    pdf: "assets/case-studies/zomato-checkout.pdf",
    label: "Concept project",
    featured: true
  },
```

That's it — the card, the filter button and (if `featured: true`) the carousel slide appear automatically.

| Field      | What it does |
|------------|--------------|
| `title`    | Card heading |
| `category` | Groups cards under filter buttons (same spelling = same group) |
| `summary`  | Short description on the card |
| `tags`     | Small labels — any number |
| `image`    | Cover image path |
| `pdf`      | PDF path |
| `label`    | Badge on the image, e.g. "Concept project". Use `""` for none |
| `featured` | `true` = also appears in the top carousel |

**How visitors open it:** clicking *Read case study* opens the PDF in a new browser tab; the small ⬇ button downloads it.

**To replace a sample case study**, just overwrite e.g. `assets/case-studies/case-study-1.pdf` with your file using the same name — no code change needed.

> **Cards disappeared?** It's almost always a missing comma `},` or a missing quote `"` in `case-studies.js`. The page shows a message when this happens.

---

## ✏️ Other common edits

| I want to change… | Where |
|---|---|
| My name, intro, about text, skills | `index.html` — search for the text and replace it |
| My photo | Put it in `assets/images/` and change `src="assets/images/profile-photo.svg"` in `index.html` |
| Email / LinkedIn | `index.html` — search `hello@example.com` and `your-profile` (they appear in Contact **and** Footer) |
| Resume | Replace `assets/resume/resume.pdf` (keep the name) |
| Colours | `css/style.css`, the `:root` block at the top |
| Icons | Browse [icons.getbootstrap.com](https://icons.getbootstrap.com), copy the name, e.g. `bi-star` |
| Number of carousel slides | Set `featured: true/false` in `js/case-studies.js` |

`index.html` is split into labelled sections — search for `SECTION: ABOUT`, `SECTION: SKILLS` etc. to jump there.

---

## 🚀 Putting it online with GitHub Pages (free)

**Without the command line:**
1. Create a new repository on [github.com](https://github.com/new) (e.g. `portfolio`), set to **Public**.
2. Click **"uploading an existing file"**, drag in *everything inside* this folder (including `css`, `js`, `assets`) and click **Commit changes**.
3. Go to **Settings → Pages**. Under *Branch*, choose `main` and `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

**With Git:**
```bash
cd portfolio-website
git init
git add .
git commit -m "First version of portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```
Then do step 3 above.

**To update later:** upload/replace the changed files on GitHub (or `git add . && git commit -m "Add new case study" && git push`). The live site refreshes in about a minute.

Tip: name the repository `YOUR-USERNAME.github.io` and the site lives at `https://YOUR-USERNAME.github.io` with no extra path.

---

## 💡 Tips

- Keep PDFs under ~10 MB so they open quickly (compress at ilovepdf.com if needed).
- Label concept work honestly ("Concept project") and real work as "Real project".
- Built with Bootstrap 5.3, Bootstrap Icons, and Google Fonts (DM Sans + Playfair Display) — all loaded from the web, so an internet connection is needed for full styling.
