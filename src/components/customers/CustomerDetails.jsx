// src/components/customers/CustomerDetails.jsx
import { Card } from '../common/Card';
import { formatPrice, toPersianDigits } from '../../utils/formatters';

export function CustomerDetails({ customer }) {
  if (!customer) return null;

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        اطلاعات مشتری
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">نام</span>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {customer.firstName} {customer.lastName}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">ایمیل</span>
          <p className="font-medium text-gray-900 dark:text-gray-100">{customer.email}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">تلفن</span>
          <p className="font-medium text-gray-900 dark:text-gray-100">{customer.phone}</p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">تعداد سفارشات</span>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {toPersianDigits(customer.totalOrders)}
          </p>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">مجموع خرید</span>
          <p className="font-medium text-gray-900 dark:text-gray-100">
            {formatPrice(customer.totalSpent)}
          </p>
        </div>
      </div>
    </Card>
  );
}