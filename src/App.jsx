import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { MenuProvider } from './context/MenuContext';
import { OrderProvider } from './context/OrderContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <CartProvider>
            <OrderProvider>
              <AppRoutes />
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </OrderProvider>
          </CartProvider>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
