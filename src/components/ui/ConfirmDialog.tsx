import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Button } from './Button';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onCancel]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4"
      >
        <p className="text-sm text-gray-700">{message}</p>
        <div className="flex justify-end gap-2">
          <Button ref={cancelRef} variant="secondary" size="sm" onClick={onCancel}>
            キャンセル
          </Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>
            削除する
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
