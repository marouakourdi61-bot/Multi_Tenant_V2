export default function EmptyState({ title, buttonText }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-slate-100 p-4">
                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <p className="text-sm text-slate-500 mb-6">{title}</p>
            <button className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                {buttonText}
            </button>
        </div>
    )
}