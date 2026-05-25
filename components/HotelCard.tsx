"use client";

import React from "react";
import { Hotel, BudgetLevel } from "@/lib/types";
import { Star, MapPin, Coffee, Wifi, Flame, Shield, ExternalLink } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
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

  // Check amenities and map to icons
  const getAmenityIcon = (amenity: string) => {
    const a = amenity.toLowerCase();
    if (a.includes("wifi") || a.includes("internet")) return <Wifi className="h-3.5 w-3.5" />;
    if (a.includes("breakfast") || a.includes("food") || a.includes("meal")) return <Coffee className="h-3.5 w-3.5" />;
    if (a.includes("water") || a.includes("heater") || a.includes("geyser") || a.includes("hot")) return <Flame className="h-3.5 w-3.5" />;
    return <Shield className="h-3.5 w-3.5" />; // default safety/shield icon
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
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
            {hotel.amenities.map((amenity, idx) => (
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

        {hotel.bookingUrl ? (
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#138808] hover:bg-[#0f6c06] text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
          >
            <span>Book Accomodation</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <div className="w-full bg-gray-50 text-gray-400 text-xs py-2.5 px-4 rounded-xl border border-gray-100 font-bold text-center">
            Homestay / Call to Book
          </div>
        )}
      </div>
    </div>
  );
}
