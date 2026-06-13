import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ invoices = [] }) {
    const [search, setSearch] = useState('');

    // 🔎 Dynamic filter
    const filteredInvoices = invoices.filter((inv) =>
        (inv.recipient ?? inv.client_name ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (inv.invoice_number ?? '').toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Factures</h1>
                    <p className="mt-2 text-sm text-slate-500">Gérez et consultez toutes vos factures.</p>
                </div>

                {/* METRICS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">Factures totales</p>
                        <h3 className="mt-3 text-3xl font-bold text-slate-900">{invoices.length}</h3>
                    </div>
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">Payées</p>
                        <h3 className="mt-3 text-3xl font-bold text-green-600">{invoices.filter(i => i.status === 'paid').length}</h3>
                    </div>
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">En attente</p>
                        <h3 className="mt-3 text-3xl font-bold text-yellow-600">{invoices.filter(i => i.status === 'pending').length}</h3>
                    </div>
                </div>

                {/* ACTION BAR */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 md:max-w-sm"
                        placeholder="Rechercher une facture..."
                    />

                    <Link
                        href="/invoices/create"
                        className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        + Nouvelle facture
                    </Link>
                </div>

                {/* CONTENT */}
                {filteredInvoices.length === 0 ? (
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-12">
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-slate-100 p-4">
                                <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-sm text-slate-500">Aucune facture trouvée</p>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="border-b border-slate-200 bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Facture #</th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Client</th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Montant</th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Statut</th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Date</th>
                                        <th className="px-6 py-4 text-left font-semibold text-slate-900">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-200">
                                    {filteredInvoices.map((inv) => (
                                        <tr key={inv.id} className="transition hover:bg-slate-50">
                                            <td className="px-6 py-4 font-semibold text-slate-900">
                                                {inv.invoice_number}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600">
                                                {inv.recipient ?? inv.client_name ?? '-'}
                                            </td>

                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {inv.total} MAD
                                            </td>

                                            <td className="px-6 py-4">
                                                {inv.status === 'paid' ? (
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                                                        Payée
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                                                        En attente
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-slate-600">
                                                {inv.issue_date}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link href={`/invoices/${inv.id}`} className="p-2 rounded-lg hover:bg-slate-100" title="Voir">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </Link>

                                                    <Link href={`/invoices/${inv.id}/edit`} className="p-2 rounded-lg hover:bg-slate-100" title="Éditer">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                        </svg>
                                                    </Link>

                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Supprimer cette facture ?')) {
                                                                Inertia.delete(`/invoices/${inv.id}`);
                                                            }
                                                        }}
                                                        className="p-2 rounded-lg hover:bg-slate-100"
                                                        title="Supprimer"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22" />
                                                        </svg>
                                                    </button>

                                                    <a href={`/invoices/${inv.id}/download`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-slate-100" title="Télécharger">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l4-4m-4 4l-4-4M21 12v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6" />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}