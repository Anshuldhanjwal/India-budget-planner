import { NetworkCoverage } from "./types";

export const CONNECTIVITY_DATA: Record<string, NetworkCoverage> = {
  "spiti/kaza": {
    destination: "Spiti/Kaza",
    jio: "none",
    airtel: "none",
    bsnl: "good",
    bestNetwork: "BSNL only",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Maps.me and Google Maps offline for Spiti Valley region before leaving Shimla/Manali.",
    tip: "Only BSNL postpaid/prepaid works in Spiti. Jio and Airtel have absolutely zero signal. ATMs are often dry, so do not rely on UPI."
  },
  "kaza": {
    destination: "Kaza",
    jio: "none",
    airtel: "none",
    bsnl: "good",
    bestNetwork: "BSNL only",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download offline maps for Kaza and Spiti.",
    tip: "BSNL is the only saving grace. Jio and Airtel are completely dead."
  },
  "chitkul": {
    destination: "Chitkul",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL, often no signal",
    hasWifi: false,
    offlineMapsAdvice: "Download offline maps at Sangla/Reckong Peo before heading to Chitkul.",
    tip: "No network is reliable. BSNL sometimes works near the ITBP post. Inform your family beforehand."
  },
  "munsyari": {
    destination: "Munsyari",
    jio: "patchy",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Maps.me offline map for Munsyari and Pithoragarh district.",
    tip: "BSNL works best for calls/data. Jio and Airtel are highly erratic and disappear during power cuts."
  },
  "chopta": {
    destination: "Chopta",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL",
    hasWifi: false,
    offlineMapsAdvice: "Download Google Maps offline for Chopta/Tungnath route.",
    tip: "Power is solar-dependent. BSNL works intermittently. Airtel/Jio have no network at the meadows."
  },
  "sankri": {
    destination: "Sankri",
    jio: "patchy",
    airtel: "none",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: false,
    offlineMapsAdvice: "Download Maps.me for Kedarkantha and Har Ki Dun trails before Dehradun.",
    tip: "Jio has started offering weak 4G at certain spots, but BSNL is the only stable network for calls."
  },
  "lohajung": {
    destination: "Lohajung",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL in village",
    hasWifi: false,
    offlineMapsAdvice: "Download offline maps for Roopkund trail before Kathgodam.",
    tip: "Network is extremely weak. BSNL works in some corners of the village. No data connection."
  },
  "kasol": {
    destination: "Kasol",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any network",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download offline maps for Parvati Valley trails (Tosh/Kheerganga).",
    tip: "All major networks work fine. Power outages are common, so carry a power bank."
  },
  "kheerganga": {
    destination: "Kheerganga",
    jio: "none",
    airtel: "none",
    bsnl: "none",
    bestNetwork: "No signal",
    hasWifi: false,
    offlineMapsAdvice: "Download offline maps for Kheerganga trek before starting from Barshaini.",
    tip: "Absolutely no signal at the top. Some cafes have paid satellite WiFi but it is highly unreliable."
  },
  "mleod ganj": {
    destination: "McLeod Ganj",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download offline maps for Dharamkot/Triund.",
    tip: "Excellent connectivity on all networks."
  },
  "tawang": {
    destination: "Tawang",
    jio: "patchy",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download offline maps for Western Arunachal Pradesh before Tezpur.",
    tip: "BSNL offers the most stable connection. Jio and Airtel work in Tawang town but disappear on sightseeing routes."
  },
  "gangtok": {
    destination: "Gangtok",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Sikkim offline maps for North/East Sikkim day trips.",
    tip: "Perfect network in town, but will drop to zero near Nathula Pass or Tsango Lake."
  },
  "shillong": {
    destination: "Shillong",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Meghalaya maps offline.",
    tip: "Great 4G/5G coverage on Jio and Airtel."
  },
  "mawlynnong": {
    destination: "Mawlynnong",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL only",
    hasWifi: false,
    offlineMapsAdvice: "Download offline maps before leaving Shillong.",
    tip: "Jio/Airtel might catch Bangladeshi networks (roaming charges apply!). Keep manually connected to Indian BSNL."
  },
  "govindghat": {
    destination: "Govindghat",
    jio: "patchy",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: true,
    wifiQuality: "unreliable",
    offlineMapsAdvice: "Download maps for Valley of Flowers and Hemkund Sahib.",
    tip: "BSNL is reliable. Airtel/Jio are very weak."
  },
  "bir billing": {
    destination: "Bir Billing",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Kangra Valley maps.",
    tip: "Great for workation; plenty of cafes with high-speed WiFi."
  },
  "jibhi": {
    destination: "Jibhi",
    jio: "patchy",
    airtel: "none",
    bsnl: "good",
    bestNetwork: "BSNL or Jio weak",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Jibhi/Tirthan Valley offline maps.",
    tip: "Airtel is non-existent. Jio works in some homestays, but BSNL is the safest bet for calling."
  },
  "roopkund": {
    destination: "Roopkund",
    jio: "none",
    airtel: "none",
    bsnl: "none",
    bestNetwork: "No signal",
    hasWifi: false,
    offlineMapsAdvice: "Download trekking trail maps (Maps.me) for Roopkund.",
    tip: "No signal after Wan/Lohajung. Ensure you inform contacts of your itinerary."
  },
  "kedarkantha": {
    destination: "Kedarkantha",
    jio: "patchy",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "Download offline map",
    hasWifi: false,
    offlineMapsAdvice: "Download Kedarkantha trail maps before arriving at Sankri.",
    tip: "No signal on the trail. Weak Jio/BSNL coverage at base camp (Sankri) and some high points."
  },
  "valley of flowers": {
    destination: "Valley of Flowers",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "No signal from Ghangaria",
    hasWifi: false,
    offlineMapsAdvice: "Download Valley of Flowers trail maps before starting from Govindghat.",
    tip: "No signal on the trek itself. Ghangaria base camp has very weak BSNL calling, zero data."
  },
  "dzukou valley": {
    destination: "Dzukou Valley",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL only",
    hasWifi: false,
    offlineMapsAdvice: "Download Kohima and Dzukou Valley offline maps.",
    tip: "BSNL has weak signal at some spots on the ridge. Jio/Airtel are dead."
  },
  "coorg": {
    destination: "Coorg",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download offline maps for Madikeri/Coorg plantations.",
    tip: "Standard coverage, but remote coffee estates might experience dead zones."
  },
  "chikmagalur": {
    destination: "Chikmagalur",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Chikmagalur coffee plantation route maps.",
    tip: "Good coverage in town, patchy inside dense forests."
  },
  "wayanad": {
    destination: "Wayanad",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Wayanad hills maps.",
    tip: "Reliable signal in cities like Vythiri/Kalpetta."
  },
  "hampi": {
    destination: "Hampi",
    jio: "good",
    airtel: "good",
    bsnl: "good",
    bestNetwork: "Any",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Hampi ruins map.",
    tip: "Good network, but boulders can block GPS/signals at times."
  },
  "kodaikanal": {
    destination: "Kodaikanal",
    jio: "good",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "Jio or BSNL",
    hasWifi: true,
    wifiQuality: "good",
    offlineMapsAdvice: "Download Kodaikanal offline maps.",
    tip: "Jio works best in the hills. Airtel has frequent call drops."
  },
  "munnar": {
    destination: "Munnar",
    jio: "patchy",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Munnar tea garden roads map.",
    tip: "BSNL has the widest range. Jio/Airtel work well in Munnar town but drop in tea valleys."
  },
  "yuksom": {
    destination: "Yuksom",
    jio: "patchy",
    airtel: "none",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: false,
    offlineMapsAdvice: "Download Goechala trail map before starting from Yuksom.",
    tip: "Airtel is absent. Jio works very poorly. BSNL is the only operational network."
  },
  "ziro": {
    destination: "Ziro",
    jio: "patchy",
    airtel: "patchy",
    bsnl: "good",
    bestNetwork: "BSNL",
    hasWifi: true,
    wifiQuality: "slow",
    offlineMapsAdvice: "Download Ziro valley offline maps.",
    tip: "BSNL is best for remote corners. Jio/Airtel work in Ziro town."
  },
  "dawki": {
    destination: "Dawki",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL only",
    hasWifi: false,
    offlineMapsAdvice: "Download Dawki and Indo-Bangladesh border region maps.",
    tip: "Indian networks drop near the river. Bangladesh networks are strong — turn off data roaming to avoid charges."
  },
  "kedarnath": {
    destination: "Kedarnath",
    jio: "none",
    airtel: "none",
    bsnl: "patchy",
    bestNetwork: "BSNL weak",
    hasWifi: false,
    offlineMapsAdvice: "Download Kedarnath yatra route maps.",
    tip: "Mobile tower operates on generator. Very weak BSNL signal at the temple. Jio/Airtel do not work."
  }
};

export function getConnectivity(destination: string): NetworkCoverage | null {
  const norm = destination.toLowerCase().trim();
  
  // Try direct matches first
  if (CONNECTIVITY_DATA[norm]) {
    return CONNECTIVITY_DATA[norm];
  }

  // Look for partial matches
  for (const key of Object.keys(CONNECTIVITY_DATA)) {
    if (norm.includes(key) || key.includes(norm)) {
      return CONNECTIVITY_DATA[key];
    }
  }

  return null;
}
