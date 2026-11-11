import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import RestaurantsPage from '../pages/restaurants/RestaurantsPage';
import RestaurantDetailsPage from '../pages/restaurants/RestaurantDetailsPage';
import PlaceholderPage from '../pages/dashboard/PlaceholderPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect to Restaurants listing */}
      <Route path="/" element={<Navigate to="/restaurants" replace />} />

      {/* Module 1: Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Module 2: Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Module 3: Restaurant Listing & Details */}
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

      {/* Scaffolding for upcoming modules */}
      <Route
        path="/menu-items"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Menu Management"
              moduleNumber="4"
              description="Manage food items, veg/non-veg categories, price sorting, and item availability."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Cart Management"
              moduleNumber="5"
              description="Review cart items, update quantities, calculate delivery and taxes, and proceed to checkout."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Orders Management"
              moduleNumber="6 & 7"
              description="Track live order statuses: Preparing, Out for Delivery, Delivered, and Cancelled."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Customer Directory"
              moduleNumber="8"
              description="Manage registered customer profiles, delivery addresses, and contact details."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/coupons"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Coupons & Discounts"
              moduleNumber="9"
              description="Configure promotional codes, percentage discounts, and validity periods."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Payments & Transactions"
              moduleNumber="9"
              description="Review UPI, Card, and Wallet transaction logs and payment gateways."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="Business Analytics & Reports"
              moduleNumber="2 & 10"
              description="Detailed revenue, order volumes, customer retention, and performance reports."
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PlaceholderPage
              title="User Profile"
              moduleNumber="8"
              description="Manage admin/customer account profile, saved addresses, and notification preferences."
            />
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/restaurants" replace />} />
    </Routes>
  );
}
