# Updating the upstream version

Balance of Satoshis is installed into the image at build time via `npm install -g balanceofsatoshis@<version>` in `Dockerfile`. There is no `dockerTag` in the manifest — the image is built fresh from `Dockerfile`.

## Determining the upstream version

- **npm** ([balanceofsatoshis](https://www.npmjs.com/package/balanceofsatoshis)) — what the Dockerfile's `npm install` actually resolves against:
  ```
  npm view balanceofsatoshis version
  ```
- **GitHub tags** ([alexbosworth/balanceofsatoshis](https://github.com/alexbosworth/balanceofsatoshis)) — upstream tags the npm publish corresponds to (no GitHub Releases are cut; tags are the only source-side signal):
  ```
  gh api repos/alexbosworth/balanceofsatoshis/tags --jq '.[0].name'
  ```

The pin lives in `Dockerfile` on the `RUN npm install -g balanceofsatoshis@<version>` line.

## Applying the bump

- `Dockerfile` — bump `<version>` in `RUN npm install -g balanceofsatoshis@<version>` to the new version (drop any `v` prefix from the GitHub tag; npm versions are bare).
