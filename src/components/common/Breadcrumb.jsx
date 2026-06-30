import { Link } from 'react-router-dom';
import { HomeIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

export function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400">
      <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
        <HomeIcon className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          <ChevronLeftIcon className="h-4 w-4 mx-2 text-gray-400" />
          {item.to ? (
            <Link to={item.to} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-900 dark:text-gray-200">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}