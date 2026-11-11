# FoodExpress - Food Delivery Management System (FDMS)

A responsive Food Delivery Management System web application built with **React.js (Vite)**, **Tailwind CSS**, **Context API**, **React Router**, **Axios**, **React Hook Form**, and **React Toastify**.

---

## 🚀 Implemented Modules

### Module 1: Authentication
- **Login Page (`/login`)**:
  - Full-screen layout with background image `Cheeseburger Feast with Cola and Fries.png`.
  - Left brand showcase with FoodExpress mascot logo, bold headline (*"Order Your Favorite Food Online"*), restaurant and delivery highlight badges.
  - Right login grid with regular font typography, email/mobile input, password show/hide eye toggle, "Remember me" option, and forgot password link.
  - Social authentication simulation buttons (Google & GitHub).
- **Register Page (`/register`)**:
  - Two-column layout with custom delivery scooter rider graphic and skyline.
  - Form validation: Full Name, Email, Mobile, Password, Confirm Password, and Terms & Conditions.
- **Forgot Password Page (`/forgot-password`)**:
  - Centered card with custom letter envelope and padlock illustration.
  - Email reset submission with simulated instant OTP/password update form.
- **Security & Session Management**:
  - User session and registered user store preserved in `localStorage`.
  - Protected route guard (`ProtectedRoute.jsx`) preventing unauthorized access.

### Module 2: Dashboard
- **Admin Dashboard (`/dashboard`)**:
  - **Dark Sidebar Navigation**: Branded logo, active orange highlight for `Dashboard`, nav links for all system sections, and mobile drawer.
  - **Top Navigation Bar**: Page title, notifications bell with badge (`3`) and dropdown, admin profile chip with settings dropdown.
  - **Key Metrics (6 KPI Cards)**: Restaurants (`128`), Food Items (`1,842`), Total Orders (`6,320`), Active Orders (`34`), Delivered (`5,928`), Customers (`4,276`).
  - **Revenue Summary**: Custom cubic bezier spline SVG chart displaying `₹12,58,420` (`▲ +10.4%`) with interactive month hover tooltips and time period selectors.
  - **Orders by Status**: Donut chart with centered `6,320 Orders` counter and status breakdown (Preparing, Out for Delivery, Delivered, Cancelled).
  - **Recent Orders Table**: Orders `#ORD10056`, `#ORD10055`, etc., with customer avatars, amounts, status pills, and interactive Order Details modal dialog.
  - **Quick Action Cards & Modals**: `+ Add Restaurant`, `+ Add Menu Item`, `🏷️ Create Coupon`, and `📊 View Reports`.

### Module 3: Restaurant Listing & Details
- **Third-Party API Integration (`restaurantService.js`)**:
  - Integrated with **DummyJSON** (`https://dummyjson.com/recipes`) using **Axios**.
  - Fetches live recipe data and enriches restaurant profiles and menus, with graceful offline fallback.
- **Restaurant Listing Page (`/restaurants`)**:
  - **Customer Top Navbar**: FoodExpress logo, search bar ("Search restaurants, cuisines..."), notifications, cart counter badge, and profile menu.
  - **Restaurant Cards Grid**:
    - High-resolution food/restaurant images.
    - Open/Closed status pill badges (`Open` in emerald, `Closed` in rose).
    - Interactive Favorite heart toggle (persisted to `localStorage`).
    - Star ratings with review counts (e.g. `★ 4.6 (2.4k)`).
    - Delivery time (e.g. `25-35 min`) and delivery fee (e.g. `₹40` or `Free Delivery`).
    - Address and locality (e.g. `MVP Colony, Visakhapatnam`).
  - **Search & Filter Controls**:
    - Live search by restaurant name, cuisine, or dish items.
    - Filter by Cuisine: `All`, `Indian`, `Italian`, `Chinese`, `American`, `South Indian`, `Fast Food`.
    - Filter by Rating: `4.5+ ★`, `4.0+ ★`, `3.5+ ★`.
    - Filter by `Open Now` toggle.
    - Sort By: `Popularity`, `Rating: High to Low`, `Delivery Time: Fastest`, `Delivery Fee: Low to High`.
  - **Pagination**: Centered `‹ 1 2 3 4 5 ›` with active page indicator in orange.
  - **Loading & Error Handling**: Animated skeleton loaders during fetch and clear empty states with "Reset Filters" action.
- **Restaurant Details (Menu) Page (`/restaurants/:id`)**:
  - Hero banner with restaurant photo, dark gradient overlay, rating, cuisine, delivery time, fee, and address.
  - Tabbed interface: `Menu`, `About`, `Reviews`.
  - Category filter pills: `All`, `Biryani`, `Starters`, `Curries`, `Rice`, `Beverages`.
  - Interactive dish cards with image, veg/non-veg indicator, price in INR (`₹249`), description, and `Add` / `- 1 +` quantity selector connected to `CartContext`.

---

## 🛠️ Technology Stack
- **Framework**: React.js (Vite 8)
- **Styling**: Tailwind CSS v4
- **State Management**: Context API (`AuthContext`, `CartContext`)
- **Third-Party API & HTTP**: Axios, DummyJSON Recipes API
- **Routing**: React Router DOM v7
- **Form Handling**: React Hook Form
- **Alerts & Toasts**: React Toastify
- **Icons**: Lucide React
- **Storage**: Local Storage

---

## 🧑‍💻 Demo Accounts
| Role | Email / Mobile | Password |
|---|---|---|
| **Admin** | `admin@foodexpress.com` | `password123` |
| **Customer** | `ravi@foodexpress.com` | `password123` |

---

## 🏃 Running the Project
```bash
# Start development server
npm run dev

# Build for production
npm run build
```
