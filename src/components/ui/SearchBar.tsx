import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex items-center">
      <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="タスクを検索..."
        className="pl-9 pr-8 py-1.5 text-sm bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors w-56"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="検索をクリア"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
