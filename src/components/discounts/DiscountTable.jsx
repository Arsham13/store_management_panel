// src/components/discounts/DiscountTable.jsx
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { toJalali, toPersianDigits } from '../../utils/formatters';

export function DiscountTable({ discounts = [], onEdit, onDelete }) {
  if (discounts.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        تخفیفی یافت نشد.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">کد</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">درصد</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">محدودیت استفاده</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تاریخ انقضا</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">وضعیت</th>
            <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {discounts.map((discount) => (
            <tr key={discount.id}>
              <td className="py-3 font-medium text-gray-900 dark:text-gray-100">
                {discount.code}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {toPersianDigits(discount.percent)}٪
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {toPersianDigits(discount.usedCount)} / {toPersianDigits(discount.maxUsage)}
              </td>
              <td className="py-3 text-gray-700 dark:text-gray-300">
                {toJalali(discount.expireDate)}
              </td>
              <td className="py-3">
                {discount.isActive ? (
                  <Badge variant="success">فعال</Badge>
                ) : (
                  <Badge variant="default">غیرفعال</Badge>
                )}
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(discount)}>
                    <PencilSquareIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(discount.id)}>
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