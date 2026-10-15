import React from 'react';

interface TopbarProps {
  onNewRecord: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onNewRecord }) => {
  return (
    <header className="topbar">
      <div className="brandmark">M</div>
      <div className="brand">
        <strong>MRUMSA</strong>
        <span>Meeting Minutes Manager</span>
      </div>
      <button id="newBtn" className="primary" onClick={onNewRecord}>
        + New minutes
      </button>
    </header>
  );
};
