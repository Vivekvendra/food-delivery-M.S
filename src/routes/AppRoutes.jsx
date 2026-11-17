import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import RestaurantsPage from '../pages/restaurants/RestaurantsPage';
import RestaurantDetailsPage from '../pages/restaurants/RestaurantDetailsPage';
import MenuManagementPage from '../pages/menu/MenuManagementPage';
import FoodDetailsPage from '../pages/menu/FoodDetailsPage';
import CartPage from '../pages/cart/CartPage';
import CheckoutPage from '../pages/orders/CheckoutPage';
import OrderTrackingPage from '../pages/orders/OrderTrackingPage';
import AdminRestaurantsPage from '../pages/admin/AdminRestaurantsPage';
import AdminOrdersPage from '../pages/admin/AdminOrdersPage';
import AdminCustomersPage from '../pages/admin/AdminCustomersPage';
import AdminCouponsPage from '../pages/admin/AdminCouponsPage';
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage';
import AdminReportsPage from '../pages/admin/AdminReportsPage';
import AdminProfilePage from '../pages/admin/AdminProfilePage';
import CustomerProfilePage from '../pages/customer/CustomerProfilePage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect to Customer Restaurants storefront */}
      <Route path="/" element={<Navigate to="/restaurants" replace />} />

      {/* Module 1: Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* ========================================================
          ADMIN PANEL (Always preserves the Dark Left Sidebar)
         ======================================================== */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/restaurants"
        element={
          <ProtectedRoute>
            <AdminRestaurantsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/menu-items"
        element={
          <ProtectedRoute>
            <MenuManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu-items"
        element={
          <ProtectedRoute>
            <MenuManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu-items/:id"
        element={
          <ProtectedRoute>
            <FoodDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <AdminOrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute>
            <AdminCustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <AdminCustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/coupons"
        element={
          <ProtectedRoute>
            <AdminCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coupons"
        element={
          <ProtectedRoute>
            <AdminCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute>
            <AdminPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <AdminPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <AdminProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ========================================================
          CUSTOMER PANEL (Top Navbar with Cart & Customer Storefront)
         ======================================================== */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurants"
        element={
          <ProtectedRoute>
            <RestaurantsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurants/:id"
        element={
          <ProtectedRoute>
            <RestaurantDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/track-order"
        element={
          <ProtectedRoute>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/track-order/:id"
        element={
          <ProtectedRoute>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/restaurants" replace />} />
    </Routes>
  );
}
