export default function Navbar() {
    return (
        <header className="h-16 border-b border-slate-200 bg-white/75 backdrop-blur-sm flex items-center justify-between px-6 shadow-sm">

            {/* Left */}
            <div>
                <h1 className="text-lg font-semibold text-slate-900">Overview</h1>
                <p className="text-sm text-slate-500">Suivi rapide de votre activité</p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="h-10 w-64 rounded-2xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 111.5-14.9 7.5 7.5 0 01-1.5 14.9z" />
                    </svg>
                </span>
                </div>

                {/* Notifications */}
                <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z" />
                    </svg>
                </button>

                {/* Avatar */}
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
                    JD
                </div>

            </div>

        </header>
    );
}