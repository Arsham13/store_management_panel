import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCustomer, getOrders } from '../services/api';
import { CustomerDetails } from '../components/customers/CustomerDetails';
import { OrderTable } from '../components/orders/OrderTable';
import { Spinner } from '../components/common/Spinner';
import { Button } from '../components/common/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function CustomerDetail() {
  const { id } = useParams();

  const {
    data: customerData,
    isLoading: customerLoading,
    isError: customerError,
  } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCustomer(id),
    enabled: !!id,
  });
  const customer = customerData?.data;

  // دریافت سفارشات این مشتری
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders', { customerId: id }],
    queryFn: () => getOrders({ customerId: id }),
    enabled: !!id,
  });
  const orders = ordersData?.data ?? [];

  if (customerLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (customerError || !customer) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در بارگذاری اطلاعات مشتری
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          جزئیات مشتری
        </h1>
        <Link to="/customers">
          <Button variant="outline" size="sm">
            <ArrowRightIcon className="h-4 w-4 ml-1" />
            بازگشت به مشتریان
          </Button>
        </Link>
      </div>

      <CustomerDetails customer={customer} />

      <div>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          سفارشات مشتری
        </h2>
        {ordersLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        ) : (
          <OrderTable orders={orders} />
        )}
      </div>
    </div>
  );
}

export default CustomerDetail;