import Link from 'next/link';
import { navigation } from '@/lib/navigation';

interface Props {
  product: string;
  slug: string;
}

function flattenPages(product: string) {
  const nav = navigation[product];
  if (!nav) return [];
  return nav.groups.flatMap((group) =>
    group.pages.map((page) => ({ ...page, product }))
  );
}

export default function PrevNext({ product, slug }: Props) {
  const pages = flattenPages(product);
  const index = pages.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? pages[index - 1] : null;
  const next = index < pages.length - 1 ? pages[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div
      className="flex items-stretch justify-between gap-4 mt-12 pt-8 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    >
      {prev ? (
        <Link
          href={`/${prev.product}/${prev.slug}`}
          className="flex flex-col gap-1 flex-1 px-4 py-3 rounded-xl border transition-colors hover:border-white/20 group"
          style={{
            backgroundColor: '#111927',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            ← Vorige
          </span>
          <span className="text-sm font-medium text-white group-hover:text-[#B4F000] transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={`/${next.product}/${next.slug}`}
          className="flex flex-col gap-1 flex-1 px-4 py-3 rounded-xl border text-right transition-colors hover:border-white/20 group"
          style={{
            backgroundColor: '#111927',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Volgende →
          </span>
          <span className="text-sm font-medium text-white group-hover:text-[#B4F000] transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
