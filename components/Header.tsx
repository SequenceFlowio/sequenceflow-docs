'use client';

import Link from 'next/link';

export default function Header() {
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
      <Link href="/" className="flex items-center gap-2 mr-8 shrink-0">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{ backgroundColor: '#B4F000', color: '#0B1220' }}
        >
          SF
        </div>
        <span className="font-semibold text-white text-sm">SequenceFlow</span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer"
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
          <span className="text-gray-400 text-sm flex-1">Search...</span>
          <span
            className="text-xs px-1.5 py-0.5 rounded border"
            style={{
              color: 'rgba(255,255,255,0.4)',
              borderColor: 'rgba(255,255,255,0.12)',
            }}
          >
            ⌘K
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 ml-8 shrink-0">
        <Link
          href="/support"
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Support
        </Link>
        <a
          href="https://app.sequenceflow.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#B4F000', color: '#0B1220' }}
        >
          Open SupportFlow →
        </a>
      </div>
    </header>
  );
}
