# Esthera Locus

Esthera Locus is a React and Vite web application.

## Local development

```sh
npm ci
npm run dev
```

Run the project checks and create a production build with:

```sh
npm run lint
npm run build
```

## Deployment

Pushing to the `develop` branch runs the GitHub Actions workflow in
`.github/workflows/deploy.yml`. It installs the locked dependencies, runs lint
and the production build, then deploys the `dist` directory to GitHub Pages.
The workflow also publishes `index.html` as `404.html` so direct links to
client-side routes continue to work after refresh.

In the repository settings, configure GitHub Pages to use **GitHub Actions** as
its build and deployment source.
