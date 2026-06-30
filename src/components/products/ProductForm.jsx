// src/components/products/ProductForm.jsx
import { useForm } from 'react-hook-form';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { ImageUpload } from './ImageUpload';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../services/api';
import { Select } from '../common/Select';

export function ProductForm({ initialData = {}, onSubmit, isSubmitting = false }) {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData ?? [];

const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: initialData.title || '',
      price: initialData.price || '',
      discount: initialData.discount || 0,
      description: initialData.description || '',
      categoryId: initialData.categoryId || '',
      stock: initialData.stock || 0,
      colors: initialData.colors?.join('، ') || '',
      sizes: initialData.sizes?.join('، ') || '',
      images: initialData.images || [],
    },
  });

  const images = watch('images');

  const handleFormSubmit = (data) => {
    const formatted = {
      ...data,
      price: Number(data.price),
      discount: Number(data.discount),
      stock: Number(data.stock),
      categoryId: Number(data.categoryId),
      colors: data.colors
        ? data.colors.split('،').map((c) => c.trim()).filter(Boolean)
        : [],
      sizes: data.sizes
        ? data.sizes.split('،').map((s) => s.trim()).filter(Boolean)
        : [],
    };
    onSubmit(formatted);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="عنوان محصول"
          {...register('title', { required: 'عنوان الزامی است' })}
          error={errors.title?.message}
        />

        <Input
          label="قیمت (تومان)"
          type="number"
          {...register('price', { required: 'قیمت الزامی است', min: 0 })}
          error={errors.price?.message}
        />

        <Input
          label="درصد تخفیف"
          type="number"
          {...register('discount', { min: 0, max: 100 })}
        />

        <Input
          label="موجودی"
          type="number"
          {...register('stock', { min: 0 })}
        />

        <div className="md:col-span-2">
          <Select
            label="دسته‌بندی"
            value={errors.categoryId}
            onChange={(value) => setValue('categoryId', value, { shouldValidate: true })}
            options={[
              { value: '', label: 'انتخاب کنید' },
              ...categories.map((cat) => ({ value: String(cat.id), label: cat.name })),
            ]}
            placeholder="انتخاب کنید"
            error={errors.categoryId?.message}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="توضیحات"
            {...register('description')}
          />
        </div>

        <Input
          label="رنگ‌ها (با «،» جدا کنید)"
          {...register('colors')}
        />

        <Input
          label="سایزها (با «،» جدا کنید)"
          {...register('sizes')}
        />
      </div>

      <ImageUpload
        images={images}
        onChange={(newImages) => setValue('images', newImages)}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ذخیره...' : 'ذخیره محصول'}
        </Button>
      </div>
    </form>
  );
}