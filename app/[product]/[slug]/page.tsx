import { notFound } from 'next/navigation';
import { getMdxFile, getAllSlugs } from '@/lib/mdx';
import { navigation } from '@/lib/navigation';
import Header from '@/components/Header';
import ProductNav from '@/components/ProductNav';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MdxContent from '@/components/MdxContent';
import PrevNext from '@/components/PrevNext';

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

function findBreadcrumb(product: string, slug: string) {
  const nav = navigation[product];
  if (!nav) return null;
  for (const group of nav.groups) {
    const page = group.pages.find((p) => p.slug === slug);
    if (page) return { group: group.label, page: page.title };
  }
  return null;
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
  const breadcrumb = findBreadcrumb(product, slug);
  const productName = navigation[product].name;

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
              {/* Breadcrumb */}
              {breadcrumb && (
                <div
                  className="flex items-center gap-1.5 text-xs mb-6"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  <span>{productName}</span>
                  <span>›</span>
                  <span>{breadcrumb.group}</span>
                  <span>›</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{breadcrumb.page}</span>
                </div>
              )}

              <MdxContent source={file.content} />

              {/* Prev / Next */}
              <PrevNext product={product} slug={slug} />

              {/* Was this page helpful? */}
              <div
                className="flex items-center gap-4 mt-8 pt-6 border-t"
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Was deze pagina nuttig?
                </span>
                <button
                  className="text-sm px-3 py-1 rounded-lg border transition-colors hover:border-white/20 hover:text-white"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  👍 Ja
                </button>
                <button
                  className="text-sm px-3 py-1 rounded-lg border transition-colors hover:border-white/20 hover:text-white"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    borderColor: 'rgba(255,255,255,0.1)',
                  }}
                >
                  👎 Nee
                </button>
              </div>
            </article>
            <RightSidebar sections={sections} />
          </div>
        </main>
      </div>
    </>
  );
}
