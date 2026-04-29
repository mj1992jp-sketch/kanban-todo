import type { Column } from '../types';

export const STORAGE_KEY = 'kanban-tasks-v1';

export const COLUMNS: Column[] = [
  { id: 'todo',        label: '未着手', color: 'border-slate-400' },
  { id: 'in-progress', label: '進行中', color: 'border-blue-500'  },
  { id: 'done',        label: '完了',   color: 'border-green-500' },
];

export const COLUMN_IDS = COLUMNS.map(c => c.id);
