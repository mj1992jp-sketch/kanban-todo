export type ColumnId = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  columnId: ColumnId;
  title: string;
  description: string;
  dueDate: string | null;
  createdAt: string;
}

export interface Column {
  id: ColumnId;
  label: string;
  color: string;
}

export type ModalState =
  | { mode: 'closed' }
  | { mode: 'add'; columnId: ColumnId }
  | { mode: 'edit'; task: Task };

export interface TaskFormValues {
  title: string;
  description: string;
  dueDate: string;
}
