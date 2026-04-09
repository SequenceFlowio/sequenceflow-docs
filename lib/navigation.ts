export interface Page {
  title: string;
  slug: string;
  app?: string; // subfolder, e.g. 'emailreply', 'ads-generator'
}

export interface Group {
  label: string;
  pages: Page[];
}

export interface ProductNav {
  name: string;
  groups: Group[];
}

export interface Navigation {
  [key: string]: ProductNav;
}

export const navigation: Navigation = {
  supportflow: {
    name: 'SupportFlow',
    groups: [
      {
        label: 'Aan de slag',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
          { title: 'Quickstart', slug: 'quickstart' },
        ],
      },
      {
        label: 'Email Reply',
        pages: [
          { title: 'Introductie', slug: 'introductie', app: 'emailreply' },
          { title: 'Gmail koppelen', slug: 'gmail-koppelen', app: 'emailreply' },
          { title: 'Inbox overzicht', slug: 'overzicht', app: 'emailreply' },
          { title: 'Tickets bekijken', slug: 'tickets-bekijken', app: 'emailreply' },
          { title: 'Drafts goedkeuren', slug: 'drafts-goedkeuren', app: 'emailreply' },
          { title: 'Beleid', slug: 'beleid', app: 'emailreply' },
          { title: 'Kennisbank', slug: 'kennisbank', app: 'emailreply' },
          { title: 'Team', slug: 'team', app: 'emailreply' },
        ],
      },
      {
        label: 'Billing',
        pages: [
          { title: 'Plannen', slug: 'plannen' },
          { title: 'Trial', slug: 'trial' },
        ],
      },
    ],
  },
  leadflow: {
    name: 'LeadFlow',
    groups: [
      {
        label: 'Aan de slag',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
          { title: 'Quickstart', slug: 'quickstart' },
        ],
      },
      {
        label: 'Ads Generator',
        pages: [
          { title: 'Introductie', slug: 'introductie', app: 'ads-generator' },
          { title: 'Ads maken', slug: 'ads-maken', app: 'ads-generator' },
          { title: 'Stijlen', slug: 'stijlen', app: 'ads-generator' },
          { title: 'Templates', slug: 'templates', app: 'ads-generator' },
        ],
      },
      {
        label: 'Leads Generator',
        pages: [
          { title: 'Introductie', slug: 'introductie', app: 'leads-generator' },
          { title: 'Vacatures scrapen', slug: 'vacatures-scrapen', app: 'leads-generator' },
          { title: 'Cold emails', slug: 'cold-emails', app: 'leads-generator' },
        ],
      },
      {
        label: 'Landing Page Generator',
        pages: [
          { title: 'Introductie', slug: 'introductie', app: 'landing-page-generator' },
        ],
      },
      {
        label: 'Billing',
        pages: [{ title: 'Plannen', slug: 'plannen' }],
      },
    ],
  },
  operationsflow: {
    name: 'OperationsFlow',
    groups: [
      {
        label: 'Welkom',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
        ],
      },
    ],
  },
};

export const products = [
  { key: 'supportflow', name: 'SupportFlow', href: '/supportflow' },
  { key: 'leadflow', name: 'LeadFlow', href: '/leadflow' },
  { key: 'operationsflow', name: 'OperationsFlow', href: '/operationsflow' },
];

// Helper: build href for a page
export function pageHref(product: string, page: Page): string {
  return page.app
    ? `/${product}/${page.app}/${page.slug}`
    : `/${product}/${page.slug}`;
}
