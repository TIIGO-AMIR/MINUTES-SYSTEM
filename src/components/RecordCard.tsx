import React from 'react';
import { MeetingMinutes } from '../types';

interface RecordCardProps {
  record: MeetingMinutes;
  onEdit: (id: string) => void;
  onPdf: (record: MeetingMinutes) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  record,
  onEdit,
  onPdf,
  onDuplicate,
  onDelete,
}) => {
  return (
    <article className="record">
      <div className="record-icon">▤</div>
      <div className="record-info">
        <strong>{record.title || 'Untitled meeting'}</strong>
        <small>
          {record.date || 'No date'} · {record.venue || 'Venue not specified'}
        </small>
        <br />
        <span className="pill">{record.status || 'Draft'}</span>
      </div>
      <div className="record-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => onEdit(record.id)}
        >
          Edit
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => onPdf(record)}
        >
          PDF
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => onDuplicate(record.id)}
        >
          Copy
        </button>
        <button
          type="button"
          className="remove-item"
          onClick={() => onDelete(record.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
};
