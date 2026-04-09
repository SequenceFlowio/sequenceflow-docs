'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import SearchModal from './SearchModal';

const productConfig: Record<
  string,
  {
    label: string;
    apps: { name: string; href: string; description: string }[];
  }
> = {
  supportflow: {
    label: 'SupportFlow',
    apps: [
      {
        name: 'Email Reply',
        href: 'https://emailreply.sequenceflow.io',
        description: 'AI-gegenereerde e-mailconcepten',
      },
    ],
  },
  leadflow: {
    label: 'LeadFlow',
    apps: [
      {
        name: 'Ads Generator',
        href: 'https://ads.sequenceflow.io/',
        description: 'Genereer merkconforme advertenties',
      },
      {
        name: 'Leads Generator',
        href: 'https://outreach.sequenceflow.io/',
        description: 'Vind en benader leads automatisch',
      },
      {
        name: 'Landing Page Generator',
        href: 'https://sequenceflow.io',
        description: 'Bouw converterende landingpagina\'s',
      },
    ],
  },
  operationsflow: {
    label: 'OperationsFlow',
    apps: [],
  },
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const product = Object.keys(productConfig).find((key) =>
    pathname.startsWith(`/${key}`)
  );
  const config = product ? productConfig[product] : null;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 border-b"
      style={{
        height: '64px',
        backgroundColor: '#0B1220',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center mr-8 shrink-0">
        <Image
          src="/logo-wit.png"
          alt="SequenceFlow"
          width={140}
          height={36}
          className="h-7 w-auto"
          priority
        />
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors hover:border-white/20"
          style={{
            backgroundColor: '#111927',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <span className="text-gray-400 text-sm flex-1 text-left">Zoeken...</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded border"
            style={{
              color: 'rgba(255,255,255,0.4)',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          >
            ⌘K
          </span>
        </button>
      </div>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Right side */}
      <div className="flex items-center gap-4 ml-8 shrink-0">
        <Link
          href="/support"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Support
        </Link>

        {config && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90 flex items-center gap-1.5"
              style={{ backgroundColor: '#B4F000', color: '#0B1220' }}
            >
              Go to apps
              <svg
                className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {open && (
              <div
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border overflow-hidden shadow-xl"
                style={{
                  backgroundColor: '#111927',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                <div className="p-1">
                  {config.apps.map((app) => (
                    <a
                      key={app.name}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium text-white">{app.name}</span>
                      <span className="text-xs text-gray-400">{app.description}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
