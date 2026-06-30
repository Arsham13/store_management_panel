// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// محصولات
export const getProducts = (params) =>
  api.get('/products', { params }).then(res => res.data);
export const getProduct = (id) =>
  api.get(`/products/${id}`).then(res => res.data);
export const addProduct = (data) =>
  api.post('/products', data).then(res => res.data);
export const updateProduct = (id, data) =>
  api.put(`/products/${id}`, data).then(res => res.data);
export const deleteProduct = (id) =>
  api.delete(`/products/${id}`).then(res => res.data);

// دسته‌بندی‌ها
export const getCategories = () =>
  api.get('/categories').then(res => res.data);
export const addCategory = (data) =>
  api.post('/categories', data).then(res => res.data);
export const updateCategory = (id, data) =>
  api.put(`/categories/${id}`, data).then(res => res.data);
export const deleteCategory = (id) =>
  api.delete(`/categories/${id}`).then(res => res.data);

// سفارشات
export const getOrders = (params) =>
  api.get('/orders', { params }).then(res => res.data);
export const getOrder = (id) =>
  api.get(`/orders/${id}`).then(res => res.data);
export const updateOrder = (id, data) =>
  api.put(`/orders/${id}`, data).then(res => res.data);

// مشتریان
export const getCustomers = (params) =>
  api.get('/customers', { params }).then(res => res.data);
export const getCustomer = (id) =>
  api.get(`/customers/${id}`).then(res => res.data);

// تخفیف‌ها
export const getDiscounts = () =>
  api.get('/discounts').then(res => res.data);
export const addDiscount = (data) =>
  api.post('/discounts', data).then(res => res.data);
export const updateDiscount = (id, data) =>
  api.put(`/discounts/${id}`, data).then(res => res.data);
export const deleteDiscount = (id) =>
  api.delete(`/discounts/${id}`).then(res => res.data);

// کاربران
export const getUsers = () =>
  api.get('/users').then(res => res.data);