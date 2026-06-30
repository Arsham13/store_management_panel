// src/pages/Customers.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '../services/api';
import { CustomerTable } from '../components/customers/CustomerTable';
import { SearchInput } from '../components/common/SearchInput';
import { Pagination } from '../components/common/Pagination';
import { Skeleton } from '../components/common/Skeleton';
import { usePagination } from '../hooks/usePagination';
import { useDebounce } from '../hooks/useDebounce';

export function Customers() {
  const { page, pageSize, goToPage, setPageSize } = usePagination(1, 10);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  // دریافت همهٔ مشتریان (بدون صفحه‌بندی سرور)
  const {
    data: allCustomers = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
  });

  // فیلتر محلی
  const filteredCustomers = allCustomers.filter((customer) => {
    if (!debouncedSearch) return true;
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase());
  });

  const totalItems = filteredCustomers.length;
  const startIndex = (page - 1) * pageSize;
  const customers = filteredCustomers.slice(startIndex, startIndex + pageSize);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    goToPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton height={32} width={200} />
        <Skeleton height={40} width={250} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height={60} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در بارگذاری مشتریان
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        مشتریان
      </h1>

      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="جستجوی مشتری..."
        className="w-full sm:w-64"
      />

      {customers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          مشتری‌ای یافت نشد.
        </p>
      ) : (
        <>
          <CustomerTable customers={customers} />
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

export default Customers;