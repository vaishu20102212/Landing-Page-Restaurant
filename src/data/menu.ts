import type { MenuItem, Chef, Testimonial } from '../types'


const img = (n: number) => `/images/dish-${n}.png`

// Real food photos from Unsplash (free to use under the Unsplash License).
const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`

export const menuItems: MenuItem[] = [
  // ---------- Dinner ----------
  { id: 'spaghetti', name: 'Spaghetti', price: 12.05, rating: 4, image: img(1), category: 'Dinner', type: 'Pasta', description: 'Al dente spaghetti in slow-cooked tomato sauce with fresh basil and cubes of feta.' },
  { id: 'gnocchi', name: 'Gnocchi', price: 13.5, rating: 5, image: img(2), category: 'Dinner', type: 'Pasta', description: 'Pan-seared potato gnocchi with cherry tomatoes, spinach and garlic.' },
  { id: 'risotto', name: 'Mushroom Risotto', price: 14, rating: 4, image: img(5), category: 'Dinner', type: 'Rice', description: 'Creamy arborio rice with wild mushrooms, herbs and shaved parmesan.' },
  { id: 'splitza-signature', name: 'Splitza Signature', price: 16.5, rating: 5, image: img(6), category: 'Dinner', type: 'Pizza', description: 'Stone-baked pizza with mozzarella, crispy bacon and a hint of chilli.' },

  { id: 'lasagna', name: 'Baked Lasagna', price: 15, rating: 5, image: photo('1709429790175-b02bb1b19207'), category: 'Dinner', type: 'Pasta', description: 'Layers of pasta, slow-cooked meat ragu and creamy bechamel, baked with melted cheese.' },
  { id: 'grilled-salmon', name: 'Grilled Salmon', price: 18.5, rating: 5, image: photo('1467003909585-2f8a72700288'), category: 'Dinner', type: 'Seafood', description: 'Pan-grilled salmon fillet with a silky herb sauce and seasonal greens.' },

  // ---------- Lunch ----------
  { id: 'ravioli', name: 'Spinach Ravioli', price: 11.5, rating: 4, image: img(3), category: 'Lunch', type: 'Pasta', description: 'Handmade ravioli in a light butter and sage sauce, finished with black pepper.' },
  { id: 'penne-alla-vodka', name: 'Penne Alla Vodka', price: 11.95, rating: 4, image: img(4), category: 'Lunch', type: 'Pasta', description: 'Penne in a spicy creamy tomato sauce with red onion, olives and basil.' },
  { id: 'caprese-salad', name: 'Caprese Salad', price: 9.5, rating: 4, image: photo('1529312266912-b33cfce2eefd'), category: 'Lunch', type: 'Salad', description: 'Sliced ripe tomato, fresh mozzarella and basil with olive oil and cracked pepper.' },

  { id: 'garden-salad', name: 'Garden Fresh Salad', price: 8.5, rating: 4, image: photo('1512621776951-a57141f2eefd'), category: 'Lunch', type: 'Salad', description: 'Crisp seasonal greens and vegetables tossed in a light olive oil dressing.' },
  { id: 'egg-sandwich', name: 'Farmhouse Egg Sandwich', price: 8, rating: 4, image: photo('1482049016688-2d3e1b311543'), category: 'Lunch', type: 'Sandwich', description: 'Toasted panino layered with sliced egg, fresh greens and a touch of pepper.' },
  { id: 'rustic-pizza', name: 'Rustic Pizza', price: 12.5, rating: 5, image: photo('1565299624946-b28f40a0ae38'), category: 'Lunch', type: 'Pizza', description: 'Hand-stretched pizza with tomato sauce, melted mozzarella and fresh herbs.' },

  // ---------- Dessert ----------
  { id: 'tiramisu', name: 'Tiramisu', price: 6.5, rating: 5, image: photo('1698688334089-c68105801d02'), category: 'Dessert', type: 'Dessert', description: 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.' },
  { id: 'panna-cotta', name: 'Berry Panna Cotta', price: 6, rating: 4, image: photo('1542116021-0ff087fb0a41'), category: 'Dessert', type: 'Dessert', description: 'Silky vanilla cream topped with fresh berries and a mint leaf.' },
  { id: 'cannoli', name: 'Cannoli', price: 5.5, rating: 4, image: photo('1654870032519-9db00597cd78'), category: 'Dessert', type: 'Dessert', description: 'Crisp Sicilian pastry shells filled with sweet ricotta cream.' },

  { id: 'black-forest', name: 'Black Forest Cake', price: 6.5, rating: 5, image: photo('1606890737304-57a1ca8a5b62'), category: 'Dessert', type: 'Dessert', description: 'Chocolate sponge layered with whipped cream and dark cherries.' },
  { id: 'vanilla-gelato', name: 'Vanilla Gelato', price: 4.5, rating: 4, image: photo('1551024506-0bccd828d307'), category: 'Dessert', type: 'Dessert', description: 'Creamy vanilla gelato served on a crisp biscuit.' },
  { id: 'blueberry-pie', name: 'Blueberry Pie', price: 5.5, rating: 4, image: photo('1476887334197-56adbf254e1a'), category: 'Dessert', type: 'Dessert', description: 'Buttery pastry filled with juicy blueberries, served by the slice.' },

  // ---------- Drink ----------
  { id: 'cappuccino', name: 'Cappuccino', price: 3.5, rating: 5, image: photo('1635149186528-356a0db5ab81'), category: 'Drink', type: 'Coffee', description: 'Double espresso with steamed milk and a thick layer of foam.' },
  { id: 'lemonade', name: 'Fresh Lemonade', price: 3, rating: 4, image: photo('1728777187102-1ed5cd6346d5'), category: 'Drink', type: 'Cold drink', description: 'Freshly squeezed lemon, lightly sweetened and served over ice.' },
  { id: 'iced-tea', name: 'Iced Tea', price: 3, rating: 4, image: photo('1628229200053-53b768c4d37b'), category: 'Drink', type: 'Cold drink', description: 'Chilled black tea brewed daily and served over ice.' },
  { id: 'fruit-juice', name: 'Fresh Fruit Juice', price: 3.5, rating: 4, image: photo('1551024709-8f23befc6f87'), category: 'Drink', type: 'Cold drink', description: 'Freshly pressed seasonal fruit juice served chilled.' },
  { id: 'strawberry-cooler', name: 'Strawberry Cooler', price: 4, rating: 5, image: photo('1592858167090-2473780d894d'), category: 'Drink', type: 'Cold drink', description: 'Chilled strawberry cooler garnished with fresh strawberry slices.' },
  { id: 'blood-orange-spritzer', name: 'Blood Orange Spritzer', price: 4, rating: 4, image: photo('1657313666513-70770d329ef4'), category: 'Drink', type: 'Cold drink', description: 'Sparkling blood orange drink finished with a sprig of rosemary.' },
]

export const chefs: Chef[] = [
  { id: 'betran', name: 'Betran Komar', role: 'Head chef', image: '/images/chef 1.png', bg: 'bg-[#d9d9d9]' },
  { id: 'ferry', name: 'Ferry Sauwi', role: 'Chef', image: '/images/chef 2.png', bg: 'bg-[#fbe0c4]' },
  { id: 'iswan', name: 'Iswan Dracho', role: 'Chef', image: '/images/chef 3.png', bg: 'bg-[#e7dcd6]' },
]

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Starla Virgoun', role: 'Financial advisor', quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisis ultricies at eleifend proin. Congue nibh nulla malesuada ultricies nec quam', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop' },
  { id: 't2', name: 'Marcus Elian', role: 'Food blogger', quote: 'Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop' },
  { id: 't3', name: 'Amelia Cruz', role: 'Local guide', quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop' },
  { id: 't4', name: 'Daniel Khost', role: 'Regular customer', quote: 'The pasta here reminds me of my trip to Rome. Genuinely the best Italian spot in the neighborhood.', avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop' },
  { id: 't5', name: 'Priya Nandan', role: 'Event planner', quote: 'Booked this place for a client dinner and everyone was impressed. Service was quick and warm.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop' },
  { id: 't6', name: 'Owen Castillo', role: 'Chef, verified diner', quote: 'As someone in the industry, I really respect how consistent the plating and flavor are here.', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop' },
  { id: 't7', name: 'Sofia Lindqvist', role: 'Travel writer', quote: 'Cozy atmosphere, friendly staff, and a menu that keeps surprising me every visit.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop' },
  { id: 't8', name: 'Sai sudhar', role: 'Engneer', quote: 'Cozy atmosphere, friendly staff, and a menu that keeps surprising me every visit.', avatar: 'https://media.istockphoto.com/id/1830126474/photo/portrait-of-a-business-man-sitting-in-an-office.jpg?s=1024x1024&w=is&k=20&c=y6ekaWOU98cltT8YkEn8dykF4-hLdCu3nNBGPvC4AG8=' },
]

export const categoryFilters: Array<'All catagory' | 'Dinner' | 'Lunch' | 'Dessert' | 'Drink'> = [
  'All catagory', 'Dinner', 'Lunch', 'Dessert', 'Drink',
]
