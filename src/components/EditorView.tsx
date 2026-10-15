import React, { useRef, useState, useEffect } from 'react';
import { MeetingMinutes, AgendaItem, ActiveView } from '../types';
import { DocumentPaper } from './DocumentPaper';

interface EditorViewProps {
  initialRecord: MeetingMinutes;
  editorMode: 'create' | 'edit' | 'duplicate';
  onSave: (record: MeetingMinutes) => void;
  onNavigate: (view: ActiveView) => void;
  showToast: (msg: string) => void;
  autoPrintOnLoad?: boolean;
}

export const EditorView: React.FC<EditorViewProps> = ({
  initialRecord,
  editorMode,
  onSave,
  onNavigate,
  showToast,
  autoPrintOnLoad,
}) => {
  const [formData, setFormData] = useState<MeetingMinutes>(initialRecord);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string>(
    editorMode === 'edit' ? 'Editing saved record.' : ''
  );
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData(initialRecord);
    setSaveMessage(editorMode === 'edit' ? 'Editing saved record.' : '');
    if (autoPrintOnLoad) {
      setShowPreview(true);
      setTimeout(() => {
        window.print();
      }, 200);
    }
  }, [initialRecord, editorMode, autoPrintOnLoad]);

  const editorTitle =
    editorMode === 'create'
      ? 'Create meeting minutes'
      : editorMode === 'duplicate'
      ? 'Duplicate meeting minutes'
      : 'Edit meeting minutes';

  const handleFieldChange = (
    field: keyof MeetingMinutes,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAgendaChange = (
    index: number,
    field: keyof AgendaItem,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [...prev.agenda];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, agenda: updated };
    });
  };

  const handleAddAgenda = () => {
    setFormData((prev) => ({
      ...prev,
      agenda: [
        ...prev.agenda,
        {
          title: '',
          discussion: '',
          decision: '',
          owner: '',
          deadline: '',
        },
      ],
    }));
  };

  const handleRemoveAgenda = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    if (formRef.current && !formRef.current.reportValidity()) {
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    if (!formData.agenda.length) {
      showToast('Add at least one agenda item.');
      return;
    }

    const recordToSave: MeetingMinutes = {
      ...formData,
      id: formData.id || 'm_' + Date.now(),
      title: formData.title.trim(),
      venue: formData.venue.trim(),
      chair: formData.chair.trim(),
      secretary: formData.secretary.trim(),
      present: formData.present.trim(),
      apologies: formData.apologies.trim(),
      aob: formData.aob.trim(),
      next: formData.next.trim(),
      chairSign: formData.chairSign.trim(),
      secretarySign: formData.secretarySign.trim(),
      agenda: formData.agenda.map((a) => ({
        ...a,
        title: a.title.trim(),
        discussion: a.discussion.trim(),
        decision: a.decision.trim(),
        owner: a.owner.trim(),
      })),
      updated: new Date().toISOString(),
    };

    setFormData(recordToSave);
    onSave(recordToSave);
    setSaveMessage('Saved successfully in this browser.');
    showToast('Minutes saved');
  };

  const handlePreviewClick = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handlePrintClick = () => {
    if (!validateForm()) return;
    setShowPreview(true);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <section id="editor" className="view">
      <div className="section-head">
        <div>
          <div className="eyebrow">DOCUMENT BUILDER</div>
          <h1 id="editorTitle">{editorTitle}</h1>
          <p className="muted">
            Fill in the meeting details and agenda items. The preview updates as you type.
          </p>
        </div>
        <button
          type="button"
          id="backBtn"
          className="secondary"
          onClick={() => onNavigate('dashboard')}
        >
          ← Dashboard
        </button>
      </div>

      <form
        id="minutesForm"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="form-grid">
          <label>
            Meeting title *
            <input
              id="meetingTitle"
              required
              placeholder="e.g. Executive Committee Meeting"
              value={formData.title}
              onChange={(e) => handleFieldChange('title', e.target.value)}
            />
          </label>
          <label>
            Meeting type
            <select
              id="meetingType"
              value={formData.type}
              onChange={(e) => handleFieldChange('type', e.target.value)}
            >
              <option>Executive Committee Meeting</option>
              <option>General Members Meeting</option>
              <option>Annual General Meeting</option>
              <option>Planning Meeting</option>
              <option>Emergency Meeting</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Date *
            <input
              id="meetingDate"
              type="date"
              required
              value={formData.date}
              onChange={(e) => handleFieldChange('date', e.target.value)}
            />
          </label>
          <label>
            Start time
            <input
              id="startTime"
              type="time"
              value={formData.start}
              onChange={(e) => handleFieldChange('start', e.target.value)}
            />
          </label>
          <label>
            End time
            <input
              id="endTime"
              type="time"
              value={formData.end}
              onChange={(e) => handleFieldChange('end', e.target.value)}
            />
          </label>
          <label>
            Venue / platform
            <input
              id="venue"
              placeholder="e.g. University mosque"
              value={formData.venue}
              onChange={(e) => handleFieldChange('venue', e.target.value)}
            />
          </label>
          <label>
            Chairperson
            <input
              id="chairperson"
              placeholder="Full name"
              value={formData.chair}
              onChange={(e) => handleFieldChange('chair', e.target.value)}
            />
          </label>
          <label>
            Minute secretary
            <input
              id="secretary"
              placeholder="Full name"
              value={formData.secretary}
              onChange={(e) => handleFieldChange('secretary', e.target.value)}
            />
          </label>
          <label className="wide">
            Members present
            <textarea
              id="present"
              rows={2}
              placeholder="List names, separated by commas or new lines"
              value={formData.present}
              onChange={(e) => handleFieldChange('present', e.target.value)}
            />
          </label>
          <label className="wide">
            Apologies / absent members
            <textarea
              id="apologies"
              rows={2}
              placeholder="Names and apologies received"
              value={formData.apologies}
              onChange={(e) => handleFieldChange('apologies', e.target.value)}
            />
          </label>
        </div>

        <div className="section-head agenda-head">
          <div>
            <h2>Agenda and proceedings</h2>
            <p className="muted">
              Use one item per agenda point. Include discussion, resolutions and action owners.
            </p>
          </div>
          <button
            type="button"
            id="addAgenda"
            className="secondary"
            onClick={handleAddAgenda}
          >
            + Add agenda item
          </button>
        </div>

        <div id="agendaItems">
          {formData.agenda.map((item, index) => (
            <div key={index} className="agenda-card">
              <div className="agenda-card-top">
                <strong>
                  Agenda item <span className="agenda-num">{index + 1}</span>
                </strong>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => handleRemoveAgenda(index)}
                >
                  Remove
                </button>
              </div>
              <div className="agenda-fields">
                <label className="wide">
                  Agenda title *
                  <input
                    className="ag-title"
                    required
                    placeholder="e.g. Opening and welcome"
                    value={item.title}
                    onChange={(e) =>
                      handleAgendaChange(index, 'title', e.target.value)
                    }
                  />
                </label>
                <label className="wide">
                  Discussion / proceedings
                  <textarea
                    className="ag-discussion"
                    rows={3}
                    placeholder="Summarise the discussion in clear, formal language"
                    value={item.discussion}
                    onChange={(e) =>
                      handleAgendaChange(index, 'discussion', e.target.value)
                    }
                  />
                </label>
                <label className="wide">
                  Resolution / decision
                  <textarea
                    className="ag-decision"
                    rows={2}
                    placeholder="What was agreed or decided?"
                    value={item.decision}
                    onChange={(e) =>
                      handleAgendaChange(index, 'decision', e.target.value)
                    }
                  />
                </label>
                <label>
                  Action person / committee
                  <input
                    className="ag-owner"
                    placeholder="Person responsible"
                    value={item.owner}
                    onChange={(e) =>
                      handleAgendaChange(index, 'owner', e.target.value)
                    }
                  />
                </label>
                <label>
                  Deadline
                  <input
                    className="ag-deadline"
                    type="date"
                    value={item.deadline}
                    onChange={(e) =>
                      handleAgendaChange(index, 'deadline', e.target.value)
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="form-grid closing-grid">
          <label className="wide">
            Any other business
            <textarea
              id="aob"
              rows={3}
              placeholder="Other matters raised"
              value={formData.aob}
              onChange={(e) => handleFieldChange('aob', e.target.value)}
            />
          </label>
          <label className="wide">
            Next meeting
            <textarea
              id="nextMeeting"
              rows={2}
              placeholder="Proposed date, time and venue, or 'To be communicated'"
              value={formData.next}
              onChange={(e) => handleFieldChange('next', e.target.value)}
            />
          </label>
          <label>
            Meeting closed at
            <input
              id="closedAt"
              type="time"
              value={formData.closed}
              onChange={(e) => handleFieldChange('closed', e.target.value)}
            />
          </label>
          <label>
            Approval status
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleFieldChange('status', e.target.value)}
            >
              <option>Draft</option>
              <option>For review</option>
              <option>Approved</option>
            </select>
          </label>
          <label>
            Chairperson signature name
            <input
              id="chairSign"
              placeholder="Name / signature line"
              value={formData.chairSign}
              onChange={(e) => handleFieldChange('chairSign', e.target.value)}
            />
          </label>
          <label>
            Secretary signature name
            <input
              id="secretarySign"
              placeholder="Name / signature line"
              value={formData.secretarySign}
              onChange={(e) =>
                handleFieldChange('secretarySign', e.target.value)
              }
            />
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            id="previewBtn"
            className="secondary"
            onClick={handlePreviewClick}
          >
            Preview document
          </button>
          <button
            type="button"
            id="saveBtn"
            className="primary"
            onClick={handleSave}
          >
            Save minutes
          </button>
          <button
            type="button"
            id="pdfBtn"
            className="dark"
            onClick={handlePrintClick}
          >
            Download / Print PDF
          </button>
        </div>

        {saveMessage && (
          <p id="saveMessage" className="message" aria-live="polite">
            {saveMessage}
          </p>
        )}
      </form>

      {showPreview && (
        <div id="previewWrap" className="preview-wrap" ref={previewRef}>
          <div className="section-head">
            <h2>Document preview</h2>
            <button
              type="button"
              id="closePreview"
              className="secondary"
              onClick={() => setShowPreview(false)}
            >
              Close preview
            </button>
          </div>
          <DocumentPaper record={formData} />
        </div>
      )}
    </section>
  );
};
