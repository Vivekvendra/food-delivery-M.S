import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const MenuContext = createContext(null);

export const DEFAULT_MENU_ITEMS = [
  {
    id: 'item_1',
    name: 'Chicken Biryani',
    category: 'Biryani',
    price: 249,
    status: 'Available', // 'Available' | 'Out of Stock'
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80',
    description: 'Slow-cooked flavorful chicken biryani layered with aromatic aged basmati rice, saffron, and authentic spices.',
    ingredients: 'Basmati Rice, Marinated Chicken, Fried Onions, Ghee, Saffron, Spices',
    prepTime: '30 mins',
    rating: 4.8
  },
  {
    id: 'item_2',
    name: 'Paneer Biryani',
    category: 'Biryani',
    price: 229,
    status: 'Available',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80',
    description: 'Fragrant dum biryani made with soft spiced paneer cubes, saffron-infused rice, and crispy caramelized onions.',
    ingredients: 'Basmati Rice, Fresh Paneer, Mint, Yoghurt, Saffron, Biryani Masala',
    prepTime: '25 mins',
    rating: 4.6
  },
  {
    id: 'item_3',
    name: 'Chicken 65',
    category: 'Starters',
    price: 199,
    status: 'Available',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80',
    description: 'Crispy deep-fried chicken cubes tempered with curry leaves, yogurt, and crushed fiery red chilies.',
    ingredients: 'Boneless Chicken, Curry Leaves, Red Chilies, Ginger-Garlic, Cornflour',
    prepTime: '20 mins',
    rating: 4.7
  },
  {
    id: 'item_4',
    name: 'Veg Fried Rice',
    category: 'Rice',
    price: 149,
    status: 'Available',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80',
    description: 'Classic wok-tossed long-grain rice with finely chopped carrots, French beans, cabbage, and soy glaze.',
    ingredients: 'Basmati Rice, Carrots, Beans, Spring Onions, Dark Soy Sauce, White Pepper',
    prepTime: '15 mins',
    rating: 4.5
  },
  {
    id: 'item_5',
    name: 'Paneer Butter Masala',
    category: 'Curries',
    price: 229,
    status: 'Available',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
    description: 'Tender cottage cheese cubes simmered in a rich, buttery, velvety tomato and cashew nut gravy.',
    ingredients: 'Paneer, Butter, Cream, Tomatoes, Cashews, Kasuri Methi',
    prepTime: '25 mins',
    rating: 4.8
  },
  {
    id: 'item_6',
    name: 'Mutton Dum Biryani',
    category: 'Biryani',
    price: 349,
    status: 'Available',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80',
    description: 'Royal slow-cooked tender goat meat with long-grain basmati rice and rich Nizami aromatic herbs.',
    ingredients: 'Mutton, Aged Basmati Rice, Desi Ghee, Saffron, Mint, Whole Spices',
    prepTime: '45 mins',
    rating: 4.9
  },
  {
    id: 'item_7',
    name: 'Crispy Double Cheese Burger',
    category: 'Burgers',
    price: 189,
    status: 'Available',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
    description: 'Flame-grilled double patty layered with melted cheddar cheese, fresh lettuce, pickles, and signature house sauce.',
    ingredients: 'Sesame Bun, Grilled Patty, Double Cheddar, Lettuce, Tomato, Mayo',
    prepTime: '15 mins',
    rating: 4.6
  },
  {
    id: 'item_8',
    name: 'Classic Margherita Pizza',
    category: 'Pizza',
    price: 299,
    status: 'Available',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80',
    description: 'Thin crust hand-stretched pizza baked with authentic San Marzano sauce, fresh mozzarella, and aromatic basil.',
    ingredients: 'Pizza Dough, Mozzarella, Basil Leaves, Extra Virgin Olive Oil, Tomato Sauce',
    prepTime: '20 mins',
    rating: 4.7
  },
  {
    id: 'item_9',
    name: 'Peri Peri Loaded Fries',
    category: 'Sides',
    price: 129,
    status: 'Available',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80',
    description: 'Hot golden crispy french fries tossed in spicy peri-peri rub and served with melted cheese dipping sauce.',
    ingredients: 'Potatoes, Peri-Peri Seasoning, Salt, Cheese Sauce',
    prepTime: '10 mins',
    rating: 4.5
  },
  {
    id: 'item_10',
    name: 'Spicy Chilli Chicken',
    category: 'Starters',
    price: 219,
    status: 'Out of Stock',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500&auto=format&fit=crop&q=80',
    description: 'Indo-Chinese style crispy chicken chunks tossed with crunchy bell peppers, onions, and spicy green chili glaze.',
    ingredients: 'Chicken, Bell Peppers, Onions, Green Chilies, Soy Sauce, Vinegar',
    prepTime: '20 mins',
    rating: 4.4
  }
];

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fdms_menu_items');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('fdms_menu_items', JSON.stringify(DEFAULT_MENU_ITEMS));
      return DEFAULT_MENU_ITEMS;
    } catch {
      return DEFAULT_MENU_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem('fdms_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  const addMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item_${Date.now()}`,
      status: itemData.status || 'Available',
      rating: 4.5,
      image: itemData.image?.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80',
    };
    setMenuItems(prev => [newItem, ...prev]);
    toast.success(`"${newItem.name}" added to menu!`);
    return newItem;
  };

  const updateMenuItem = (id, updatedData) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    toast.success('Menu item updated successfully!');
  };

  const deleteMenuItem = (id) => {
    const itemToDelete = menuItems.find(i => i.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    toast.info(`"${itemToDelete?.name || 'Item'}" removed from menu`);
  };

  const toggleAvailability = (id) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Available' ? 'Out of Stock' : 'Available';
        toast.info(`${item.name} is now marked ${nextStatus}`);
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const getMenuItemById = (id) => {
    return menuItems.find(item => item.id === id);
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleAvailability,
        getMenuItemById,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
