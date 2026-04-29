import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { TaskForm } from './TaskForm';
import type { ModalState, TaskFormValues } from '../../types';

interface TaskModalProps {
  state: ModalState;
  onSubmit: (values: TaskFormValues) => void;
  onClose: () => void;
}

export function TaskModal({ state, onSubmit, onClose }: TaskModalProps) {
  useEffect(() => {
    if (state.mode === 'closed') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [state.mode, onClose]);

  if (state.mode === 'closed') return null;

  const title = state.mode === 'add' ? 'タスクを追加' : 'タスクを編集';
  const initialValues: TaskFormValues | undefined =
    state.mode === 'edit'
      ? { title: state.task.title, description: state.task.description, dueDate: state.task.dueDate ?? '' }
      : undefined;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 id="modal-title" className="text-base font-semibold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="閉じる"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4">
          <TaskForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
