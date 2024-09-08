"use client";
import React from 'react';
import Link from 'next/link'; 
import { useRouter } from 'next/navigation'; // Import useRouter
import { navlinks } from '../_constants/navlinks';

export function Sidebar() {
  const { pathname } = useRouter(); // Get the current route

  // Helper function to determine if the link is active
  const isActive = (path) => pathname === path;

  return (
    <div className="hidden md:block bg-white">
      <div className="flex h-full max-h-screen flex-col mt-2">
        <div className="flex h-14 items-center px-8 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            ✨
            <span className='font-bold-200'>Bappa Morya✨</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1 mt-4">
          <nav className="flex flex-col gap-1 px-2 text-sm font-medium lg:px-4">
            {navlinks.map(({ href, label, icon: Icon }) => (
              <Link 
                key={href}
                href={href} 
                className={`hover:text-primary
                    cursor-pointer hover:scale-105
                    transition-all ease-in-out flex gap-3 mb-2 text-[14px] ${
                  isActive(href) 
                    ? 'bg-green-100 p-3 rounded-lg' 
                    : 'bg-gray-100 p-3 rounded-lg'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
