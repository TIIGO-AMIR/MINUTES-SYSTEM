MRUMSA MEETING MINUTES MANAGER — STARTER WEB APP
=================================================

FILES
- index.html: application screens and form
- styles.css: responsive styling and A4 print/PDF layout
- app.js: template, browser storage, editing, search, backup/restore, print/PDF workflow
- MRUMSA_System_Documentation.docx: project requirements and operating guide

RUN ON WINDOWS
1. Extract the ZIP to a folder.
2. Open the extracted folder.
3. Double-click index.html. It runs in a modern browser; no installation or server is required for this starter.
4. Use New minutes, fill the form and click Save minutes.
5. To make a PDF, click Download / Print PDF. In the browser print dialog choose "Save as PDF" and save.
6. Use Saved minutes to edit, copy, search or delete records.
7. Use Export data backup to download JSON; Import backup restores it in this browser.

IMPORTANT LIMITATIONS
- Records are saved in this browser's localStorage on this device, not in a shared online database. Clearing browser data can erase records; export backups regularly.
- There is no login, user roles, multi-device sync or cloud backup in this starter.
- The supplied Muteesa I Royal University header image is included in the generated minutes. The exact sample minutes flow should still be checked against the association's approved example.
- PDF export uses the browser's native print-to-PDF function.
- Before production, add secure authentication, server-side database, access controls, automated backups and tests.
