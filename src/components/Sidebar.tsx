import React from 'react';
import { ActiveView } from '../types';

interface SidebarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  return (
    <aside className="sidebar">
      <button
        className={`nav ${activeView === 'dashboard' ? 'active' : ''}`}
        onClick={() => onNavigate('dashboard')}
      >
        ▦ &nbsp; Dashboard
      </button>
      <button
        className={`nav ${activeView === 'editor' ? 'active' : ''}`}
        onClick={() => onNavigate('editor')}
      >
        ＋ &nbsp; Create minutes
      </button>
      <button
        className={`nav ${activeView === 'library' ? 'active' : ''}`}
        onClick={() => onNavigate('library')}
      >
        ▤ &nbsp; Saved minutes
      </button>
      <div className="side-note">
        <strong>Local workspace</strong>
        <p>Your minutes are saved in this browser on this device. Export backups regularly.</p>
      </div>
    </aside>
  );
};
