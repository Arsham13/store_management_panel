import { Link } from 'react-router-dom';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export function ProductTable({ products, categories, onDelete }) {
  
    // محافظت در برابر ورودی غیرآرایه
  if (!Array.isArray(products)) {
    return (
      <p className="text-center text-red-500 py-12">
        داده‌های محصولات نامعتبر است.
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        محصولی مطابق فیلترها یافت نشد.
      </p>
    );
  }
  
const getCategoryName = (categoryId) => {
  console.log('categoryId:', categoryId, typeof categoryId);
  console.log('categories:', categories.map(c => ({ id: c.id, type: typeof c.id })));
  const cat = categories.find((c) => String(c.id) === String(categoryId));
  return cat ? cat.name : '---';
};

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        محصولی مطابق فیلترها یافت نشد.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تصویر</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">عنوان</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">قیمت</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">موجودی</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">دسته‌بندی</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-3">
                <img
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.title}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              </td>
              <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                {product.title}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {product.discount > 0 ? (
                  <div className="flex items-center gap-1">
                    <span className="text-red-500">{formatPrice(product.price * (1 - product.discount / 100))}</span>
                    <span className="text-xs line-through text-gray-400">{formatPrice(product.price)}</span>
                  </div>
                ) : (
                  formatPrice(product.price)
                )}
              </td>
              <td className="py-3">
                {product.stock > 0 ? (
                  <Badge variant="success">{toPersianDigits(product.stock)} عدد</Badge>
                ) : (
                  <Badge variant="danger">ناموجود</Badge>
                )}
              </td>
              <td className="py-3 text-gray-600 dark:text-gray-400">
                {getCategoryName(product.categoryId)}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/products/edit/${product.id}`}>
                    <Button variant="ghost" size="sm">
                      <PencilSquareIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(product.id)}>
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}