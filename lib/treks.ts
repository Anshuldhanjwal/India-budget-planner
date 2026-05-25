import { TrekInfo } from "./types";

export const TREKS: TrekInfo[] = [
  {
    name: "Kedarkantha",
    destination: "Kedarkantha",
    baseCamp: "Sankri",
    nearestRailhead: "Dehradun (DDN)",
    nearestAirport: "Jolly Grant Airport (DED)",
    difficulty: "moderate",
    bestMonths: ["December", "January", "February", "March", "April", "May", "October", "November"],
    avoidMonths: ["June", "July", "August", "September"],
    durationDays: 4,
    maxAltitude: 3810,
    distanceKm: 20,
    permits: [
      {
        name: "Govind Pashu Vihar National Park Entry Permit",
        cost: 200,
        where: "Forest Checkpost at Sankri",
        required: true,
        advanceDays: 0,
        onlineUrl: "https://uttarakhandforest.org/"
      }
    ],
    essentialGear: [
      "Microspikes (for winter snow)",
      "Gaiters (for winter snow)",
      "Trekking Pole",
      "High Ankle Trekking Shoes",
      "3 Winter Layers (Thermals, Fleece, Down Jacket)",
      "Headlamp"
    ],
    guideRequired: true,
    guideApproxCostPerDay: 1200,
    porterApproxCostPerDay: 1000,
    campsites: [
      { name: "Sankri Guest House", altitude: 1950, type: "guesthouse", costPerNight: 800 },
      { name: "Juda Ka Talab Campsite", altitude: 2700, type: "tent", costPerNight: 500 },
      { name: "Kedarkantha Base Camp", altitude: 3400, type: "tent", costPerNight: 500 },
      { name: "Hargaon Campsite", altitude: 2725, type: "tent", costPerNight: 500 }
    ],
    agencies: [
      {
        name: "Indiahikes",
        baseCity: "Dehradun",
        packageCostPerPerson: 7500,
        includes: ["All meals", "Tents & Sleeping Bags", "Trek Leader & Guide", "Permits & Forest Fee", "Safety Equipment"],
        website: "https://indiahikes.com"
      },
      {
        name: "Trek The Himalayas",
        baseCity: "Dehradun",
        packageCostPerPerson: 7000,
        includes: ["Stays", "Meals", "Experienced Guides", "Equipment Rental", "Insurance Assistance"],
        website: "https://trekthehimalayas.com"
      }
    ],
    acclimatizationDays: 0,
    emergencyContacts: [
      { name: "Sankri Forest Department Office", phone: "+91-1375-284224" },
      { name: "Mori Government Hospital / Rescue Coordinator", phone: "+91-1375-284226" },
      { name: "SDRF Uttarakhand (National Helpline)", phone: "108" }
    ],
    dailyBreakdown: [
      {
        day: 1,
        title: "Sankri to Juda Ka Talab Trek",
        distanceKm: 4,
        elevationStart: 1950,
        elevationEnd: 2700,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Juda Ka Talab Campsite",
        waterSource: true,
        emergencyExit: "Descend to Sankri"
      },
      {
        day: 2,
        title: "Juda Ka Talab to Kedarkantha Base Camp",
        distanceKm: 4,
        elevationStart: 2700,
        elevationEnd: 3400,
        durationHours: 3,
        difficulty: "easy",
        campsite: "Kedarkantha Base Camp",
        waterSource: true,
        emergencyExit: "Descend via Juda Ka Talab to Sankri"
      },
      {
        day: 3,
        title: "Summit Climb & descend to Hargaon",
        distanceKm: 8,
        elevationStart: 3400,
        elevationEnd: 2725,
        durationHours: 7,
        difficulty: "moderate",
        campsite: "Hargaon Campsite",
        waterSource: true,
        emergencyExit: "Descend from base camp to Hargaon or Sankri directly"
      },
      {
        day: 4,
        title: "Hargaon to Sankri Descent",
        distanceKm: 4,
        elevationStart: 2725,
        elevationEnd: 1950,
        durationHours: 3,
        difficulty: "easy",
        campsite: "Sankri Guest House",
        waterSource: true,
        emergencyExit: "Direct trail to Sankri"
      }
    ]
  },
  {
    name: "Valley of Flowers",
    destination: "Valley of Flowers",
    baseCamp: "Govindghat",
    nearestRailhead: "Rishikesh (RKSH)",
    nearestAirport: "Jolly Grant Airport (DED)",
    difficulty: "moderate",
    bestMonths: ["July", "August", "September"],
    avoidMonths: ["January", "February", "March", "April", "May", "June", "October", "November", "December"],
    durationDays: 4,
    maxAltitude: 3658,
    distanceKm: 38,
    permits: [
      {
        name: "Valley of Flowers National Park Entry Permit",
        cost: 150,
        where: "Forest Department Counter, Ghangaria",
        required: true,
        advanceDays: 0,
        onlineUrl: "https://uttarakhandforest.org/"
      }
    ],
    essentialGear: [
      "Raincoat / Poncho (Monsoon is mandatory)",
      "Waterproof Trekking Shoes",
      "Backpack Rain Cover",
      "Trekking Pole",
      "Extra Pairs of Quick Dry Socks"
    ],
    guideRequired: false,
    guideApproxCostPerDay: 1500,
    porterApproxCostPerDay: 1200,
    campsites: [
      { name: "Govindghat Hotel", altitude: 1828, type: "guesthouse", costPerNight: 1200 },
      { name: "Ghangaria Guest House", altitude: 3048, type: "guesthouse", costPerNight: 1000 }
    ],
    agencies: [
      {
        name: "Indiahikes",
        baseCity: "Haridwar",
        packageCostPerPerson: 9500,
        includes: ["Stays at Ghangaria Guest House", "All meals during trek", "Certified Trek Guide", "Forest permits"],
        website: "https://indiahikes.com"
      }
    ],
    acclimatizationDays: 0,
    emergencyContacts: [
      { name: "Joshimath Police Station", phone: "+91-1389-222084" },
      { name: "SDRF Govindghat Post", phone: "108" }
    ],
    dailyBreakdown: [
      {
        day: 1,
        title: "Trek from Poolna (Govindghat) to Ghangaria",
        distanceKm: 14,
        elevationStart: 1828,
        elevationEnd: 3048,
        durationHours: 6,
        difficulty: "moderate",
        campsite: "Ghangaria Guest House",
        waterSource: true,
        emergencyExit: "Pony ride or Helicopter descent back to Govindghat"
      },
      {
        day: 2,
        title: "Trek from Ghangaria to Valley of Flowers and back",
        distanceKm: 10,
        elevationStart: 3048,
        elevationEnd: 3658,
        durationHours: 6,
        difficulty: "easy",
        campsite: "Ghangaria Guest House",
        waterSource: true,
        emergencyExit: "Return to Ghangaria base camp"
      },
      {
        day: 3,
        title: "Ascend from Ghangaria to Hemkund Sahib and back",
        distanceKm: 12,
        elevationStart: 3048,
        elevationEnd: 4632,
        durationHours: 7,
        difficulty: "hard",
        campsite: "Ghangaria Guest House",
        waterSource: true,
        emergencyExit: "Mule ride or stretcher down to Ghangaria"
      },
      {
        day: 4,
        title: "Trek from Ghangaria to Govindghat",
        distanceKm: 12,
        elevationStart: 3048,
        elevationEnd: 1828,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Govindghat Hotel",
        waterSource: true,
        emergencyExit: "Descent to Govindghat highway"
      }
    ]
  },
  {
    name: "Goechala",
    destination: "Goechala",
    baseCamp: "Yuksom",
    nearestRailhead: "New Jalpaiguri (NJP)",
    nearestAirport: "Bagdogra Airport (IXB)",
    difficulty: "hard",
    bestMonths: ["April", "May", "October", "November"],
    avoidMonths: ["January", "February", "June", "July", "August", "September", "December"],
    durationDays: 8,
    maxAltitude: 4940,
    distanceKm: 90,
    permits: [
      {
        name: "Kanchenjunga National Park Permit & RAP",
        cost: 300,
        where: "Forest Department Office at Yuksom",
        required: true,
        advanceDays: 1,
        onlineUrl: "https://www.sikkimtourism.gov.in/"
      }
    ],
    essentialGear: [
      "Warm Fleece & Heavy Down Jacket (-10°C)",
      "High Ankle Waterproof Trekking Boots",
      "Thermals (2 pairs)",
      "Trekking Poles",
      "Sunglasses with UV Protection",
      "Oximeter"
    ],
    guideRequired: true,
    guideApproxCostPerDay: 1500,
    porterApproxCostPerDay: 1000,
    campsites: [
      { name: "Yuksom Homestay", altitude: 1780, type: "guesthouse", costPerNight: 1000 },
      { name: "Sachen Campsite", altitude: 2200, type: "tent", costPerNight: 600 },
      { name: "Tsokha Trekker Hut", altitude: 2900, type: "guesthouse", costPerNight: 800 },
      { name: "Dzongri Trekker Hut", altitude: 3950, type: "guesthouse", costPerNight: 800 },
      { name: "Thansing Campsite", altitude: 3800, type: "tent", costPerNight: 600 },
      { name: "Lamuney Campsite", altitude: 4150, type: "tent", costPerNight: 600 },
      { name: "Kokchurang Trekker Hut", altitude: 3700, type: "guesthouse", costPerNight: 800 }
    ],
    agencies: [
      {
        name: "Sikkim Mountaineering Association",
        baseCity: "Gangtok",
        packageCostPerPerson: 14500,
        includes: ["All Stays (Huts/Tents)", "All Meals", "RAP Permit fees", "Yak/Porter support", "Local Sikkim Guides"],
        website: "https://www.sikkimtrekking.org"
      }
    ],
    acclimatizationDays: 1,
    emergencyContacts: [
      { name: "Yuksom Police Outpost", phone: "+91-3595-250645" },
      { name: "Gyalshing District Hospital Rescue", phone: "+91-3595-250650" }
    ],
    dailyBreakdown: [
      {
        day: 1,
        title: "Trek from Yuksom to Sachen",
        distanceKm: 8,
        elevationStart: 1780,
        elevationEnd: 2200,
        durationHours: 5,
        difficulty: "easy",
        campsite: "Sachen Campsite",
        waterSource: true,
        emergencyExit: "Return to Yuksom"
      },
      {
        day: 2,
        title: "Trek from Sachen to Tsokha",
        distanceKm: 7,
        elevationStart: 2200,
        elevationEnd: 2900,
        durationHours: 4,
        difficulty: "moderate",
        campsite: "Tsokha Trekker Hut",
        waterSource: true,
        emergencyExit: "Descend to Sachen"
      },
      {
        day: 3,
        title: "Trek from Tsokha to Dzongri via Deorali Top",
        distanceKm: 9,
        elevationStart: 2900,
        elevationEnd: 3950,
        durationHours: 6,
        difficulty: "hard",
        campsite: "Dzongri Trekker Hut",
        waterSource: true,
        emergencyExit: "Immediate descent to Tsokha"
      },
      {
        day: 4,
        title: "Acclimatization Day at Dzongri",
        distanceKm: 4,
        elevationStart: 3950,
        elevationEnd: 4150,
        durationHours: 3,
        difficulty: "easy",
        campsite: "Dzongri Trekker Hut",
        waterSource: true,
        emergencyExit: "Descend to Tsokha if showing altitude symptoms"
      },
      {
        day: 5,
        title: "Trek from Dzongri to Thansing",
        distanceKm: 8,
        elevationStart: 3950,
        elevationEnd: 3800,
        durationHours: 5,
        difficulty: "moderate",
        campsite: "Thansing Campsite",
        waterSource: true,
        emergencyExit: "Evacuate to Kokchurang or Dzongri"
      },
      {
        day: 6,
        title: "Trek from Thansing to Lamuney",
        distanceKm: 4,
        elevationStart: 3800,
        elevationEnd: 4150,
        durationHours: 3,
        difficulty: "easy",
        campsite: "Lamuney Campsite",
        waterSource: true,
        emergencyExit: "Descend to Thansing"
      },
      {
        day: 7,
        title: "Lamuney to Goechala View Point 1 & descend to Kokchurang",
        distanceKm: 18,
        elevationStart: 4150,
        elevationEnd: 3700,
        durationHours: 8,
        difficulty: "hard",
        campsite: "Kokchurang Trekker Hut",
        waterSource: true,
        emergencyExit: "Descend to Thansing and Tsokha"
      },
      {
        day: 8,
        title: "Trek Kokchurang back to Yuksom",
        distanceKm: 32,
        elevationStart: 3700,
        elevationEnd: 1780,
        durationHours: 10,
        difficulty: "hard",
        campsite: "Yuksom Homestay",
        waterSource: true,
        emergencyExit: "Descend to Tsokha or Sachen"
      }
    ]
  },
  {
    name: "Kheerganga",
    destination: "Kheerganga",
    baseCamp: "Barshaini",
    nearestRailhead: "Joginder Nagar (JDNX)",
    nearestAirport: "Kullu-Manali Airport (UUU)",
    difficulty: "easy",
    bestMonths: ["March", "April", "May", "June", "September", "October", "November"],
    avoidMonths: ["January", "February", "July", "August", "December"],
    durationDays: 2,
    maxAltitude: 2960,
    distanceKm: 24,
    permits: [],
    essentialGear: [
      "Comfortable hiking shoes",
      "Warm fleece jacket",
      "Rain jacket / Poncho",
      "Swimming trunks (for hot water springs)"
    ],
    guideRequired: false,
    guideApproxCostPerDay: 1000,
    porterApproxCostPerDay: 800,
    campsites: [
      { name: "Kheerganga Summit Campsite", altitude: 2960, type: "tent", costPerNight: 600 },
      { name: "Kasol Hotel", altitude: 1580, type: "guesthouse", costPerNight: 1200 }
    ],
    agencies: [
      {
        name: "Kasol Adventure Campers",
        baseCity: "Kasol",
        packageCostPerPerson: 1500,
        includes: ["Camping tent stay", "Dinner and Breakfast", "Local guide"],
        website: "https://www.kasoladventures.com"
      }
    ],
    acclimatizationDays: 0,
    emergencyContacts: [
      { name: "Manikaran Police Post", phone: "+91-1902-273801" },
      { name: "Kullu District Emergency Helpline", phone: "108" }
    ],
    dailyBreakdown: [
      {
        day: 1,
        title: "Trek from Barshaini to Kheerganga via Nakthan Village",
        distanceKm: 12,
        elevationStart: 2195,
        elevationEnd: 2960,
        durationHours: 5,
        difficulty: "easy",
        campsite: "Kheerganga Summit Campsite",
        waterSource: true,
        emergencyExit: "Descend to Nakthan or Barshaini"
      },
      {
        day: 2,
        title: "Kheerganga to Barshaini Descent",
        distanceKm: 12,
        elevationStart: 2960,
        elevationEnd: 2195,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Kasol Hotel",
        waterSource: true,
        emergencyExit: "Descent to Barshaini roadhead"
      }
    ]
  },
  {
    name: "Har Ki Dun",
    destination: "Har Ki Dun",
    baseCamp: "Sankri",
    nearestRailhead: "Dehradun (DDN)",
    nearestAirport: "Jolly Grant Airport (DED)",
    difficulty: "moderate",
    bestMonths: ["April", "May", "June", "September", "October", "November", "December"],
    avoidMonths: ["January", "February", "July", "August"],
    durationDays: 5,
    maxAltitude: 3566,
    distanceKm: 48,
    permits: [
      {
        name: "Govind Pashu Vihar National Park Entry Permit",
        cost: 200,
        where: "Forest Checkpost at Sankri",
        required: true,
        advanceDays: 0,
        onlineUrl: "https://uttarakhandforest.org/"
      }
    ],
    essentialGear: [
      "Waterproof Trekking Shoes",
      "Heavy Fleece & Windcheater Jacket",
      "Trekking Pole",
      "Poncho",
      "Sun Hat & Sunglasses",
      "Waterproof Gloves"
    ],
    guideRequired: true,
    guideApproxCostPerDay: 1200,
    porterApproxCostPerDay: 1000,
    campsites: [
      { name: "Sankri Guest House", altitude: 1950, type: "guesthouse", costPerNight: 800 },
      { name: "Seema Campsite", altitude: 2560, type: "tent", costPerNight: 500 },
      { name: "Har Ki Dun GMVN / Tents", altitude: 3566, type: "guesthouse", costPerNight: 800 }
    ],
    agencies: [
      {
        name: "Indiahikes",
        baseCity: "Dehradun",
        packageCostPerPerson: 9000,
        includes: ["Tent stays & sleeping bags", "Eco-friendly meals", "Sankri basecamp guest house", "Guides & Permits"],
        website: "https://indiahikes.com"
      }
    ],
    acclimatizationDays: 0,
    emergencyContacts: [
      { name: "Purola Police Station", phone: "+91-1373-222224" },
      { name: "Mori Hospital Emergency Help", phone: "108" }
    ],
    dailyBreakdown: [
      {
        day: 1,
        title: "Drive Sankri to Taluka, Trek to Seema/Osla",
        distanceKm: 14,
        elevationStart: 1950,
        elevationEnd: 2560,
        durationHours: 5,
        difficulty: "easy",
        campsite: "Seema Campsite",
        waterSource: true,
        emergencyExit: "Return to Taluka roadhead"
      },
      {
        day: 2,
        title: "Trek from Seema to Har Ki Dun Valley",
        distanceKm: 10,
        elevationStart: 2560,
        elevationEnd: 3566,
        durationHours: 5,
        difficulty: "moderate",
        campsite: "Har Ki Dun GMVN / Tents",
        waterSource: true,
        emergencyExit: "Descend to Seema/Osla"
      },
      {
        day: 3,
        title: "Exploration Day (Marinda Lake or Jaundhar Glacier)",
        distanceKm: 8,
        elevationStart: 3566,
        elevationEnd: 3800,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Har Ki Dun GMVN / Tents",
        waterSource: true,
        emergencyExit: "Return to Har Ki Dun campsite"
      },
      {
        day: 4,
        title: "Trek from Har Ki Dun to Seema",
        distanceKm: 10,
        elevationStart: 3566,
        elevationEnd: 2560,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Seema Campsite",
        waterSource: true,
        emergencyExit: "Descend to Taluka"
      },
      {
        day: 5,
        title: "Trek Seema to Taluka, Drive to Sankri",
        distanceKm: 14,
        elevationStart: 2560,
        elevationEnd: 1950,
        durationHours: 4,
        difficulty: "easy",
        campsite: "Sankri Guest House",
        waterSource: true,
        emergencyExit: "Drive from Taluka back to Sankri"
      }
    ]
  }
];

export function getTrek(destination: string): TrekInfo | null {
  const norm = destination.toLowerCase().trim();

  // Try exact match by trek name or destination
  const found = TREKS.find(
    (t) => t.name.toLowerCase() === norm || t.destination.toLowerCase() === norm
  );
  if (found) return found;

  // Try partial match
  const partialFound = TREKS.find(
    (t) => t.name.toLowerCase().includes(norm) || t.destination.toLowerCase().includes(norm)
  );
  return partialFound || null;
}
