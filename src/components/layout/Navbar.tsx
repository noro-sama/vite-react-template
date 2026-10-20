'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { routes } from '@/constants/routes';
import { Button } from '@/components/ui/Button';

const links = [
  { href: routes.home, label: 'Home' },
  { href: routes.dashboard, label: 'Dashboard' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='relative z-30 border-b border-slate-200 bg-white'>
      <nav
        aria-label='Main navigation'
        className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'
      >
        <Link
          className='flex items-center gap-2 font-semibold tracking-tight text-slate-950'
          to={routes.home}
        >
          <span className='grid size-8 place-items-center rounded-lg bg-indigo-600 text-sm font-bold text-white'>
            L
          </span>
          Launchpad
        </Link>
        <div className='hidden items-center gap-7 md:flex'>
          {links.map((link) => (
            <Link
              className='text-sm font-medium text-slate-600 transition hover:text-indigo-600'
              to={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className='text-sm font-medium text-slate-600 transition hover:text-indigo-600'
            to={routes.login}
          >
            Sign in
          </Link>
        </div>
        <Button
          aria-expanded={isMenuOpen}
          aria-label={
            isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
          }
          className='md:hidden'
          onClick={() => setIsMenuOpen((open) => !open)}
          size='sm'
          type='button'
          variant='ghost'
        >
          <span aria-hidden='true' className='text-xl leading-none'>
            {isMenuOpen ? '×' : '☰'}
          </span>
        </Button>
      </nav>
      {isMenuOpen && (
        <div className='absolute inset-x-0 top-full border-b border-slate-200 bg-white p-4 shadow-lg md:hidden'>
          <div className='mx-auto flex max-w-7xl flex-col gap-1'>
            {[...links, { href: routes.login, label: 'Sign in' }].map(
              (link) => (
                <Link
                  className='rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50'
                  to={link.href}
                  key={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
