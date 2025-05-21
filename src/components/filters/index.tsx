'use client';

import { useState, useEffect, useRef } from 'react';

type Props = {
  cities?: string[];
  amenities?: string[];
  onFilterChange: (filters: {
    city: string;
    amenities: string[];
  }) => void;
};

export default function Filters({
  cities = [],
  amenities = [],
  onFilterChange,
}: Props) {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstCities = cities.slice(0, 5);
  const moreCities = cities.slice(5);

  useEffect(() => {
    onFilterChange({
      city: selectedCity,
      amenities: selectedAmenities,
    });
  }, [selectedCity, selectedAmenities]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="mb-10 space-y-6">
      {/* City Filter */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          className={`px-4 py-2 rounded-full border text-sm ${
            selectedCity === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setSelectedCity('All')}
        >
          All
        </button>

        {firstCities.map((city) => (
          <button
            key={city}
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedCity === city
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}

        {moreCities.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="px-4 py-2 rounded-full border text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              More ▾
            </button>
            {showDropdown && (
              <div className="absolute z-10 mt-2 w-40 bg-white border rounded shadow-md">
                {moreCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedCity === city ? 'bg-blue-100' : ''
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Amenities Filter */}
      <div className="flex flex-wrap gap-4">
        {amenities.map((amenity) => (
          <label key={amenity} className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityToggle(amenity)}
            />
            {amenity}
          </label>
        ))}
      </div>
    </div>
  );
}
