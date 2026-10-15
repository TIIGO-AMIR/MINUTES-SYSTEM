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

## Development

```bash
npm install
npm run dev
```

Built for port 3000 on `0.0.0.0`.
