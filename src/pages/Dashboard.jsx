import { useQuery } from '@tanstack/react-query';
import { getProducts, getOrders, getCustomers } from '../services/api';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentOrders } from '../components/dashboard/RecentOrders';
import { SalesChart } from '../components/dashboard/SalesChart';
import { formatPrice, toPersianDigits } from '../utils/formatters';
import { ShoppingBagIcon, BanknotesIcon, UsersIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

export function Dashboard() {
  const { data: productsData } = useQuery({ queryKey: ['products'], queryFn: () => getProducts() });
  const { data: ordersData } = useQuery({ queryKey: ['orders'], queryFn: () => getOrders() });
  const { data: customersData } = useQuery({ queryKey: ['customers'], queryFn: () => getCustomers() });

  const totalProducts = productsData?.length ?? 0;
  const totalOrders = ordersData?.length ?? 0;
  const totalCustomers = customersData?.length ?? 0;
  const totalRevenue = ordersData?.reduce((sum, o) => sum + (o.totalAmount || 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">داشبورد</h1>

      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="کل محصولات"
          value={toPersianDigits(totalProducts)}
          icon={ShoppingBagIcon}
          accent="indigo"
        />
        <StatsCard
          title="کل سفارش‌ها"
          value={toPersianDigits(totalOrders)}
          icon={ClipboardDocumentListIcon}
          accent="green"
        />
        <StatsCard
          title="مشتریان"
          value={toPersianDigits(totalCustomers)}
          icon={UsersIcon}
          accent="amber"
        />
        <StatsCard
          title="درآمد کل"
          value={formatPrice(totalRevenue)}
          icon={BanknotesIcon}
          accent="rose"
        />
      </div>

      {/* نمودار فروش */}
      <SalesChart />

      {/* آخرین سفارش‌ها */}
      <RecentOrders />
    </div>
  );
}

export default Dashboard;