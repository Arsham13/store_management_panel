import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../services/api';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Spinner } from '../common/Spinner';
import { EmptyState } from '../common/EmptyState';
import { formatPrice, toJalali, translateOrderStatus } from '../../utils/formatters';

export function RecentOrders() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['recentOrders'],
    queryFn: () => getOrders({ _sort: 'createdAt', _order: 'desc', _limit: 5 }),
  });

  const orders = data ?? [];

  const getStatusVariant = (status) => {
    const map = {
      pending: 'warning',
      processing: 'info',
      shipped: 'info',
      delivered: 'success',
      cancelled: 'danger',
    };
    return map[status] || 'default';
  };

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        آخرین سفارش‌ها
      </h3>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : isError ? (
        <p className="text-center text-red-500 py-4">خطا در بارگذاری سفارش‌ها</p>
      ) : orders.length === 0 ? (
        <EmptyState message="هنوز سفارشی ثبت نشده" />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
                <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">شماره</th>
                <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">مبلغ</th>
                <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">وضعیت</th>
                <th className="pb-2 font-medium text-gray-500 dark:text-gray-400">تاریخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-2 text-gray-900 dark:text-gray-100">#{order.id}</td>
                  <td className="py-2 text-gray-900 dark:text-gray-100">{formatPrice(order.totalAmount)}</td>
                  <td className="py-2">
                    <Badge variant={getStatusVariant(order.status)}>
                      {translateOrderStatus(order.status)}
                    </Badge>
                  </td>
                  <td className="py-2 text-gray-500 dark:text-gray-400">{toJalali(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}