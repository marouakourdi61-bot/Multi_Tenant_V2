export default function EmptyState({ title, buttonText }) {
    return (
        <div className="text-center py-16">
            <p className="text-gray-500">{title}</p>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">
                {buttonText}
            </button>
        </div>
    )
}