interface LabelProps {
    children: React.ReactNode;
    size?: 'small';
}

export default function Label({ children, size }: LabelProps) {
    let sizeClass = '';
    if (size === 'small') sizeClass = 'text-xs';
    return (
        <div
            className={`inline-block px-1 py-0.5 rounded-sm font-semibold text-slate-100 bg-cyan-800 ${sizeClass}`}
        >
            {children}
        </div>
    );
}
