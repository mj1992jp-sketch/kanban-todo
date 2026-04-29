import { useState } from 'react';
import { Button } from '../ui/Button';
import { DatePicker } from '../ui/DatePicker';
import type { TaskFormValues } from '../../types';

interface TaskFormProps {
  initialValues?: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
}

const DEFAULT_VALUES: TaskFormValues = { title: '', description: '', dueDate: '' };

export function TaskForm({ initialValues = DEFAULT_VALUES, onSubmit, onCancel }: TaskFormProps) {
  const [values, setValues] = useState<TaskFormValues>(initialValues);
  const [titleError, setTitleError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) {
      setTitleError('タイトルを入力してください');
      return;
    }
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="task-title" className="text-sm font-medium text-gray-700">
          タイトル <span className="text-red-500">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          autoFocus
          value={values.title}
          onChange={e => {
            setValues(v => ({ ...v, title: e.target.value }));
            if (titleError) setTitleError('');
          }}
          placeholder="タスクのタイトルを入力"
          maxLength={100}
          className={`px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${titleError ? 'border-red-400' : 'border-gray-300'}`}
        />
        {titleError && <p className="text-xs text-red-500">{titleError}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="task-description" className="text-sm font-medium text-gray-700">
          説明
          <span className="ml-1 text-xs text-gray-400">(任意)</span>
        </label>
        <textarea
          id="task-description"
          value={values.description}
          onChange={e => setValues(v => ({ ...v, description: e.target.value }))}
          placeholder="詳細な説明を入力"
          rows={3}
          maxLength={500}
          className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <DatePicker
        value={values.dueDate}
        onChange={val => setValues(v => ({ ...v, dueDate: val }))}
      />

      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="secondary" onClick={onCancel}>
          キャンセル
        </Button>
        <Button type="submit" variant="primary">
          保存する
        </Button>
      </div>
    </form>
  );
}
