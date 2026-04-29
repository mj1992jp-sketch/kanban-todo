import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { Calendar, Pencil, Trash2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { HighlightText } from '../ui/HighlightText';
import { formatDate, isOverdue } from '../../utils/dateUtils';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isMatch?: boolean;
  searchQuery?: string;
}

export function TaskCard({ task, onEdit, onDelete, isMatch = true, searchQuery = '' }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const overdue = isOverdue(task.dueDate);
  const dimmed = searchQuery.trim() !== '' && !isMatch;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-grab active:cursor-grabbing select-none transition-opacity ${isDragging ? 'opacity-40' : dimmed ? 'opacity-40' : 'opacity-100'}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <HighlightText
          text={task.title}
          query={searchQuery}
          className="text-sm font-medium text-gray-800 break-words flex-1 leading-snug"
        />
        <div
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          onClick={e => e.stopPropagation()}
          onPointerDown={e => e.stopPropagation()}
        >
          <button
            className="p-1 rounded hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
            onClick={() => onEdit(task)}
            aria-label="編集"
          >
            <Pencil size={14} />
          </button>
          <button
            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            onClick={() => onDelete(task.id)}
            aria-label="削除"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <HighlightText
          text={task.description}
          query={searchQuery}
          className="mt-1.5 text-xs text-gray-500 line-clamp-2 break-words block"
        />
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
