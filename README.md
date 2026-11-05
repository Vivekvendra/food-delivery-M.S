# FoodExpress - Food Delivery Management System (FDMS)

A responsive Food Delivery Management System web application built with **React.js (Vite)**, **Tailwind CSS**, **Context API**, **React Router**, **React Hook Form**, and **React Toastify**.

---

## 🚀 Implemented Modules (Phase 1)

### Module 1: Authentication
- **Login Page (`/login`)**:
  - Split-screen layout matching design specifications:
    - Left brand showcase with food graphics, restaurant metrics, fast delivery and secure payment badges.
    - Right authentication card with email/mobile input, password show/hide toggle, "Remember me" option, and forgot password link.
    - Quick demo credential pre-fill buttons for **Admin (Vivek Vendra)** and **Customer (Ravi Kumar)**.
    - Social authentication simulation buttons (Google & GitHub).
- **Register Page (`/register`)**:
  - Two-column layout with custom delivery scooter rider graphic and skyline.
  - Complete form validation using React Hook Form:
    - Full Name
    - Email Address
    - Mobile Number
    - Password (with show/hide toggle)
    - Confirm Password (with matching validation and show/hide toggle)
    - Terms & Conditions acceptance checkbox
- **Forgot Password Page (`/forgot-password`)**:
  - Centered card with custom letter envelope and padlock illustration.
  - Email reset submission with simulated instant OTP/password update form.
- **Security & Session Management**:
  - User session and registered user store preserved in `localStorage`.
  - Protected route guard (`ProtectedRoute.jsx`) preventing unauthorized access.
  - Seamless logout clearing session and redirecting to login.

### Module 2: Dashboard
- **Admin Dashboard (`/dashboard`)**:
  - **Dark Sidebar Navigation**:
    - Branded FoodExpress logo with signature orange chef hat.
    - Active state highlighting (vibrant orange pill) for `Dashboard`.
    - Nav links for `Restaurants`, `Menu Items`, `Orders`, `Customers`, `Coupons`, `Payments`, `Reports`, `Profile`, and `Logout`.
    - Fully responsive drawer navigation on mobile devices.
  - **Top Navigation Bar**:
    - Dashboard page heading and overview subtitle.
    - Notification bell with unread badge counter (`3`) and interactive dropdown list.
    - User profile chip for **Vivek Vendra (Admin)** with account settings dropdown.
  - **Key Metrics / Stat Cards (6 Grid Items)**:
    1. **Restaurants**: `128` (`▲ +12%`)
    2. **Food Items**: `1,842` (`▲ +8%`)
    3. **Total Orders**: `6,320` (`▲ +15%`)
    4. **Active Orders**: `34` (`▲ +5%`)
    5. **Delivered**: `5,928` (`▲ +14%`)
    6. **Customers**: `4,276` (`▲ +11%`)
  - **Revenue Summary**:
    - Total revenue: `₹12,58,420` (`▲ +10.4%`).
    - Period selector: *Last 6 Months*, *Last 30 Days*, *This Year*.
    - Interactive smooth cubic bezier spline SVG chart with orange gradient area fill and data point tooltips on hover.
  - **Orders by Status**:
    - Donut chart with centered order counter (`6,320 Orders`).
    - Breakdown:
      - **Preparing**: 12% (758 orders) - Blue
      - **Out for Delivery**: 8% (506 orders) - Orange
      - **Delivered**: 78% (4,929 orders) - Green
      - **Cancelled**: 2% (127 orders) - Red
  - **Recent Orders Table**:
    - Live order table displaying Order ID (`#ORD10056`, `#ORD10055`, etc.), Customer avatar & name, Amount, Status badge, and elapsed time.
    - Clickable order rows opening an interactive Order Details modal dialog.
  - **Quick Action Cards & Interactive Modals**:
    - `+ Add Restaurant`: Opens modal to add new restaurant with cuisine and rating.
    - `+ Add Menu Item`: Opens modal to add new food dish with price and category.
    - `🏷️ Create Coupon`: Opens modal to generate discount voucher code.
    - `📊 View Reports`: Opens business performance report modal.

---

## 🛠️ Technology Stack
- **Framework**: React.js (Vite 8)
- **Styling**: Tailwind CSS v4
- **State Management**: Context API (`AuthContext`)
- **Routing**: React Router DOM v7
- **Form Handling & Validation**: React Hook Form
- **Alerts & Toasts**: React Toastify
- **Icons**: Lucide React
- **Storage**: Local Storage

---

## 🧑‍💻 Demo Accounts
You can use the built-in quick fill buttons on `/login` or enter manually:
| Role | Email / Mobile | Password |
|---|---|---|
| **Admin** | `admin@foodexpress.com` | `password123` |
| **Customer** | `ravi@foodexpress.com` | `password123` |

---

## 🏃 Running the Project
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
