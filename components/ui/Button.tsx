export function Button ({
    label,
    onClick
}: {
    label: string;
    onClick: () => void
}) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-900 px-4 py-2 mt-5 text-white/65 rounded-md "
        >
            {label}
        </button>
    )
} 
