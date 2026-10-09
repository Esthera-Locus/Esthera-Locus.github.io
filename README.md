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

Pushing to the `coba` branch runs the GitHub Actions workflow in
`.github/workflows/deploy.yml`. It installs the locked dependencies, runs lint
and the production build, copies the generated static site to the branch root,
and deploys the build artifact to GitHub Pages. Publishing the built files at
the branch root also supports repositories configured to publish the branch
directly. The workflow publishes `index.html` as `404.html` so direct links to
client-side routes continue to work after refresh.

The Vite development entry is `index.dev.html`; the development server rewrites
the homepage and `/atlas` route to this file while keeping the root `index.html`
available for GitHub Pages.
