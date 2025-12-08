'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { Badge } from '@/components/ui/badge';
import { Menu as MenuIcon, X } from 'lucide-react';
import Menu from '@/components/Menu';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';

/**
 * Navbar Component
 *
 * Renders the website navigation bar with links, user authentication, and a mobile menu.
 * The component is modularized into subcomponents for readability:
 *   - NavigationLinks: renders the main navigation links (Home, Events, Resources, Team)

 *
 * @constant {Array} navLinks - Array of main navigation link objects, each containing:
 *   @property {string} href - URL path for the link
 *   @property {string} label - Display label for the link
 *
 * @constant {Function} closeDropdowns - Closes all dropdowns and mobile menu when a link is clicked
 *
 * @constant {number} points - Current user's points fetched from Firebase
 * 
 * Author: Vincent Zhong
 * Date: 2025-08-31
 */

// If file gets too big in the future, consider making a types.ts file :D
type NavLink = {
  href: string;
  label: string;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/about/officers', label: 'Team' },
];

const NavigationLinks = ({
  path,
  closeDropdowns,
}: {
  path: string;
  closeDropdowns: () => void;
}) => (
  <ul className="flex flex-row items-center gap-10 md:text-lg lg:text-xl">
    {navLinks.map(({ href, label }) => (
      <li key={href} className="pb-0.5">
        <Link
          className={`font-semibold hover:text-hotpink ${
            path === href ? 'text-hotpink' : 'text-grey'
          }`}
          href={href}
          onClick={closeDropdowns}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

export default function Navbar() {
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const { user } = useUser();
  const path = usePathname();

  /** Close all dropdowns and menu */
  const closeDropdowns = () => {
    setAboutDropdownOpen(false);
    setEventsDropdownOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    async function fetchPoints() {
      if (user) {
        const userDocRef = doc(db, 'users', user.id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPoints(userData.points);
        }
      }
    }
    fetchPoints();
  }, [user]);

  return (
    <header className="text-pink py-4 bg-gradient-to-r from-[#fdf2f8] via-white to-[#fdf2f8] shadow-[0px_6px_13.3px_rgba(0,0,0,0.25)] relative rounded-full mt-[2%] mx-auto font-inter font-semibold w-fit pl-8 pr-8">
      <div className="container flex justify-center items-center">
        {/* Desktop navigation */}
        <div className="hidden md:flex md:flex-row items-center text-grey">
          <NavigationLinks path={path || ''} closeDropdowns={closeDropdowns} />
        </div>

        {/* Mobile menu button (optional) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-pink focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
