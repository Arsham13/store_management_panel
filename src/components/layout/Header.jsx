import { Bars3Icon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { ThemeToggle } from '../common/ThemeToggle';
import { Breadcrumb } from '../common/Breadcrumb';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export function Header({ breadcrumbItems = [], onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden text-sm text-gray-700 dark:text-gray-300 sm:block">
          {user?.fullName}
        </div>
        <Button variant="ghost" size="sm" onClick={logout}>
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}