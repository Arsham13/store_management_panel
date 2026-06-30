// src/routes/AppRoutes.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';
import Categories from '../pages/Categories';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';
import Customers from '../pages/Customers';
import CustomerDetail from '../pages/CustomerDetail';
import Discounts from '../pages/Discounts';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'products/add', element: <AddProduct /> },
      { path: 'products/edit/:id', element: <EditProduct /> },
      { path: 'categories', element: <Categories /> },
      { path: 'orders', element: <Orders /> },
      { path: 'orders/:id', element: <OrderDetail /> },
      { path: 'customers', element: <Customers /> },
      { path: 'customers/:id', element: <CustomerDetail /> },
      { path: 'discounts', element: <Discounts /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}