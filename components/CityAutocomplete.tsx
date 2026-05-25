"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapPin, ChevronDown, X } from "lucide-react";
import { getAllDestinationNames, getDestination } from "@/lib/destinations";

interface CityAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  excludeValue?: string;
}

export default function CityAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  excludeValue
}: CityAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [prevValue, setPrevValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync searchTerm when value changes externally (during render)
  if (value !== prevValue) {
    setPrevValue(value);
    setSearchTerm(value || "");
  }

  // Fetch all cities from registry
  const cities = useMemo(() => {
    return getAllDestinationNames();
  }, []);

  // Filter based on search input & exclusions
  const filteredCities = useMemo(() => {
    return cities.filter(city => {
      const matchesSearch = city.toLowerCase().includes(searchTerm.toLowerCase());
      const isNotExcluded = excludeValue ? city.toLowerCase() !== excludeValue.toLowerCase() : true;
      return matchesSearch && isNotExcluded;
    });
  }, [cities, searchTerm, excludeValue]);

  // Handle clicking outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (cityName: string) => {
    onChange(cityName);
    setSearchTerm(cityName);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setSearchTerm("");
    setIsOpen(true);
  };

  // Find info to display type badge (e.g. Metro, Trek Base)
  const getCityBadge = (name: string) => {
    const info = getDestination(name);
    if (!info) return null;
    const primaryType = info.type[0];
    const badgeColors: Record<string, string> = {
      metro: "bg-blue-100 text-blue-800",
      "heritage-city": "bg-amber-100 text-amber-800",
      "hill-station": "bg-emerald-100 text-emerald-800",
      "trek-base": "bg-indigo-100 text-indigo-800",
      "trek-destination": "bg-violet-100 text-violet-800",
      "offbeat-village": "bg-teal-100 text-teal-800",
      spiritual: "bg-orange-100 text-orange-800",
      beach: "bg-sky-100 text-sky-800",
      wildlife: "bg-red-100 text-red-800",
      northeast: "bg-pink-100 text-pink-800"
    };

    const formattedTypes: Record<string, string> = {
      metro: "Metro",
      "heritage-city": "Heritage",
      "hill-station": "Hill Station",
      "trek-base": "Trek Base",
      "trek-destination": "Trek Summit",
      "offbeat-village": "Offbeat",
      spiritual: "Spiritual",
      beach: "Beach",
      wildlife: "Wildlife",
      northeast: "Northeast"
    };

    return (
      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badgeColors[primaryType] || "bg-gray-100 text-gray-800"}`}>
        {formattedTypes[primaryType] || primaryType}
      </span>
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white placeholder-gray-400 text-sm shadow-sm transition-all"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-1">
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg border border-gray-200 focus:outline-none">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city}
                className="relative cursor-pointer select-none py-2.5 pl-3 pr-9 text-gray-900 hover:bg-amber-50 hover:text-amber-900 transition-colors flex items-center justify-between"
                onClick={() => handleSelect(city)}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className={city === value ? "font-semibold text-amber-700" : "font-normal"}>
                    {city}
                  </span>
                </div>
                {getCityBadge(city)}
              </li>
            ))
          ) : (
            <li className="relative cursor-default select-none py-3 px-4 text-gray-500 text-center">
              No matching destinations found
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
