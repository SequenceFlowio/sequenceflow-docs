import { notFound } from 'next/navigation';
import Link from 'next/link';
import { navigation } from '@/lib/navigation';
import Header from '@/components/Header';
import ProductNav from '@/components/ProductNav';
import Sidebar from '@/components/Sidebar';

interface Props {
  params: Promise<{ product: string }>;
}

interface AppCard {
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const productApps: Record<string, { headline: string; sub: string; apps: AppCard[] }> = {
  supportflow: {
    headline: 'SupportFlow',
    sub: 'AI-gedreven klantenservice tools voor e-commerce.',
    apps: [
      {
        name: 'Email Reply',
        description: 'Beantwoord klantmails automatisch met AI-concepten die jij goedkeurt via Gmail.',
        href: '/supportflow/introductie',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        ),
      },
    ],
  },
  leadflow: {
    headline: 'LeadFlow',
    sub: 'Drie AI-tools om meer klanten aan te trekken en te converteren.',
    apps: [
      {
        name: 'Ads Generator',
        description: 'Maak merkconforme advertenties voor Meta, Google en LinkedIn in seconden.',
        href: '/leadflow/ads-introductie',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        ),
      },
      {
        name: 'Leads Generator',
        description: 'Vind groeiende bedrijven via vacaturedata en benader ze met gepersonaliseerde cold emails.',
        href: '/leadflow/leads-introductie',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        ),
      },
      {
        name: 'Landing Page Generator',
        description: 'Bouw converterende landingpagina\'s op basis van je product en doelgroep — zonder code.',
        href: '/leadflow/landingpage-introductie',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
            <path d="M15 13h-3m0 0v3m0-3l3 3" />
          </svg>
        ),
        badge: 'Binnenkort',
      },
    ],
  },
  operationsflow: {
    headline: 'OperationsFlow',
    sub: 'Automatiseer je operationele processen. Binnenkort beschikbaar.',
    apps: [
      {
        name: 'OperationsFlow',
        description: 'Meer informatie volgt binnenkort. Volg ons voor updates.',
        href: '/operationsflow/introductie',
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
          </svg>
        ),
        badge: 'Binnenkort',
      },
    ],
  },
};

export default async function ProductIndexPage({ params }: Props) {
  const { product } = await params;

  const productNav = navigation[product];
  if (!productNav) notFound();

  const config = productApps[product];
  if (!config) notFound();

  return (
    <>
      <Header />
      <ProductNav />
      <div className="flex" style={{ paddingTop: '108px', minHeight: '100vh' }}>
        <Sidebar product={product} />
        <main className="flex-1" style={{ marginLeft: '240px' }}>
          <div className="max-w-4xl mx-auto px-12 py-16">
            {/* Hero */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                {config.headline}
              </h1>
              <p className="text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {config.sub}
              </p>
            </div>

            {/* App cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.apps.map((app) => (
                <Link
                  key={app.name}
                  href={app.href}
                  className="group relative rounded-xl border flex flex-col gap-3 p-6 transition-colors hover:border-white/20"
                  style={{
                    backgroundColor: '#111927',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  {app.badge && (
                    <span
                      className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: 'rgba(180,240,0,0.12)',
                        color: '#B4F000',
                        border: '1px solid rgba(180,240,0,0.2)',
                      }}
                    >
                      {app.badge}
                    </span>
                  )}
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(180,240,0,0.1)' }}
                  >
                    {app.icon}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white mb-1 group-hover:text-[#B4F000] transition-colors">
                      {app.name}
                    </h2>
                    <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {app.description}
                    </p>
                  </div>
                  <div
                    className="text-sm font-medium mt-auto pt-2"
                    style={{ color: '#B4F000' }}
                  >
                    Bekijk documentatie →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
