import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href?: string;
  icon?: React.ReactNode;
}

export default function Card({ title, description, href, icon }: CardProps) {
  const content = (
    <div
      className="p-5 rounded-xl border transition-colors cursor-pointer h-full"
      style={{
        backgroundColor: '#111927',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          'rgba(255,255,255,0.2)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          'rgba(255,255,255,0.08)';
      }}
    >
      {icon && (
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
          style={{ backgroundColor: 'rgba(180,240,0,0.12)' }}
        >
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
        {description}
      </p>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}
