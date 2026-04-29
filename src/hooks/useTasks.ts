import { useEffect, useRef, useState } from 'react';
import { STORAGE_KEY } from '../constants';
import type { ColumnId, Task, TaskFormValues } from '../types';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const SEED_TASKS: Task[] = [
  {
    id: 'seed-1',
    columnId: 'todo',
    title: 'デザインの確認',
    description: 'UIモックアップをレビューする',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    columnId: 'in-progress',
    title: 'ログイン機能の実装',
    description: 'JWT認証を実装する',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-3',
    columnId: 'done',
    title: '要件定義書の作成',
    description: '',
    dueDate: null,
    createdAt: new Date().toISOString(),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadFromStorage<Task[]>(STORAGE_KEY, []);
    return stored.length > 0 ? stored : SEED_TASKS;
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  function addTask(values: TaskFormValues, columnId: ColumnId) {
    const task: Task = {
      id: crypto.randomUUID(),
      columnId,
      title: values.title.trim(),
      description: values.description.trim(),
      dueDate: values.dueDate || null,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, task]);
  }

  function updateTask(id: string, values: TaskFormValues) {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, title: values.title.trim(), description: values.description.trim(), dueDate: values.dueDate || null }
          : t
      )
    );
  }

  function deleteTask(id: string) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function moveTask(taskId: string, newColumnId: ColumnId, overTaskId?: string) {
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex === -1) return prev;

      const updated = prev.map(t =>
        t.id === taskId ? { ...t, columnId: newColumnId } : t
      );

      if (!overTaskId) return updated;

      const overIndex = updated.findIndex(t => t.id === overTaskId);
      if (overIndex === -1) return updated;

      const newTaskIndex = updated.findIndex(t => t.id === taskId);
      const result = [...updated];
      const [moved] = result.splice(newTaskIndex, 1);
      result.splice(overIndex, 0, moved);
      return result;
    });
  }

  function reorderTasks(taskId: string, overTaskId: string) {
    setTasks(prev => {
      const from = prev.findIndex(t => t.id === taskId);
      const to = prev.findIndex(t => t.id === overTaskId);
      if (from === -1 || to === -1) return prev;
      const result = [...prev];
      const [item] = result.splice(from, 1);
      result.splice(to, 0, item);
      return result;
    });
  }

  return { tasks, addTask, updateTask, deleteTask, moveTask, reorderTasks, setTasks };
}
