import { CityTips, CashAvailability, AltitudeHealthData } from "./types";

// Cash availability profiles for destinations
export const CASH_PROFILES: Record<string, CashAvailability> = {
  "chitkul": {
    hasATM: false,
    nearestATMDistance: "65km away in Reckong Peo",
    lastATMBeforeDestination: "Reckong Peo",
    recommendedCashAmount: "₹6,000+",
    upiWorks: false,
    tip: "No ATMs in Chitkul or Sangla valley. UPI is completely dead due to lack of internet signal. Carry ample hard cash for food, stay, and transport."
  },
  "spiti/kaza": {
    hasATM: true,
    nearestATMDistance: "1 SBI ATM in Kaza town, often runs out of cash",
    lastATMBeforeDestination: "Reckong Peo or Manali",
    recommendedCashAmount: "₹8,000+",
    upiWorks: false, // partial/limited
    tip: "Kaza has one SBI ATM which is frequently out of order or cash-dry. UPI is partial and depends on weak BSNL network. Withdraw in Shimla, Reckong Peo, or Manali."
  },
  "kaza": {
    hasATM: true,
    nearestATMDistance: "SBI ATM in Kaza, unreliable",
    lastATMBeforeDestination: "Reckong Peo or Manali",
    recommendedCashAmount: "₹8,000+",
    upiWorks: false,
    tip: "One SBI ATM exists in Kaza but remains cash-less for days. Keep minimum ₹8,000 in cash."
  },
  "munsyari": {
    hasATM: true,
    nearestATMDistance: "1 local SBI ATM, frequent power cuts affect it",
    lastATMBeforeDestination: "Almora (140km)",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false, // limited
    tip: "UPI works in main market but is highly limited by connectivity. ATMs are sparse; Almora/Pithoragarh are the last reliable cash points."
  },
  "chopta": {
    hasATM: false,
    nearestATMDistance: "35km away in Ukhimath",
    lastATMBeforeDestination: "Ukhimath or Guptkashi",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false,
    tip: "No ATM or banks in Chopta. Network signal is close to zero, so digital payments fail. Carry all travel funds in cash."
  },
  "sankri": {
    hasATM: false,
    nearestATMDistance: "45km away in Purola",
    lastATMBeforeDestination: "Purola or Mori",
    recommendedCashAmount: "₹5,000+",
    upiWorks: false,
    tip: "No ATMs in Sankri. Local shops do not accept card/UPI. Withdraw cash in Dehradun, Vikasnagar, or Purola."
  },
  "lohajung": {
    hasATM: false,
    nearestATMDistance: "75km away in Karnaprayag",
    lastATMBeforeDestination: "Karnaprayag or Tharali",
    recommendedCashAmount: "₹6,000+",
    upiWorks: false,
    tip: "Trek bases do not have ATMs. Carry enough cash to pay guides, porters, and local guesthouses. Last ATM is in Karnaprayag."
  },
  "kheerganga": {
    hasATM: false,
    nearestATMDistance: "18km away in Kasol",
    lastATMBeforeDestination: "Kasol or Bhuntar",
    recommendedCashAmount: "₹3,000+",
    upiWorks: false,
    tip: "At the summit, there are no banks, ATMs, or network signals. UPI does not work. Carry cash for tents, food, and hot spring charges."
  },
  "govindghat": {
    hasATM: true,
    nearestATMDistance: "Local ATM exists, but Chamoli (25km) is safer",
    lastATMBeforeDestination: "Chamoli or Joshimath",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false, // limited
    tip: "Govindghat has an ATM but electricity failures render it offline. UPI works in limited shops. Last reliable option is Joshimath."
  },
  "bir billing": {
    hasATM: true,
    nearestATMDistance: "Bir town ATMs, generally working",
    lastATMBeforeDestination: "Palampur (28km)",
    recommendedCashAmount: "₹3,000+",
    upiWorks: true,
    tip: "UPI is widely accepted at paragliding agencies and cafes. ATMs in Bir might run out on holiday weekends."
  },
  "tawang": {
    hasATM: true,
    nearestATMDistance: "2 ATMs in Tawang town, usually working",
    lastATMBeforeDestination: "Bomdila (183km)",
    recommendedCashAmount: "₹10,000+",
    upiWorks: false,
    tip: "While Tawang town has ATMs, they fail during snowstorms. UPI is highly unreliable outside the main town. Carry cash for permit checking fees and local taxi hire."
  },
  "jibhi": {
    hasATM: false,
    nearestATMDistance: "20km away in Aut or Banjar (8km)",
    lastATMBeforeDestination: "Aut (on NH21)",
    recommendedCashAmount: "₹3,000+",
    upiWorks: false,
    tip: "Banjar (8km) has a couple of ATMs but they are frequently out of service. Better to withdraw at Aut before entering the valley."
  },
  "mawlynnong": {
    hasATM: false,
    nearestATMDistance: "90km away in Shillong",
    lastATMBeforeDestination: "Shillong",
    recommendedCashAmount: "₹3,000+",
    upiWorks: false,
    tip: "No ATM in Mawlynnong. UPI works only if BSNL has network (rare). Keep cash for parking fees, entry fees, and homestays."
  },
  "dzukou valley": {
    hasATM: false,
    nearestATMDistance: "20km away in Kohima",
    lastATMBeforeDestination: "Kohima or Jakhama",
    recommendedCashAmount: "₹3,000+",
    upiWorks: false,
    tip: "No commercial setups or ATMs in the valley. Bring cash to pay for campsite permits, firewood, and basic rations at the trekkers' hut."
  },
  "kedarnath": {
    hasATM: false,
    nearestATMDistance: "30km away in Guptkashi",
    lastATMBeforeDestination: "Guptkashi or Sonprayag",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false,
    tip: "No ATMs on the trek or at the shrine. Power supply is unstable. Poni/Dandi/Kandi providers require cash payments."
  },
  "valley of flowers": {
    hasATM: false,
    nearestATMDistance: "14km away in Govindghat / Joshimath",
    lastATMBeforeDestination: "Joshimath",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false,
    tip: "Ghangaria base camp has no ATMs. Digital payments fail. Bring enough cash for entry fees, mules, and porter guides."
  },
  "yuksom": {
    hasATM: true,
    nearestATMDistance: "1 ATM in town, often dry",
    lastATMBeforeDestination: "Pelling (35km) or Jorethang",
    recommendedCashAmount: "₹4,000+",
    upiWorks: false, // limited
    tip: "Withdraw cash in Jorethang or Melli before traveling up. Yuksom has 1 ATM which is frequently out of order."
  },
  "ziro": {
    hasATM: true,
    nearestATMDistance: "Ziro valley ATMs, generally working",
    lastATMBeforeDestination: "Itanagar (115km)",
    recommendedCashAmount: "₹5,000+",
    upiWorks: false, // partial
    tip: "UPI works in Hapoli/Ziro town, but cash is mandatory in offbeat villages. Last major city with multiple banks is Itanagar."
  },
  "dawki": {
    hasATM: false,
    nearestATMDistance: "82km away in Shillong",
    lastATMBeforeDestination: "Shillong",
    recommendedCashAmount: "₹3,000+",
    upiWorks: false,
    tip: "No ATM at Dawki. Boating rates (₹700-1000/boat) are fixed and must be paid in cash. Network roaming shifts to Bangladesh, preventing UPI."
  }
};

// Altitude Health profiles for destinations above 2500m
export const ALTITUDE_PROFILES: Record<string, AltitudeHealthData> = {
  "kaza": {
    risk: "high",
    maxAltitude: 3650,
    acclimatizationAdvice: [
      "Mandatory 24-48 hours rest upon arrival. Do not attempt hikes on Day 1.",
      "Stay hydrated (3-4 liters of water daily). Avoid alcohol and sleeping pills.",
      "Climb high, sleep low. Do not rush to higher passes like Kunzum on Day 1."
    ],
    symptoms: ["Headache", "Nausea", "Dizziness", "Shortness of breath", "Insomnia"],
    medications: ["Diamox (Acetazolamide) - consult doctor", "Camphor tablets for inhalation", "Oxygen cylinders (available in Kaza)"],
    nearestHospital: {
      name: "Community Health Centre (CHC) Kaza",
      distance: "Local (in Kaza town)",
      phone: "+91-1906-222212"
    },
    helipadsNearby: ["Kaza Helipad", "Rangrik Helipad"],
    rescueAgency: {
      name: "Spiti Mountain Rescue / CHC Kaza Emergency",
      phone: "+91-1906-222211"
    }
  },
  "spiti": {
    risk: "high",
    maxAltitude: 3650,
    acclimatizationAdvice: [
      "Spend at least 1-2 nights at Reckong Peo or Kalpa before reaching Kaza.",
      "Drink lots of fluids, keep electrolytes handy, and eat light meals.",
      "If arriving via Manali (faster ascent), keep Diamox ready."
    ],
    symptoms: ["Headache", "Fatigue", "Loss of appetite", "Shortness of breath"],
    medications: ["Diamox", "Paracetamol for headache", "Portable oxygen cans"],
    nearestHospital: {
      name: "CHC Kaza",
      distance: "Depends on village (up to 50km)",
      phone: "+91-1906-222212"
    },
    helipadsNearby: ["Kaza Helipad"],
    rescueAgency: {
      name: "Spiti Valley Police Command",
      phone: "100"
    }
  },
  "chitkul": {
    risk: "moderate",
    maxAltitude: 3450,
    acclimatizationAdvice: [
      "Acclimatize at Sangla or Kalpa before sleeping in Chitkul.",
      "Avoid heavy physical exertion on the first afternoon.",
      "Hydrate well to fight the dry mountain air."
    ],
    symptoms: ["Mild headache", "Slight dizziness", "Disturbed sleep"],
    medications: ["Disprin/Paracetamol", "Hydration salts"],
    nearestHospital: {
      name: "Sangla Primary Health Centre",
      distance: "22km away in Sangla",
      phone: "+91-1786-242230"
    },
    helipadsNearby: ["Sangla Helipad"],
    rescueAgency: {
      name: "ITBP Post Chitkul / Sangla Police",
      phone: "+91-1786-242224"
    }
  },
  "kedarkantha": {
    risk: "moderate",
    maxAltitude: 3810,
    acclimatizationAdvice: [
      "Gradual ascent from Sankri (1950m) to Juda Ka Talab (2700m). Do not skip campsites.",
      "Walk at a slow pace (mountain walk). Keep breathing steady.",
      "Notify guides instantly if headache or nausea develops."
    ],
    symptoms: ["Mild AMS", "Fatigue", "Dizziness during summit climb"],
    medications: ["Diamox", "Decadron (emergency only)"],
    nearestHospital: {
      name: "Mori Government Hospital",
      distance: "25km from Sankri base camp",
      phone: "+91-1375-284224"
    },
    helipadsNearby: ["Sankri Helipad"],
    rescueAgency: {
      name: "Uttarakhand State Disaster Response Force (SDRF)",
      phone: "108"
    }
  },
  "roopkund": {
    risk: "very-high",
    maxAltitude: 5029,
    acclimatizationAdvice: [
      "Highly strenuous trek. Acclimatization days at Bedni Bugyal are mandatory.",
      "Do not proceed if resting pulse rate is above 100 bpm.",
      "Be prepared for sub-zero sleeping temperatures."
    ],
    symptoms: ["Acute Mountain Sickness (AMS)", "HAPE/HACE risk", "Vomiting", "Severe confusion"],
    medications: ["Diamox", "Nifedipine (for HAPE)", "Dexamethasone (for HACE)", "Oxygen kit"],
    nearestHospital: {
      name: "Karnaprayag Sub-Divisional Hospital",
      distance: "75km from Lohajung",
      phone: "+91-1363-244222"
    },
    helipadsNearby: ["Lohajung Helipad", "Ghaer Helipad"],
    rescueAgency: {
      name: "SDRF Uttarakhand / NIM Rescue Team",
      phone: "+91-135-2442344"
    }
  },
  "goechala": {
    risk: "very-high",
    maxAltitude: 4940,
    acclimatizationAdvice: [
      "Slow trekking between Tsokha and Dzongri.",
      "Rest day at Dzongri is mandatory before heading to Thansing.",
      "Check blood oxygen levels (SpO2) daily using a pulse oximeter."
    ],
    symptoms: ["Severe headache", "Breathlessness at rest", "Staggering gait"],
    medications: ["Diamox", "Oxygen cylinders with trek leader"],
    nearestHospital: {
      name: "Gyalshing District Hospital",
      distance: "60km from Yuksom",
      phone: "+91-3595-250645"
    },
    helipadsNearby: ["Yuksom Helipad"],
    rescueAgency: {
      name: "Sikkim Mountaineering Association Rescue",
      phone: "+91-3592-202346"
    }
  },
  "kedarnath": {
    risk: "moderate",
    maxAltitude: 3584,
    acclimatizationAdvice: [
      "Ascend slowly on the 16km trek. Take breaks every 2km.",
      "Do not run or rush the climb. Rent a pony if you have respiratory history.",
      "Avoid sleeping directly near the temple if feeling unwell; descend to Lincholi."
    ],
    symptoms: ["Headache", "Breathlessness", "Chest tightness"],
    medications: ["Diamox", "Oxygen cylinders (sold locally for ₹300/can)"],
    nearestHospital: {
      name: "Kedarnath Kedardham Clinic / Medical Relief Post",
      distance: "Local (near temple)",
      phone: "108"
    },
    helipadsNearby: ["Kedarnath Helipad", "Phata Helipad"],
    rescueAgency: {
      name: "National Disaster Response Force (NDRF) Shrine Post",
      phone: "108"
    }
  },
  "valley of flowers": {
    risk: "low",
    maxAltitude: 3658,
    acclimatizationAdvice: [
      "Keep Ghangaria (3048m) as your base. Do not stay overnight inside the valley.",
      "Drink water before starting the daily hike.",
      "Carry rain gear as sudden temperature drops occur during rains."
    ],
    symptoms: ["Mild exhaustion", "Light headache"],
    medications: ["Paracetamol", "ORS packets"],
    nearestHospital: {
      name: "Government Hospital Joshimath",
      distance: "25km from Govindghat",
      phone: "+91-1389-222084"
    },
    helipadsNearby: ["Govindghat Helipad", "Ghangaria Helipad"],
    rescueAgency: {
      name: "SDRF Uttarakhand Govindghat Post",
      phone: "108"
    }
  },
  "tawang": {
    risk: "moderate",
    maxAltitude: 3048,
    acclimatizationAdvice: [
      "Sela Pass is at 4170m; cross it quickly without long stops.",
      "Rest on the first night in Tawang. Do not head straight to Bumla Pass (4600m).",
      "Keep warm; winds in Tawang are harsh."
    ],
    symptoms: ["Headache", "Fatigue", "Dizziness while crossing Sela Pass"],
    medications: ["Diamox", "Camphor packets"],
    nearestHospital: {
      name: "Khandro Drowa Tsangmu District Hospital, Tawang",
      distance: "Local",
      phone: "+91-3794-222236"
    },
    helipadsNearby: ["Tawang Town Helipad"],
    rescueAgency: {
      name: "Indian Army Medical Corps Tawang / District Police",
      phone: "+91-3794-222213"
    }
  }
};

// Master tips lookup
export function getCityTips(city: string): CityTips {
  const norm = city.toLowerCase().trim();
  
  // Custom tips for specific cities/towns
  const scamAlerts = [
    "Overcharging by local auto-rickshaw drivers. Always negotiate fares beforehand or use ridesharing apps where available.",
    "Be wary of 'guides' who offer extremely cheap rates; they often lead you to high-commission souvenir shops.",
    "Check food menu prices carefully before ordering at tourist hotspots to avoid inflated bills."
  ];

  const safetyTips = [
    "Keep emergency cash in a separate pocket.",
    "Do not walk in poorly lit areas late at night.",
    "Keep soft copies of your ID documents on your phone offline."
  ];

  const localCustoms = [
    "Remove shoes before entering temples, shrines, or local homes.",
    "Dress modestly when visiting religious sites (shoulders and knees covered).",
    "Seek permission before taking photos of local residents or holy rituals."
  ];

  const emergencyNumbers = ["Police: 112 / 100", "Ambulance: 108", "Tourist Helpline: 1363"];
  let upiTip = "UPI payments (GPay, PhonePe, Paytm) are widely accepted by almost all vendors, including street stalls.";

  // Retrieve cash profile
  let cashAvailability: CashAvailability = {
    hasATM: true,
    lastATMBeforeDestination: "Available locally",
    recommendedCashAmount: "₹2,000",
    upiWorks: true,
    tip: "ATMs and UPI are widely available. Cash is only needed for small vendors under ₹100."
  };

  for (const key of Object.keys(CASH_PROFILES)) {
    if (norm.includes(key) || key.includes(norm)) {
      cashAvailability = CASH_PROFILES[key];
      break;
    }
  }

  // Retrieve altitude profile
  let altitudeHealth: AltitudeHealthData | undefined;
  for (const key of Object.keys(ALTITUDE_PROFILES)) {
    if (norm.includes(key) || key.includes(norm)) {
      altitudeHealth = ALTITUDE_PROFILES[key];
      break;
    }
  }

  // Specific adjustments for remote/trek areas
  if (cashAvailability.hasATM === false) {
    upiTip = "UPI will NOT work. There is little to no mobile internet connectivity. You must withdraw physical cash before starting.";
    scamAlerts.push("Verify cash change carefully as vendors have limited change.");
  } else if (cashAvailability.upiWorks === false) {
    upiTip = "UPI works partially in markets but is highly subject to signal drops. Keep physical backup cash.";
  }

  if (altitudeHealth) {
    safetyTips.push(`AMS Risk: ${altitudeHealth.risk.toUpperCase()}. This destination is at ${altitudeHealth.maxAltitude}m. Acclimatization is critical.`);
    emergencyNumbers.push(`Hospital: ${altitudeHealth.nearestHospital.name} (${altitudeHealth.nearestHospital.phone})`);
  }

  return {
    city,
    scamAlerts,
    safetyTips,
    emergencyNumbers,
    localCustoms,
    upiTip,
    altitudeHealth,
    cashAvailability
  };
}
