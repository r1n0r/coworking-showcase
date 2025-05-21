'use client';

import { useEffect, useState } from 'react';
import OfficeCard from '@/components/cards';
import Filters from '@/components/filters';

type Office = {
  id: string;
  name: string;
  city: string;
  image: string;
  description: string;
  amenities: string[];
  availability: string;
};

export default function OfficesPage() {
  const [officeData, setOfficeData] = useState<Office[]>([]);
  const [filteredOffices, setFilteredOffices] = useState<Office[]>([]);

  useEffect(() => {
    async function loadOffices() {
      const res = await fetch('/api/offices');
      const data = await res.json();
      setOfficeData(data);
      setFilteredOffices(data); // Initial state
    }
    loadOffices();
  }, []);

  const allCities = Array.from(new Set(officeData.map((o) => o.city)));
  const allAmenities = Array.from(
    new Set(officeData.flatMap((o) => o.amenities))
  );

  const handleFilterChange = ({
    city,
    amenities,
  }: {
    city: string;
    amenities: string[];
  }) => {
    const filtered = officeData.filter((office) => {
      const matchCity = city === 'All' || office.city === city;
      const matchAmenities = amenities.every((a) =>
        office.amenities.includes(a)
      );
      return matchCity && matchAmenities;
    });

    setFilteredOffices(filtered);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Offices</h1>

      <Filters
        cities={allCities}
        amenities={allAmenities}
        onFilterChange={handleFilterChange}
      />

      {filteredOffices.length === 0 ? (
        <p className="text-center text-gray-500">No offices match your filters.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredOffices.map((office) => (
            <OfficeCard key={office.id} office={office} />
          ))}
        </div>
      )}
    </main>
  );
}
