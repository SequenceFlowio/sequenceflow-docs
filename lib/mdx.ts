import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface FrontMatter {
  title: string;
  description?: string;
  [key: string]: unknown;
}

export interface MdxFile {
  frontMatter: FrontMatter;
  content: string;
  slug: string;
}

export function getMdxFile(product: string, slug: string, app?: string): MdxFile | null {
  const filePath = app
    ? path.join(contentDir, product, app, `${slug}.mdx`)
    : path.join(contentDir, product, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    frontMatter: data as FrontMatter,
    content,
    slug,
  };
}

export function getAllSlugs(product: string): { slug: string; app?: string }[] {
  const dir = path.join(contentDir, product);
  if (!fs.existsSync(dir)) return [];

  const results: { slug: string; app?: string }[] = [];

  // Top-level .mdx files
  const topLevel = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  for (const f of topLevel) {
    results.push({ slug: f.replace('.mdx', '') });
  }

  // App subfolders
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const appDir = path.join(dir, entry.name);
      const appFiles = fs.readdirSync(appDir).filter((f) => f.endsWith('.mdx'));
      for (const f of appFiles) {
        results.push({ slug: f.replace('.mdx', ''), app: entry.name });
      }
    }
  }

  return results;
}
