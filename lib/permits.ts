import { TrekPermit } from "./types";

export const PERMIT_DATA: Record<string, TrekPermit[]> = {
  "goechala": [
    {
      name: "Kanchenjunga National Park Permit & RAP",
      cost: 300,
      where: "Forest Department Office at Yuksom",
      required: true,
      advanceDays: 1,
      onlineUrl: "https://www.sikkimtourism.gov.in/"
    }
  ],
  "yuksom": [
    {
      name: "Restricted Area Permit (RAP) for Sikkim",
      cost: 150,
      where: "Sikkim Tourism Office at Melli or Rangpo Checkpost",
      required: true,
      advanceDays: 1,
      onlineUrl: "https://www.sikkimtourism.gov.in/"
    }
  ],
  "tawang": [
    {
      name: "Arunachal Pradesh Inner Line Permit (ILP)",
      cost: 150,
      where: "Arunachal ILP Online Portal or Resident Commissioner's Office",
      required: true,
      advanceDays: 2,
      onlineUrl: "https://www.arunachalilp.com/"
    }
  ],
  "ziro": [
    {
      name: "Arunachal Pradesh Inner Line Permit (ILP)",
      cost: 150,
      where: "Arunachal ILP Online Portal or DC Office",
      required: true,
      advanceDays: 2,
      onlineUrl: "https://www.arunachalilp.com/"
    }
  ],
  "dzukou valley": [
    {
      name: "Nagaland Inner Line Permit (ILP) & Dzukou Entry Permit",
      cost: 150,
      where: "Nagaland ILP Portal & Forest Checkpost at Viswema/Jakhama",
      required: true,
      advanceDays: 2,
      onlineUrl: "https://www.ilp.nagaland.gov.in/"
    }
  ],
  "kedarkantha": [
    {
      name: "Govind Pashu Vihar National Park Entry Permit",
      cost: 200,
      where: "Forest Checkpost at Sankri",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "sankri": [
    {
      name: "Govind Pashu Vihar National Park Entry Permit",
      cost: 200,
      where: "Forest Checkpost at Sankri",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "har ki dun": [
    {
      name: "Govind Pashu Vihar National Park Entry Permit",
      cost: 200,
      where: "Forest Checkpost at Sankri",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "roopkund": [
    {
      name: "Nanda Devi Biosphere Reserve Forest Permit",
      cost: 250,
      where: "Forest Office at Lohajung",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "lohajung": [
    {
      name: "Nanda Devi Biosphere Reserve Forest Permit",
      cost: 250,
      where: "Forest Office at Lohajung",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "valley of flowers": [
    {
      name: "Valley of Flowers National Park Entry Permit",
      cost: 150,
      where: "Forest Office at Ghangaria",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "govindghat": [
    {
      name: "Valley of Flowers National Park Entry Permit",
      cost: 150,
      where: "Forest Office at Ghangaria",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ],
  "hemkund sahib": [
    {
      name: "Hemkund Sahib Forest Entry & Yatra Registration",
      cost: 150,
      where: "Govindghat Forest Office & Shrine Registration Counter",
      required: true,
      advanceDays: 0,
      onlineUrl: "https://uttarakhandforest.org/"
    }
  ]
};

export function getPermits(destination: string): TrekPermit[] {
  const norm = destination.toLowerCase().trim();
  
  if (PERMIT_DATA[norm]) {
    return PERMIT_DATA[norm];
  }

  for (const key of Object.keys(PERMIT_DATA)) {
    if (norm.includes(key) || key.includes(norm)) {
      return PERMIT_DATA[key];
    }
  }

  return [];
}

export function requiresILP(destination: string): boolean {
  const norm = destination.toLowerCase().trim();
  // Arunachal (Tawang, Ziro) and Nagaland (Dzukou Valley) require ILP
  const ilpPlaces = ["tawang", "ziro", "dzukou valley", "arunachal", "nagaland"];
  return ilpPlaces.some(place => norm.includes(place));
}

export function requiresRAP(destination: string): boolean {
  const norm = destination.toLowerCase().trim();
  // Sikkim (Goechala, Yuksom) require RAP
  const rapPlaces = ["goechala", "yuksom", "sikkim"];
  return rapPlaces.some(place => norm.includes(place));
}
