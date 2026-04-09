import { notFound } from 'next/navigation';
import { getMdxFile, getAllSlugs } from '@/lib/mdx';
import { navigation, pageHref } from '@/lib/navigation';
import Header from '@/components/Header';
import ProductNav from '@/components/ProductNav';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MdxContent from '@/components/MdxContent';
import PrevNext from '@/components/PrevNext';

interface Props {
  params: Promise<{ product: string; path: string[] }>;
}

export async function generateStaticParams() {
  const params: { product: string; path: string[] }[] = [];

  for (const product of Object.keys(navigation)) {
    const slugs = getAllSlugs(product);
    for (const { slug, app } of slugs) {
      params.push({
        product,
        path: app ? [app, slug] : [slug],
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { product, path } = await params;
  const { slug, app } = parsePath(path);
  const file = getMdxFile(product, slug, app);
  if (!file) return {};
  return {
    title: `${file.frontMatter.title} – SequenceFlow Docs`,
    description: file.frontMatter.description,
  };
}

function parsePath(path: string[]): { slug: string; app?: string } {
  if (path.length === 1) return { slug: path[0] };
  if (path.length === 2) return { app: path[0], slug: path[1] };
  return { slug: path[path.length - 1] };
}

function extractSections(content: string) {
  const headingRegex = /^## (.+)$/gm;
  const sections: { id: string; title: string }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
    sections.push({ id, title });
  }
  return sections;
}

function findBreadcrumb(product: string, slug: string, app?: string) {
  const nav = navigation[product];
  if (!nav) return null;
  for (const group of nav.groups) {
    const page = group.pages.find((p) => p.slug === slug && p.app === app);
    if (page) return { group: group.label, page: page.title };
  }
  return null;
}

export default async function DocPage({ params }: Props) {
  const { product, path } = await params;

  if (!navigation[product]) notFound();

  const { slug, app } = parsePath(path);
  const file = getMdxFile(product, slug, app);
  if (!file) notFound();

  const sections = extractSections(file.content);
  const breadcrumb = findBreadcrumb(product, slug, app);
  const productName = navigation[product].name;

  // Flatten all pages for prev/next
  const allPages = navigation[product].groups.flatMap((g) =>
    g.pages.map((p) => ({ ...p, href: pageHref(product, p) }))
  );
  const currentHref = app ? `/${product}/${app}/${slug}` : `/${product}/${slug}`;
  const currentIndex = allPages.findIndex((p) => p.href === currentHref);
  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <>
      <Header />
      <ProductNav />
      <div className="flex" style={{ paddingTop: '108px', minHeight: '100vh' }}>
        <Sidebar product={product} />
        <main className="flex-1 flex justify-center" style={{ marginLeft: '240px' }}>
          <div className="flex w-full max-w-5xl px-12 py-10 gap-10">
            <article className="flex-1 min-w-0">
              {breadcrumb && (
                <div className="flex items-center gap-1.5 text-xs mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <span>{productName}</span>
                  <span>›</span>
                  <span>{breadcrumb.group}</span>
                  <span>›</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)' }}>{breadcrumb.page}</span>
                </div>
              )}

              <MdxContent source={file.content} />

              {(prev || next) && (
                <div className="flex items-stretch justify-between gap-4 mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  {prev ? (
                    <a href={prev.href} className="flex flex-col gap-1 flex-1 px-4 py-3 rounded-xl border transition-colors hover:border-white/20 group" style={{ backgroundColor: '#111927', borderColor: 'rgba(255,255,255,0.08)' }}>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>← Vorige</span>
                      <span className="text-sm font-medium text-white group-hover:text-[#B4F000] transition-colors">{prev.title}</span>
                    </a>
                  ) : <div className="flex-1" />}
                  {next ? (
                    <a href={next.href} className="flex flex-col gap-1 flex-1 px-4 py-3 rounded-xl border text-right transition-colors hover:border-white/20 group" style={{ backgroundColor: '#111927', borderColor: 'rgba(255,255,255,0.08)' }}>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Volgende →</span>
                      <span className="text-sm font-medium text-white group-hover:text-[#B4F000] transition-colors">{next.title}</span>
                    </a>
                  ) : <div className="flex-1" />}
                </div>
              )}

              <div className="flex items-center gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Was deze pagina nuttig?</span>
                <button className="text-sm px-3 py-1 rounded-lg border transition-colors hover:border-white/20 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)' }}>👍 Ja</button>
                <button className="text-sm px-3 py-1 rounded-lg border transition-colors hover:border-white/20 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)', borderColor: 'rgba(255,255,255,0.1)' }}>👎 Nee</button>
              </div>
            </article>
            <RightSidebar sections={sections} />
          </div>
        </main>
      </div>
    </>
  );
}
