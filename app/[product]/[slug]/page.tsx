import { notFound } from 'next/navigation';
import { getMdxFile, getAllSlugs } from '@/lib/mdx';
import { navigation } from '@/lib/navigation';
import Header from '@/components/Header';
import ProductNav from '@/components/ProductNav';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MdxContent from '@/components/MdxContent';

interface Props {
  params: Promise<{ product: string; slug: string }>;
}

export async function generateStaticParams() {
  const params: { product: string; slug: string }[] = [];

  for (const product of Object.keys(navigation)) {
    const slugs = getAllSlugs(product);
    for (const slug of slugs) {
      params.push({ product, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { product, slug } = await params;
  const file = getMdxFile(product, slug);

  if (!file) return {};

  return {
    title: `${file.frontMatter.title} – SequenceFlow Docs`,
    description: file.frontMatter.description,
  };
}

function extractSections(content: string) {
  const headingRegex = /^## (.+)$/gm;
  const sections: { id: string; title: string }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    sections.push({ id, title });
  }

  return sections;
}

export default async function DocPage({ params }: Props) {
  const { product, slug } = await params;

  if (!navigation[product]) {
    notFound();
  }

  const file = getMdxFile(product, slug);

  if (!file) {
    notFound();
  }

  const sections = extractSections(file.content);

  return (
    <>
      <Header />
      <ProductNav />
      <div
        className="flex"
        style={{ paddingTop: '108px', minHeight: '100vh' }}
      >
        <Sidebar product={product} />
        <main
          className="flex-1 flex justify-center"
          style={{ marginLeft: '240px' }}
        >
          <div className="flex w-full max-w-5xl px-12 py-10 gap-10">
            <article className="flex-1 min-w-0">
              <MdxContent source={file.content} />
            </article>
            <RightSidebar sections={sections} />
          </div>
        </main>
      </div>
    </>
  );
}
