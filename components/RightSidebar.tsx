interface Section {
  id: string;
  title: string;
}

interface RightSidebarProps {
  sections?: Section[];
}

export default function RightSidebar({ sections = [] }: RightSidebarProps) {
  if (sections.length === 0) return null;

  return (
    <aside
      className="sticky top-0 overflow-y-auto hidden xl:block"
      style={{ width: '200px', maxHeight: 'calc(100vh - 108px)' }}
    >
      <div className="pt-6 pl-6">
        <p
          className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          Op deze pagina
        </p>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="block text-sm py-0.5 transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
