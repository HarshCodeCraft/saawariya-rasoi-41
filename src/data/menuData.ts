
export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: string;
  takeawayPrice?: string;
  image?: string;
  popular?: boolean;
  category: string;
  subcategory?: string;
  veg: boolean;
  quantity?: string;
}

export const categories = [
  "All",
  "Saawariya Specialty",
  "Saawariya Vrat Special",
  "Saawariya Combos",
  "Saawariya's Dessert"
];

export const menuItems: MenuItem[] = [
  // Saawariya Specialty
  {
    id: 1,
    name: "Thekua",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true,
    popular: true
  },
  {
    id: 2,
    name: "Dal Pithi",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 3,
    name: "Sabu dana Vada",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 4,
    name: "Farra",
    price: "₹149",
    takeawayPrice: "₹135",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 5,
    name: "Bhauri",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 6,
    name: "Chana Dal Pakora",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 7,
    name: "2 Sattu Paratha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 8,
    name: "Poha",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 9,
    name: "Appe",
    price: "₹99",
    takeawayPrice: "₹89",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 10,
    name: "Sev Tamatar Sabji",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 11,
    name: "2 Besan Chilla",
    price: "₹129",
    takeawayPrice: "₹116",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 12,
    name: "Namkeen Sevai",
    price: "₹119",
    takeawayPrice: "₹107",
    category: "Saawariya Specialty",
    veg: true
  },
  {
    id: 13,
    name: "Nimona",
    price: "₹219",
    takeawayPrice: "₹197",
    category: "Saawariya Specialty",
    veg: true,
    popular: true
  },
  
  // Saawariya Vrat Special - Vrat Snacks
  {
    id: 14,
    name: "Paneer Pakora",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true
  },
  {
    id: 15,
    name: "Aloo Vada",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true
  },
  {
    id: 16,
    name: "Sabu dana Vada",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Snacks",
    veg: true
  },
  
  // Saawariya Vrat Special - Vrat Sweet
  {
    id: 17,
    name: "Sabu dana Kheer",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Sweet",
    veg: true
  },
  
  // Saawariya Vrat Special - Vrat Meal Combo
  {
    id: 18,
    name: "Aloo Jeera with Curd",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true
  },
  {
    id: 19,
    name: "Sabudana Khichdi with Curd",
    price: "₹139",
    takeawayPrice: "₹125",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true
  },
  {
    id: 20,
    name: "Vrat Basic Thali",
    description: "Aloo Jeera + Kuttu ke atta ki 4 poori + Curd",
    price: "₹189",
    takeawayPrice: "₹170",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true
  },
  {
    id: 21,
    name: "Vrat Special Thali",
    description: "Sabudana Khichdi + Aloo Jeera + Aloo Vada + Curd",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Vrat Special",
    subcategory: "Vrat Meal Combo",
    veg: true,
    popular: true
  },
  
  // Saawariya Combos
  {
    id: 22,
    name: "Chili Paneer with Fried Rice/Noodles",
    description: "Served with a coke",
    price: "₹269",
    takeawayPrice: "₹242",
    category: "Saawariya Combos",
    veg: true,
    popular: true
  },
  {
    id: 23,
    name: "Veg Manchurian with Fried Rice/Noodles",
    description: "Served with a coke",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 24,
    name: "Dal Fry Combo",
    description: "Served with Rice/4 Roti/2 Paratha",
    price: "₹159",
    takeawayPrice: "₹143",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 25,
    name: "Poori Sabji Combo",
    description: "Served with 6 Poori/4 Roti/2 Paratha/4 Chawal ke Atte ki poori",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 26,
    name: "Paneer Bhurji Combo",
    description: "Served with 4 Roti/2 Paratha",
    price: "₹179",
    takeawayPrice: "₹161",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 27,
    name: "Winter Special Combo",
    description: "Nimona + Rice + 4 Roti/2 Paratha",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Combos",
    veg: true,
    popular: true
  },
  {
    id: 28,
    name: "Veg Basic Thali",
    description: "Daal + Sookhi Sabji + Rice + 4 Roti/2 Paratha",
    price: "₹169",
    takeawayPrice: "₹152",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 29,
    name: "Veg Standard Thali",
    description: "Paneer ki Sabji + Rice + Roti/Paratha",
    price: "₹199",
    takeawayPrice: "₹179",
    category: "Saawariya Combos",
    veg: true
  },
  {
    id: 30,
    name: "Veg Special Thali",
    description: "Paneer ki Sabji + Daal + Rice + Roti/Paratha + Sweet",
    price: "₹249",
    takeawayPrice: "₹224",
    category: "Saawariya Combos",
    veg: true,
    popular: true
  },
  
  // Saawariya's Dessert
  {
    id: 31,
    name: "Kheer",
    price: "₹149",
    takeawayPrice: "₹134",
    category: "Saawariya's Dessert",
    veg: true
  },
  {
    id: 32,
    name: "Pedha",
    price: "₹179",
    takeawayPrice: "₹161",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams"
  },
  {
    id: 33,
    name: "Pedha",
    price: "₹349",
    takeawayPrice: "₹314",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams"
  },
  {
    id: 34,
    name: "Pedha",
    price: "₹699",
    takeawayPrice: "₹629",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram"
  },
  {
    id: 35,
    name: "Dry Fruits Laddu",
    price: "₹349",
    takeawayPrice: "₹314",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams",
    popular: true
  },
  {
    id: 36,
    name: "Dry Fruits Laddu",
    price: "₹749",
    takeawayPrice: "₹674",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams"
  },
  {
    id: 37,
    name: "Dry Fruits Laddu",
    price: "₹1549",
    takeawayPrice: "₹1394",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram"
  },
  {
    id: 38,
    name: "Gondh ke Laddu",
    price: "₹289",
    takeawayPrice: "₹260",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams"
  },
  {
    id: 39,
    name: "Gondh ke Laddu",
    price: "₹599",
    takeawayPrice: "₹539",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams"
  },
  {
    id: 40,
    name: "Gondh ke Laddu",
    price: "₹1199",
    takeawayPrice: "₹1079",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram"
  },
  {
    id: 41,
    name: "Alsi ke Laddu",
    price: "₹279",
    takeawayPrice: "₹251",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "250 grams"
  },
  {
    id: 42,
    name: "Alsi ke Laddu",
    price: "₹599",
    takeawayPrice: "₹539",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "500 grams"
  },
  {
    id: 43,
    name: "Alsi ke Laddu",
    price: "₹1199",
    takeawayPrice: "₹1079",
    category: "Saawariya's Dessert",
    veg: true,
    quantity: "1 Kilogram"
  }
];
