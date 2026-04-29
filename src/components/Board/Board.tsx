import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { Column } from '../Column/Column';
import { TaskCardOverlay } from '../TaskCard/TaskCardOverlay';
import { COLUMNS } from '../../constants';
import type { ColumnId, Task } from '../../types';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface BoardProps {
  tasks: Task[];
  moveTask: (taskId: string, newColumnId: ColumnId, overTaskId?: string) => void;
  reorderTasks: (taskId: string, overTaskId: string) => void;
  onAddTask: (columnId: ColumnId) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Board({ tasks, moveTask, reorderTasks, onAddTask, onEditTask, onDeleteTask }: BoardProps) {
  const { activeTask, sensors, onDragStart, onDragOver, onDragEnd } = useDragAndDrop({
    tasks,
    moveTask,
    reorderTasks,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map(column => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter(t => t.columnId === column.id)}
            onAddTask={onAddTask}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask && <TaskCardOverlay task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
}
