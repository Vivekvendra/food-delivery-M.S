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
import OrderHistoryPage from '../pages/orders/OrderHistoryPage';
import CustomerCouponsPage from '../pages/customer/CustomerCouponsPage';
import PaymentSuccessPage from '../pages/payment/PaymentSuccessPage';
import PaymentFailurePage from '../pages/payment/PaymentFailurePage';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

function RootRedirect() {
  const { currentUser, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return currentUser?.role === 'Admin' ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/restaurants" replace />
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Dynamic Root redirect based on logged in role */}
      <Route path="/" element={<RootRedirect />} />

      {/* Module 1: Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* ========================================================
          ADMIN PANEL (Protected - Strictly Admin Role)
         ======================================================== */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/restaurants"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminRestaurantsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/menu-items"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <MenuManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu-items"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <MenuManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/menu-items/:id"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <FoodDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminOrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminCustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminCustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/coupons"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coupons"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminProfilePage />
          </ProtectedRoute>
        }
      />

      {/* ========================================================
          CUSTOMER PANEL (Protected - Strictly Customer Role)
         ======================================================== */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/profile"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CustomerProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurants"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <RestaurantsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/restaurants/:id"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <RestaurantDetailsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CartPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/track-order"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/track-order/:id"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders/:id"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderTrackingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/order-history"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/orders"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <OrderHistoryPage />
          </ProtectedRoute>
        }
      />

      {/* Module 9: Coupons & Payment */}
      <Route
        path="/coupons-offers"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CustomerCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer/coupons"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <CustomerCouponsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/success"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <PaymentSuccessPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/success/:id"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <PaymentSuccessPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment/failure"
        element={
          <ProtectedRoute allowedRoles={['Customer']}>
            <PaymentFailurePage />
          </ProtectedRoute>
        }
      />

      {/* Catch-all sends to role-appropriate home */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}
