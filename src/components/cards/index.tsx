'use client';

import Link from 'next/link';
import Image from 'next/image';

type Office = {
  id: string;
  name: string;
  city: string;
  image: string;
  amenities: string[];
};

export default function OfficeCard({ office }: { office: Office }) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
      <Image
        src={office.image}
        alt={office.name}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{office.name}</h3>
        <p className="text-sm text-gray-500">{office.city}</p>
        <div className="flex flex-wrap gap-2 mt-3 text-xs">
          {office.amenities.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/offices/${office.id}`}
          className="inline-block mt-4 text-sm text-blue-600 hover:underline"
        >
          View More →
        </Link>
      </div>
    </div>
  );
}
