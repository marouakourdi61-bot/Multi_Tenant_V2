import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function Show({ invoice }) {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Facture {invoice.invoice_number}</h1>
                    <div className="flex items-center gap-2">
                        <Link href={`/invoices/${invoice.id}/download`} className="btn">Télécharger</Link>
                        <Link href="/invoices" className="btn">Retour</Link>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <p><strong>Destinataire:</strong> {invoice.recipient}</p>
                    <p><strong>Montant:</strong> {invoice.total}</p>
                    <p><strong>Statut:</strong> {invoice.status}</p>
                    <pre className="mt-4">{JSON.stringify(invoice.items, null, 2)}</pre>
                </div>
            </div>
        </DashboardLayout>
    );
}
