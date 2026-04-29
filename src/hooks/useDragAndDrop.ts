import {
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { COLUMN_IDS } from '../constants';
import type { ColumnId, Task } from '../types';

interface UseDragAndDropProps {
  tasks: Task[];
  moveTask: (taskId: string, newColumnId: ColumnId, overTaskId?: string) => void;
  reorderTasks: (taskId: string, overTaskId: string) => void;
}

export function useDragAndDrop({ tasks, moveTask, reorderTasks }: UseDragAndDropProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function onDragStart({ active }: DragStartEvent) {
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task ?? null);
  }

  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = String(over.id);

    // Dragging over a column container
    if (COLUMN_IDS.includes(overId as ColumnId)) {
      if (activeTask.columnId !== overId) {
        moveTask(activeTask.id, overId as ColumnId);
      }
      return;
    }

    // Dragging over another task
    const overTask = tasks.find(t => t.id === overId);
    if (!overTask) return;

    if (activeTask.columnId !== overTask.columnId) {
      moveTask(activeTask.id, overTask.columnId, overTask.id);
    }
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    if (!activeTask) return;

    const overId = String(over.id);

    if (COLUMN_IDS.includes(overId as ColumnId)) return;

    const overTask = tasks.find(t => t.id === overId);
    if (!overTask) return;

    if (activeTask.columnId === overTask.columnId && activeTask.id !== overTask.id) {
      reorderTasks(activeTask.id, overTask.id);
    }
  }

  return { activeTask, sensors, onDragStart, onDragOver, onDragEnd };
}
