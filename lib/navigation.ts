export interface Page {
  title: string;
  slug: string;
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
        label: 'Welkom',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
          { title: 'Quickstart', slug: 'quickstart' },
          { title: 'Gmail koppelen', slug: 'gmail-koppelen' },
        ],
      },
      {
        label: 'Inbox',
        pages: [
          { title: 'Overzicht', slug: 'overzicht' },
          { title: 'Tickets bekijken', slug: 'tickets-bekijken' },
          { title: 'Drafts goedkeuren', slug: 'drafts-goedkeuren' },
        ],
      },
      {
        label: 'Instellingen',
        pages: [
          { title: 'Beleid', slug: 'beleid' },
          { title: 'Kennisbank', slug: 'kennisbank' },
          { title: 'Team', slug: 'team' },
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
  'ads-generator': {
    name: 'Ads Generator',
    groups: [
      {
        label: 'Aan de slag',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
          { title: 'Quickstart', slug: 'quickstart' },
          { title: 'Eerste ad maken', slug: 'eerste-ad-maken' },
        ],
      },
      {
        label: 'Ads maken',
        pages: [
          { title: 'Static ads', slug: 'static-ads' },
          { title: 'Stijlen', slug: 'stijlen' },
          { title: 'Templates', slug: 'templates' },
        ],
      },
      {
        label: 'Billing',
        pages: [{ title: 'Plannen', slug: 'plannen' }],
      },
    ],
  },
  'lead-generator': {
    name: 'Lead Generator',
    groups: [
      {
        label: 'Aan de slag',
        pages: [
          { title: 'Introductie', slug: 'introductie' },
          { title: 'Quickstart', slug: 'quickstart' },
        ],
      },
      {
        label: 'Leads',
        pages: [
          { title: 'Vacatures scrapen', slug: 'vacatures-scrapen' },
          { title: 'Cold emails', slug: 'cold-emails' },
        ],
      },
      {
        label: 'Billing',
        pages: [{ title: 'Plannen', slug: 'plannen' }],
      },
    ],
  },
};

export const products = [
  { key: 'supportflow', name: 'SupportFlow', href: '/supportflow' },
  { key: 'ads-generator', name: 'Ads Generator', href: '/ads-generator' },
  { key: 'lead-generator', name: 'Lead Generator', href: '/lead-generator' },
];
