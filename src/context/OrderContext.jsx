import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const OrderContext = createContext(null);

const STORAGE_KEY = 'foodexpress_orders';
const ACTIVE_ORDER_KEY = 'foodexpress_active_order_id';

// Initial demo order matching Screen 10 from reference design
const INITIAL_ORDERS = [
  {
    id: 'ORD10056',
    orderNumber: '#ORD10056',
    createdAt: '2026-10-30T10:24:00',
    formattedDate: 'Oct 30, 2026 • 10:24 AM',
    restaurantId: '1',
    restaurantName: 'Biryani House',
    restaurantImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    items: [
      {
        id: '1',
        name: 'Chicken Biryani',
        price: 249,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: '3',
        name: 'Paneer 65',
        price: 189,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=80'
      }
    ],
    itemsCount: 3,
    subtotal: 687,
    deliveryCharges: 50,
    discountAmount: 0,
    totalAmount: 887, // Matching the ₹887 shown in Screen 10 screenshot
    status: 'Out for Delivery', // 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled'
    estimatedDeliveryTime: '11:20 AM (25 mins)',
    paymentMethod: 'Credit / Debit Card',
    paymentStatus: 'Paid',
    deliveryAddress: {
      type: 'Home',
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017'
    },
    deliveryPartner: {
      name: 'Ramesh Kumar',
      phone: '+91 91234 56789',
      rating: 4.9,
      vehicle: 'Hero Electric (AP 31 EA 4521)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    timeline: [
      { step: 'Order Placed', time: '10:24 AM', completed: true, desc: 'Your order was received by Biryani House' },
      { step: 'Preparing', time: '10:36 AM', completed: true, desc: 'Kitchen is preparing your fresh meal' },
      { step: 'Out for Delivery', time: '10:55 AM', completed: true, active: true, desc: 'Rider is on the way to your address' },
      { step: 'Delivered', time: 'Estimated: 11:20 AM', completed: false, desc: 'Food handed over with care' }
    ]
  },
  {
    id: 'ORD10048',
    orderNumber: '#ORD10048',
    createdAt: '2026-10-28T20:06:00',
    formattedDate: 'Oct 28, 2026 • 8:06 PM',
    restaurantId: '2',
    restaurantName: 'Pizza Hub',
    restaurantImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80',
    items: [
      {
        id: '4',
        name: 'Farmhouse Pizza',
        price: 399,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=80'
      }
    ],
    itemsCount: 3,
    subtotal: 1197,
    deliveryCharges: 52,
    discountAmount: 0,
    totalAmount: 1249,
    status: 'Cancelled',
    estimatedDeliveryTime: 'Cancelled',
    paymentMethod: 'UPI',
    paymentStatus: 'Refunded',
    deliveryAddress: {
      type: 'Home',
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017'
    },
    timeline: [
      { step: 'Order Placed', time: '8:06 PM', completed: true },
      { step: 'Cancelled', time: '8:15 PM', completed: true, cancelled: true }
    ]
  },
  {
    id: 'ORD10036',
    orderNumber: '#ORD10036',
    createdAt: '2026-10-25T14:00:00',
    formattedDate: 'Oct 25, 2026 • 2:00 PM',
    restaurantId: '3',
    restaurantName: 'Burger Point',
    restaurantImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    items: [
      {
        id: '2',
        name: 'Crispy Veg Burger',
        price: 149,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: '7',
        name: 'French Fries',
        price: 99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80'
      }
    ],
    itemsCount: 4,
    subtotal: 496,
    deliveryCharges: 40,
    discountAmount: 37,
    totalAmount: 499,
    status: 'Delivered',
    estimatedDeliveryTime: 'Delivered at 2:38 PM',
    paymentMethod: 'Wallet',
    paymentStatus: 'Paid',
    deliveryAddress: {
      type: 'Office',
      recipientName: 'Vivek Vendra',
      phone: '+91 98765 43210',
      addressLine: 'Offshore Towers, Dwaraka Nagar, Visakhapatnam - 530016'
    },
    timeline: [
      { step: 'Order Placed', time: '2:00 PM', completed: true },
      { step: 'Preparing', time: '2:10 PM', completed: true },
      { step: 'Out for Delivery', time: '2:22 PM', completed: true },
      { step: 'Delivered', time: '2:38 PM', completed: true }
    ]
  }
];

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  });

  const [activeOrderId, setActiveOrderId] = useState(() => {
    try {
      const stored = localStorage.getItem(ACTIVE_ORDER_KEY);
      return stored || 'ORD10056';
    } catch (e) {
      return 'ORD10056';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    if (activeOrderId) {
      localStorage.setItem(ACTIVE_ORDER_KEY, activeOrderId);
    }
  }, [activeOrderId]);

  // Find order by ID
  const getOrderById = (id) => {
    if (!id) return null;
    const cleanId = id.toString().replace('#', '').toUpperCase();
    return orders.find(o => o.id.toUpperCase() === cleanId || o.orderNumber.toUpperCase() === `#${cleanId}`) || null;
  };

  // Get current active order
  const currentOrder = getOrderById(activeOrderId) || orders[0] || null;

  // Place new order
  const placeOrder = ({
    items,
    restaurant,
    deliveryAddress,
    paymentMethod = 'Credit / Debit Card',
    subtotal,
    deliveryCharges = 50,
    discountAmount = 0,
    totalAmount
  }) => {
    const rawNumber = Math.floor(10000 + Math.random() * 90000);
    const newId = `ORD${rawNumber}`;
    const now = new Date();
    
    // Format estimated delivery time (30-35 mins from now)
    const deliveryDate = new Date(now.getTime() + 30 * 60 * 1000);
    const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const estTimeStr = `${timeFormatter.format(deliveryDate)} (30 mins)`;

    const newOrder = {
      id: newId,
      orderNumber: `#${newId}`,
      createdAt: now.toISOString(),
      formattedDate: `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${timeFormatter.format(now)}`,
      restaurantId: restaurant?.id || '1',
      restaurantName: restaurant?.name || 'Biryani House',
      restaurantImage: restaurant?.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
      subtotal: subtotal || items.reduce((acc, i) => acc + (i.price * i.quantity), 0),
      deliveryCharges,
      discountAmount,
      totalAmount: totalAmount || (subtotal + deliveryCharges - discountAmount),
      status: 'Preparing',
      estimatedDeliveryTime: estTimeStr,
      paymentMethod,
      paymentStatus: 'Paid',
      deliveryAddress: deliveryAddress || {
        type: 'Home',
        recipientName: 'Vivek Vendra',
        phone: '+91 98765 43210',
        addressLine: 'D.No: 12-34, MVP Colony, Visakhapatnam - 530017'
      },
      deliveryPartner: {
        name: 'Ramesh Kumar',
        phone: '+91 91234 56789',
        rating: 4.9,
        vehicle: 'Hero Electric (AP 31 EA 4521)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      },
      timeline: [
        { step: 'Order Placed', time: timeFormatter.format(now), completed: true, desc: 'Your order was received' },
        { step: 'Preparing', time: 'Just now', completed: true, active: true, desc: 'Kitchen is preparing your food' },
        { step: 'Out for Delivery', time: `Est. ${timeFormatter.format(new Date(now.getTime() + 15 * 60 * 1000))}`, completed: false, desc: 'Rider will pick up soon' },
        { step: 'Delivered', time: `Est. ${timeFormatter.format(deliveryDate)}`, completed: false, desc: 'Food handed over' }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newId);
    return newOrder;
  };

  // Update order status manually or via simulation
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId || order.orderNumber === orderId) {
        let updatedTimeline = [...order.timeline];
        
        if (newStatus === 'Preparing') {
          updatedTimeline = updatedTimeline.map(step => ({
            ...step,
            completed: step.step === 'Order Placed' || step.step === 'Preparing',
            active: step.step === 'Preparing'
          }));
        } else if (newStatus === 'Out for Delivery') {
          updatedTimeline = updatedTimeline.map(step => ({
            ...step,
            completed: ['Order Placed', 'Preparing', 'Out for Delivery'].includes(step.step),
            active: step.step === 'Out for Delivery'
          }));
        } else if (newStatus === 'Delivered') {
          updatedTimeline = updatedTimeline.map(step => ({
            ...step,
            completed: true,
            active: false
          }));
        } else if (newStatus === 'Cancelled') {
          updatedTimeline = [
            { step: 'Order Placed', time: order.timeline[0]?.time || '10:00 AM', completed: true },
            { step: 'Cancelled', time: 'Cancelled', completed: true, cancelled: true, desc: 'Order was cancelled' }
          ];
        }

        return {
          ...order,
          status: newStatus,
          timeline: updatedTimeline
        };
      }
      return order;
    }));

    toast.info(`Order status updated to "${newStatus}"`);
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
    toast.warn('Order has been cancelled.');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        activeOrderId,
        setActiveOrderId,
        currentOrder,
        getOrderById,
        placeOrder,
        updateOrderStatus,
        cancelOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
