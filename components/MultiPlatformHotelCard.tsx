"use client";

import React from "react";
import { Hotel, BudgetLevel } from "@/lib/types";
import { Star, MapPin, Coffee, Wifi, Flame, Shield, ExternalLink } from "lucide-react";
import { HOTEL_PLATFORMS, buildBookingUrl } from "@/lib/bookingPlatforms";

interface MultiPlatformHotelCardProps {
  hotel: Hotel;
  params: {
    source: string;
    destination: string;
    date: string;
    checkin: string;
    checkout: string;
    travelers: number;
    destinationInfo: any;
  };
}

export default function MultiPlatformHotelCard({ hotel, params }: MultiPlatformHotelCardProps) {
  // Budget Level styling
  const budgetLabels: Record<BudgetLevel, string> = {
    "ultra-budget": "Ultra Budget (Backpacker)",
    "budget": "Budget (Standard)",
    "moderate": "Moderate (Comfort)"
  };

  const budgetColors: Record<BudgetLevel, string> = {
    "ultra-budget": "bg-emerald-50 text-emerald-800 border-emerald-100",
    "budget": "bg-orange-50 text-orange-800 border-orange-100",
    "moderate": "bg-blue-50 text-blue-800 border-blue-100"
  };

  const getAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes("wifi") || a.includes("internet")) return <Wifi className="h-3.5 w-3.5" />;
    if (a.includes("breakfast") || a.includes("food") || a.includes("meal")) return <Coffee className="h-3.5 w-3.5" />;
    if (a.includes("water") || a.includes("heater") || a.includes("geyser") || a.includes("hot")) return <Flame className="h-3.5 w-3.5" />;
    return <Shield className="h-3.5 w-3.5" />;
  };

  // Generate links to different platforms specifically searching for this hotel
  // By passing the hotel name as the destination/query
  const getHotelPlatformUrl = (platformName: string) => {
    const platform = HOTEL_PLATFORMS.find(p => p.name.toLowerCase().includes(platformName.toLowerCase()));
    if (!platform) return null;

    // Use hotel name + location as the query
    const hotelQuery = `${hotel.name}, ${hotel.location}`;
    return buildBookingUrl(platform, {
      ...params,
      destination: hotelQuery
    });
  };

  // Select platforms to display side-by-side
  const platformsToDisplay = [
    { name: "MMT", label: "MMT", icon: "🏨" },
    { name: "Booking.com", label: "Booking", icon: "🏨" },
    { name: "Goibibo", label: "Goibibo", icon: "🏨" },
    { name: "Airbnb", label: "Airbnb", icon: "🏡" }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Rating and Budget Level */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${budgetColors[hotel.budgetLevel] || budgetColors.budget}`}>
            {budgetLabels[hotel.budgetLevel] || hotel.budgetLevel}
          </span>
          <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-[11px] font-bold">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Hotel Name */}
        <h4 className="font-extrabold text-gray-900 group-hover:text-[#FF9933] transition-colors leading-snug">
          {hotel.name}
        </h4>

        {/* Location */}
        <div className="flex items-center space-x-1 text-[11px] text-gray-500 font-semibold mt-1">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span>{hotel.location}</span>
        </div>

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {hotel.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 text-[10px] font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg border border-gray-100"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cost & Booking */}
      <div className="border-t border-gray-100 pt-4 mt-5">
        <div className="flex justify-between items-end mb-3.5">
          <div>
            <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
              Est. Nightly Rate
            </span>
            <span className="text-xl font-black text-gray-900 leading-tight">
              ₹{hotel.costPerNight.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 font-bold mb-0.5">
            Excl. GST
          </span>
        </div>

        {/* Booking Platform Links Grid */}
        <div className="space-y-2">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Compare Booking Links
          </div>
          <div className="grid grid-cols-2 gap-2">
            {platformsToDisplay.map((plat) => {
              const url = getHotelPlatformUrl(plat.name);
              if (!url) return null;

              return (
                <a
                  key={plat.name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  title={`Search for ${hotel.name} on ${plat.name}`}
                  className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-bold py-2 px-2.5 rounded-xl transition-all shadow-3xs"
                >
                  <span className="flex items-center space-x-1">
                    <span>{plat.icon}</span>
                    <span>{plat.label}</span>
                  </span>
                  <ExternalLink className="h-2.5 w-2.5 text-slate-400" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
