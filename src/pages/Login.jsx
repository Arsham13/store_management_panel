import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import toast from 'react-hot-toast';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.username, data.password);
      toast.success('خوش آمدید!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'خطا در ورود');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        {/* عنوان */}
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          ورود به پنل مدیریت
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="نام کاربری"
            {...register('username', { required: 'نام کاربری الزامی است' })}
            error={errors.username?.message}
          />
          <Input
            label="رمز عبور"
            type="password"
            {...register('password', { required: 'رمز عبور الزامی است' })}
            error={errors.password?.message}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ورود...' : 'ورود'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;