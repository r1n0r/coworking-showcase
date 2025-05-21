import { notFound } from 'next/navigation';
import officeData from '@/data/offices.json';
import Image from 'next/image';

type Office = {
  id: string;
  name: string;
  city: string;
  image: string;
  description: string;
  amenities: string[];
  availability: { [day: string]: string };
  location: string;
};

type Props = {
  params: {
    slug: string;
  };
};

export default function OfficeDetailPage({ params }: Props) {
  const office = (officeData as Office[]).find(
    (o) => o.id === params.slug
  );

  if (!office) return notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{office.name}</h1>
      <p className="text-gray-500 mb-6">{office.city}</p>

      <Image
        src={office.image}
        alt={office.name}
        width={1000}
        height={600}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />

      <p className="text-lg mb-6">{office.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Amenities</h2>
        <div className="flex flex-wrap gap-2">
          {office.amenities.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {office.availability && typeof office.availability === 'object' && (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-2">Weekly Availability</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
      {Object.entries(office.availability).map(([day, time]) => (
        <div
          key={day}
          className="flex justify-between rounded border px-3 py-2 bg-gray-50"
        >
          <span className="font-medium">{day}</span>
          <span className="text-gray-600">{time}</span>
        </div>
      ))}
    </div>
  </div>
)}


      <iframe
  src={`https://www.google.com/maps?q=${encodeURIComponent(office.location)}&output=embed`}
  width="100%"
  height="300"
  loading="lazy"
  className="rounded-md mt-6 border"
></iframe>

      <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
        Book a Visit
      </button>
    </main>
  );
}
