# Bothlabadjadi website

A responsive, single-page starter website for a built-environment and infrastructure consulting firm. The site uses plain HTML, CSS and browser JavaScript. A small Node.js server serves the files when deployed as a web service.

## Preview locally

1. Open this folder in VS Code.
2. Open `index.html` in a browser. For a smoother local workflow, use VS Code's Live Server extension if you already have it installed.
3. To preview through the included Node.js server, install Node.js 20 or later and run `npm start` from this folder. Open `http://localhost:10000`.
4. Resize the browser or use its device toolbar to check the mobile layout.

## Before publishing

- Replace or confirm the proposed service and sector descriptions with the business owner.
- Add verified company contact details, leadership information and real project examples. Placeholder areas are deliberately not presented as established credentials or completed work.
- The contact form currently validates in the browser only. It does not send or store enquiries. Connect a backend or trusted form service before collecting messages.
- The page uses Google Fonts and photography hosted by Unsplash, so those assets require an internet connection. Replace the image URLs with licensed, approved company imagery when available.

## Deploy on Render as a Web Service

The included Node.js server serves the website files and listens on Render's `PORT` and public interface (`0.0.0.0`).

1. Push the latest website files to GitHub so Render can access them.
2. In Render, choose **New +** → **Web Service**, then connect `ernestw006/bothlabadjadi`.
3. Choose **Node** as the runtime and `main` as the branch.
4. Set **Root Directory** to blank (the repository root).
5. Set **Build Command** to `npm install`.
6. Set **Start Command** to `npm start`.
7. Create the service. Render sets the `PORT` environment variable, which the server uses automatically.

No environment variables or third-party Node packages are required. Before making the site public, review the publishing checklist above. In particular, the contact form does not send messages; connect a backend or form service if you need to receive messages.
