'use client';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { routes } from '@/constants/routes';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/utils/cn';

const items = [
  { href: routes.dashboard, label: 'Overview', icon: '◫' },
  { href: routes.dashboardDetail('starter'), label: 'Starter page', icon: '◇' },
];

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <>
      <div className='border-b border-slate-200 bg-white p-3 md:hidden'>
        <button
          aria-expanded={isMobileOpen}
          className='flex min-h-10 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-700 hover:bg-slate-50'
          onClick={() => setIsMobileOpen((open) => !open)}
          type='button'
        >
          <span aria-hidden='true'>☰</span>
          {isMobileOpen ? 'Close menu' : 'Open dashboard menu'}
        </button>
      </div>
      {isMobileOpen && (
        <button
          aria-label='Close dashboard menu'
          className='fixed inset-0 z-30 bg-slate-950/30 md:hidden'
          onClick={() => setIsMobileOpen(false)}
          type='button'
        />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white px-3 py-5 transition-[width,transform] duration-200 md:static md:z-auto md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed && 'md:w-20',
        )}
      >
        <div className='mb-8 hidden items-center justify-between px-2 md:flex'>
          {!isCollapsed && (
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>
              Workspace
            </p>
          )}
          <button
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className='grid size-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            onClick={toggleSidebar}
            type='button'
          >
            <span aria-hidden='true'>{isCollapsed ? '»' : '«'}</span>
          </button>
        </div>
        <nav aria-label='Dashboard navigation' className='space-y-1'>
          {items.map((item) => (
            <Link
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700',
                isCollapsed && 'md:justify-center md:px-0',
              )}
              to={item.href}
              key={item.href}
              onClick={() => setIsMobileOpen(false)}
              title={isCollapsed ? item.label : undefined}
            >
              <span aria-hidden='true' className='w-5 text-center text-base'>
                {item.icon}
              </span>
              <span className={cn(isCollapsed && 'md:hidden')}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
