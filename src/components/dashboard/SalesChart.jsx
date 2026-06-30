import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../../services/api';
import { Card } from '../common/Card';
import { Spinner } from '../common/Spinner';
import { EmptyState } from '../common/EmptyState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SalesChart() {
  const { data, isLoading } = useQuery({
    queryKey: ['allOrders'],
    queryFn: () => getOrders({ _sort: 'createdAt' }),
  });

  const orders = data?.data ?? [];

  // تبدیل سفارش‌ها به داده‌های نمودار: جمع مبلغ بر اساس تاریخ
  const chartData = orders.reduce((acc, order) => {
    const date = order.createdAt?.split('T')[0]; // تاریخ به صورت YYYY-MM-DD
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.sales += order.totalAmount;
    } else {
      acc.push({ date, sales: order.totalAmount });
    }
    return acc;
  }, []);

  // مرتب‌سازی و محدود کردن به ۷ روز آخر
  const recentData = chartData.slice(-7);

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        فروش هفت روز گذشته
      </h3>
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" />
        </div>
      ) : recentData.length === 0 ? (
        <EmptyState message="داده‌ای برای نمودار موجود نیست" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={recentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6b7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
            <Tooltip />
            <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}