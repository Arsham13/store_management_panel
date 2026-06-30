import { InboxIcon } from '@heroicons/react/24/outline';

export function EmptyState({ message = 'داده‌ای یافت نشد', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-gray-400 dark:text-gray-500 ${className}`}>
      <InboxIcon className="h-16 w-16 mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}