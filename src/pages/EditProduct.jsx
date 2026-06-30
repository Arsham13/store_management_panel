// src/pages/EditProduct.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProduct, updateProduct } from '../services/api';
import { ProductForm } from '../components/products/ProductForm';
import { Spinner } from '../components/common/Spinner';
import toast from 'react-hot-toast';

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();  

  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: (data) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('محصول با موفقیت ویرایش شد');
      navigate('/products');
    },
    onError: () => {
      toast.error('خطا در ویرایش محصول');
    },
  });

  const handleSubmit = (data) => {
    const updatedProduct = {
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mutation.mutate(updatedProduct);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !productData?.data) {
    return (
      <div className="text-center py-12 text-red-500">
        خطا در بارگذاری اطلاعات محصول
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        ویرایش محصول
      </h1>
      <ProductForm
        initialData={productData}
        onSubmit={handleSubmit}
        isSubmitting={mutation.isLoading}
      />
    </div>
  );
}

export default EditProduct;