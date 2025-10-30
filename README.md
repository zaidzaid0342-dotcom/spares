
# Mohammed Zaid — Portfolio (React + Tailwind)

This is a single-page React portfolio scaffold (dark midnight-blue theme) built with Tailwind CSS.
It uses Create React App conventions and includes Tailwind/PostCSS config so you can install and build locally.

## Quick start

1. Extract the ZIP and open the folder in terminal.
2. Install dependencies:
   ```
   npm install
   ```
3. Build Tailwind CSS (optional — dev server will work with CDN fallback but building ensures production-ready CSS):
   ```
   npm run tailwind:build
   ```
   This creates `src/tailwind.css` from `src/index.css` (Tailwind directives).
4. Start the dev server:
   ```
   npm start
   ```

## Notes
- The project includes a placeholder avatar at `src/assets/placeholder.svg`.
- Update content in `src/App.jsx` and components under `src/components/` to personalize.
- For production, it's recommended to run the Tailwind build step and serve the built CSS.

