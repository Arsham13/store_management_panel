import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../hooks/useTheme';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import toast from 'react-hot-toast';

export function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [storeName, setStoreName] = useState('فروشگاه لوازم تزئینی');
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeName: storeName,
      currency: 'تومان',
    },
  });

  const onSubmit = async (data) => {
    setIsSaving(true);
    // اینجا می‌تونیم تنظیمات رو به API بفرستیم، ولی برای سادگی فقط در state محلی ذخیره می‌کنیم
    setStoreName(data.storeName);
    // شبیه‌سازی تأخیر
    await new Promise((r) => setTimeout(r, 500));
    toast.success('تنظیمات ذخیره شد');
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">تنظیمات</h1>

      {/* تنظیمات فروشگاه */}
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          اطلاعات فروشگاه
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="نام فروشگاه"
            {...register('storeName', { required: 'نام فروشگاه الزامی است' })}
            error={errors.storeName?.message}
          />
          <Input
            label="واحد پول"
            {...register('currency', { required: 'واحد پول الزامی است' })}
            error={errors.currency?.message}
            disabled
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'در حال ذخیره...' : 'ذخیره تنظیمات'}
            </Button>
          </div>
        </form>
      </Card>

      {/* تنظیمات ظاهری */}
      <Card>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          ظاهر
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">حالت تاریک</span>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isDark ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </Card>
    </div>
  );
}

export default Settings;