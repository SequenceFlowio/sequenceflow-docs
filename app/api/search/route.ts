import { navigation, pageHref } from '@/lib/navigation';
import { getMdxFile } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export interface SearchPage {
  title: string;
  description: string;
  product: string;
  productName: string;
  group: string;
  slug: string;
  href: string;
}

export async function GET() {
  const pages: SearchPage[] = [];

  for (const [productKey, productNav] of Object.entries(navigation)) {
    for (const group of productNav.groups) {
      for (const page of group.pages) {
        const file = getMdxFile(productKey, page.slug, page.app);
        pages.push({
          title: page.title,
          description: file?.frontMatter.description ?? '',
          product: productKey,
          productName: productNav.name,
          group: group.label,
          slug: page.slug,
          href: pageHref(productKey, page),
        });
      }
    }
  }

  return NextResponse.json(pages);
}
