import { MDXRemote } from 'next-mdx-remote/rsc';

interface MdxContentProps {
  source: string;
}

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-3xl font-bold text-white mb-4 mt-8 first:mt-0"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl font-semibold text-white mb-3 mt-8"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg font-semibold text-white mb-2 mt-6"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 leading-7"
      style={{ color: 'rgba(255,255,255,0.75)' }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-inside mb-4 space-y-1"
      style={{ color: 'rgba(255,255,255,0.75)' }}
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-1"
      style={{ color: 'rgba(255,255,255,0.75)' }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="px-1.5 py-0.5 rounded text-sm font-mono"
      style={{
        backgroundColor: 'rgba(180,240,0,0.12)',
        color: '#B4F000',
      }}
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="p-4 rounded-xl mb-4 overflow-x-auto text-sm font-mono"
      style={{
        backgroundColor: '#111927',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.85)',
      }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 pl-4 mb-4 italic"
      style={{
        borderColor: '#B4F000',
        color: 'rgba(255,255,255,0.6)',
      }}
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="underline underline-offset-2 transition-colors hover:opacity-80"
      style={{ color: '#B4F000' }}
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  hr: () => (
    <hr
      className="my-8"
      style={{ borderColor: 'rgba(255,255,255,0.08)' }}
    />
  ),
};

export default function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="max-w-3xl">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
