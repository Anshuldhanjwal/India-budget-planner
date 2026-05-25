import { DestinationInfo, DestinationType } from "./types";

export const DESTINATIONS: DestinationInfo[] = [
  // Metros
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, type: ["metro"], nearestRailhead: "New Delhi (NDLS)", nearestAirport: "Indira Gandhi International (DEL)" },
  { name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, type: ["metro"], nearestRailhead: "Mumbai Central (MMCT)", nearestAirport: "Chhatrapati Shivaji Maharaj (BOM)" },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946, type: ["metro"], nearestRailhead: "KSR Bengaluru (SBC)", nearestAirport: "Kempegowda International (BLR)" },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, type: ["metro"], nearestRailhead: "Chennai Central (MAS)", nearestAirport: "Chennai International (MAA)" },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, type: ["metro"], nearestRailhead: "Howrah Junction (HWH)", nearestAirport: "Netaji Subhash Chandra Bose (CCU)" },
  { name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, type: ["metro"], nearestRailhead: "Secunderabad (SC)", nearestAirport: "Rajiv Gandhi International (HYD)" },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, type: ["metro"], nearestRailhead: "Pune Junction (PUNE)", nearestAirport: "Pune Airport (PNQ)" },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, type: ["metro"], nearestRailhead: "Ahmedabad Junction (ADI)", nearestAirport: "Sardar Vallabhbhai Patel (AMD)" },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, type: ["metro", "heritage-city"], nearestRailhead: "Jaipur Junction (JP)", nearestAirport: "Jaipur International (JAI)" },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, type: ["metro", "beach"], nearestRailhead: "Ernakulam Junction (ERS)", nearestAirport: "Cochin International (COK)" },

  // Heritage Cities
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, type: ["heritage-city"], nearestRailhead: "Agra Cantt (AGC)", nearestAirport: "Agra Airport (AGR)" },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, type: ["heritage-city", "spiritual"], nearestRailhead: "Varanasi Junction (BSB)", nearestAirport: "Lal Bahadur Shastri (VNS)" },
  { name: "Hampi", state: "Karnataka", lat: 15.3350, lng: 76.4600, type: ["heritage-city"], nearestRailhead: "Hosapete Junction (HPT)", nearestAirport: "Jindal Vijayanagar (VDY)" },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, type: ["heritage-city"], nearestRailhead: "Udaipur City (UDZ)", nearestAirport: "Maharana Pratap Airport (UDR)" },
  { name: "Jaisalmer", state: "Rajasthan", lat: 26.9157, lng: 70.9083, type: ["heritage-city"], nearestRailhead: "Jaisalmer (JSM)", nearestAirport: "Jaisalmer Airport (JSA)" },
  { name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lng: 79.9199, type: ["heritage-city"], nearestRailhead: "Khajuraho (KURJ)", nearestAirport: "Khajuraho Airport (HJR)" },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, type: ["heritage-city"], nearestRailhead: "Mysuru Junction (MYS)", nearestAirport: "Mysore Airport (MYQ)" },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, type: ["heritage-city", "spiritual"], nearestRailhead: "Madurai Junction (MDU)", nearestAirport: "Madurai Airport (IXM)" },

  // Hill Stations
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, type: ["hill-station"], nearestRailhead: "Kalka (KLK)", nearestAirport: "Shimla Airport (SLV)", altitude: 2206 },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, type: ["hill-station", "trek-base"], nearestRailhead: "Joginder Nagar (JDNX)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 2050 },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, type: ["hill-station"], nearestRailhead: "Udagamandalam (UAM)", nearestAirport: "Coimbatore International (CJB)", altitude: 2240 },
  { name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, type: ["hill-station"], nearestRailhead: "Aluva (AWY)", nearestAirport: "Cochin International (COK)", altitude: 1600 },
  { name: "Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2627, type: ["hill-station"], nearestRailhead: "New Jalpaiguri (NJP)", nearestAirport: "Bagdogra Airport (IXB)", altitude: 2042 },
  { name: "Mussoorie", state: "Uttarakhand", lat: 30.4597, lng: 78.0772, type: ["hill-station"], nearestRailhead: "Dehradun (DDN)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 2005 },
  { name: "Nainital", state: "Uttarakhand", lat: 29.3803, lng: 79.4630, type: ["hill-station"], nearestRailhead: "Kathgodam (KGM)", nearestAirport: "Pantnagar Airport (PGH)", altitude: 2084 },
  { name: "Kodaikanal", state: "Tamil Nadu", lat: 10.2381, lng: 77.4892, type: ["hill-station"], nearestRailhead: "Kodai Road (KQN)", nearestAirport: "Madurai Airport (IXM)", altitude: 2133 },
  { name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, type: ["hill-station"], nearestRailhead: "Jammu Tawi (JAT)", nearestAirport: "Srinagar Airport (SXR)", altitude: 1585 },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.2190, lng: 76.3234, type: ["hill-station"], nearestRailhead: "Pathankot (PTK)", nearestAirport: "Kangra Airport (DHM)", altitude: 1457 },

  // Trek Bases & Offbeat Villages
  { name: "Sankri", state: "Uttarakhand", lat: 31.0772, lng: 78.1888, type: ["trek-base", "offbeat-village"], nearestRailhead: "Dehradun (DDN)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 1950 },
  { name: "Lohajung", state: "Uttarakhand", lat: 30.1257, lng: 79.5298, type: ["trek-base"], nearestRailhead: "Kathgodam (KGM)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 2300 },
  { name: "Govindghat", state: "Uttarakhand", lat: 30.6234, lng: 79.5606, type: ["trek-base"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 1828 },
  { name: "Ukhimath", state: "Uttarakhand", lat: 30.5218, lng: 79.0831, type: ["trek-base", "spiritual"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 1311 },
  { name: "Yuksom", state: "Sikkim", lat: 27.3719, lng: 88.2215, type: ["trek-base", "offbeat-village"], nearestRailhead: "New Jalpaiguri (NJP)", nearestAirport: "Bagdogra Airport (IXB)", altitude: 1780 },
  { name: "Kasol", state: "Himachal Pradesh", lat: 32.0098, lng: 77.3150, type: ["trek-base", "offbeat-village"], nearestRailhead: "Joginder Nagar (JDNX)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 1580 },
  { name: "Kaza", state: "Himachal Pradesh", lat: 32.2276, lng: 78.0706, type: ["trek-base", "offbeat-village"], nearestRailhead: "Shimla (SML)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 3650 },
  { name: "Munsyari", state: "Uttarakhand", lat: 30.0682, lng: 80.2372, type: ["trek-base", "offbeat-village"], nearestRailhead: "Kathgodam (KGM)", nearestAirport: "Pantnagar Airport (PGH)", altitude: 2200 },
  { name: "Chitkul", state: "Himachal Pradesh", lat: 31.3522, lng: 78.4354, type: ["offbeat-village"], nearestRailhead: "Shimla (SML)", nearestAirport: "Shimla Airport (SLV)", altitude: 3450 },
  { name: "Kalpa", state: "Himachal Pradesh", lat: 31.5385, lng: 78.2755, type: ["offbeat-village"], nearestRailhead: "Shimla (SML)", nearestAirport: "Shimla Airport (SLV)", altitude: 2960 },
  { name: "Sangla", state: "Himachal Pradesh", lat: 31.4285, lng: 78.2650, type: ["offbeat-village"], nearestRailhead: "Shimla (SML)", nearestAirport: "Shimla Airport (SLV)", altitude: 2680 },
  { name: "Jibhi", state: "Himachal Pradesh", lat: 31.6375, lng: 77.3503, type: ["offbeat-village"], nearestRailhead: "Shimla (SML)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 1600 },
  { name: "Malana", state: "Himachal Pradesh", lat: 32.0573, lng: 77.2604, type: ["offbeat-village"], nearestRailhead: "Joginder Nagar (JDNX)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 2652 },
  { name: "Tosh", state: "Himachal Pradesh", lat: 32.0125, lng: 77.4475, type: ["offbeat-village"], nearestRailhead: "Joginder Nagar (JDNX)", nearestAirport: "Kullu-Manali Airport (UUU)", altitude: 2400 },
  { name: "Landour", state: "Uttarakhand", lat: 30.4632, lng: 78.0934, type: ["offbeat-village"], nearestRailhead: "Dehradun (DDN)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 2286 },
  { name: "Lansdowne", state: "Uttarakhand", lat: 29.8377, lng: 78.6874, type: ["offbeat-village"], nearestRailhead: "Kotdwar (KTW)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 1700 },
  { name: "Binsar", state: "Uttarakhand", lat: 29.7042, lng: 79.7562, type: ["offbeat-village"], nearestRailhead: "Kathgodam (KGM)", nearestAirport: "Pantnagar Airport (PGH)", altitude: 2420 },
  { name: "Chopta", state: "Uttarakhand", lat: 30.4853, lng: 79.0483, type: ["offbeat-village", "trek-base"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 2680 },
  { name: "Bir Billing", state: "Himachal Pradesh", lat: 32.0465, lng: 76.7215, type: ["offbeat-village"], nearestRailhead: "Pathankot (PTK)", nearestAirport: "Kangra Airport (DHM)", altitude: 1525 },

  // Trek Destinations
  { name: "Kedarkantha", state: "Uttarakhand", lat: 31.2281, lng: 78.2045, type: ["trek-destination"], nearestRailhead: "Dehradun (DDN)", altitude: 3810 },
  { name: "Roopkund", state: "Uttarakhand", lat: 30.2642, lng: 79.7314, type: ["trek-destination"], nearestRailhead: "Kathgodam (KGM)", altitude: 5029 },
  { name: "Valley of Flowers", state: "Uttarakhand", lat: 30.7280, lng: 79.6053, type: ["trek-destination"], nearestRailhead: "Rishikesh (RKSH)", altitude: 3658 },
  { name: "Goechala", state: "Sikkim", lat: 27.6042, lng: 88.1678, type: ["trek-destination"], nearestRailhead: "New Jalpaiguri (NJP)", altitude: 4940, rapRequired: true },
  { name: "Kheerganga", state: "Himachal Pradesh", lat: 31.9961, lng: 77.4878, type: ["trek-destination"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 2960 },
  { name: "Hampta Pass", state: "Himachal Pradesh", lat: 32.2238, lng: 77.3719, type: ["trek-destination"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 4270 },
  { name: "Pin Parvati", state: "Himachal Pradesh", lat: 31.8483, lng: 77.8427, type: ["trek-destination"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 5319 },
  { name: "Tirthan Valley", state: "Himachal Pradesh", lat: 31.6385, lng: 77.3482, type: ["offbeat-village", "trek-base"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 1600 },
  { name: "Har Ki Dun", state: "Uttarakhand", lat: 31.1578, lng: 78.3090, type: ["trek-destination"], nearestRailhead: "Dehradun (DDN)", altitude: 3566 },
  { name: "Chandrashila", state: "Uttarakhand", lat: 30.4905, lng: 79.2152, type: ["trek-destination"], nearestRailhead: "Rishikesh (RKSH)", altitude: 3690 },
  { name: "Hemkund Sahib", state: "Uttarakhand", lat: 30.7001, lng: 79.6151, type: ["trek-destination", "spiritual"], nearestRailhead: "Rishikesh (RKSH)", altitude: 4632 },
  { name: "Dzukou Valley", state: "Nagaland", lat: 25.5902, lng: 94.0628, type: ["trek-destination", "northeast"], nearestRailhead: "Dimapur (DMV)", altitude: 2452, ilpRequired: true },
  { name: "Sandakphu", state: "West Bengal", lat: 27.1069, lng: 88.0019, type: ["trek-destination"], nearestRailhead: "New Jalpaiguri (NJP)", altitude: 3636 },
  { name: "Triund", state: "Himachal Pradesh", lat: 32.2575, lng: 76.3575, type: ["trek-destination"], nearestRailhead: "Pathankot (PTK)", altitude: 2850 },
  { name: "Beas Kund", state: "Himachal Pradesh", lat: 32.3688, lng: 77.0988, type: ["trek-destination"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 3700 },
  { name: "Prashar Lake", state: "Himachal Pradesh", lat: 31.7548, lng: 77.1018, type: ["trek-destination"], nearestRailhead: "Joginder Nagar (JDNX)", altitude: 2730 },

  // Spiritual Circuits
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, type: ["spiritual"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 340 },
  { name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, type: ["spiritual"], nearestRailhead: "Haridwar Junction (HW)", nearestAirport: "Jolly Grant Airport (DED)" },
  { name: "Kedarnath", state: "Uttarakhand", lat: 30.7352, lng: 79.0669, type: ["spiritual", "trek-destination"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 3584 },
  { name: "Badrinath", state: "Uttarakhand", lat: 30.7433, lng: 79.4938, type: ["spiritual"], nearestRailhead: "Rishikesh (RKSH)", nearestAirport: "Jolly Grant Airport (DED)", altitude: 3300 },
  { name: "Golden Temple (Amritsar)", state: "Punjab", lat: 31.6199, lng: 74.8765, type: ["spiritual", "heritage-city"], nearestRailhead: "Amritsar Junction (ASR)", nearestAirport: "Sri Guru Ram Dass Jee (ATQ)" },

  // Beaches
  { name: "Goa", state: "Goa", lat: 15.2993, lng: 74.1240, type: ["beach"], nearestRailhead: "Madgaon Junction (MAO)", nearestAirport: "Dabolim Airport (GOI)" },
  { name: "Varkala", state: "Kerala", lat: 8.7379, lng: 76.7163, type: ["beach"], nearestRailhead: "Varkala Sivagiri (VAK)", nearestAirport: "Trivandrum International (TRV)" },
  { name: "Gokarna", state: "Karnataka", lat: 14.5479, lng: 74.3188, type: ["beach"], nearestRailhead: "Gokarna Road (GOK)", nearestAirport: "Dabolim Airport (GOI)" },
  { name: "Kovalam", state: "Kerala", lat: 8.4004, lng: 76.9787, type: ["beach"], nearestRailhead: "Trivandrum Central (TVC)", nearestAirport: "Trivandrum International (TRV)" },
  { name: "Pondicherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, type: ["beach", "heritage-city"], nearestRailhead: "Puducherry (PDY)", nearestAirport: "Chennai International (MAA)" },

  // Wildlife
  { name: "Jim Corbett", state: "Uttarakhand", lat: 29.5300, lng: 78.7747, type: ["wildlife"], nearestRailhead: "Ramnagar (RMR)", nearestAirport: "Pantnagar Airport (PGH)" },
  { name: "Ranthambore", state: "Rajasthan", lat: 25.8672, lng: 76.3008, type: ["wildlife"], nearestRailhead: "Sawai Madhopur (SWM)", nearestAirport: "Jaipur International (JAI)" },
  { name: "Kaziranga", state: "Assam", lat: 26.5775, lng: 93.1711, type: ["wildlife", "northeast"], nearestRailhead: "Furkating (FKG)", nearestAirport: "Jorhat Airport (JRH)" },

  // Northeast Circuits
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, type: ["northeast", "metro"], nearestRailhead: "Guwahati (GHY)", nearestAirport: "Lokpriya Gopinath Bordoloi (GAU)" },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, type: ["northeast", "hill-station"], nearestRailhead: "Guwahati (GHY)", nearestAirport: "Shillong Airport (SHL)", altitude: 1525 },
  { name: "Cherrapunji", state: "Meghalaya", lat: 25.2702, lng: 91.7323, type: ["northeast", "offbeat-village"], nearestRailhead: "Guwahati (GHY)", nearestAirport: "Shillong Airport (SHL)", altitude: 1484 },
  { name: "Mawlynnong", state: "Meghalaya", lat: 25.2016, lng: 91.9056, type: ["northeast", "offbeat-village"], nearestRailhead: "Guwahati (GHY)", nearestAirport: "Shillong Airport (SHL)" },
  { name: "Dawki", state: "Meghalaya", lat: 25.1874, lng: 92.0232, type: ["northeast", "offbeat-village"], nearestRailhead: "Guwahati (GHY)", nearestAirport: "Shillong Airport (SHL)" },
  { name: "Gangtok", state: "Sikkim", lat: 27.3314, lng: 88.6138, type: ["northeast", "hill-station"], nearestRailhead: "New Jalpaiguri (NJP)", nearestAirport: "Pakyong Airport (PYG)", altitude: 1650 },
  { name: "Tawang", state: "Arunachal Pradesh", lat: 27.5861, lng: 91.8594, type: ["northeast", "spiritual", "offbeat-village"], nearestRailhead: "Tezpur (TZTB)", nearestAirport: "Tezpur Airport (TEZ)", altitude: 3048, ilpRequired: true },
  { name: "Ziro", state: "Arunachal Pradesh", lat: 27.6333, lng: 93.8333, type: ["northeast", "offbeat-village"], nearestRailhead: "Naharlagun (NHLN)", nearestAirport: "Lilabari Airport (IXI)", altitude: 1700, ilpRequired: true }
];

export function getDestination(name: string): DestinationInfo | undefined {
  return DESTINATIONS.find((d) => d.name.toLowerCase() === name.toLowerCase());
}

export function getDestinationsByType(type: DestinationType): DestinationInfo[] {
  return DESTINATIONS.filter((d) => d.type.includes(type));
}

export function getAllDestinationNames(): string[] {
  return DESTINATIONS.map((d) => d.name).sort();
}
