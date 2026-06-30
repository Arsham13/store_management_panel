// src/pages/Categories.jsx
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../services/api';
import { CategoryTree } from '../components/categories/CategoryTree';
import { CategoryForm } from '../components/categories/CategoryForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { Skeleton } from '../components/common/Skeleton';

export function Categories() {
  const queryClient = useQueryClient();

  // دریافت دسته‌بندی‌ها
  const {
    data: categoriesData,
    isLoading,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  const categories = categoriesData?.data ?? [];

  // state برای فرم (افزودن/ویرایش)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // state برای دیالوگ حذف
  const [deletingId, setDeletingId] = useState(null);

  // جهش افزودن
  const addMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('دسته‌بندی جدید اضافه شد');
      closeForm();
    },
    onError: () => toast.error('خطا در افزودن دسته‌بندی'),
  });

  // جهش ویرایش
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('دسته‌بندی ویرایش شد');
      closeForm();
    },
    onError: () => toast.error('خطا در ویرایش دسته‌بندی'),
  });

  // جهش حذف
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('دسته‌بندی حذف شد');
      setDeletingId(null);
    },
    onError: () => {
      toast.error('خطا در حذف دسته‌بندی');
      setDeletingId(null);
    },
  });

  // باز کردن فرم برای افزودن
  const handleAdd = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  // باز کردن فرم برای ویرایش
  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  // بستن فرم
  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
  };

  // ثبت فرم (افزودن یا ویرایش)
  const handleFormSubmit = (formData) => {
    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  // تأیید حذف
  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId);
    }
  };

   if (isLoading) {
   return (
      <div className="space-y-4">
         <Skeleton height={32} width={200} />
         {Array.from({ length: 5 }).map((_, i) => (
         <Skeleton key={i} height={40} />
         ))}
      </div>
   );
   }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          دسته‌بندی‌ها
        </h1>
        <Button onClick={handleAdd}>
          <PlusIcon className="h-5 w-5 ml-1" />
          افزودن دسته‌بندی
        </Button>
      </div>

      {/* درخت دسته‌بندی */}
      <CategoryTree
        categories={categories}
        onEdit={handleEdit}
        onDelete={(id) => setDeletingId(id)}
      />

      {/* مودال فرم افزودن/ویرایش */}
      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی'}
      >
        <CategoryForm
          initialData={
            editingCategory
              ? {
                  name: editingCategory.name,
                  slug: editingCategory.slug,
                  parentId: editingCategory.parentId,
                }
              : {}
          }
          categories={categories}
          currentId={editingCategory ? editingCategory.id : null}
          onSubmit={handleFormSubmit}
          isSubmitting={addMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>

      {/* دیالوگ تأیید حذف */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        title="حذف دسته‌بندی"
        message="آیا از حذف این دسته‌بندی اطمینان دارید؟ در صورت وجود زیرمجموعه، رفتار غیرقابل پیش‌بینی خواهد بود."
      />
    </div>
  );
}

export default Categories;