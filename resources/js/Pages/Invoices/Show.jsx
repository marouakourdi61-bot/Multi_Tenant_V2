import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link, router } from '@inertiajs/react';

export default function Show({ invoice }) {
    const handleStatusChange = (newStatus) => {
        router.patch(window.route ? window.route('invoices.updateStatus', { invoice: invoice.id }) : `/invoices/${invoice.id}/status`, {
            status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Facture {invoice.invoice_number}</h1>
                        <p className="mt-1 text-slate-500">Détails de la facture</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                            invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-700' 
                                : invoice.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}>
                            {invoice.status === 'paid' ? '✓ Payée' : (invoice.status === 'pending' ? '⏳ En attente' : '📝 Brouillon')}
                        </div>

                        {invoice.status !== 'paid' && (
                            <button
                                onClick={() => handleStatusChange('paid')}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                            >
                                Marquer comme payée
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link 
                        href={window.route ? window.route('invoices.edit', { invoice: invoice.id }) : `/invoices/${invoice.id}/edit`} 
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800 transition"
                    >
                        Éditer
                    </Link>
                    <Link 
                        href={window.route ? window.route('invoices.index') : '/invoices'} 
                        className="px-4 py-2 border border-slate-200 text-slate-900 rounded-lg text-sm hover:bg-slate-50 transition"
                    >
                        Retour
                    </Link>
                </div>

                {/* Invoice Details */}
                <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Numéro</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{invoice.invoice_number}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Date</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{invoice.issue_date}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Devise</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{invoice.currency}</p>
                        </div>
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Montant</p>
                            <p className="text-lg font-bold text-slate-900 mt-1">{invoice.total} {invoice.currency}</p>
                        </div>
                    </div>

                    {invoice.notes && (
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Notes</p>
                            <p className="text-slate-700 mt-2">{invoice.notes}</p>
                        </div>
                    )}

                    {invoice.concluding_text && (
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold">Texte de conclusion</p>
                            <p className="text-slate-700 mt-2">{invoice.concluding_text}</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
