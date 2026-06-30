// src/pages/Orders.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/api';
import { OrderTable } from '../components/orders/OrderTable';
import { SearchInput } from '../components/common/SearchInput';
import { Pagination } from '../components/common/Pagination';
import { Skeleton } from '../components/common/Skeleton';
import { usePagination } from '../hooks/usePagination';
import { useDebounce } from '../hooks/useDebounce';
import { translateOrderStatus } from '../utils/formatters';
import { Select } from '../components/common/Select';

export function Orders() {
  const { page, pageSize, goToPage, setPageSize } = usePagination(1, 10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const debouncedSearch = useDebounce(search, 400);

  // دریافت همهٔ سفارش‌ها (بدون پارامتر صفحه‌بندی)
  const {
    data: allOrders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  // اعمال فیلترها به‌صورت محلی
  const filteredOrders = allOrders.filter((order) => {
    const matchSearch = debouncedSearch
      ? String(order.id).includes(debouncedSearch)
      : true;
    const matchStatus = statusFilter !== 'all' ? order.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const totalItems = filteredOrders.length;
  const startIndex = (page - 1) * pageSize;
  const orders = filteredOrders.slice(startIndex, startIndex + pageSize);

  // ریست صفحه هنگام تغییر فیلتر
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    goToPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    goToPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton height={32} width={200} />
        <div className="flex gap-4">
          <Skeleton height={40} width={250} />
          <Skeleton height={40} width={150} />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={60} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در بارگذاری سفارشات
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        سفارشات
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="جستجوی شماره سفارش..."
          className="sm:w-64"
        />
        <Select
          value={statusFilter}
          onChange={(value) => handleStatusChange({ target: { value } })} // یا مستقیماً setStatusFilter(value)
          options={[
            { value: 'all', label: 'همه وضعیت‌ها' },
            { value: 'pending', label: translateOrderStatus('pending') },
            { value: 'processing', label: translateOrderStatus('processing') },
            { value: 'shipped', label: translateOrderStatus('shipped') },
            { value: 'delivered', label: translateOrderStatus('delivered') },
            { value: 'cancelled', label: translateOrderStatus('cancelled') },
          ]}
          placeholder="همه وضعیت‌ها"
        />
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          سفارشی یافت نشد.
        </p>
      ) : (
        <>
          <OrderTable orders={orders} />
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={goToPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}
    </div>
  );
}

export default Orders;