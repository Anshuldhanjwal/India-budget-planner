"use client";

import React from "react";
import { BookingLink } from "@/lib/types";
import {
  ExternalLink,
  Train,
  Bus,
  Plane,
  Hotel,
  FileCheck,
  Compass
} from "lucide-react";

interface BookingHubProps {
  bookingLinks: BookingLink[];
  destinationState?: string;
}

// RTC State booking links database
const RTC_LINKS_DB: Record<string, BookingLink> = {
  "himachal pradesh": {
    label: "HRTC (Himachal State Buses)",
    url: "https://www.hrtchp.com/",
    category: "state-bus",
    tips: "Book local and luxury Volvo buses directly from Delhi/Chandigarh to Kaza, Spiti, Kulu, and Manali."
  },
  "uttarakhand": {
    label: "UTC (Uttarakhand Transport Corporation)",
    url: "https://utconline.uk.gov.in/",
    category: "state-bus",
    tips: "Reliable government bookings to Rishikesh, Haridwar, Dehradun, and Kathgodam."
  },
  "karnataka": {
    label: "KSRTC (Karnataka State Road Transport)",
    url: "https://www.ksrtc.in/",
    category: "state-bus",
    tips: "Book luxury Airavat buses to Mysore, Coorg, Hampi, and Gokarna."
  },
  "kerala": {
    label: "KSRTC Kerala (Kerala State Buses)",
    url: "https://online.keralartc.com/",
    category: "state-bus",
    tips: "Connects Cochin, Munnar, Alleppey, and Trivandrum with reliable schedules."
  },
  "maharashtra": {
    label: "MSRTC (Maharashtra Road Transport)",
    url: "https://msrtc.maharashtra.gov.in/",
    category: "state-bus",
    tips: "State-run buses connecting Mumbai/Pune to Mahabaleshwar, Lonavala, and Shirdi."
  },
  "sikkim": {
    label: "SNT (Sikkim Nationalised Transport)",
    url: "https://www.sikkim.gov.in/",
    category: "state-bus",
    tips: "Book shared Sumos and local transport buses from Siliguri/Bagdogra to Gangtok."
  },
  "tamil nadu": {
    label: "SETC (Tamil Nadu Transport)",
    url: "https://www.tnstc.in/",
    category: "state-bus",
    tips: "Government express buses connecting Chennai/Bangalore to Ooty, Kodaikanal, and Madurai."
  },
  "jammu & Kashmir": {
    label: "JKSRTC (J&K Road Transport)",
    url: "http://jksrtc.co.in/",
    category: "state-bus",
    tips: "State buses connecting Srinagar, Jammu, Leh, and Kargil sectors."
  },
  "ladakh": {
    label: "JKSRTC (J&K Road Transport)",
    url: "http://jksrtc.co.in/",
    category: "state-bus",
    tips: "Connects Srinagar to Leh, Kargil, and Manali route buses."
  }
};

export default function BookingHub({
  bookingLinks: initialBookingLinks,
  destinationState = ""
}: BookingHubProps) {
  // Filter RTC link based on destination state
  const stateKey = destinationState.toLowerCase().trim();
  const matchedRtc = RTC_LINKS_DB[stateKey];

  // Merge the standard links with the matched RTC link if it's not already there
  const allLinks = [...initialBookingLinks];
  if (matchedRtc && !allLinks.some((l) => l.url === matchedRtc.url)) {
    allLinks.push(matchedRtc);
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "train":
        return <Train className="h-4.5 w-4.5 text-amber-600" />;
      case "bus":
      case "state-bus":
        return <Bus className="h-4.5 w-4.5 text-green-600" />;
      case "flight":
        return <Plane className="h-4.5 w-4.5 text-blue-600" />;
      case "hotel":
        return <Hotel className="h-4.5 w-4.5 text-indigo-600" />;
      case "permit":
        return <FileCheck className="h-4.5 w-4.5 text-red-500" />;
      default:
        return <Compass className="h-4.5 w-4.5 text-gray-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "train":
        return "IRCTC & Train Bookings";
      case "bus":
        return "Private Bus Bookings";
      case "state-bus":
        return "Government Bus RTCs";
      case "flight":
        return "Flight Operators";
      case "hotel":
        return "Lodging & Stay Bookings";
      case "permit":
        return "Government Permits & Passes";
      default:
        return "Other Booking Links";
    }
  };

  // Group links
  const categories = Array.from(new Set(allLinks.map((link) => link.category)));

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-150 pb-4">
        <h4 className="font-extrabold text-gray-900 text-base leading-tight">
          India Booking & Ticket Hub
        </h4>
        <p className="text-xs text-gray-400 font-semibold mt-0.5">
          Reserve your trains, buses, stays, and permits via verified deep links
        </p>
      </div>

      {/* Featured RTC Link Banner */}
      {matchedRtc && (
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-3.5 shadow-2xs">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl mt-0.5">
            <Bus className="h-5 w-5 animate-bounce" />
          </div>
          <div className="flex-1 text-xs">
            <h5 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <span>Government State Transport Connected: {destinationState}</span>
              <span className="px-2 py-0.2 bg-emerald-200 text-emerald-850 text-[9px] uppercase font-bold rounded-full">
                Active RTC
              </span>
            </h5>
            <p className="text-emerald-800 font-medium leading-relaxed mt-1">
              {matchedRtc.tips}
            </p>
            <div className="mt-2.5">
              <a
                href={matchedRtc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-1.5 rounded-xl inline-flex items-center space-x-1 hover:underline transition-colors"
              >
                <span>Go to {matchedRtc.label}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Booking Categories list */}
      <div className="space-y-6 text-xs">
        {categories.map((cat) => {
          const catLinks = allLinks.filter((l) => l.category === cat);

          return (
            <div key={cat} className="space-y-3">
              <h5 className="font-extrabold text-gray-950 flex items-center space-x-2 border-b border-gray-100 pb-1.5">
                <span className="p-1 bg-gray-50 rounded-lg border border-gray-150">
                  {getCategoryIcon(cat)}
                </span>
                <span>{getCategoryLabel(cat)}</span>
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-gray-150 hover:border-gray-250 rounded-2xl flex flex-col justify-between hover:shadow-2xs transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-gray-900 text-[13px] leading-tight">
                          {link.label}
                        </span>
                        <span className="px-2 py-0.5 bg-orange-50 text-[#FF9933] border border-orange-100/50 rounded-md font-bold text-[8px] uppercase">
                          {cat}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {link.tips}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#FF9933] hover:text-[#e07f24] font-black group-hover:underline"
                      >
                        <span>Direct Booking Link</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
