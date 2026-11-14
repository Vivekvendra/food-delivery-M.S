import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const AVAILABLE_COUPONS = {
  'COUPON50': { discount: 50, type: 'fixed', minOrder: 300, desc: 'Flat ₹50 OFF' },
  'FOOD50': { discount: 50, type: 'percent', maxDiscount: 100, minOrder: 200, desc: '50% OFF up to ₹100' },
  'WELCOME20': { discount: 20, type: 'percent', maxDiscount: 60, minOrder: 150, desc: '20% OFF up to ₹60' }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_cart');
      return saved ? JSON.parse(saved) : [
        // Pre-fill 3 items matching Screen 8 in reference design
        {
          id: 'dish_301',
          name: 'Chicken Biryani',
          price: 249,
          quantity: 1,
          restaurantId: 'rest_3',
          restaurantName: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=300&auto=format&fit=crop&q=80',
        },
        {
          id: 'dish_304',
          name: 'Paneer Butter Masala',
          price: 229,
          quantity: 1,
          restaurantId: 'rest_3',
          restaurantName: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&auto=format&fit=crop&q=80',
        },
        {
          id: 'dish_602',
          name: 'Veg Fried Rice',
          price: 149,
          quantity: 1,
          restaurantId: 'rest_3',
          restaurantName: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&auto=format&fit=crop&q=80',
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeRestaurant, setActiveRestaurant] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_cart_restaurant');
      return saved ? JSON.parse(saved) : { id: 'rest_3', name: 'Biryani House' };
    } catch {
      return null;
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_applied_coupon');
      return saved ? JSON.parse(saved) : { code: 'COUPON50', discount: 50, type: 'fixed' };
    } catch {
      return { code: 'COUPON50', discount: 50, type: 'fixed' };
    }
  });

  useEffect(() => {
    localStorage.setItem('fdms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (activeRestaurant) {
      localStorage.setItem('fdms_cart_restaurant', JSON.stringify(activeRestaurant));
    }
  }, [activeRestaurant]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('fdms_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('fdms_applied_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (item, restaurant) => {
    if (activeRestaurant && restaurant && activeRestaurant.id !== restaurant.id && cartItems.length > 0) {
      if (!window.confirm(`Your cart contains items from ${activeRestaurant.name}. Reset cart and add from ${restaurant.name}?`)) {
        return;
      }
      setCartItems([{ ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }]);
      setActiveRestaurant(restaurant);
      toast.success(`Cart updated with ${item.name}!`);
      return;
    }

    if (restaurant && (!activeRestaurant || cartItems.length === 0)) {
      setActiveRestaurant(restaurant);
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, restaurantId: restaurant?.id || activeRestaurant?.id, restaurantName: restaurant?.name || activeRestaurant?.name }];
    });

    toast.success(`Added "${item.name}" to cart!`, { autoClose: 1800 });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (itemId) => {
    const item = cartItems.find(i => i.id === itemId);
    setCartItems(prev => prev.filter(i => i.id !== itemId));
    toast.info(`Removed "${item?.name || 'Item'}" from cart`);
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('fdms_cart');
    localStorage.removeItem('fdms_cart_restaurant');
    localStorage.removeItem('fdms_applied_coupon');
    toast.info('Cart cleared');
  };

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[upper];
    if (!coupon) {
      toast.error('Invalid coupon code. Try COUPON50 or FOOD50.');
      return false;
    }
    if (subtotal < coupon.minOrder) {
      toast.warning(`Minimum order amount for ${upper} is ₹${coupon.minOrder}.`);
      return false;
    }
    setAppliedCoupon({ code: upper, ...coupon });
    toast.success(`Coupon ${upper} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info('Coupon removed');
  };

  // Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryCharges = cartItems.length > 0 ? 50 : 0;

  let discountAmount = 0;
  if (appliedCoupon && cartItems.length > 0) {
    if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.discount;
    } else if (appliedCoupon.type === 'percent') {
      const calc = (subtotal * appliedCoupon.discount) / 100;
      discountAmount = appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    }
  }

  const totalAmount = Math.max(0, subtotal + deliveryCharges - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        activeRestaurant,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        totalItemsCount,
        subtotal,
        deliveryCharges,
        discountAmount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
