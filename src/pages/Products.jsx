// src/pages/Products.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getProducts, deleteProduct, getCategories } from '../services/api';
import { usePagination } from '../hooks/usePagination';
import { useDebounce } from '../hooks/useDebounce';
import { ProductFilters } from '../components/products/ProductFilters';
import { ProductTable } from '../components/products/ProductTable';
import { Pagination } from '../components/common/Pagination';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Skeleton } from '../components/common/Skeleton';

export function Products() {
  const queryClient = useQueryClient();

  // صفحه‌بندی سمت کلاینت
  const { page, pageSize, goToPage, setPageSize } = usePagination(1, 10);

  // فیلترها
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [stockStatus, setStockStatus] = useState('all');

    // Debounce
  const debouncedSearch = useDebounce(search, 400);

  // دریافت همهٔ محصولات (بدون پارامترهای صفحه‌بندی سرور)
// دریافت همهٔ محصولات (بدون پارامترهای صفحه‌بندی سرور)
const {
  data: allProducts = [],
  isLoading,
  isError,
} = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const data = await getProducts();
    console.log('Fetched products:', data);
    return data;
  },
});

  // دریافت دسته‌بندی‌ها
const { data: categories = [], refetch: refetchCategories } = useQuery({
  queryKey: ['categories'],
  queryFn: getCategories,
  staleTime: 0,           // همیشه داده قدیمی در نظر گرفته می‌شود
  refetchOnMount: true,   // هر بار که کامپوننت mount می‌شود، دوباره fetch می‌کند
});
console.log('categories loaded:', categories);
  // اعمال فیلترهای محلی
  const filteredProducts = allProducts.filter((product) => {
    const matchSearch = debouncedSearch
      ? product.title?.includes(debouncedSearch)
      : true;
    const matchCategory = selectedCategory
      ? product.categoryId === Number(selectedCategory)
      : true;
    const matchStock =
      stockStatus === 'inStock'
        ? product.stock > 0
        : stockStatus === 'outOfStock'
        ? product.stock === 0
        : true;
    return matchSearch && matchCategory && matchStock;
  });

  const totalItems = filteredProducts.length;

  // محصولات صفحهٔ جاری
  const startIndex = (page - 1) * pageSize;
  const products = filteredProducts.slice(startIndex, startIndex + pageSize);

  // Mutation حذف
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('محصول با موفقیت حذف شد');
      setDeleteId(null);
    },
    onError: () => toast.error('خطا در حذف محصول'),
  });

  const [deleteId, setDeleteId] = useState(null);

  // ریست صفحه هنگام تغییر فیلتر
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    goToPage(1);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    goToPage(1);
  };
  const handleStockStatusChange = (e) => {
    setStockStatus(e.target.value);
    goToPage(1);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton height={32} width={200} />
        <div className="flex gap-4">
          <Skeleton height={40} width={250} />
          <Skeleton height={40} width={150} />
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
        خطا در بارگذاری محصولات
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          محصولات
        </h1>
        <Link to="/products/add">
          <Button>
            <PlusIcon className="h-5 w-5 ml-1" />
            افزودن محصول
          </Button>
        </Link>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        stockStatus={stockStatus}
        onStockStatusChange={handleStockStatusChange}
        categories={categories}
      />

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-12">
          محصولی مطابق فیلترها یافت نشد.
        </p>
      ) : (
        <>
          <ProductTable
            products={products}
            categories={categories}
            onDelete={(id) => setDeleteId(id)}
          />
          <Pagination
            page={page}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={goToPage}
            onPageSizeChange={setPageSize}
          />
        </>
      )}

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        title="حذف محصول"
        message="آیا از حذف این محصول اطمینان دارید؟"
      />
    </div>
  );
}

export default Products;