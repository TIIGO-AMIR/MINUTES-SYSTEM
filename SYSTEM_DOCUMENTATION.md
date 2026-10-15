# MRUMSA Meeting Minutes Manager — System Documentation

## Overview
The MRUMSA Meeting Minutes Manager is a web application and installable Progressive Web App (PWA) designed for the **Muteesa I Royal University Muslim Students Association (MRUMSA)** to draft, archive, search, and export official meeting minutes in print-ready A4 PDF format.

## GitHub Live Link & Deployment

### Live URL Format
For the repository `TIIGO-AMIR/MINUTES-SYSTEM`, the GitHub Pages live link is:
```
https://tiigo-amir.github.io/MINUTES-SYSTEM/
```

### Enabling GitHub Pages on GitHub
To view the live app on GitHub Pages:
1. Navigate to your repository on GitHub: `https://github.com/TIIGO-AMIR/MINUTES-SYSTEM`
2. Click **Settings** (gear icon) > **Pages** in the left sidebar.
3. Under **Build and deployment > Source**, you can select either:
   - **GitHub Actions** *(Recommended)*: Automatically uses `.github/workflows/static.yml` to build and deploy on every push to `main`.
   - **Deploy from a branch**: Select `main` branch and folder `/docs`. The pre-built `/docs` directory is committed with all bundled production assets.
4. Once deployed, GitHub will display your live site link at the top of the Pages settings.

## Mobile Phone App Installation

When visiting the live link on a phone:
- **Android**: Tap **"⚡ Install Now"** on the top banner or **"📱 Install App"** in the top navigation bar to add it directly to the home screen.
- **iOS Safari**: Tap the **Share** button (`⬆`), then select **"Add to Home Screen" (`➕`)**.
- **Offline Support**: Full offline capability via service worker caching. Minutes saved in `localStorage` remain safely stored on the device.
