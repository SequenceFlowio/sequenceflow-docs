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

export function getMdxFile(product: string, slug: string): MdxFile | null {
  const filePath = path.join(contentDir, product, `${slug}.mdx`);

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

export function getAllSlugs(product: string): string[] {
  const dir = path.join(contentDir, product);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}
