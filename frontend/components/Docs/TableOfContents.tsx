interface TableOfContentsItem {
    id: string;
    title: string;
    level?: number;
}

interface TableOfContentsProps {
    items: TableOfContentsItem[];
    activeItem: string;
}

interface TableOfContentsItemProps {
    id: string;
    title: string;
    level?: number;
    isActive: boolean;
}

export default function TableOfContents({ items, activeItem }: TableOfContentsProps) {
    return (
        <div className="space-y-1">
            <h4 className="text-sm font-medium mb-2 text-gray-500">On this page</h4>
            <div className="space-y-1">
                {items.map((item) => (
                    <TableOfContentsItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        level={item.level}
                        isActive={activeItem === item.id}
                    />
                ))}
            </div>
        </div>
    );
}

function TableOfContentsItem({ id, title, level = 0, isActive }: TableOfContentsItemProps) {
    return (
        <a
            href={`#${id}`}
            className={`flex text-sm py-1 px-2 rounded transition-colors ${isActive
                    ? "bg-[#0056E0]/10 text-[#0056E0] font-medium"
                    : "text-gray-600 hover:text-[#0056E0]"
                }`}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
        >
            {title}
        </a>
    );
}