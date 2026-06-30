import {
  HomeIcon,
  ShoppingBagIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  TicketIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const menuItems = [
  { to: '/', label: 'داشبورد', icon: HomeIcon },
  { to: '/products', label: 'محصولات', icon: ShoppingBagIcon },
  { to: '/categories', label: 'دسته‌بندی‌ها', icon: TagIcon },
  { to: '/orders', label: 'سفارشات', icon: ClipboardDocumentListIcon },
  { to: '/customers', label: 'مشتریان', icon: UsersIcon },
  { to: '/discounts', label: 'تخفیف‌ها', icon: TicketIcon },
  { to: '/settings', label: 'تنظیمات', icon: Cog6ToothIcon },
];