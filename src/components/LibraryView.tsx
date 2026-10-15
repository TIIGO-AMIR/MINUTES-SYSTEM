import React, { useState } from 'react';
import { MeetingMinutes } from '../types';
import { RecordCard } from './RecordCard';

interface LibraryViewProps {
  records: MeetingMinutes[];
  onEdit: (id: string) => void;
  onPdf: (record: MeetingMinutes) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  records,
  onEdit,
  onPdf,
  onDuplicate,
  onDelete,
  onExportBackup,
  onImportBackup,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecords = records.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const combined = [r.title, r.date, r.venue, r.type].join(' ').toLowerCase();
    return combined.includes(q);
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = '';
    }
  };

  return (
    <section id="library" className="view">
      <div className="eyebrow">RECORDS ARCHIVE</div>
      <h1>Saved minutes</h1>
      <p className="muted">
        Open a record to edit it, duplicate it or export it as PDF.
      </p>

      <div className="library-tools">
        <input
          id="searchRecords"
          placeholder="Search by title, date or venue…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="button"
          id="exportBackup"
          className="secondary"
          onClick={onExportBackup}
        >
          Export data backup
        </button>
        <label className="upload-btn secondary">
          Import backup
          <input
            type="file"
            id="importBackup"
            accept="application/json"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {filteredRecords.length > 0 ? (
        <div id="allRecords" className="record-list">
          {filteredRecords.map((r) => (
            <RecordCard
              key={r.id}
              record={r}
              onEdit={onEdit}
              onPdf={onPdf}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div id="libraryEmpty" className="empty">
          <div className="empty-icon">▤</div>
          <h3>No matching records</h3>
          <p>Create minutes or try a different search.</p>
        </div>
      )}
    </section>
  );
};
