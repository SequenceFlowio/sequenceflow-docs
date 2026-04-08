import { redirect, notFound } from 'next/navigation';
import { navigation } from '@/lib/navigation';

interface Props {
  params: Promise<{ product: string }>;
}

export default async function ProductIndexPage({ params }: Props) {
  const { product } = await params;

  const productNav = navigation[product];
  if (!productNav) {
    notFound();
  }

  const firstGroup = productNav.groups[0];
  const firstPage = firstGroup?.pages[0];

  if (!firstPage) {
    notFound();
  }

  redirect(`/${product}/${firstPage.slug}`);
}
