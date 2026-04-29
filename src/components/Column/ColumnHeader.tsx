import { Plus } from 'lucide-react';
import { Badge } from '../ui/Badge';
import type { Column, ColumnId } from '../../types';

interface ColumnHeaderProps {
  column: Column;
  taskCount: number;
  onAddTask: (columnId: ColumnId) => void;
}

export function ColumnHeader({ column, taskCount, onAddTask }: ColumnHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-gray-700">{column.label}</h2>
        <Badge variant="count">{taskCount}</Badge>
      </div>
      <button
        onClick={() => onAddTask(column.id)}
        className="p-1 rounded hover:bg-white/60 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={`${column.label}にタスクを追加`}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
