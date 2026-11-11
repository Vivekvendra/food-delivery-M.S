import axios from 'axios';

// Default enriched restaurants matching the uploaded design
export const DEFAULT_RESTAURANTS = [
  {
    id: 'rest_1',
    name: 'Pizza Hub',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80',
    cuisine: 'Italian • Pizza, Pasta',
    cuisineCategory: 'Italian',
    rating: 4.6,
    reviewCount: '2.4k',
    deliveryTime: '25-35 min',
    deliveryTimeMinutes: 30,
    deliveryFee: 40,
    address: 'D.No: 1-89, MVP Colony, Visakhapatnam',
    isOpen: true,
    popularity: 95,
    description: 'Authentic stone-baked Italian pizzas, artisanal pastas, and garlic breads made with imported cheeses and fresh herbs.',
    menuCategories: ['All', 'Pizza', 'Pasta', 'Sides', 'Beverages'],
    menu: [
      {
        id: 'dish_101',
        name: 'Classic Margherita Pizza',
        description: 'Fresh mozzarella, san marzano tomato sauce, fresh basil, and extra virgin olive oil.',
        price: 299,
        category: 'Pizza',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop&q=80',
        rating: 4.8
      },
      {
        id: 'dish_102',
        name: 'Farmhouse Veggie Supreme',
        description: 'Loaded with bell peppers, sweet corn, black olives, onions, and jalapenos.',
        price: 349,
        category: 'Pizza',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&auto=format&fit=crop&q=80',
        rating: 4.6
      },
      {
        id: 'dish_103',
        name: 'Creamy Alfredo Pasta',
        description: 'Penne pasta tossed in rich parmesan garlic cream sauce with fresh broccoli and mushrooms.',
        price: 249,
        category: 'Pasta',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=500&auto=format&fit=crop&q=80',
        rating: 4.5
      },
      {
        id: 'dish_104',
        name: 'Cheesy Garlic Breadsticks',
        description: 'Warm oven-baked dough topped with garlic herb butter and melted mozzarella.',
        price: 149,
        category: 'Sides',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1619881589146-56260742f4c9?w=500&auto=format&fit=crop&q=80',
        rating: 4.7
      }
    ]
  },
  {
    id: 'rest_2',
    name: 'Burger Point',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&auto=format&fit=crop&q=80',
    cuisine: 'American • Burgers',
    cuisineCategory: 'American',
    rating: 4.5,
    reviewCount: '1.8k',
    deliveryTime: '30-40 min',
    deliveryTimeMinutes: 35,
    deliveryFee: 30,
    address: 'Near Diamond Park, Dwaraka Nagar, Visakhapatnam',
    isOpen: true,
    popularity: 92,
    description: 'Juicy handcrafted flame-grilled burgers, crispy golden fries, and thick gourmet milkshakes.',
    menuCategories: ['All', 'Burgers', 'Fries', 'Beverages'],
    menu: [
      {
        id: 'dish_201',
        name: 'Crispy Double Cheese Burger',
        description: 'Two grilled patties with double melted cheddar, crisp lettuce, tomatoes, and secret house sauce.',
        price: 229,
        category: 'Burgers',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
        rating: 4.7
      },
      {
        id: 'dish_202',
        name: 'Spicy Paneer Crunch Burger',
        description: 'Golden fried spicy cottage cheese patty topped with tandoori mayo and crunchy lettuce.',
        price: 189,
        category: 'Burgers',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format&fit=crop&q=80',
        rating: 4.5
      },
      {
        id: 'dish_203',
        name: 'Peri Peri Loaded Fries',
        description: 'Hot crispy french fries tossed in peri-peri seasoning and drizzled with cheese dip.',
        price: 129,
        category: 'Fries',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&auto=format&fit=crop&q=80',
        rating: 4.8
      }
    ]
  },
  {
    id: 'rest_3',
    name: 'Biryani House',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    cuisine: 'Indian • Biryani',
    cuisineCategory: 'Indian',
    rating: 4.7,
    reviewCount: '3.1k',
    deliveryTime: '35-45 min',
    deliveryTimeMinutes: 40,
    deliveryFee: 50,
    address: 'Main Road, Gajuwaka, Visakhapatnam',
    isOpen: true,
    popularity: 99,
    description: 'Renowned for our slow-cooked fragrant Hyderabadi Dum Biryanis prepared with basmati rice and handpicked spices.',
    menuCategories: ['All', 'Biryani', 'Starters', 'Curries', 'Rice', 'Beverages'],
    menu: [
      {
        id: 'dish_301',
        name: 'Special Chicken Dum Biryani',
        description: 'Spicy and flavorful chicken biryani slow-cooked with aromatic aged basmati rice and rich spices.',
        price: 249,
        category: 'Biryani',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&auto=format&fit=crop&q=80',
        rating: 4.9
      },
      {
        id: 'dish_302',
        name: 'Royal Mutton Biryani',
        description: 'Tender marinated mutton pieces cooked layered with basmati rice, saffron, and ghee.',
        price: 349,
        category: 'Biryani',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=500&auto=format&fit=crop&q=80',
        rating: 4.8
      },
      {
        id: 'dish_303',
        name: 'Chicken 65 Starters',
        description: 'Crispy deep-fried chicken cubes tempered with curry leaves, yogurt, and crushed green chillies.',
        price: 199,
        category: 'Starters',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=500&auto=format&fit=crop&q=80',
        rating: 4.7
      },
      {
        id: 'dish_304',
        name: 'Paneer Butter Masala',
        description: 'Fresh soft cottage cheese cubes simmered in a rich velvety tomato and butter gravy.',
        price: 229,
        category: 'Curries',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=80',
        rating: 4.6
      }
    ]
  },
  {
    id: 'rest_4',
    name: 'Sri Sai Tiffins',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    cuisine: 'South Indian',
    cuisineCategory: 'South Indian',
    rating: 4.5,
    reviewCount: '2.0k',
    deliveryTime: '15-25 min',
    deliveryTimeMinutes: 20,
    deliveryFee: 0,
    address: 'Opp. Siripuram Towers, Siripuram, Visakhapatnam',
    isOpen: true,
    popularity: 90,
    description: 'Crispy butter dosas, fluffy steamed idlis, and spicy Andhra podi with fresh coconut and tomato chutneys.',
    menuCategories: ['All', 'Dosas', 'Idli & Vada', 'Beverages'],
    menu: [
      {
        id: 'dish_401',
        name: 'Ghee Karam Masala Dosa',
        description: 'Crispy golden crepe smeared with spicy Andhra karam and pure desi ghee, stuffed with potato masala.',
        price: 110,
        category: 'Dosas',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500&auto=format&fit=crop&q=80',
        rating: 4.8
      },
      {
        id: 'dish_402',
        name: 'Steamed Idli Sambar (4 Pcs)',
        description: 'Soft melt-in-mouth rice cakes served piping hot with vegetable sambar and peanut chutney.',
        price: 70,
        category: 'Idli & Vada',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=80',
        rating: 4.6
      }
    ]
  },
  {
    id: 'rest_5',
    name: 'Chicken World',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
    cuisine: 'Fast Food',
    cuisineCategory: 'Fast Food',
    rating: 4.2,
    reviewCount: '1.2k',
    deliveryTime: '30-40 min',
    deliveryTimeMinutes: 35,
    deliveryFee: 35,
    address: 'Seethammadhara Junction, Visakhapatnam',
    isOpen: false, // Closed badge
    popularity: 82,
    description: 'Extra crispy hot wings, fried chicken popcorn buckets, wraps, and spicy dipping sauces.',
    menuCategories: ['All', 'Buckets', 'Burgers', 'Wings'],
    menu: [
      {
        id: 'dish_501',
        name: 'Hot & Crispy Chicken Bucket (6 Pcs)',
        description: 'Crunchy golden seasoned chicken pieces with spicy garlic mayo dip.',
        price: 449,
        category: 'Buckets',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&auto=format&fit=crop&q=80',
        rating: 4.4
      }
    ]
  },
  {
    id: 'rest_6',
    name: 'Wok & Roll',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
    cuisine: 'Chinese • Noodles',
    cuisineCategory: 'Chinese',
    rating: 4.3,
    reviewCount: '1.5k',
    deliveryTime: '20-30 min',
    deliveryTimeMinutes: 25,
    deliveryFee: 40,
    address: 'Near Beach Road, Rushikonda, Visakhapatnam',
    isOpen: true,
    popularity: 88,
    description: 'Street-style wok noodles, sizzling schezwan fried rice, dimsums, and spring rolls.',
    menuCategories: ['All', 'Noodles', 'Rice', 'Appetizers'],
    menu: [
      {
        id: 'dish_601',
        name: 'Hakka Chicken Noodles',
        description: 'Thin egg noodles tossed with shredded chicken, crunchy carrots, cabbage, and soy glaze.',
        price: 199,
        category: 'Noodles',
        isVeg: false,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&auto=format&fit=crop&q=80',
        rating: 4.6
      },
      {
        id: 'dish_602',
        name: 'Veg Schezwan Fried Rice',
        description: 'Fragrant basmati rice stir-fried in fiery homemade schezwan sauce and fresh garden veggies.',
        price: 179,
        category: 'Rice',
        isVeg: true,
        image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&auto=format&fit=crop&q=80',
        rating: 4.4
      }
    ]
  }
];

export async function fetchRestaurants() {
  try {
    // Make call to third-party API (DummyJSON Recipes)
    const response = await axios.get('https://dummyjson.com/recipes?limit=25', { timeout: 4000 });
    
    if (response.data && response.data.recipes && response.data.recipes.length > 0) {
      const apiRecipes = response.data.recipes;
      
      // Enrich default restaurants with recipes from third-party API
      const enriched = DEFAULT_RESTAURANTS.map((rest, index) => {
        const matchingRecipe = apiRecipes[index % apiRecipes.length];
        return {
          ...rest,
          // Enhance with live third-party recipe metadata
          apiReference: matchingRecipe ? matchingRecipe.name : null,
        };
      });

      return {
        success: true,
        data: enriched,
        total: enriched.length,
        fromApi: true,
      };
    }
    
    return { success: true, data: DEFAULT_RESTAURANTS, total: DEFAULT_RESTAURANTS.length, fromApi: false };
  } catch (error) {
    console.warn('Third-Party API call failed or timed out, using fallback restaurant dataset:', error.message);
    // Graceful fallback to default offline dataset
    return {
      success: true,
      data: DEFAULT_RESTAURANTS,
      total: DEFAULT_RESTAURANTS.length,
      fromApi: false,
      error: error.message
    };
  }
}

export async function getRestaurantById(id) {
  const result = await fetchRestaurants();
  const found = result.data.find(r => r.id === id);
  if (found) {
    return { success: true, data: found };
  }
  return { success: false, error: 'Restaurant not found' };
}
