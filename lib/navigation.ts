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
          { title: 'Introductie', slug: 'ads-introductie' },
          { title: 'Ads maken', slug: 'ads-maken' },
          { title: 'Stijlen', slug: 'ads-stijlen' },
          { title: 'Templates', slug: 'ads-templates' },
        ],
      },
      {
        label: 'Leads Generator',
        pages: [
          { title: 'Introductie', slug: 'leads-introductie' },
          { title: 'Vacatures scrapen', slug: 'leads-vacatures' },
          { title: 'Cold emails', slug: 'leads-cold-emails' },
        ],
      },
      {
        label: 'Landing Page Generator',
        pages: [
          { title: 'Introductie', slug: 'landingpage-introductie' },
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
  { key: 'supportflow', name: 'SupportFlow', href: '/supportflow/introductie' },
  { key: 'leadflow', name: 'LeadFlow', href: '/leadflow/introductie' },
  { key: 'operationsflow', name: 'OperationsFlow', href: '/operationsflow/introductie' },
];
