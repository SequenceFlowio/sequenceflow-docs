import Link from 'next/link';
import Header from '@/components/Header';
import ProductNav from '@/components/ProductNav';

const products = [
  {
    key: 'supportflow',
    name: 'SupportFlow',
    description:
      'Beantwoord klantmails sneller met AI-gegenereerde concepten die jij goedkeurt.',
    href: '/supportflow/introductie',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    quickLinks: [
      { title: 'Introductie', href: '/supportflow/introductie' },
      { title: 'Quickstart', href: '/supportflow/quickstart' },
      { title: 'Gmail koppelen', href: '/supportflow/gmail-koppelen' },
      { title: 'Kennisbank', href: '/supportflow/kennisbank' },
    ],
  },
  {
    key: 'leadflow',
    name: 'LeadFlow',
    description:
      'Advertenties, leads en landingpagina\'s — drie AI-tools om meer klanten te winnen.',
    href: '/leadflow/introductie',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    quickLinks: [
      { title: 'Introductie', href: '/leadflow/introductie' },
      { title: 'Ads Generator', href: '/leadflow/ads-introductie' },
      { title: 'Leads Generator', href: '/leadflow/leads-introductie' },
      { title: 'Landing Page Generator', href: '/leadflow/landingpage-introductie' },
    ],
  },
  {
    key: 'operationsflow',
    name: 'OperationsFlow',
    description:
      'Automatiseer je operationele processen. Binnenkort beschikbaar.',
    href: '/operationsflow/introductie',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B4F000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    quickLinks: [
      { title: 'Introductie', href: '/operationsflow/introductie' },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <ProductNav />
      <main style={{ paddingTop: '108px', minHeight: '100vh' }}>
        {/* Hero */}
        <div className="max-w-4xl mx-auto px-8 pt-16 pb-12 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{
              backgroundColor: 'rgba(180,240,0,0.12)',
              color: '#B4F000',
              border: '1px solid rgba(180,240,0,0.2)',
            }}
          >
            Documentatie
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            SequenceFlow Docs
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Alles wat je nodig hebt om snel aan de slag te gaan met de producten van SequenceFlow.
          </p>
        </div>

        {/* Product cards */}
        <div className="max-w-5xl mx-auto px-8 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product.key}
                className="rounded-xl border overflow-hidden flex flex-col"
                style={{
                  backgroundColor: '#111927',
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
              >
                {/* Card header */}
                <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(180,240,0,0.1)' }}
                  >
                    {product.icon}
                  </div>
                  <h2 className="text-base font-semibold text-white mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm leading-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {product.description}
                  </p>
                </div>

                {/* Quick links */}
                <div className="p-4 flex-1">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2 px-2"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Snel naar
                  </p>
                  <ul className="space-y-0.5">
                    {product.quickLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors hover:text-white"
                          style={{ color: 'rgba(255,255,255,0.55)' }}
                        >
                          <span
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: '#B4F000' }}
                          />
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer link */}
                <div className="px-6 pb-5">
                  <Link
                    href={product.href}
                    className="text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ color: '#B4F000' }}
                  >
                    Alle documentatie →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
