interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
}

export function DatePicker({ value, onChange, label = '期限日', id = 'due-date' }: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        <span className="ml-1 text-xs text-gray-400">(任意)</span>
      </label>
      <input
        type="date"
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}
