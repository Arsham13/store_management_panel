// src/components/layout/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet, useLocation, matchPath } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Header } from './Header';

const breadcrumbConfig = [
  { path: '/', label: 'داشبورد' },
  { path: '/products', label: 'محصولات' },
  { path: '/products/add', label: 'افزودن محصول' },
  { path: '/products/edit/:id', label: 'ویرایش محصول' },
  { path: '/categories', label: 'دسته‌بندی‌ها' },
  { path: '/orders', label: 'سفارشات' },
  { path: '/orders/:id', label: 'جزئیات سفارش' },
  { path: '/customers', label: 'مشتریان' },
  { path: '/customers/:id', label: 'جزئیات مشتری' },
  { path: '/discounts', label: 'تخفیف‌ها' },
  { path: '/settings', label: 'تنظیمات' },
];

function getBreadcrumbs(pathname) {
  const crumbs = [];
  // مسیرها را به ترتیب بررسی می‌کنیم
  // ساده‌ترین روش: تجزیه pathname
  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const matched = breadcrumbConfig.find((item) => {
      // بررسی تطابق مسیر با پارامترهای احتمالی
      return matchPath(item.path, currentPath);
    });
    if (matched) {
      // اگر صفحه جاری است، نباید لینک باشد
      const isCurrent = currentPath === pathname;
      crumbs.push({ label: matched.label, to: isCurrent ? null : currentPath });
    }
  }
  // اگر crumbs خالی بود، فقط داشبورد
  if (crumbs.length === 0) {
    crumbs.push({ label: 'داشبورد', to: '/' });
  }
  return crumbs;
}

export function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const breadcrumbItems = getBreadcrumbs(location.pathname);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar collapsed={false} />
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          breadcrumbItems={breadcrumbItems}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}