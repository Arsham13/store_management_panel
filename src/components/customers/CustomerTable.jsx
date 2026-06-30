// src/components/customers/CustomerTable.jsx
import { Link } from 'react-router-dom';
import { toPersianDigits, formatPrice } from '../../utils/formatters';

export function CustomerTable({ customers = [] }) {
  if (customers.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        مشتری‌ای یافت نشد.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">نام</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">ایمیل</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تلفن</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تعداد سفارش</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">مجموع خرید</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">جزئیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                {customer.firstName} {customer.lastName}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">{customer.email}</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">{customer.phone}</td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {toPersianDigits(customer.totalOrders)}
              </td>
              <td className="py-3 text-gray-900 dark:text-gray-100 font-medium">
                {formatPrice(customer.totalSpent)}
              </td>
              <td className="py-3">
                <Link
                  to={`/customers/${customer.id}`}
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                >
                  مشاهده
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}