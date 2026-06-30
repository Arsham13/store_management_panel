import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getDiscounts,
  addDiscount,
  updateDiscount,
  deleteDiscount,
} from '../services/api';
import { DiscountTable } from '../components/discounts/DiscountTable';
import { DiscountForm } from '../components/discounts/DiscountForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Skeleton } from '../components/common/Skeleton';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export function Discounts() {
  const queryClient = useQueryClient();

  const {
    data: discountsData,
    isLoading,
  } = useQuery({
    queryKey: ['discounts'],
    queryFn: getDiscounts,
  });
  const discounts = discountsData?.data ?? [];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const addMutation = useMutation({
    mutationFn: addDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('تخفیف جدید اضافه شد');
      closeForm();
    },
    onError: () => toast.error('خطا در افزودن تخفیف'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateDiscount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('تخفیف ویرایش شد');
      closeForm();
    },
    onError: () => toast.error('خطا در ویرایش تخفیف'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      toast.success('تخفیف حذف شد');
      setDeletingId(null);
    },
    onError: () => {
      toast.error('خطا در حذف تخفیف');
      setDeletingId(null);
    },
  });

  const handleAdd = () => {
    setEditingDiscount(null);
    setIsFormOpen(true);
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingDiscount(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingDiscount) {
      updateMutation.mutate({ id: editingDiscount.id, data: formData });
    } else {
      addMutation.mutate(formData);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton height={32} width={200} />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={50} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          تخفیف‌ها
        </h1>
        <Button onClick={handleAdd}>
          <PlusIcon className="h-5 w-5 ml-1" />
          افزودن تخفیف
        </Button>
      </div>

      <DiscountTable
        discounts={discounts}
        onEdit={handleEdit}
        onDelete={(id) => setDeletingId(id)}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingDiscount ? 'ویرایش تخفیف' : 'افزودن تخفیف'}
      >
        <DiscountForm
          initialData={
            editingDiscount
              ? {
                  code: editingDiscount.code,
                  percent: editingDiscount.percent,
                  maxUsage: editingDiscount.maxUsage,
                  expireDate: editingDiscount.expireDate,
                  isActive: editingDiscount.isActive,
                  usedCount: editingDiscount.usedCount,
                }
              : {}
          }
          onSubmit={handleFormSubmit}
          isSubmitting={addMutation.isLoading || updateMutation.isLoading}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        title="حذف تخفیف"
        message="آیا از حذف این کد تخفیف اطمینان دارید؟"
      />
    </div>
  );
}

export default Discounts;