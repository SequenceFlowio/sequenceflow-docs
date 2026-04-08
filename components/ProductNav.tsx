'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { products } from '@/lib/navigation';

export default function ProductNav() {
  const pathname = usePathname();

  const activeProduct = products.find((p) =>
    pathname.startsWith(p.href)
  )?.key;

  return (
    <nav
      className="fixed left-0 right-0 z-40 flex items-center px-6 border-b"
      style={{
        top: '64px',
        height: '44px',
        backgroundColor: '#0B1220',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center gap-1">
        {products.map((product) => {
          const isActive = activeProduct === product.key;
          return (
            <Link
              key={product.key}
              href={product.href}
              className="relative px-4 py-2 text-sm transition-colors"
              style={{
                color: isActive ? '#B4F000' : 'rgba(255,255,255,0.6)',
              }}
            >
              {product.name}
              {isActive && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#B4F000' }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
