import { useForm } from 'react-hook-form';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export function DiscountForm({ initialData = {}, onSubmit, isSubmitting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: initialData.code || '',
      percent: initialData.percent || '',
      maxUsage: initialData.maxUsage || '',
      expireDate: initialData.expireDate || '',
      isActive: initialData.isActive ?? true,
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      percent: Number(data.percent),
      maxUsage: Number(data.maxUsage),
      isActive: Boolean(data.isActive),
      usedCount: initialData.usedCount || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="کد تخفیف"
          {...register('code', { required: 'کد الزامی است' })}
          error={errors.code?.message}
        />
        <Input
          label="درصد تخفیف"
          type="number"
          {...register('percent', {
            required: 'درصد الزامی است',
            min: { value: 1, message: 'حداقل ۱' },
            max: { value: 100, message: 'حداکثر ۱۰۰' },
          })}
          error={errors.percent?.message}
        />
        <Input
          label="حداکثر استفاده"
          type="number"
          {...register('maxUsage', {
            required: 'این فیلد الزامی است',
            min: { value: 1, message: 'حداقل ۱' },
          })}
          error={errors.maxUsage?.message}
        />
        <Input
          label="تاریخ انقضا"
          type="date"
          {...register('expireDate', { required: 'تاریخ الزامی است' })}
          error={errors.expireDate?.message}
        />
        <div className="sm:col-span-2 flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('isActive')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              فعال
            </span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'در حال ذخیره...' : 'ذخیره تخفیف'}
        </Button>
      </div>
    </form>
  );
}