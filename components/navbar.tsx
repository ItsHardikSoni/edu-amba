'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Handle scroll events to set scrolled state and close menu
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled, isMenuOpen]);

  // Handle clicks outside the navbar to close the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClasses = `fixed top-4 left-1/2 backdrop-blur -translate-x-1/2 w-[95%] max-w-7xl z-20 transition-all duration-300 ${
    scrolled
      ? `py-2 glassmorphism shadow-lg ${isMenuOpen ? 'rounded-2xl' : 'rounded-full'}`
      : `py-3 ${isMenuOpen ? 'bg-white shadow-lg rounded-2xl' : 'bg-transparent'}`
  }`;

  return (
    <header ref={navRef} className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Link href='/' className="flex items-center space-x-2">
            <img src="/icon.png" alt="Tagore Vidyapeeth Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-gray-900">Tagore Vidyapeeth</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900 font-semibold">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-semibold">Log in</Link>
          {/* <a href="#" className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600">Start Learning</a> */}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-900 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="text-gray-600 hover:text-gray-900 font-semibold block rounded-md px-3 py-2 text-base">
                {item.name}
              </Link>
            ))}
            <Link href="/admin" className="text-gray-600 hover:text-gray-900 font-semibold block rounded-md px-3 py-2 text-base">Log in</Link>
          </div>
        </div>
      )}
    </header>
  );
}
