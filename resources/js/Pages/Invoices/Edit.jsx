import React from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ invoice }) {
    const { data, setData, put, processing, errors } = useForm({
        recipient: invoice.recipient || '',
        status: invoice.status || 'draft',
    });

    function submit(e) {
        e.preventDefault();
        put(`/invoices/${invoice.id}`);
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-semibold">Modifier la facture {invoice.invoice_number}</h1>

                <form onSubmit={submit} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Destinataire</label>
                        <input value={data.recipient} onChange={e => setData('recipient', e.target.value)} className="mt-1 block w-full rounded-md border" />
                        {errors.recipient && <div className="text-red-600 text-sm">{errors.recipient}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Statut</label>
                        <select value={data.status} onChange={e => setData('status', e.target.value)} className="mt-1 block w-full rounded-md border">
                            <option value="draft">Brouillon</option>
                            <option value="pending">En attente</option>
                            <option value="paid">Payée</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="submit" disabled={processing} className="btn">Enregistrer</button>
                        <Link href={`/invoices/${invoice.id}`} className="btn">Annuler</Link>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
