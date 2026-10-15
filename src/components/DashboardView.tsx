import React from 'react';
import { MeetingMinutes, ActiveView } from '../types';
import { RecordCard } from './RecordCard';

interface DashboardViewProps {
  records: MeetingMinutes[];
  onNavigate: (view: ActiveView) => void;
  onNewRecord: () => void;
  onEdit: (id: string) => void;
  onPdf: (record: MeetingMinutes) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  onNavigate,
  onNewRecord,
  onEdit,
  onPdf,
  onDuplicate,
  onDelete,
}) => {
  const recentRecords = records.slice(0, 4);
  const lastUpdated = records.length
    ? new Date(records[0].updated).toLocaleDateString()
    : '—';

  return (
    <section id="dashboard" className="view">
      <div className="eyebrow">MUTEESA I ROYAL UNIVERSITY</div>
      <h1>Meeting records, made simple.</h1>
      <p className="muted">
        Create consistent association minutes, edit previous records and export a print-ready PDF.
      </p>

      <div className="stats">
        <article>
          <span>Saved records</span>
          <b>{records.length}</b>
        </article>
        <article>
          <span>Last updated</span>
          <b>{lastUpdated}</b>
        </article>
      </div>

      <div className="section-head">
        <div>
          <h2>Recent minutes</h2>
          <p className="muted">Your latest saved records</p>
        </div>
        <button
          type="button"
          className="secondary"
          onClick={() => onNavigate('library')}
        >
          View all
        </button>
      </div>

      {recentRecords.length > 0 ? (
        <div className="record-list">
          {recentRecords.map((r) => (
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
        <div className="empty" id="dashEmpty">
          <div className="empty-icon">▤</div>
          <h3>No minutes yet</h3>
          <p>
            Start from the association template. You can save a draft and return later.
          </p>
          <button
            type="button"
            className="primary"
            onClick={onNewRecord}
          >
            Create your first minutes
          </button>
        </div>
      )}
    </section>
  );
};
