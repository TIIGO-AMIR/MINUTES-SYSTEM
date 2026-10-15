import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface TopbarProps {
  onNewRecord: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNewRecord }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const handleInstall = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      alert(
        'To install this app on your phone or computer, tap your browser menu (⋮) and select "Install MRUMSA" or "Add to Home screen".'
      );
    }
  };

  return (
    <header className="topbar">
      <div className="brandmark">M</div>
      <div className="brand">
        <strong>MRUMSA</strong>
        <span>Meeting Minutes Manager</span>
      </div>
      <div className="topbar-actions" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {!isInstalled && (
          <button
            type="button"
            className="secondary topbar-install-btn"
            onClick={handleInstall}
            title="Install app to your phone or desktop"
          >
            📱 Install App
          </button>
        )}
        <button id="newBtn" className="primary" onClick={onNewRecord}>
          + New minutes
        </button>
      </div>

      {showIOSGuide && (
        <div className="pwa-ios-overlay" onClick={() => setShowIOSGuide(false)}>
          <div className="pwa-ios-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pwa-ios-header">
              <div className="brandmark" style={{ width: 36, height: 36, fontSize: 18 }}>
                M
              </div>
              <h3>Install on your iPhone / iPad</h3>
            </div>
            <p className="pwa-ios-instruction">
              1. Tap the <strong>Share</strong> button in the Safari toolbar.<br />
              2. Choose <strong>Add to Home Screen ➕</strong>.<br />
              3. Tap <strong>Add</strong> to complete installation.
            </p>
            <button
              type="button"
              className="primary"
              style={{ width: '100%', marginTop: 14 }}
              onClick={() => setShowIOSGuide(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
