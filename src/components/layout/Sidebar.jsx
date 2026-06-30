import { NavLink } from 'react-router-dom';
import { menuItems } from '../../utils/menuItems';

export function Sidebar({ collapsed = false }) {
  return (
    <aside
      className={`hidden lg:flex flex-col h-full border-l border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700 px-4">
        <img src="/logo.svg" alt="لوگو" className="h-8 w-8" />
        {!collapsed && (
          <span className="mr-2 text-lg font-bold text-gray-900 dark:text-gray-100">
            پنل مدیریت
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              } ${collapsed ? 'justify-center' : ''}`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}