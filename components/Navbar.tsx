import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavItems from './NavItems';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className="navbar bg-orange-600">
      <Link href={'/'}>
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image src="/images/logo.svg" alt="Logo" width={56} height={54} />
        </div>
      </Link>
      <div className="flex items-center gap-8">
        <NavItems />
        <SignedOut>
          <SignInButton>
            <button className='btn-signin text-white border-white'>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
