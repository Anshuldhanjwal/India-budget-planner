export type BudgetLevel = "ultra-budget" | "budget" | "moderate";

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type DestinationType =
  | "metro"
  | "heritage-city"
  | "hill-station"
  | "trek-base"
  | "trek-destination"
  | "offbeat-village"
  | "spiritual"
  | "beach"
  | "wildlife"
  | "northeast";

export type TrekDifficulty = "easy" | "moderate" | "hard" | "expert";

export type AltitudeRisk = "none" | "low" | "moderate" | "high" | "very-high";

export type NetworkQuality = "good" | "patchy" | "none";

export interface DestinationInfo {
  name: string;
  state: string;
  lat: number;
  lng: number;
  type: DestinationType[];
  nearestRailhead?: string;
  nearestAirport?: string;
  nearestMajorCity?: string;
  altitude?: number;
  ilpRequired?: boolean;
  rapRequired?: boolean;
}

export interface JourneyLeg {
  from: string;
  to: string;
  mode: "train" | "bus" | "shared-jeep" | "private-cab" | "flight" | "trek";
  distanceKm: number;
  durationHours: number;
  costPerPerson: number;
  notes: string;
  bookingUrl?: string;
  trainInfo?: {
    trainNumber: string;
    trainName: string;
    departureTime: string;
    arrivalTime: string;
    daysOfOperation: string[];
    bookingUrl: string;
  };
}

export interface MultiLegRoute {
  legs: JourneyLeg[];
  totalCostPerPerson: number;
  totalCostGroup: number;
  totalDurationHours: number;
  summary: string;
  bestDepartureTime?: string;
  tip?: string;
  privateCabOption?: {
    legIndex: number; // which leg to replace
    costFlat: number; // flat rate for private cab
    maxPassengers: number; // typically 6
    savings: number; // vs N * shared jeep
    recommended: boolean; // true when cheaper
  };
}

export interface TransportOption {
  mode: "Train" | "Bus" | "Flight";
  className: string;
  costPerPerson: number;
  totalCost: number;
  durationHours: number;
  recommended: boolean;
  trainInfo?: {
    trainNumber: string;
    trainName: string;
    departureTime: string;
    arrivalTime: string;
    daysOfOperation: string[];
    bookingUrl: string;
  };
}

export type TransportResult =
  | { type: "direct"; options: TransportOption[] }
  | { type: "multi-leg"; route: MultiLegRoute; alternatives?: MultiLegRoute[] };

export interface TrekPermit {
  name: string;
  cost: number;
  where: string;
  required: boolean;
  advanceDays: number;
  onlineUrl?: string;
}

export interface CampsiteOption {
  name: string;
  altitude: number;
  type: "tent" | "guesthouse" | "dharamshala";
  costPerNight: number;
}

export interface TrekAgency {
  name: string;
  baseCity: string;
  packageCostPerPerson: number;
  includes: string[];
  website?: string;
}

export interface GearRentalItem {
  item: string;
  rentPerDay: number;
  depositRequired: string;
}

export interface GearShop {
  name: string;
  town: string;
  area: string;
  items: GearRentalItem[];
}

export interface TrekDayPlan {
  day: number;
  title: string;
  distanceKm: number;
  elevationStart: number;
  elevationEnd: number;
  durationHours: number;
  difficulty: TrekDifficulty;
  campsite: string;
  waterSource: boolean;
  emergencyExit?: string;
  weatherWarning?: string;
}

export interface TrekInfo {
  name: string;
  destination: string;
  baseCamp: string;
  nearestRailhead?: string;
  nearestAirport?: string;
  difficulty: TrekDifficulty;
  bestMonths: MonthName[];
  avoidMonths: MonthName[];
  durationDays: number;
  maxAltitude: number;
  distanceKm: number;
  permits: TrekPermit[];
  essentialGear: string[];
  guideRequired: boolean;
  guideApproxCostPerDay: number;
  porterApproxCostPerDay: number;
  campsites: CampsiteOption[];
  agencies: TrekAgency[];
  acclimatizationDays: number;
  emergencyContacts: { name: string; phone: string }[];
  dailyBreakdown: TrekDayPlan[];
}

export interface AltitudeHealthData {
  risk: AltitudeRisk;
  maxAltitude: number;
  acclimatizationAdvice: string[];
  symptoms: string[];
  medications: string[];
  nearestHospital: { name: string; distance: string; phone: string };
  helipadsNearby: string[];
  rescueAgency: { name: string; phone: string };
}

export interface CashAvailability {
  hasATM: boolean;
  nearestATMDistance?: string;
  lastATMBeforeDestination: string;
  recommendedCashAmount: string;
  upiWorks: boolean;
  tip: string;
}

export interface NetworkCoverage {
  destination: string;
  jio: NetworkQuality;
  airtel: NetworkQuality;
  bsnl: NetworkQuality;
  vi?: NetworkQuality;
  bestNetwork: string;
  hasWifi: boolean;
  wifiQuality?: "good" | "slow" | "unreliable";
  starlink?: boolean;
  offlineMapsAdvice: string;
  tip: string;
}

export interface RoadClosure {
  routeName: string;
  closedMonths: MonthName[];
  reason: string;
  alternateRoute?: string;
}

export interface BudgetBreakdown {
  transportCost: number;
  returnTransportCost: number;
  accommodationCost: number;
  foodCost: number;
  activitiesCost: number;
  localTransportCost: number;
  emergencyBuffer: number;
  permitsCost: number;
  gearRentalCost: number;
  guideCost: number;
  porterCost: number;
  grandTotal: number;
  costPerPerson: number;
  seasonalMultiplier: number;
  daysCount: number;
  diyTotal?: number;
  packageTotal?: number;
  returnJourneySummary: string;
}

export interface TripRequest {
  source: string;
  destination: string;
  startDate: string;
  days: number;
  travelers: number;
  budget: BudgetLevel;
}

export interface TrainRoute {
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  durationHours: number;
  sleeper: number;
  ac3: number;
  ac2: number;
  daysOfOperation: string[];
  bookingUrl: string;
}

export interface Attraction {
  name: string;
  description: string;
  entryFee: number;
  timings: string;
  durationHours: number;
  tags: string[];
}

export interface Hotel {
  name: string;
  budgetLevel: BudgetLevel;
  costPerNight: number;
  rating: number;
  location: string;
  bookingUrl: string;
  amenities: string[];
}

export interface LocalTransportInfo {
  city: string;
  options: {
    mode: string;
    costRange: string;
    tips: string;
  }[];
  avgCostPerDay: number;
}

export interface CityFoodGuide {
  city: string;
  mustEat: {
    dish: string;
    description: string;
    approxPrice: number;
    recommendedPlace?: string;
  }[];
  budgetEateries: {
    name: string;
    area: string;
    specialty: string;
    approxCostTwo: number;
  }[];
  thaliCostEstimate: number;
}

export interface MonthWeather {
  month: MonthName;
  avgTempMin: number;
  avgTempMax: number;
  rainfallMm: number;
  crowdLevel: "low" | "moderate" | "high" | "peak";
  priceMultiplier: number; // e.g. 1.2 during peak
  clothingAdvice: string;
  status: "best" | "good" | "risky" | "closed";
}

export interface CityWeather {
  city: string;
  months: MonthWeather[];
}

export interface PackingItem {
  item: string;
  category: "clothing" | "gear" | "documents" | "toiletries" | "medical" | "other";
  quantity: string;
  reason: string;
  essential: boolean;
}

export interface BookingLink {
  label: string;
  url: string;
  category: "train" | "bus" | "flight" | "hotel" | "permit" | "state-bus";
  tips: string;
}

export interface ActivitySlot {
  timeSlot: string; // e.g. "Morning", "Afternoon", "Evening"
  activity: string;
  cost: number;
  durationHours: number;
  notes?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: ActivitySlot[];
  isTrekDay?: boolean;
  trekDay?: TrekDayPlan;
  isReturnDay?: boolean;
  transportDetails?: string;
}

export interface CityTips {
  city: string;
  scamAlerts: string[];
  safetyTips: string[];
  emergencyNumbers: string[];
  localCustoms: string[];
  upiTip: string;
  altitudeHealth?: AltitudeHealthData;
  cashAvailability: CashAvailability;
}

export interface TripResponse {
  request: TripRequest;
  distanceKm: number;
  destinationInfo: DestinationInfo;
  transport: TransportResult;
  hotels: Hotel[];
  itinerary: DayPlan[];
  breakdown: BudgetBreakdown;
  foodGuide: CityFoodGuide;
  weather: MonthWeather;
  weatherWarning?: string;
  roadClosure?: RoadClosure;
  packingList: PackingItem[];
  tips: CityTips;
  bookingLinks: BookingLink[];
  localTransport: LocalTransportInfo;
  trekInfo?: TrekInfo;
  altitudeHealth?: AltitudeHealthData;
  permits: TrekPermit[];
  gearRental?: GearShop[];
  trekSeasonCalendar?: Record<MonthName, "best" | "good" | "risky" | "closed">;
  cashAvailability: CashAvailability;
  networkCoverage?: NetworkCoverage;
  stateTransportLinks?: BookingLink[];
}

export interface CompareResponse {
  plan1: TripResponse;
  plan2: TripResponse;
}
