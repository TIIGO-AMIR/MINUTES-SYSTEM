export interface AgendaItem {
  title: string;
  discussion: string;
  decision: string;
  owner: string;
  deadline: string;
}

export type MeetingType =
  | 'Executive Committee Meeting'
  | 'General Members Meeting'
  | 'Annual General Meeting'
  | 'Planning Meeting'
  | 'Emergency Meeting'
  | 'Other';

export type MeetingStatus = 'Draft' | 'For review' | 'Approved';

export interface MeetingMinutes {
  id: string;
  title: string;
  type: string;
  date: string;
  start: string;
  end: string;
  venue: string;
  chair: string;
  secretary: string;
  present: string;
  apologies: string;
  agenda: AgendaItem[];
  aob: string;
  next: string;
  closed: string;
  status: string;
  chairSign: string;
  secretarySign: string;
  updated: string;
}

export type ActiveView = 'dashboard' | 'editor' | 'library';
