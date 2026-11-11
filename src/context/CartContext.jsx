import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_cart');
      return saved ? JSON.parse(saved) : [
        // Pre-fill 1 demo item as shown in the screenshot for realistic initial render
        {
          id: 'dish_301',
          name: 'Chicken Biryani',
          price: 249,
          quantity: 2,
          restaurantId: 'rest_3',
          restaurantName: 'Biryani House',
          image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=200&auto=format&fit=crop&q=80',
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

  useEffect(() => {
    localStorage.setItem('fdms_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (activeRestaurant) {
      localStorage.setItem('fdms_cart_restaurant', JSON.stringify(activeRestaurant));
    }
  }, [activeRestaurant]);

  const addToCart = (item, restaurant) => {
    // If adding from a different restaurant, confirm replacement or allow
    if (activeRestaurant && restaurant && activeRestaurant.id !== restaurant.id && cartItems.length > 0) {
      if (!window.confirm(`Your cart contains items from ${activeRestaurant.name}. Reset cart and add from ${restaurant.name}?`)) {
        return;
      }
      setCartItems([{ ...item, quantity: 1, restaurantId: restaurant.id, restaurantName: restaurant.name }]);
      setActiveRestaurant(restaurant);
      toast.success(`Added ${item.name} from ${restaurant.name}!`);
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
      return [...prev, { ...item, quantity: 1, restaurantId: restaurant?.id, restaurantName: restaurant?.name }];
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
    setCartItems(prev => prev.filter(i => i.id !== itemId));
    toast.info('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    setActiveRestaurant(null);
    localStorage.removeItem('fdms_cart');
    localStorage.removeItem('fdms_cart_restaurant');
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        activeRestaurant,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
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
