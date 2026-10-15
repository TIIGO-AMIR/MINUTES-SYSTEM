import React, { useState, useCallback, useRef } from 'react';
import { MeetingMinutes, ActiveView } from './types';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { EditorView } from './components/EditorView';
import { LibraryView } from './components/LibraryView';
import { Toast } from './components/Toast';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { OfflineIndicator } from './components/OfflineIndicator';

const STORAGE_KEY = 'mrumsa_minutes_v1';

export const createDefaultRecord = (): MeetingMinutes => ({
  id: '',
  title: '',
  type: 'Executive Committee Meeting',
  date: new Date().toISOString().slice(0, 10),
  start: '',
  end: '',
  venue: '',
  chair: '',
  secretary: '',
  present: '',
  apologies: '',
  agenda: [
    {
      title: 'Opening and welcome',
      discussion: '',
      decision: '',
      owner: '',
      deadline: '',
    },
    {
      title: 'Confirmation of previous minutes',
      discussion: '',
      decision: '',
      owner: '',
      deadline: '',
    },
    {
      title: 'Matters arising',
      discussion: '',
      decision: '',
      owner: '',
      deadline: '',
    },
    {
      title: 'Main agenda',
      discussion: '',
      decision: '',
      owner: '',
      deadline: '',
    },
  ],
  aob: '',
  next: '',
  closed: '',
  status: 'Draft',
  chairSign: '',
  secretarySign: '',
  updated: new Date().toISOString(),
});

export const App: React.FC = () => {
  const [records, setRecords] = useState<MeetingMinutes[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [editorMode, setEditorMode] = useState<'create' | 'edit' | 'duplicate'>('create');
  const [currentRecord, setCurrentRecord] = useState<MeetingMinutes>(createDefaultRecord);
  const [autoPrintOnLoad, setAutoPrintOnLoad] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 2600);
  }, []);

  const persistRecords = (updatedRecords: MeetingMinutes[]) => {
    setRecords(updatedRecords);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    } catch (e) {
      console.error('Failed to save records to localStorage', e);
    }
  };

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    setAutoPrintOnLoad(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewRecord = () => {
    setCurrentRecord(createDefaultRecord());
    setEditorMode('create');
    setAutoPrintOnLoad(false);
    setActiveView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (id: string) => {
    const r = records.find((x) => x.id === id);
    if (!r) return;
    setCurrentRecord({ ...r });
    setEditorMode('edit');
    setAutoPrintOnLoad(false);
    setActiveView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicate = (id: string) => {
    const r = records.find((x) => x.id === id);
    if (!r) return;
    setCurrentRecord({
      ...r,
      id: '',
      title: 'Copy of ' + (r.title || 'Meeting Minutes'),
    });
    setEditorMode('duplicate');
    setAutoPrintOnLoad(false);
    setActiveView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete these minutes permanently from this browser?')) {
      return;
    }
    const updated = records.filter((r) => r.id !== id);
    persistRecords(updated);
    showToast('Record deleted');
  };

  const handlePdf = (record: MeetingMinutes) => {
    setCurrentRecord({ ...record });
    setEditorMode('edit');
    setAutoPrintOnLoad(true);
    setActiveView('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveRecord = (record: MeetingMinutes) => {
    const idx = records.findIndex((x) => x.id === record.id);
    let updated: MeetingMinutes[];
    if (idx >= 0) {
      updated = [...records];
      updated[idx] = record;
    } else {
      updated = [record, ...records];
    }
    persistRecords(updated);
    setCurrentRecord(record);
    setEditorMode('edit');
  };

  const handleExportBackup = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mrumsa-minutes-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!Array.isArray(data)) {
        throw new Error('Not an array');
      }
      const map = new Map(records.map((r) => [r.id, r]));
      data.forEach((r) => {
        if (r && r.id) {
          map.set(r.id, r);
        }
      });
      const merged = [...map.values()].sort((a, b) =>
        (b.updated || '').localeCompare(a.updated || '')
      );
      persistRecords(merged);
      showToast('Backup imported');
    } catch {
      window.alert('This backup file is not valid.');
    }
  };

  return (
    <div>
      <PWAInstallBanner />
      <Topbar onNewRecord={handleNewRecord} />
      <div className="layout">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        <main>
          {activeView === 'dashboard' && (
            <DashboardView
              records={records}
              onNavigate={handleNavigate}
              onNewRecord={handleNewRecord}
              onEdit={handleEdit}
              onPdf={handlePdf}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
            />
          )}

          {activeView === 'editor' && (
            <EditorView
              key={currentRecord.id || 'new'}
              initialRecord={currentRecord}
              editorMode={editorMode}
              onSave={handleSaveRecord}
              onNavigate={handleNavigate}
              showToast={showToast}
              autoPrintOnLoad={autoPrintOnLoad}
            />
          )}

          {activeView === 'library' && (
            <LibraryView
              records={records}
              onEdit={handleEdit}
              onPdf={handlePdf}
              onDuplicate={handleDuplicate}
              onDelete={handleDelete}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
            />
          )}
        </main>
      </div>
      <Toast message={toastMessage} />
      <OfflineIndicator />
    </div>
  );
};

export default App;
