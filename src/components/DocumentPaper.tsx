import React from 'react';
import { MeetingMinutes } from '../types';

interface DocumentPaperProps {
  record: MeetingMinutes;
}

export const DocumentPaper: React.FC<DocumentPaperProps> = ({ record }) => {
  const formattedDate = record.date
    ? new Date(record.date + 'T12:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Not recorded';

  const timeRange =
    [record.start, record.end].filter(Boolean).join(' – ') || 'Not recorded';

  const renderList = (text: string) => {
    if (!text || !text.trim()) {
      return (
        <p>
          <em>Not recorded.</em>
        </p>
      );
    }
    const lines = text
      .split(/\n|,/)
      .map((x) => x.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return (
        <p>
          <em>Not recorded.</em>
        </p>
      );
    }

    return (
      <ul>
        {lines.map((line, idx) => (
          <li key={idx}>{line}</li>
        ))}
      </ul>
    );
  };

  const renderMultiLine = (text: string, fallback: string) => {
    if (!text || !text.trim()) {
      return fallback;
    }
    return text.split('\n').map((line, idx, arr) => (
      <React.Fragment key={idx}>
        {line}
        {idx < arr.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="paper" id="printablePaper">
      <div className="doc-header">
        <img
          className="official-header-image"
          src="/assets/mru-header.png"
          alt="Muteesa I Royal University official header"
        />
        <p>Official Meeting Minutes</p>
      </div>

      <h3>{record.title || 'Meeting Minutes'}</h3>

      <table className="meta">
        <tbody>
          <tr>
            <td>Meeting type</td>
            <td>{record.type || 'Executive Committee Meeting'}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{formattedDate}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{timeRange}</td>
          </tr>
          <tr>
            <td>Venue</td>
            <td>{record.venue || 'Not recorded'}</td>
          </tr>
          <tr>
            <td>Chairperson</td>
            <td>{record.chair || 'Not recorded'}</td>
          </tr>
          <tr>
            <td>Minute secretary</td>
            <td>{record.secretary || 'Not recorded'}</td>
          </tr>
        </tbody>
      </table>

      <h4>1. Members present</h4>
      {renderList(record.present)}

      <h4>2. Apologies / absent members</h4>
      {renderList(record.apologies)}

      <h4>3. AGENDA</h4>
      {record.agenda && record.agenda.length > 0 ? (
        <ol className="agenda-only">
          {record.agenda.map((item, idx) => (
            <li key={idx}>{item.title || 'Agenda item'}</li>
          ))}
        </ol>
      ) : (
        <p>
          <em>No agenda items recorded.</em>
        </p>
      )}

      <h4>4. AGENDA PROCEEDINGS, DISCUSSIONS AND RESOLUTIONS</h4>
      {record.agenda && record.agenda.length > 0 ? (
        record.agenda.map((item, idx) => (
          <div key={idx} className="agenda-block">
            <h4>
              4.{idx + 1} {item.title || 'Agenda item'}
            </h4>
            <p>
              {renderMultiLine(
                item.discussion,
                'No discussion notes recorded.'
              )}
            </p>
            <p>
              <strong>Resolution / decision:</strong>{' '}
              {item.decision || 'None recorded.'}
            </p>
            {(item.owner || item.deadline) && (
              <p>
                <strong>Action:</strong> {item.owner || 'Not assigned'}
                {item.deadline ? ` — deadline ${item.deadline}` : ''}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>
          <em>No proceedings recorded.</em>
        </p>
      )}

      <h4>5. Any other business</h4>
      <p>{renderMultiLine(record.aob, 'No other business recorded.')}</p>

      <h4>6. Date of next meeting</h4>
      <p>{renderMultiLine(record.next, 'To be communicated.')}</p>

      <h4>7. Closure</h4>
      <p>
        The meeting was closed
        {record.closed
          ? ` at ${record.closed}`
          : ' at a time not recorded'}
        .
      </p>
      <p>
        <strong>Record status:</strong> {record.status || 'Draft'}
      </p>

      <div className="signatures">
        <div>
          Chairperson: {record.chairSign || record.chair || '________________'}
          <br />
          Date: __________________
        </div>
        <div>
          Minute Secretary:{' '}
          {record.secretarySign || record.secretary || '________________'}
          <br />
          Date: __________________
        </div>
      </div>
    </div>
  );
};
