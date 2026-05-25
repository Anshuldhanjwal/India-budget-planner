import { Hotel, BudgetLevel } from "./types";

const STATIC_HOTELS: Record<string, Record<BudgetLevel, Hotel[]>> = {
  "delhi": {
    "ultra-budget": [
      {
        name: "Zostel Delhi",
        budgetLevel: "ultra-budget",
        costPerNight: 550,
        rating: 4.4,
        location: "Pahar Ganj, near New Delhi Railway Station",
        bookingUrl: "https://www.booking.com/hotel/in/zostel-delhi.html",
        amenities: ["Free WiFi", "AC", "Locker Room", "Rooftop Cafe", "Shared Lounge"]
      },
      {
        name: "Moustache Backpackers Delhi",
        budgetLevel: "ultra-budget",
        costPerNight: 600,
        rating: 4.2,
        location: "New Friends Colony",
        bookingUrl: "https://www.booking.com/hotel/in/moustache-delhi.html",
        amenities: ["Free WiFi", "AC", "Bunk Beds", "Common Kitchen", "24/7 Desk"]
      },
      {
        name: "Smyle Inn",
        budgetLevel: "ultra-budget",
        costPerNight: 700,
        rating: 4.0,
        location: "Chunamandi, Pahar Ganj",
        bookingUrl: "https://www.booking.com/hotel/in/smyle-inn.html",
        amenities: ["Free WiFi", "AC", "Breakfast Included", "Tour Desk"]
      }
    ],
    "budget": [
      {
        name: "Hotel Cottage Yes Please",
        budgetLevel: "budget",
        costPerNight: 1400,
        rating: 4.1,
        location: "Pahar Ganj",
        bookingUrl: "https://www.booking.com/hotel/in/cottage-yes-please.html",
        amenities: ["Free WiFi", "AC Private Room", "Room Service", "En-suite Bathroom"]
      },
      {
        name: "Bloom Boutique | GK2",
        budgetLevel: "budget",
        costPerNight: 1800,
        rating: 4.3,
        location: "Greater Kailash 2",
        bookingUrl: "https://www.booking.com/hotel/in/bloom-boutique-gk2.html",
        amenities: ["High-speed WiFi", "AC", "Flat-screen TV", "Cafe", "Gym Access"]
      },
      {
        name: "Hotel Hari Piorko",
        budgetLevel: "budget",
        costPerNight: 1300,
        rating: 4.0,
        location: "Main Bazaar, Pahar Ganj",
        bookingUrl: "https://www.booking.com/hotel/in/hari-piorko.html",
        amenities: ["Free WiFi", "AC", "Restaurant", "Spa", "Elevator"]
      }
    ],
    "moderate": [
      {
        name: "Connaught Royale Delhi",
        budgetLevel: "moderate",
        costPerNight: 3500,
        rating: 4.5,
        location: "Connaught Place",
        bookingUrl: "https://www.booking.com/hotel/in/connaught-royale.html",
        amenities: ["Free High-speed WiFi", "Central AC", "Buffet Breakfast", "Fitness Center", "Mini Bar"]
      },
      {
        name: "Hotel Palace Heights",
        budgetLevel: "moderate",
        costPerNight: 3800,
        rating: 4.4,
        location: "C-Block, Connaught Place",
        bookingUrl: "https://www.booking.com/hotel/in/palace-heights.html",
        amenities: ["Free WiFi", "AC", "In-house Restaurant", "Laundry Service", "Airport Shuttle"]
      },
      {
        name: "Welcomheritage Mandawa House",
        budgetLevel: "moderate",
        costPerNight: 4200,
        rating: 4.6,
        location: "Lajpat Nagar",
        bookingUrl: "https://www.booking.com/hotel/in/mandawa-house-delhi.html",
        amenities: ["Free WiFi", "AC", "Heritage Decor", "Garden View", "Breakfast Buffet"]
      }
    ]
  },
  "mumbai": {
    "ultra-budget": [
      {
        name: "Zostel Mumbai",
        budgetLevel: "ultra-budget",
        costPerNight: 650,
        rating: 4.3,
        location: "Andheri East",
        bookingUrl: "https://www.booking.com/hotel/in/zostel-mumbai.html",
        amenities: ["Free WiFi", "AC", "Locker Room", "Common Lounge", "Cafe"]
      },
      {
        name: "Nap on Map Hostel",
        budgetLevel: "ultra-budget",
        costPerNight: 700,
        rating: 4.1,
        location: "Sion, Central Mumbai",
        bookingUrl: "https://www.booking.com/hotel/in/nap-on-map.html",
        amenities: ["Free WiFi", "AC", "Rooftop Terrace", "Bunk Beds", "Kitchen Access"]
      },
      {
        name: "Backpacker Panda Colaba",
        budgetLevel: "ultra-budget",
        costPerNight: 750,
        rating: 4.2,
        location: "Colaba, South Mumbai",
        bookingUrl: "https://www.booking.com/hotel/in/backpacker-panda-colaba.html",
        amenities: ["Free WiFi", "AC", "Locker", "Walkable to Gateway of India"]
      }
    ],
    "budget": [
      {
        name: "Hotel Suba Palace",
        budgetLevel: "budget",
        costPerNight: 1800,
        rating: 4.2,
        location: "Near Gateway of India, Colaba",
        bookingUrl: "https://www.booking.com/hotel/in/suba-palace.html",
        amenities: ["Free WiFi", "AC", "Restaurant", "Room Service", "Telematic Desk"]
      },
      {
        name: "Hotel Ibis Mumbai Airport",
        budgetLevel: "budget",
        costPerNight: 1950,
        rating: 4.1,
        location: "Vile Parle East",
        bookingUrl: "https://www.booking.com/hotel/in/ibis-mumbai-airport.html",
        amenities: ["Free WiFi", "AC", "24/7 Restaurant", "Airport Shuttle", "Bar"]
      },
      {
        name: "Hotel Sea Lord",
        budgetLevel: "budget",
        costPerNight: 1500,
        rating: 3.9,
        location: "Near CST Station",
        bookingUrl: "https://www.booking.com/hotel/in/sea-lord-mumbai.html",
        amenities: ["Free WiFi", "AC", "Room Service", "En-suite Bathroom"]
      }
    ],
    "moderate": [
      {
        name: "The Gordon House Hotel",
        budgetLevel: "moderate",
        costPerNight: 4500,
        rating: 4.6,
        location: "Colaba",
        bookingUrl: "https://www.booking.com/hotel/in/gordon-house.html",
        amenities: ["Boutique Theme Rooms", "Free High-speed WiFi", "Central AC", "Bar & Grill", "Gym"]
      },
      {
        name: "Hotel Residency Fort",
        budgetLevel: "moderate",
        costPerNight: 4000,
        rating: 4.4,
        location: "Fort, South Mumbai",
        bookingUrl: "https://www.booking.com/hotel/in/residency-fort.html",
        amenities: ["Free WiFi", "AC", "In-room Safe", "Multi-cuisine Restaurant", "Airport Transfer"]
      },
      {
        name: "Fariyas Hotel Mumbai Colaba",
        budgetLevel: "moderate",
        costPerNight: 4800,
        rating: 4.5,
        location: "Colaba",
        bookingUrl: "https://www.booking.com/hotel/in/fariyas.html",
        amenities: ["Swimming Pool", "Free WiFi", "AC", "Bar", "Spa", "Fitness Center"]
      }
    ]
  },
  "sankri": {
    "ultra-budget": [
      {
        name: "Sankri Trekker Homestay",
        budgetLevel: "ultra-budget",
        costPerNight: 400,
        rating: 4.5,
        location: "Near Kedarkantha Trailhead",
        bookingUrl: "https://www.booking.com/hotel/in/sankri-trekker-homestay.html",
        amenities: ["Shared Bathroom", "Hot Water Bucket", "Home-cooked Meals", "Mountain View"]
      },
      {
        name: "Wildcraft Homestay Sankri",
        budgetLevel: "ultra-budget",
        costPerNight: 450,
        rating: 4.3,
        location: "Main Village",
        bookingUrl: "https://www.booking.com/hotel/in/wildcraft-homestay.html",
        amenities: ["Shared Kitchen", "Campfire Yard", "Trek Guides Info"]
      }
    ],
    "budget": [
      {
        name: "Hotel Swargarohini Palace",
        budgetLevel: "budget",
        costPerNight: 1200,
        rating: 4.2,
        location: "Sankri Bus Stand",
        bookingUrl: "https://www.booking.com/hotel/in/swargarohini-palace.html",
        amenities: ["Private Bathroom", "Geyser", "In-house Kitchen", "Balcony"]
      },
      {
        name: "Sankri Alpine Homestay",
        budgetLevel: "budget",
        costPerNight: 1000,
        rating: 4.4,
        location: "Upper Sankri",
        bookingUrl: "https://www.booking.com/hotel/in/sankri-alpine-homestay.html",
        amenities: ["Private Room", "Wooden Decor", "Local Garhwali Food", "Running Hot Water"]
      }
    ],
    "moderate": [
      {
        name: "GMVN Tourist Bungalow Sankri",
        budgetLevel: "moderate",
        costPerNight: 2200,
        rating: 4.1,
        location: "Scenic Hilltop, Sankri",
        bookingUrl: "https://www.booking.com/hotel/in/gmvn-sankri.html",
        amenities: ["Spacious Rooms", "Attached Bath", "Restaurant", "Garden Area", "Parking"]
      },
      {
        name: "Meraki Triangle Homestay",
        budgetLevel: "moderate",
        costPerNight: 2500,
        rating: 4.7,
        location: "Mori-Sankri Road",
        bookingUrl: "https://www.booking.com/hotel/in/meraki-triangle.html",
        amenities: ["Boutique Wood Cottage", "WiFi", "Library", "Art Space", "Organic Meals"]
      }
    ]
  },
  "manali": {
    "ultra-budget": [
      {
        name: "Zostel Manali",
        budgetLevel: "ultra-budget",
        costPerNight: 500,
        rating: 4.5,
        location: "Old Manali",
        bookingUrl: "https://www.booking.com/hotel/in/zostel-manali.html",
        amenities: ["Free WiFi", "Garden Yard", "Common Room", "Backpacker Vibe", "Bunk Beds"]
      },
      {
        name: "Alt Life Manali",
        budgetLevel: "ultra-budget",
        costPerNight: 450,
        rating: 4.4,
        location: "Club House Road, Old Manali",
        bookingUrl: "https://www.booking.com/hotel/in/alt-life-manali.html",
        amenities: ["River View", "Free WiFi", "Co-working Space", "Cafe"]
      }
    ],
    "budget": [
      {
        name: "Hotel Palace Manali",
        budgetLevel: "budget",
        costPerNight: 1200,
        rating: 4.0,
        location: "Near Mall Road",
        bookingUrl: "https://www.booking.com/hotel/in/hotel-palace-manali.html",
        amenities: ["Private Bathroom", "Cable TV", "Room Service", "Mountain View Balcony"]
      },
      {
        name: "Drifter's Inn Old Manali",
        budgetLevel: "budget",
        costPerNight: 1500,
        rating: 4.3,
        location: "Manu Temple Road, Old Manali",
        bookingUrl: "https://www.booking.com/hotel/in/drifters-inn.html",
        amenities: ["Popular Cafe", "Free WiFi", "Boutique Styling", "Balcony"]
      }
    ],
    "moderate": [
      {
        name: "Johnson Lodge & Spa",
        budgetLevel: "moderate",
        costPerNight: 3200,
        rating: 4.5,
        location: "Circuit House Road",
        bookingUrl: "https://www.booking.com/hotel/in/johnson-lodge.html",
        amenities: ["Bar & Restaurant", "Spa Services", "Lush Lawn", "Room Heater", "WiFi"]
      },
      {
        name: "The Orchard Greens",
        budgetLevel: "moderate",
        costPerNight: 2800,
        rating: 4.2,
        location: "Log Huts Area",
        bookingUrl: "https://www.booking.com/hotel/in/orchard-greens.html",
        amenities: ["Apple Orchard Setting", "Rooftop Restaurant", "WiFi", "Gym", "Power Backup"]
      }
    ]
  },
  "lohajung": {
    "ultra-budget": [
      {
        name: "Lohajung Trekker's Lodge",
        budgetLevel: "ultra-budget",
        costPerNight: 350,
        rating: 4.2,
        location: "Roopkund Trailhead",
        bookingUrl: "https://www.booking.com/hotel/in/lohajung-trekkers-lodge.html",
        amenities: ["Shared Bathroom", "Geyser", "Dorm Beds", "Trek Maps Available"]
      },
      {
        name: "Patwal Homestay",
        budgetLevel: "ultra-budget",
        costPerNight: 400,
        rating: 4.4,
        location: "Near Bus Stand, Lohajung",
        bookingUrl: "https://www.booking.com/hotel/in/patwal-homestay.html",
        amenities: ["Shared Toilet", "Garhwali Meals", "Hot Water Bucket"]
      }
    ],
    "budget": [
      {
        name: "Hotel Trishul Lohajung",
        budgetLevel: "budget",
        costPerNight: 1100,
        rating: 4.0,
        location: "Roopkund Road, Lohajung",
        bookingUrl: "https://www.booking.com/hotel/in/hotel-trishul.html",
        amenities: ["Private Bathroom", "Running Hot Water", "In-house Restaurant"]
      },
      {
        name: "Nanda Devi Homestay",
        budgetLevel: "budget",
        costPerNight: 900,
        rating: 4.3,
        location: "Upper Village",
        bookingUrl: "https://www.booking.com/hotel/in/nanda-devi-homestay.html",
        amenities: ["Private Room", "Balcony with Mountain Views", "Hot Water", "Local Guides"]
      }
    ],
    "moderate": [
      {
        name: "Lohajung Alpine Resort",
        budgetLevel: "moderate",
        costPerNight: 2200,
        rating: 4.2,
        location: "Quiet Forest Edge, Lohajung",
        bookingUrl: "https://www.booking.com/hotel/in/lohajung-alpine.html",
        amenities: ["Premium Wooden Rooms", "Private Balcony", "Customized Trek Planning", "Attached Bath"]
      }
    ]
  },
  "govindghat": {
    "ultra-budget": [
      {
        name: "Govindghat Gurudwara Sarai",
        budgetLevel: "ultra-budget",
        costPerNight: 200,
        rating: 4.6,
        location: "Main Gurudwara Complex",
        bookingUrl: "https://www.booking.com/hotel/in/govindghat-sarai.html",
        amenities: ["Dorm Beds", "Shared Washroom", "Langar Meals Included", "Secure Luggage Storage"]
      },
      {
        name: "Laxmi Lodge Govindghat",
        budgetLevel: "ultra-budget",
        costPerNight: 400,
        rating: 3.9,
        location: "Near Alaknanda River Bridge",
        bookingUrl: "https://www.booking.com/hotel/in/laxmi-lodge.html",
        amenities: ["Basic Room", "Hot Water Bucket", "River View"]
      }
    ],
    "budget": [
      {
        name: "Hotel Bhagat Govindghat",
        budgetLevel: "budget",
        costPerNight: 1200,
        rating: 4.1,
        location: "Badrinath Road",
        bookingUrl: "https://www.booking.com/hotel/in/hotel-bhagat.html",
        amenities: ["Private Bathroom", "Geyser", "Restaurant", "Filtered Drinking Water"]
      },
      {
        name: "Hotel Kuber Govindghat",
        budgetLevel: "budget",
        costPerNight: 1400,
        rating: 4.2,
        location: "Near Helipad Road",
        bookingUrl: "https://www.booking.com/hotel/in/hotel-kuber.html",
        amenities: ["Attached Bath", "TV", "In-house Dining", "Luggage Storage"]
      }
    ],
    "moderate": [
      {
        name: "Hotel Grand Chola Govindghat",
        budgetLevel: "moderate",
        costPerNight: 2400,
        rating: 4.3,
        location: "Helipad Road",
        bookingUrl: "https://www.booking.com/hotel/in/grand-chola.html",
        amenities: ["Spacious Rooms", "Modern Toiletries", "Multi-cuisine Cafe", "Helipad Transfer"]
      }
    ]
  },
  "yuksom": {
    "ultra-budget": [
      {
        name: "Yuksom Trekker Homestay",
        budgetLevel: "ultra-budget",
        costPerNight: 450,
        rating: 4.4,
        location: "Yuksom Village Centre",
        bookingUrl: "https://www.booking.com/hotel/in/yuksom-trekker-homestay.html",
        amenities: ["Shared Bath", "Home-cooked Sikkimese Food", "Local Host Trek Tips"]
      },
      {
        name: "Gupta Homestay",
        budgetLevel: "ultra-budget",
        costPerNight: 500,
        rating: 4.3,
        location: "Near Dubdi Monastery Trail",
        bookingUrl: "https://www.booking.com/hotel/in/gupta-homestay.html",
        amenities: ["Shared Bathroom", "Organic Garden View", "Hot Water Bucket"]
      }
    ],
    "budget": [
      {
        name: "Hotel Red Palace Yuksom",
        budgetLevel: "budget",
        costPerNight: 1300,
        rating: 4.1,
        location: "Main Market Road",
        bookingUrl: "https://www.booking.com/hotel/in/red-palace-yuksom.html",
        amenities: ["Private Bathroom", "Geyser", "Restaurant", "Helpful Staff"]
      },
      {
        name: "Yuksom Cabins",
        budgetLevel: "budget",
        costPerNight: 1500,
        rating: 4.5,
        location: "Near Coronation Throne",
        bookingUrl: "https://www.booking.com/hotel/in/yuksom-cabins.html",
        amenities: ["Wooden Cottages", "Attached Bathroom", "Campfire Site", "Kitchenette"]
      }
    ],
    "moderate": [
      {
        name: "Tashigang Resort",
        budgetLevel: "moderate",
        costPerNight: 3000,
        rating: 4.4,
        location: "Scenic Outskirts, Yuksom",
        bookingUrl: "https://www.booking.com/hotel/in/tashigang-resort.html",
        amenities: ["Premium Rooms", "Lush Gardens", "Mountain View Restaurant", "Geysers", "WiFi"]
      }
    ]
  },
  "kasol": {
    "ultra-budget": [
      {
        name: "Zostel Kasol",
        budgetLevel: "ultra-budget",
        costPerNight: 450,
        rating: 4.4,
        location: "Near Parvati River, Chalal Trail",
        bookingUrl: "https://www.booking.com/hotel/in/zostel-kasol.html",
        amenities: ["Free WiFi", "Rooftop Cafe", "Shared Lounge", "River Access", "Locker"]
      },
      {
        name: "The Hosteller Kasol",
        budgetLevel: "ultra-budget",
        costPerNight: 400,
        rating: 4.3,
        location: "Kasol Market Area",
        bookingUrl: "https://www.booking.com/hotel/in/hosteller-kasol.html",
        amenities: ["Free WiFi", "Bunk Beds", "Bonfire Yard", "Cafe"]
      }
    ],
    "budget": [
      {
        name: "Alpine Guest House",
        budgetLevel: "budget",
        costPerNight: 1200,
        rating: 4.1,
        location: "Riverbanks, Kasol",
        bookingUrl: "https://www.booking.com/hotel/in/alpine-guesthouse.html",
        amenities: ["Private Bathroom", "Balcony Overlooking River", "In-house Dining", "Hot Water"]
      },
      {
        name: "Sandeep Homestay",
        budgetLevel: "budget",
        costPerNight: 1000,
        rating: 4.2,
        location: "Chalal Village (15 mins walk)",
        bookingUrl: "https://www.booking.com/hotel/in/sandeep-homestay.html",
        amenities: ["Attached Bath", "Cozy Wooden Interiors", "Forest Views", "Running Hot Water"]
      }
    ],
    "moderate": [
      {
        name: "The Rainbow Inn & Cafe",
        budgetLevel: "moderate",
        costPerNight: 2800,
        rating: 4.5,
        location: "Old Kasol",
        bookingUrl: "https://www.booking.com/hotel/in/rainbow-inn.html",
        amenities: ["Boutique Rooms", "Excellent Cafe", "Live Music Yard", "Heater on Request", "WiFi"]
      },
      {
        name: "Himalayan Village Resort",
        budgetLevel: "moderate",
        costPerNight: 4500,
        rating: 4.7,
        location: "Kailash Nagar, near Kasol",
        bookingUrl: "https://www.booking.com/hotel/in/himalayan-village.html",
        amenities: ["Traditional Machan Cottages", "Premium Spa", "Multi-cuisine Restaurant", "Wood Heating", "WiFi"]
      }
    ]
  }
};

export function getHotelsForDestination(destination: string, budgetLevel: BudgetLevel): Hotel[] {
  const norm = destination.toLowerCase().trim();

  // Try static match
  if (STATIC_HOTELS[norm] && STATIC_HOTELS[norm][budgetLevel]) {
    return STATIC_HOTELS[norm][budgetLevel];
  }

  // Look for partial static match
  for (const key of Object.keys(STATIC_HOTELS)) {
    if (norm.includes(key) || key.includes(norm)) {
      if (STATIC_HOTELS[key][budgetLevel]) {
        return STATIC_HOTELS[key][budgetLevel];
      }
    }
  }

  // Fallback realistic generator if destination not found in static list
  // Generates 3 unique realistic hotels based on destination name and budget level
  const capitalizedDest = destination.charAt(0).toUpperCase() + destination.slice(1);

  if (budgetLevel === "ultra-budget") {
    return [
      {
        name: `${capitalizedDest} Backpackers Hostel`,
        budgetLevel: "ultra-budget",
        costPerNight: 450,
        rating: 4.2,
        location: `Central ${capitalizedDest}, near main transit point`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=ultra`,
        amenities: ["Shared Bathroom", "Free WiFi", "Common Lounge", "Bunk Beds", "Lockers"]
      },
      {
        name: `${capitalizedDest} Valley Homestay`,
        budgetLevel: "ultra-budget",
        costPerNight: 500,
        rating: 4.3,
        location: `Old village area, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=ultra`,
        amenities: ["Shared Bathroom", "Home Meals Available", "Hot Water Bucket", "Local Guides Info"]
      },
      {
        name: `Zostel / Trekker Hut ${capitalizedDest}`,
        budgetLevel: "ultra-budget",
        costPerNight: 400,
        rating: 4.4,
        location: `Near trailhead/scenic viewpoint, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=ultra`,
        amenities: ["Dormitory Beds", "Campfire Pit", "WiFi", "Shared Kitchen"]
      }
    ];
  } else if (budgetLevel === "budget") {
    return [
      {
        name: `Hotel ${capitalizedDest} Palace`,
        budgetLevel: "budget",
        costPerNight: 1200,
        rating: 4.1,
        location: `Main Market Road, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=mid`,
        amenities: ["Private Bathroom", "Hot Shower/Geyser", "Room Service", "Television", "Balcony"]
      },
      {
        name: `${capitalizedDest} Heritage Guest House`,
        budgetLevel: "budget",
        costPerNight: 1400,
        rating: 4.2,
        location: `Scenic lane, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=mid`,
        amenities: ["Attached Bathroom", "Free WiFi", "In-house Dining", "Power Backup"]
      },
      {
        name: `${capitalizedDest} Hillside Homestay`,
        budgetLevel: "budget",
        costPerNight: 1000,
        rating: 4.5,
        location: `Peaceful outskirts, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=mid`,
        amenities: ["Private Room", "Attached Bath", "Local Organic Food", "Mountain/Valley View"]
      }
    ];
  } else {
    // moderate budget level
    return [
      {
        name: `The ${capitalizedDest} Alpine Resort`,
        budgetLevel: "moderate",
        costPerNight: 2800,
        rating: 4.5,
        location: `Prime ridge road/viewpoint, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=high`,
        amenities: ["Spacious Premium Rooms", "En-suite Bathroom", "Multi-cuisine Restaurant", "Heaters", "Free WiFi"]
      },
      {
        name: `${capitalizedDest} Pine Cottages`,
        budgetLevel: "moderate",
        costPerNight: 3200,
        rating: 4.6,
        location: `Orchard / Forest Area, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=high`,
        amenities: ["Private Cozy Cottages", "Fireplace / Room Heater", "Rooftop Cafe", "Gardens", "Travel Desk"]
      },
      {
        name: `Hotel Grand ${capitalizedDest}`,
        budgetLevel: "moderate",
        costPerNight: 2600,
        rating: 4.3,
        location: `Mall Road / Central Plaza, ${capitalizedDest}`,
        bookingUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(destination)}&budget=high`,
        amenities: ["Modern Furnished Rooms", "Attached Bath with Geyser", "Gym & Spa Access", "Buffet Breakfast", "Parking"]
      }
    ];
  }
}
