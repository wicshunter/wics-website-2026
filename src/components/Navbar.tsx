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
  { href: '/about/officers', label: 'E-Board' },
  { href: '/resources', label: 'Resources' },
];


const NavigationLinks = ({
  path,
  closeDropdowns,
}: {
  path: string;
  closeDropdowns: () => void;
}) => (
  <ul className="flex flex-row items-center gap-20">
    {navLinks.map(({ href, label }) => (
      <li key={href} className="pb-0.5">
        <Link
          style={{
            fontFamily: 'var(--font-press-start), monospace',
          }}
          className={`text-[11px] font-normal hover:text-hotpink ${
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
    <header className="relative mx-auto mt-6 w-full max-w-7xl px-6">
      <div className="flex items-center gap-6">

        {/* WiCS Logo */}
        <Link href="/" className="shrink-0">
          <img
            src="/images/wics_logo.png"
            alt="Hunter College WiCS Logo"
            className="h-36 w-36 object-contain"
          />
        </Link>

        {/* Pink Navigation Bar */}
        <div className="flex flex-1 items-center justify-center rounded-full border border-[#F4C2D7] bg-[#FFF7FA] px-8 py-4 font-press-start font-semibold shadow-[0_4px_16px_rgba(185,163,213,0.15)]">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-grey">
            <NavigationLinks
              path={path || ''}
              closeDropdowns={closeDropdowns}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-pink focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Existing Mobile Menu */}
      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );

}
