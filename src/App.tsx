import { useState } from 'react';
import { Board } from './components/Board/Board';
import { TaskModal } from './components/TaskModal/TaskModal';
import { ConfirmDialog } from './components/ui/ConfirmDialog';
import { useTasks } from './hooks/useTasks';
import type { ColumnId, ModalState, Task, TaskFormValues } from './types';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, moveTask, reorderTasks } = useTasks();
  const [modalState, setModalState] = useState<ModalState>({ mode: 'closed' });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function handleAddTask(columnId: ColumnId) {
    setModalState({ mode: 'add', columnId });
  }

  function handleEditTask(task: Task) {
    setModalState({ mode: 'edit', task });
  }

  function handleDeleteTask(taskId: string) {
    setDeleteConfirm(taskId);
  }

  function handleModalSubmit(values: TaskFormValues) {
    if (modalState.mode === 'add') {
      addTask(values, modalState.columnId);
    } else if (modalState.mode === 'edit') {
      updateTask(modalState.task.id, values);
    }
    setModalState({ mode: 'closed' });
  }

  function handleConfirmDelete() {
    if (deleteConfirm) {
      deleteTask(deleteConfirm);
    }
    setDeleteConfirm(null);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">カンバンボード</h1>
      </header>

      <main className="p-4 md:p-6">
        <Board
          tasks={tasks}
          moveTask={moveTask}
          reorderTasks={reorderTasks}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>

      <TaskModal
        state={modalState}
        onSubmit={handleModalSubmit}
        onClose={() => setModalState({ mode: 'closed' })}
      />

      {deleteConfirm && (
        <ConfirmDialog
          message="このタスクを削除しますか？この操作は元に戻せません。"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
}
