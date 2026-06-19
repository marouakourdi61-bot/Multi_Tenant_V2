import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Index({ quotes = [] }) {
    const [search, setSearch] = useState("");

    const filteredQuotes = quotes.filter(
        (q) =>
            (q.recipient ?? "").toLowerCase().includes(search.toLowerCase()) ||
            (q.quote_number ?? "").toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch (status) {
            case "accepted":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-green-100 text-green-700 border border-green-200/50">
                        Accepté
                    </span>
                );
            case "sent":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-100 text-blue-700 border border-blue-200/50">
                        Envoyé
                    </span>
                );
            case "rejected":
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-100 text-red-700 border border-red-200/50">
                        Refusé
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gray-100 text-gray-500 border border-gray-200">
                        Brouillon
                    </span>
                );
        }
    };

    const handleDelete = (quote) => {
        if (confirm("Supprimer ce devis ?")) {
            Inertia.delete(`/quotes/${quote.id}`);
        }
    };

    const handleDownload = async (quote) => {
        try {
            const response = await fetch(`/quotes/${quote.id}/download`, {
                headers: { Accept: 'application/pdf' },
            });
            if (!response.ok) throw new Error(`Erreur ${response.status}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `devis-${quote.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 max-w-2xl">
                        <div className="relative flex-1">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm"
                                placeholder="Rechercher des devis..."
                                type="text"
                            />
                        </div>
                        <div className="flex items-center gap-2 h-11 px-4 border border-gray-200 rounded-xl bg-white shadow-sm font-semibold text-gray-500">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            <span>{filteredQuotes.length}</span>
                        </div>
                    </div>
                    <Link
                        href="/quotes/create"
                        className="flex items-center gap-2 h-11 px-6 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        <span>Nouveau devis</span>
                    </Link>
                </div>

                {/* Cards Grid */}
                {filteredQuotes.length === 0 ? (
                    <div className="mt-12 flex flex-col items-center justify-center py-16 px-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/60">
                        <svg
                            className="w-16 h-16 mb-4 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <p className="text-lg font-semibold text-gray-400">
                            Aucun devis trouvé
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                            Créez votre premier devis
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredQuotes.map((quote) => {
                            const itemCount =
                                quote.items && Array.isArray(quote.items)
                                    ? quote.items.length
                                    : 1;
                            return (
                                <div
                                    key={quote.id}
                                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                {quote.quote_number}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {quote.recipient || "—"}
                                            </p>
                                        </div>
                                        {getStatusBadge(quote.status)}
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
                                        <span>{quote.issue_date}</span>
                                        <span>{itemCount} articles</span>
                                    </div>
                                    <div className="pt-4 border-t border-dashed border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg text-indigo-600 font-extrabold">
                                                {Number(quote.total).toLocaleString(
                                                    "fr-FR",
                                                    { minimumFractionDigits: 2 }
                                                )}{" "}
                                                {quote.currency || "MAD"}
                                            </span>
                                            <div className="flex items-center gap-2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {/* Download PDF */}
                                                <button
                                                    type="button"
                                                    onClick={() => handleDownload(quote)}
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                                    title="Télécharger PDF"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l4-4m-4 4l-4-4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
                                                    </svg>
                                                </button>
                                                {/* Edit */}
                                                <Link
                                                    href={`/quotes/${quote.id}/edit`}
                                                    className="p-1.5 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition-colors"
                                                    title="Modifier"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </Link>
                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(quote)}
                                                    className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                                                    title="Supprimer"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <polyline points="3 6 5 6 21 6" />
                                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}