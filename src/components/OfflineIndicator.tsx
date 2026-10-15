import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="offline-badge" role="status">
      <span className="offline-dot" />
      Offline Mode — Working from local storage
    </div>
  );
};
