import { Link } from 'react-router-dom';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatPrice, toJalali, toPersianDigits } from '../../utils/formatters';

export function OrderTable({ orders = [] }) {
  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        سفارشی یافت نشد.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">شماره سفارش</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">مشتری</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">مبلغ کل</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">وضعیت</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تاریخ</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">جزئیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                #{toPersianDigits(order.id)}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                مشتری #{toPersianDigits(order.customerId)}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {formatPrice(order.totalAmount)}
              </td>
              <td className="py-3">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="py-3 text-gray-500 dark:text-gray-400">
                {toJalali(order.createdAt)}
              </td>
              <td className="py-3">
                <Link
                  to={`/orders/${order.id}`}
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