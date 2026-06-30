// src/pages/OrderDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrder, getCustomer, getProducts } from '../services/api';
import { OrderDetails } from '../components/orders/OrderDetails';
import { Spinner } from '../components/common/Spinner';
import { Button } from '../components/common/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function OrderDetail() {
  const { id } = useParams();

  // دریافت سفارش
  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError,
  } = useQuery({
    queryKey: ['order', id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });
  const order = orderData?.data;

  // دریافت مشتری
  const customerId = order?.customerId;
  const { data: customerData } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer(customerId),
    enabled: !!customerId,
  });
  const customer = customerData?.data;

  // دریافت همه محصولات برای تطبیق
  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
    enabled: !!order,
  });
  const products = productsData?.data ?? [];
  const productsMap = products.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  if (orderLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (orderError || !order) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در بارگذاری سفارش
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          جزئیات سفارش #{order.id}
        </h1>
        <Link to="/orders">
          <Button variant="outline" size="sm">
            <ArrowRightIcon className="h-4 w-4 ml-1" />
            بازگشت به سفارشات
          </Button>
        </Link>
      </div>

      <OrderDetails
        order={order}
        customer={customer}
        productsMap={productsMap}
      />
    </div>
  );
}

export default OrderDetail;