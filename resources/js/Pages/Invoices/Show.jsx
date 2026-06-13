import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function Show({ invoice }) {
    const downloadInvoice = async () => {
        try {
            const response = await fetch(`/invoices/${invoice.id}/download`, {
                headers: { Accept: 'application/pdf' },
            });

            if (!response.ok) {
                throw new Error(`Échec du téléchargement : ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${invoice.id}.pdf`;
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
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Facture {invoice.invoice_number}</h1>
                    <div className="flex items-center gap-2">
                        <button type="button" onClick={downloadInvoice} className="btn">Télécharger</button>
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
