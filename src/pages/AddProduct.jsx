import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/api';
import { ProductForm } from '../components/products/ProductForm';
import toast from 'react-hot-toast';

export function AddProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

const mutation = useMutation({
  mutationFn: addProduct,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
    queryClient.invalidateQueries({ queryKey: ['categories'] });
    toast.success('محصول با موفقیت اضافه شد');
    navigate('/products');
  },
    onError: () => {
      toast.error('خطا در افزودن محصول');
    },
  });

  const handleSubmit = (data) => {
    const newProduct = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      rating: 0,
    };
    mutation.mutate(newProduct);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        افزودن محصول جدید
      </h1>
      <ProductForm onSubmit={handleSubmit} isSubmitting={mutation.isLoading} />
    </div>
  );
}

export default AddProduct;