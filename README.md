# MRUMSA Meeting Minutes Manager

A professional meeting minutes manager and print-ready PDF generator built for the **Muteesa I Royal University Muslim Students Association (MRUMSA)**.

## Features

- **Dashboard**: Quick overview of recent minutes and records count, last updated timestamp, and quick-start actions.
- **Document Builder (Editor)**:
  - Complete meeting metadata (Title, Type, Date, Start/End times, Venue, Chairperson, Minute Secretary, Members present, Apologies/absentees).
  - Dynamic Agenda & Proceedings manager (add, remove, and reorder agenda points with Discussion, Decision/Resolution, Action owner, and Deadlines).
  - Closing details (Any other business, Next meeting date/venue, Meeting closed time, Record approval status, Signature fields).
  - Form validation with instant feedback.
- **Document Preview & PDF Export**:
  - Live formatted official document preview styled with the Muteesa I Royal University official header.
  - One-click PDF generation via optimized `@media print` CSS layout specifically fitted for A4 pages with clean page breaks.
- **Records Archive & Management**:
  - Full archive of saved minutes.
  - Search by meeting title, date, venue, or type.
  - Record duplication ("Copy") for recurring meetings.
  - Instant editing and deletion.
  - JSON Backup Export and Import for local backup safety.
- **Persistence**: Saved securely in browser `localStorage`.

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **CSS3** with custom design system and print media queries

## Mobile Phone Installation (PWA)

This application is a **Progressive Web App (PWA)** that can be installed directly to home screens on phones without needing an app store:

- **Android (Chrome / Edge / Samsung Internet)**: Clicking the live link displays an instant **"⚡ Install Now"** banner at the top and a **"📱 Install App"** button in the top navigation bar. Clicking it prompts native installation directly to the phone's app launcher.
- **iPhone / iPad (iOS Safari)**: Tap the Safari **Share** button (`⬆`), then select **"Add to Home Screen" (`➕`)**. A built-in guide modal appears automatically to assist iPhone users.
- **Offline Capable**: Once installed, minutes can be created, edited, searched, and formatted even with zero internet connectivity.

## GitHub Pages Live Deployment

The repository includes an automated GitHub Actions deployment workflow (`.github/workflows/static.yml`):
1. Whenever code is pushed to the `main` branch, GitHub Actions builds the React PWA with `npm ci && npm run build`.
2. The compiled static distribution (`dist/`) is deployed to GitHub Pages automatically.
3. The Vite base path is set to `./` so all scripts, icons, service workers, and assets load seamlessly on GitHub Pages subpaths (e.g. `https://<username>.github.io/<repo>/`).

## Development

```bash
npm install
npm run dev
```

Built for port 3000 on `0.0.0.0`.

