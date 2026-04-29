import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from '../TaskCard/TaskCard';
import { ColumnHeader } from './ColumnHeader';
import type { Column as ColumnType, ColumnId, Task } from '../../types';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  matchedTaskIds: Set<string>;
  searchQuery: string;
  onAddTask: (columnId: ColumnId) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Column({ column, tasks, matchedTaskIds, searchQuery, onAddTask, onEditTask, onDeleteTask }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const taskIds = tasks.map(t => t.id);
  const isSearching = searchQuery.trim() !== '';
  const hasMatch = tasks.some(t => matchedTaskIds.has(t.id));

  return (
    <div className={`flex flex-col rounded-xl border-t-4 ${column.color} bg-gray-50 p-3 min-h-[500px] transition-colors ${isOver ? 'bg-blue-50' : ''}`}>
      <ColumnHeader column={column} taskCount={tasks.length} onAddTask={onAddTask} />

      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col gap-2 flex-1">
          {isSearching && !hasMatch && tasks.length > 0 && (
            <p className="text-xs text-gray-400 text-center py-3">該当するタスクはありません</p>
          )}
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              isMatch={matchedTaskIds.has(task.id)}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
