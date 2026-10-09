import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { Mail } from 'lucide-react';

/**
 * Footer Component
 *
 * Renders the website footer with a site title, navigation links, social media icons,
 * and a copyright notice. The component is modularized into subcomponents for readability:
 *   - MenuLinks: renders the list of navigation links (About, Events, Resources, Team, Contact)
 *   - SocialIcons: renders clickable social media icons (Email, LinkedIn, Instagram, Discord)
 *
 * @constant {Array} menuLinks - Array of navigation link objects, each containing:
 *   @property {string} href - URL path for the link
 *   @property {string} label - Display label for the link
 *
 * @constant {Array} socialLinks - Array of social media link objects, each containing:
 *   @property {string} href - URL for the social link
 *   @property {JSX.Element|IconDefinition} icon - Icon component or FontAwesome icon
 *   @property {boolean} [isFontAwesome] - Indicates if the icon is a FontAwesome icon
 *
 * Author: Vincent Zhong
 * Date: 2025-08-31
 */

// Menu links
const menuLinks = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/about/officers', label: 'Team' },
  { href: '/contact', label: 'Contact' },
];

// Social links
const socialLinks = [
  { href: 'mailto:hunterwics@gmail.com', icon: <Mail /> },
  {
    href: 'https://www.linkedin.com/company/hunterwics/',
    icon: faLinkedin,
    isFontAwesome: true,
  },
  {
    href: 'https://www.instagram.com/hunterwics/',
    icon: faInstagram,
    isFontAwesome: true,
  },
  {
    href: 'https://discord.gg/mw2ZxPu7',
    icon: faDiscord,
    isFontAwesome: true,
  },
];

// Component for menu links

const MenuLinks = () => (
  <ul
    className="flex flex-col sm:flex-row sm:gap-6 items-center gap-3 text-[10px] text-[#4B5563]"
    style={{ fontFamily: "var(--font-press-start), monospace" }}
  >
    {menuLinks.map(({ href, label }) => (
      <li key={href}>
        <Link
          className="transition-colors duration-200 hover:text-[#D96A9C]"
          href={href}
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
);

// Component for social icons
const SocialIcons = () => (
  <div className="flex justify-center">
    {socialLinks.map(({ href, icon, isFontAwesome }, idx) => (
      <a
        key={idx}
        href={href}
        target="_blank"
        className="px-2"
        rel="noreferrer"
      >
        {isFontAwesome ? (
          <FontAwesomeIcon
            icon={icon}
            className="hover:scale-150 hover:text-hotpink w-6 h-6 duration-1000 ease-in-out"
          />
        ) : (
          React.cloneElement(icon as React.ReactElement, {
            className:
              'hover:scale-150 hover:text-hotpink w-6 h-6 duration-1000 ease-in-out',
          })
        )}
      </a>
    ))}
  </div>
);

export default function Footer() {
  return (
    <footer className="text-black py-8">
      <div className="container mx-auto px-10">
        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="flex flex-row justify-between w-[90%] mx-auto items-center gap-8 text-600">
            <h3 className="text-black font-bold text-l">
              <Link
                className="hover:text-hotpink transition duration-1000 ease-in-out"
                href="/"
              >
                Hunter WiCS
              </Link>
            </h3>
            <MenuLinks />
            <SocialIcons />
          </div>

          <span className="block border-t border-[#4b55636b] my-4 w-[90%]"></span>
          <h1 className="text-[#4B5563] pb-2 text-sm">
            © 2026 Hunter WiCS. All rights reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
}
