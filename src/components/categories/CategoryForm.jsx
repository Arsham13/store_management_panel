import { useForm } from 'react-hook-form';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Select } from '../common/Select';

export function CategoryForm({
  initialData = {},
  onSubmit,
  isSubmitting = false,
  categories = [],
  currentId = null,
}) {
  const { register, handleSubmit, setValue, watch, formState: { errors } }  = useForm({
      defaultValues: {
        name: initialData.name || '',
        slug: initialData.slug || '',
        parentId: initialData.parentId ?? '',
      },
    });

  const parentId = watch('parentId');


  const handleFormSubmit = (data) => {
    const formatted = {
      ...data,
      parentId: data.parentId === '' ? null : Number(data.parentId),
    };
    onSubmit(formatted);
  };

  // فیلتر کردن دسته‌بندی‌ها: حذف خود دسته (در ویرایش) برای جلوگیری از والد شدن خودش
  const filteredCategories = currentId
    ? categories.filter((cat) => cat.id !== currentId)
    : categories;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="نام دسته‌بندی"
          {...register('name', { required: 'نام الزامی است' })}
          error={errors.name?.message}
        />
        <Input
          label="شناسه (slug)"
          {...register('slug', { required: 'شناسه الزامی است' })}
          error={errors.slug?.message}
        />

        <div className="sm:col-span-2">
          <Select
            label="دسته‌بندی والد"
            value={parentId}
            onChange={(value) => setValue('parentId', value)}
            options={[
              { value: '', label: 'بدون والد' },
              ...filteredCategories.map((cat) => ({ value: String(cat.id), label: cat.name })),
            ]}
            placeholder="بدون والد"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ذخیره...' : 'ذخیره دسته‌بندی'}
        </Button>
      </div>
    </form>
  );
}