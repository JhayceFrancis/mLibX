# mLibX (Media Metadata Library Sync)

mLibX is a premium, cross-platform web browser extension designed to unify your media consumption. It seamlessly synchronizes metadata, watchlists, watch histories, ratings, favorites, and progress tracking across multiple platforms into a single aggregated dashboard.

## Features

- **Cross-Platform Compatibility:** Supports Chrome, Edge, Brave, Firefox, and Safari (Desktop and Mobile).
- **Aggregated Media Library:** Consolidates Anime Films, TV Series, Movies, and Adult content from numerous trackers and media servers.
- **Dynamic Theming Engine:** Features multiple visually rich aesthetic themes (Dark, Light, Nord, Dracula) including a heavily customized **Cyberpunk Theme** with true blacks, deep indigos (`#15008c`), dimmed plum backgrounds (`#0f0018`), and high-contrast electric neon gradients (Electric Cyan `#08f7ff` & Lime Green `#79ff54`).
- **Dynamic SVG Icon Adaptability:** The mLibX logo adapts natively to your selected theme's core accent colors and gradients using CSS mask injection and SVG scaling transformations.
- **End-to-End Encryption (E2E):** Master-key AES-256 encryption protects your sensitive watch history before it gets backed up.
- **Automated Cloud Backups:** Periodic real-time backups to Google Drive, OneDrive, and Dropbox.
- **Modular Integrations:** Includes out-of-the-box support for AniList, MAL, Simkl, Plex, Emby, Jellyfin, Tautulli, Trakt, TMDb, TVDb, IMDb, Sonarr, Radarr, Whisparr, and Stash.

## Building the Extension

This repository includes automated GitHub Actions to build and package the extension for multiple browser architectures.

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server (dashboard preview):
   ```bash
   npm run dev
   ```

3. Build the production extension package:
   ```bash
   npm run build
   ```

### Security

We use automated Dependabot vulnerability scanning and GitHub Advanced Security workflows to ensure all npm dependencies are continuously patched. Ensure your E2E master encryption key is kept safe, as it cannot be recovered if lost.
