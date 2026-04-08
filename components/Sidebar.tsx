'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/navigation';

interface SidebarProps {
  product: string;
}

export default function Sidebar({ product }: SidebarProps) {
  const pathname = usePathname();
  const productNav = navigation[product];

  if (!productNav) return null;

  return (
    <aside
      className="fixed left-0 overflow-y-auto border-r"
      style={{
        top: '108px',
        bottom: 0,
        width: '240px',
        backgroundColor: '#0B1220',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="p-4 space-y-6">
        {productNav.groups.map((group) => (
          <div key={group.label}>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.pages.map((page) => {
                const href = `/${product}/${page.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={page.slug}>
                    <Link
                      href={href}
                      className="block px-3 py-1.5 rounded-md text-sm transition-colors"
                      style={{
                        color: isActive ? '#B4F000' : 'rgba(255,255,255,0.65)',
                        backgroundColor: isActive
                          ? 'rgba(180,240,0,0.08)'
                          : 'transparent',
                      }}
                    >
                      {page.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
