'use client';

import Image from 'next/image';
import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left: Text */}
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Smarter flexible <br />
            office space.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Find the perfect workspace, optimize your real estate portfolio, and
            streamline hybrid team collaboration—all from one platform.
          </p>

          <div className="flex w-full max-w-md">
            <input
              type="text"
              placeholder="Find workspace nearby"
              className="flex-grow px-4 py-3 rounded-l-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none"
            />
            <button className="px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-r-md hover:opacity-90 transition">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right: Image + Overlays */}
        <div className="relative">
          <Image
            src="/images/hero.jpg" // ← replace with your own image
            alt="Team working together"
            width={500}
            height={500}
            className="rounded-xl shadow-lg"
          />
          {/* Optional overlays can go here */}
        </div>
      </div>
    </section>
  );
}
