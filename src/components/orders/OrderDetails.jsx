// src/components/orders/OrderDetails.jsx
import { Card } from '../common/Card';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatPrice, toJalali, toPersianDigits } from '../../utils/formatters';

export function OrderDetails({ order, customer, productsMap }) {
  if (!order) return null;

  return (
    <div className="space-y-6">
      {/* اطلاعات کلی سفارش */}
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">شماره سفارش</span>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              #{toPersianDigits(order.id)}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">تاریخ ثبت</span>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {toJalali(order.createdAt)}
            </p>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">وضعیت</span>
            <div className="mt-1">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">مبلغ کل</span>
            <p className="font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>
      </Card>

      {/* اطلاعات مشتری */}
      {customer && (
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            اطلاعات مشتری
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <span className="text-sm text-gray-500 dark:text-gray-400">مجموع خریدها</span>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {formatPrice(customer.totalSpent)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* محصولات سفارش */}
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          محصولات سفارش
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-right">
                <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">محصول</th>
                <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">قیمت واحد</th>
                <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">تعداد</th>
                <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">قیمت کل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {order.items?.map((item, index) => {
                const product = productsMap?.[item.productId];
                const unitPrice = item.price || 0;
                const total = unitPrice * item.quantity;
                return (
                  <tr key={index}>
                    <td className="py-3 flex items-center gap-2">
                      {product && (
                        <img
                          src={product.images?.[0] || '/placeholder.png'}
                          alt={product.title}
                          className="h-10 w-10 rounded object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {product?.title || `محصول #${item.productId}`}
                      </span>
                    </td>
                    <td className="py-3 text-gray-700 dark:text-gray-300">
                      {formatPrice(unitPrice)}
                    </td>
                    <td className="py-3 text-gray-700 dark:text-gray-300">
                      {toPersianDigits(item.quantity)}
                    </td>
                    <td className="py-3 text-gray-900 dark:text-gray-100 font-medium">
                      {formatPrice(total)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}