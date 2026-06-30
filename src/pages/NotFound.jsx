// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="text-center">
        <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
        <h1 className="mt-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          ۴۰۴
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          صفحه‌ای که به دنبال آن هستید یافت نشد.
        </p>
        <Link to="/" className="mt-6 inline-block">
          <Button variant="primary">بازگشت به داشبورد</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;