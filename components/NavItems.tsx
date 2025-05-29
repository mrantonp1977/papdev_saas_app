"use client"

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className='flex items-center text-lg font-semibold gap-4 text-white'>
      {navItems.map(({ label, href }) => (
        <Link href={href} key={label} className={cn(pathname === href && "text-yellow-300 font-bold")}>
          {label}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems