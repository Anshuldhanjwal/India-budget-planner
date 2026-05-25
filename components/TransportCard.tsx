"use client";

import React from "react";
import { TransportOption } from "@/lib/types";
import { Train, Bus, Plane, Award, Clock, ArrowRight, ExternalLink } from "lucide-react";

interface TransportCardProps {
  options: TransportOption[];
}

export default function TransportCard({ options }: TransportCardProps) {
  const getIcon = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "train":
        return <Train className="h-5 w-5 text-amber-600" />;
      case "bus":
        return <Bus className="h-5 w-5 text-green-600" />;
      case "flight":
        return <Plane className="h-5 w-5 text-blue-600" />;
      default:
        return <Train className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {options.map((option, index) => {
        const isRecommended = option.recommended;
        return (
          <div
            key={index}
            className={`relative flex flex-col justify-between bg-white rounded-2xl p-5 border transition-all duration-300 ${
              isRecommended
                ? "border-[#FF9933] shadow-md ring-1 ring-[#FF9933] ring-opacity-50"
                : "border-gray-200 shadow-sm hover:border-gray-300"
            }`}
          >
            {isRecommended && (
              <span className="absolute -top-3 left-4 inline-flex items-center space-x-1 bg-[#FF9933] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                <Award className="h-3 w-3" />
                <span>Recommended</span>
              </span>
            )}

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-gray-50 rounded-xl border border-gray-100">
                    {getIcon(option.mode)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 leading-tight">
                      {option.mode}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {option.className}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-gray-400 block text-xs">
                    Per Person
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    ₹{option.costPerPerson.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-100 pt-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2 text-xs">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-gray-900 font-semibold">
                    {option.durationHours} hrs
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs border-b border-dashed border-gray-100 pb-2">
                  <span className="text-gray-400">Total Group Cost:</span>
                  <span className="font-bold text-gray-900">
                    ₹{option.totalCost.toLocaleString("en-IN")}
                  </span>
                </div>

                {option.trainInfo && (
                  <div className="mt-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100 text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-800">
                        {option.trainInfo.trainName}
                      </span>
                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-mono font-bold text-[10px]">
                        #{option.trainInfo.trainNumber}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-gray-700 font-semibold bg-white p-1.5 rounded-lg border border-amber-50">
                      <span>{option.trainInfo.departureTime}</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <span>{option.trainInfo.arrivalTime}</span>
                    </div>

                    {option.trainInfo.daysOfOperation && option.trainInfo.daysOfOperation.length > 0 && (
                      <div className="text-[10px] text-gray-500 font-medium leading-normal">
                        <span className="font-bold text-gray-600">Runs: </span>
                        {option.trainInfo.daysOfOperation.join(", ")}
                      </div>
                    )}

                    {option.trainInfo.bookingUrl && (
                      <a
                        href={option.trainInfo.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[#FF9933] hover:text-[#e07f24] font-bold text-[11px] mt-1 hover:underline cursor-pointer transition-colors"
                      >
                        <span>Book on IRCTC</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100">
              {option.trainInfo?.bookingUrl ? (
                <a
                  href={option.trainInfo.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-4 rounded-xl font-bold text-sm text-center flex items-center justify-center space-x-1.5 transition-all duration-200 ${
                    isRecommended
                      ? "bg-[#FF9933] hover:bg-[#e07f24] text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <span>Book Ticket</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              ) : (
                <div
                  className={`w-full py-2 px-4 rounded-xl font-bold text-xs text-center ${
                    isRecommended
                      ? "bg-orange-50 text-[#FF9933] border border-orange-100"
                      : "bg-gray-50 text-gray-500 border border-gray-100"
                  }`}
                >
                  Book locally or via booking links
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
