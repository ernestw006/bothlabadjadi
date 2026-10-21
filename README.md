# Bothlabadjadi website

A responsive, single-page starter website for a built-environment and infrastructure consulting firm. It uses plain HTML, CSS and JavaScript and does not require a package install or build step.

## Preview locally

1. Open this folder in VS Code.
2. Open `index.html` in a browser. For a smoother local workflow, use VS Code's Live Server extension if you already have it installed.
3. Resize the browser or use its device toolbar to check the mobile layout.

## Before publishing

- Replace or confirm the proposed service and sector descriptions with the business owner.
- Add verified company contact details, leadership information and real project examples. Placeholder areas are deliberately not presented as established credentials or completed work.
- The contact form currently validates in the browser only. It does not send or store enquiries. Connect a backend or trusted form service before collecting messages.
- The page uses Google Fonts and photography hosted by Unsplash, so those assets require an internet connection. Replace the image URLs with licensed, approved company imagery when available.

## Deploy on Render

This project is a static website. It has no server process, package install, or build step.

1. Save the website files in a Git repository and push them to GitHub. Render deploys from a connected Git repository; it cannot deploy files that only exist on your computer.
2. In Render, choose **New +** → **Static Site**, then connect the GitHub repository.
3. Set the **Root Directory** to blank (the repository root), leave **Build Command** blank, and set **Publish Directory** to `.`.
4. Create the site. Render will publish `index.html` and the accompanying CSS and JavaScript files. Future pushes to the connected branch can trigger new deploys.

No environment variables are required. Before making the site public, review the publishing checklist above. In particular, the contact form does not send messages; connect a backend or form service if you need to receive enquiries.
