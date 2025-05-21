'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo / Site Name */}
        <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
          Coworking<span className="text-blue-600">Space</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/offices" className="hover:text-blue-600">Offices</Link>
          <Link href="#" className="hover:text-blue-600">Pricing</Link>
          <Link href="#" className="hover:text-blue-600">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="text-xs px-3 py-1.5 border rounded-md text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </header>
  );
}
