import { format as jalaliFormat } from 'date-fns-jalali';
import { parseISO } from 'date-fns';

export function toPersianDigits(num) {
  return new Intl.NumberFormat('fa-IR').format(num);
}

export function formatPrice(price) {
  return `${toPersianDigits(price)} تومان`;
}

export function toJalali(isoDate) {
  const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;
  return jalaliFormat(date, 'd MMMM yyyy');
}

export function toJalaliShort(isoDate) {
  const date = typeof isoDate === 'string' ? parseISO(isoDate) : isoDate;
  return jalaliFormat(date, 'yyyy/MM/dd');
}

export function formatDiscount(percent) {
  return `${toPersianDigits(percent)}٪`;
}

export function translateOrderStatus(status) {
  const statusMap = {
    pending: 'در انتظار پرداخت',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    delivered: 'تحویل داده شده',
    cancelled: 'لغو شده',
  };
  return statusMap[status] || status;
}