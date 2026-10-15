import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isMobile, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already installed in standalone mode or dismissed by user for this session, don't show the banner
  if (isInstalled || dismissed) {
    return null;
  }

  // Auto show banner on mobile devices or if installable
  if (!isInstallable && !isIOS && !isMobile) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback for browsers without beforeinstallprompt support
      alert(
        'To install this app on your phone, open your browser menu (⋮) and tap "Install app" or "Add to Home screen".'
      );
    }
  };

  return (
    <>
      <div className="pwa-mobile-banner">
        <div className="pwa-banner-content">
          <div className="pwa-banner-icon">📱</div>
          <div className="pwa-banner-text">
            <strong>Install MRUMSA on your phone</strong>
            <span>Direct home-screen access & offline minutes builder</span>
          </div>
        </div>
        <div className="pwa-banner-actions">
          <button
            type="button"
            className="pwa-install-btn"
            onClick={handleInstallClick}
          >
            ⚡ Install Now
          </button>
          <button
            type="button"
            className="pwa-dismiss-btn"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss install banner"
          >
            ✕
          </button>
        </div>
      </div>

      {showIOSModal && (
        <div className="pwa-ios-overlay" onClick={() => setShowIOSModal(false)}>
          <div
            className="pwa-ios-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pwa-ios-header">
              <div className="brandmark" style={{ width: 36, height: 36, fontSize: 18 }}>
                M
              </div>
              <h3>Install on your iPhone / iPad</h3>
            </div>
            <p className="pwa-ios-instruction">
              Follow these two quick steps to install MRUMSA as an app on your home screen:
            </p>
            <ol className="pwa-ios-steps">
              <li>
                Tap the <strong>Share</strong> button{' '}
                <span className="pwa-ios-icon" role="img" aria-label="Share">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ display: 'inline', verticalAlign: 'middle' }}
                  >
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </span>{' '}
                in the bottom Safari toolbar.
              </li>
              <li>
                Scroll down and tap <strong>Add to Home Screen ➕</strong>.
              </li>
              <li>
                Tap <strong>Add</strong> in the top right corner. The app will install instantly on your phone!
              </li>
            </ol>
            <button
              type="button"
              className="primary"
              style={{ width: '100%', marginTop: 16 }}
              onClick={() => setShowIOSModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
