'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

interface SearchPage {
  title: string;
  description: string;
  product: string;
  productName: string;
  group: string;
  slug: string;
  href: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState<SearchPage[]>([]);
  const [results, setResults] = useState<SearchPage[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index once
  useEffect(() => {
    fetch('/api/search')
      .then((r) => r.json())
      .then(setPages);
  }, []);

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  const search = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const fuse = new Fuse(pages, {
        keys: ['title', 'description', 'group', 'productName'],
        threshold: 0.35,
      });
      setResults(fuse.search(q).slice(0, 8).map((r) => r.item));
      setSelected(0);
    },
    [pages]
  );

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const list = results.length ? results : [];
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, list.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === 'Enter' && list[selected]) {
      navigate(list[selected].href);
    }
  }

  const displayResults = results.length
    ? results
    : query
    ? []
    : pages.slice(0, 6);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={() => onClose()}
    >
      <div
        className="w-full max-w-xl rounded-xl border overflow-hidden shadow-2xl"
        style={{ backgroundColor: '#111927', borderColor: 'rgba(255,255,255,0.1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div
          className="flex items-center gap-3 px-4 py-3 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          <svg className="w-4 h-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); search(e.target.value); }}
            onKeyDown={onKeyDown}
            placeholder="Zoek in documentatie..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
          />
          <kbd
            className="text-xs px-1.5 py-0.5 rounded border shrink-0"
            style={{ color: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.1)' }}
          >
            Esc
          </kbd>
        </div>

        {/* Results */}
        <ul className="py-2 max-h-80 overflow-y-auto">
          {displayResults.length === 0 && query ? (
            <li className="px-4 py-6 text-center text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Geen resultaten voor &ldquo;{query}&rdquo;
            </li>
          ) : (
            displayResults.map((page, i) => (
              <li key={page.href}>
                <button
                  onClick={() => navigate(page.href)}
                  onMouseEnter={() => setSelected(i)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{
                    backgroundColor: i === selected ? 'rgba(255,255,255,0.05)' : 'transparent',
                  }}
                >
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm text-white truncate">{page.title}</span>
                    <span className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {page.productName} › {page.group}
                    </span>
                  </div>
                  {i === selected && (
                    <kbd className="text-xs shrink-0" style={{ color: 'rgba(255,255,255,0.3)' }}>↵</kbd>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
