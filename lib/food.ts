import { CityFoodGuide } from "./types";
import { getDestination } from "./destinations";

const STATIC_FOOD_GUIDES: Record<string, CityFoodGuide> = {
  "delhi": {
    city: "Delhi",
    mustEat: [
      { dish: "Chole Bhature", description: "Fluffy fried bread served with spicy chickpea curry, pickles, and onions.", approxPrice: 80, recommendedPlace: "Sita Ram Diwan Chand, Paharganj" },
      { dish: "Butter Chicken with Butter Naan", description: "Creamy, tomato-based rich chicken gravy cooked in charcoal tandoor.", approxPrice: 280, recommendedPlace: "Moti Mahal, Daryaganj" },
      { dish: "Aloo Chaat & Dahi Bhalla", description: "Crispy fried potatoes and soft lentil dumplings in sweet-sour yogurt and chutneys.", approxPrice: 60, recommendedPlace: "Natraj Dahi Bhalla, Chandni Chowk" }
    ],
    budgetEateries: [
      { name: "Andhra Bhavan Canteen", area: "Connaught Place", specialty: "Unlimited Andhra Veg Thali", approxCostTwo: 350 },
      { name: "Kake Di Hatti", area: "Chandni Chowk", specialty: "Huge stuffed Naans and Dal Makhani", approxCostTwo: 300 },
      { name: "Jain Chawal Wale", area: "Connaught Place", specialty: "Rajma Chawal and Kadhi Chawal", approxCostTwo: 180 }
    ],
    thaliCostEstimate: 150
  },
  "mumbai": {
    city: "Mumbai",
    mustEat: [
      { dish: "Vada Pav", description: "Spicy potato dumpling fried in chickpea batter, served inside a bun with garlic chutney.", approxPrice: 20, recommendedPlace: "Ashok Vada Pav, Dadar" },
      { dish: "Pav Bhaji", description: "Spicy mashed mixed vegetable gravy cooked with butter, served with soft toasted buns.", approxPrice: 120, recommendedPlace: "Sardar Refreshments, Tardeo" },
      { dish: "Misal Pav", description: "Spicy moth bean curry topped with farsan, chopped onions, and lemon, served with pav.", approxPrice: 80, recommendedPlace: "Aaswad, Dadar" }
    ],
    budgetEateries: [
      { name: "Cafe Monsoon", area: "Colaba", specialty: "Keema Pav and Bun Maska", approxCostTwo: 250 },
      { name: "Ram Ashraya", area: "Matunga", specialty: "Filter Coffee, Mysore Masala Dosa, and Idli", approxCostTwo: 200 },
      { name: "Pancham Puriwala", area: "Fort", specialty: "Masala Puri Thali", approxCostTwo: 180 }
    ],
    thaliCostEstimate: 140
  },
  "bangalore": {
    city: "Bangalore",
    mustEat: [
      { dish: "Masala Dosa", description: "Crispy rice crepe smeared with red chutney, stuffed with potato mash, served with ghee.", approxPrice: 80, recommendedPlace: "MTR (Mavalli Tiffin Room) or CTR (Shri Sagar)" },
      { dish: "Idli Vada with Filter Coffee", description: "Steamed fluffy rice cakes and crispy lentil donuts served with coconut chutney and sambar.", approxPrice: 60, recommendedPlace: "Veena Stores, Malleshwaram" },
      { dish: "Bisi Bele Bath", description: "Spicy, tangy hot lentil rice dish loaded with vegetables and topped with boondi.", approxPrice: 75, recommendedPlace: "Maiyas, Jayanagar" }
    ],
    budgetEateries: [
      { name: "Taaza Thindi", area: "Jayanagar", specialty: "Masala Dosa and Chow Chow Bath", approxCostTwo: 120 },
      { name: "Asha Food Camp", area: "Malleshwaram", specialty: "South Indian Executive Veg Thali", approxCostTwo: 250 },
      { name: "Corner House Ice Creams", area: "Indiranagar", specialty: "Death by Chocolate Dessert", approxCostTwo: 300 }
    ],
    thaliCostEstimate: 130
  },
  "sankri": {
    city: "Sankri",
    mustEat: [
      { dish: "Garhwali Mandua Roti & Gehat Dal", description: "Local finger millet flatbread served with highly nutritious horse gram lentil soup.", approxPrice: 90, recommendedPlace: "Sankri Homestay Kitchen" },
      { dish: "Mountain Maggi with Veggies", description: "Instant noodles prepared with extra mountain spices, onions, tomatoes, and green chillies.", approxPrice: 50, recommendedPlace: "Trailside Dhabas" },
      { dish: "Red Rice with Rajma", description: "Nutritious locally harvested red rice served with thick, spiced kidney bean gravy.", approxPrice: 100, recommendedPlace: "Negi Dhaba" }
    ],
    budgetEateries: [
      { name: "Negi Ji Hill Dhaba", area: "Sankri Bus Stand", specialty: "Unlimited Veg Thali (Dal, Sabzi, Rice, Roti)", approxCostTwo: 240 },
      { name: "Swargarohini Food Corner", area: "Main Market", specialty: "Aloo Paratha and Ginger Tea", approxCostTwo: 150 }
    ],
    thaliCostEstimate: 120
  },
  "kasol": {
    city: "Kasol",
    mustEat: [
      { dish: "Shakshuka", description: "Poached eggs in a spicy tomato-pepper sauce served with freshly baked pita bread.", approxPrice: 150, recommendedPlace: "Shiva Cafe, Chalal" },
      { dish: "Steamed/Fried Momos", description: "Local Himalayan dumplings filled with finely chopped vegetables or minced chicken.", approxPrice: 90, recommendedPlace: "Shambhu Momo Stall, Market" },
      { dish: "Schnitzel", description: "Thin sliced meat/paneer coated with flour and breadcrumbs, fried crisp, served with fries.", approxPrice: 180, recommendedPlace: "Evergreen Cafe" }
    ],
    budgetEateries: [
      { name: "Little Italy Cafe", area: "Kasol Market", specialty: "Woodfired Pizzas and Pastas", approxCostTwo: 450 },
      { name: "King Falafel", area: "Old Kasol", specialty: "Hummus, Falafel Wrap, and Salad", approxCostTwo: 300 },
      { name: "Jim Morrison Cafe", area: "Scenic Trail", specialty: "Veg Waffles and Shakes", approxCostTwo: 400 }
    ],
    thaliCostEstimate: 140
  },
  "goa": {
    city: "Goa",
    mustEat: [
      { dish: "Goan Fish Curry Rice", description: "Traditional fish curry made with coconut paste, spices, and dried mango or kokum.", approxPrice: 180, recommendedPlace: "Ritz Classic, Panaji" },
      { dish: "Chicken Xacuti", description: "Rich chicken curry prepared with a complex spice blend and roasted coconut milk.", approxPrice: 220, recommendedPlace: "Star Light, Arpora" },
      { dish: "Bebinca", description: "Traditional multi-layered Goan dessert made of coconut milk, ghee, egg yolk, and flour.", approxPrice: 100, recommendedPlace: "Viva Panjim, Fontainhas" }
    ],
    budgetEateries: [
      { name: "Viva Panjim", area: "Panaji (Fontainhas)", specialty: "Pork Vindaloo and Fish Thali", approxCostTwo: 500 },
      { name: "Curlies Beach Shack", area: "Anjuna Beach", specialty: "Continental Breakfast and Sea Food", approxCostTwo: 600 },
      { name: "Fat Fish", area: "Baga", specialty: "Special Goan Fish Thali", approxCostTwo: 450 }
    ],
    thaliCostEstimate: 180
  }
};

export function getFoodGuide(destination: string): CityFoodGuide {
  const norm = destination.toLowerCase().trim();

  // Try direct static match
  if (STATIC_FOOD_GUIDES[norm]) {
    return STATIC_FOOD_GUIDES[norm];
  }

  // Try partial static match
  for (const key of Object.keys(STATIC_FOOD_GUIDES)) {
    if (norm.includes(key) || key.includes(norm)) {
      return STATIC_FOOD_GUIDES[key];
    }
  }

  // Fallback generator based on destination type
  const destInfo = getDestination(destination);
  const type = destInfo?.type || [];
  const capitalizedDest = destination.charAt(0).toUpperCase() + destination.slice(1);

  if (type.includes("metro") || type.includes("heritage-city")) {
    return {
      city: capitalizedDest,
      mustEat: [
        { dish: "Special Veg/Non-Veg Thali", description: "A platter containing dal, dry vegetables, paneer or chicken, rice, roti, and sweets.", approxPrice: 150, recommendedPlace: "Local Railway Station/Bus Stand Canteen" },
        { dish: "Masala Dosa & Sambar", description: "Crispy South Indian rice crepe filled with potato masala, served with chutneys.", approxPrice: 80, recommendedPlace: "National Restaurant Row" },
        { dish: "Chaat & Street Snacks", description: "Tangy puffed rice, samosas, potato patties with sweet and spicy chutneys.", approxPrice: 50, recommendedPlace: "Local Bazaar Lane" }
      ],
      budgetEateries: [
        { name: "Railway Station Bhojanalaya", area: "Station Market", specialty: "Pure Veg Unlimited Thali", approxCostTwo: 250 },
        { name: "Annapurna Sweets & Cafe", area: "Main Circle", specialty: "Samosa, Jalebi, and Lassi", approxCostTwo: 120 }
      ],
      thaliCostEstimate: 120
    };
  } else if (type.includes("hill-station") || type.includes("trek-base") || type.includes("trek-destination") || type.includes("offbeat-village")) {
    return {
      city: capitalizedDest,
      mustEat: [
        { dish: "Mountain Maggi with Cheese", description: "Classic instant noodles cooked with local spices and topped with melted cheese.", approxPrice: 60, recommendedPlace: "Trailside Tea Stalls" },
        { dish: "Steamed Momos", description: "Hot flour wrappers filled with seasonal minced vegetables, served with spicy red chili sauce.", approxPrice: 80, recommendedPlace: "Market Momo Corner" },
        { dish: "Thukpa", description: "Hearty Tibetan noodle soup filled with mixed vegetables and aromatic herbs, perfect for cold weather.", approxPrice: 100, recommendedPlace: "Local Homestay Dining" },
        { dish: "Local Rajma Chawal Thali", description: "Home-cooked red kidney beans in thick spiced gravy, served with local rice and ghee.", approxPrice: 120, recommendedPlace: "Village Dhabas" }
      ],
      budgetEateries: [
        { name: "Himalayan Tea & Food Stall", area: "Bus/Trek Stand", specialty: "Aloo Parathas, Omelettes, and Ginger Tea", approxCostTwo: 150 },
        { name: "Backpackers Alpine Cafe", area: "Village Main Lane", specialty: "Pancake, French Toast, and Hot Chocolate", approxCostTwo: 300 }
      ],
      thaliCostEstimate: 110
    };
  } else if (type.includes("beach")) {
    return {
      city: capitalizedDest,
      mustEat: [
        { dish: "Fish Rava Fry / Seafood Basket", description: "Freshly caught fish coated in semolina and spices, pan-fried to crisp perfection.", approxPrice: 180, recommendedPlace: "Beach Shacks" },
        { dish: "Prawn Curry Rice", description: "Juicy prawns cooked in a rich, tangy coconut gravy served with steamed white rice.", approxPrice: 200, recommendedPlace: "Local Fish Tavern" },
        { dish: "Fresh Tender Coconut Water", description: "Sweet, cooling natural coconut water straight from local coastal groves.", approxPrice: 40, recommendedPlace: "Roadside Stalls" }
      ],
      budgetEateries: [
        { name: "Coastal Dhaba", area: "Beach Entrance Road", specialty: "Traditional Fish Thali", approxCostTwo: 350 },
        { name: "Sunset Juice & Salad Bar", area: "Beach Walkway", specialty: "Fruit Platters and Pancakes", approxCostTwo: 200 }
      ],
      thaliCostEstimate: 160
    };
  } else if (type.includes("northeast")) {
    return {
      city: capitalizedDest,
      mustEat: [
        { dish: "Northeastern Rice Thali", description: "Steamed rice served with boiled greens, dal, potato mash (pitika), and local bamboo shoot pickle.", approxPrice: 120, recommendedPlace: "Local Tribal Canteen" },
        { dish: "Smoked Pork / Paneer with Bamboo Shoot", description: "Stir-fried protein flavored with local green herbs and fermented bamboo shoots.", approxPrice: 160, recommendedPlace: "Traditional Kitchen" },
        { dish: "Jhalmuri & Local Tea", description: "Spiced puffed rice mix served with locally harvested organic black tea.", approxPrice: 40, recommendedPlace: "Bazaar Tea Shop" }
      ],
      budgetEateries: [
        { name: "Northeast Tribal Eatery", area: "Town Market", specialty: "Organic Boiled Veggies & Rice Thali", approxCostTwo: 240 },
        { name: "Momo Hub", area: "Taxi Stand", specialty: "Pork and Veg Steamed Dumplings", approxCostTwo: 160 }
      ],
      thaliCostEstimate: 120
    };
  } else {
    // Default general Indian
    return {
      city: capitalizedDest,
      mustEat: [
        { dish: "Traditional Veg Thali", description: "Platter of seasonal vegetables, lentils, rice, flatbreads, and yogurt.", approxPrice: 120, recommendedPlace: "Highway Dhabas" },
        { dish: "Aloo Paratha with Curd", description: "Whole wheat flatbread stuffed with spiced potato filling, pan-cooked with ghee.", approxPrice: 60, recommendedPlace: "Breakfast Counters" }
      ],
      budgetEateries: [
        { name: "Shree Ganesh Bhojanalaya", area: "Market Center", specialty: "Pure Veg Meal", approxCostTwo: 200 },
        { name: "Chai and Toast Point", area: "Main Road", specialty: "Bun Butter and Hot Chai", approxCostTwo: 100 }
      ],
      thaliCostEstimate: 100
    };
  }
}
