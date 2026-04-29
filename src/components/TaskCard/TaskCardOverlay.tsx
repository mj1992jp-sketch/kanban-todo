import { Calendar } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import type { Task } from '../../types';

interface TaskCardOverlayProps {
  task: Task;
}

export function TaskCardOverlay({ task }: TaskCardOverlayProps) {
  const overdue = isOverdue(task.dueDate);

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 rotate-2 cursor-grabbing select-none w-64">
      <p className="text-sm font-medium text-gray-800 break-words leading-snug">
        {task.title}
      </p>

      {task.description && (
        <p className="mt-1.5 text-xs text-gray-500 line-clamp-2 break-words">
          {task.description}
        </p>
      )}

      {task.dueDate && (
        <div className="mt-2 flex items-center gap-1.5">
          <Calendar size={12} className={overdue ? 'text-red-500' : 'text-gray-400'} />
          <span className={`text-xs ${overdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
            {formatDate(task.dueDate)}
          </span>
          {overdue && <Badge variant="overdue">期限切れ</Badge>}
        </div>
      )}
    </div>
  );
}
