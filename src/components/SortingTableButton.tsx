interface SortButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    order: 'asc' | 'desc' | 'default';
    isActive: boolean;
}

export default function SortingTableButton({
    order,
    isActive,
    ...otherProps
}: SortButtonProps) {
    return (
        <button data-testid="sort-select" {...otherProps}>
            <svg
                className="w-3 h-3 ms-1.5 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    d={
                        !isActive
                            ? 'M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z'
                            : order === 'asc'
                            ? 'M6.837 7.952 10.264 2.9a2.122 2.122 0 0 1 3.472 0l3.426 5.052a1.9 1.9 0 0 1-.11 1.986 2.075 2.075 0 0 1-1.847 1.086H8.574a2.074 2.074 0 0 1-1.847-1.086 1.9 1.9 0 0 1 .11-1.986Z'
                            : 'M8.574 12.976h6.852a2.074 2.074 0 0 1 1.846 1.087 1.9 1.9 0 0 1-.11 1.985l-3.427 5.05a2.123 2.123 0 0 1-3.472 0l-3.426-5.05a1.9 1.9 0 0 1-.11-1.985 2.072 2.072 0 0 1 1.847-1.087Z'
                    }
                />
            </svg>
        </button>
    );
}
