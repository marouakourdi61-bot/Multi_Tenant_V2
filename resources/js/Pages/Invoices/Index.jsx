import { useState } from 'react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function Index({ invoices = [] }) {
    const [search, setSearch] = useState('');

    // 🔎 Dynamic filter
    const filteredInvoices = invoices.filter((inv) =>
        inv.client_name.toLowerCase().includes(search.toLowerCase()) ||
        inv.invoice_number.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Invoices</h1>
                <p className="text-slate-500">Dashboard / Invoices</p>
            </div>

            {/* METRICS */}
            <div className="mb-4 text-sm text-slate-600 flex gap-4">
                <span>Total: {invoices.length}</span>
                <span>Paid: {invoices.filter(i => i.status === 'paid').length}</span>
                <span>Pending: {invoices.filter(i => i.status === 'pending').length}</span>
            </div>

            {/* ACTION BAR */}
            <div className="flex flex-wrap justify-between gap-4 mb-6">

                {/* SEARCH */}
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-3 py-2 w-80"
                    placeholder="Search invoices..."
                />

                {/* BUTTON */}
                <Link
                    href="/invoices/create"
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    New Invoice
                </Link>

            </div>

            {/* CONTENT */}
            {filteredInvoices.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                    No invoices found
                </div>
            ) : (
                <div className="overflow-x-auto bg-white border rounded">

                    <table className="w-full text-sm">

                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="text-left p-3">Invoice #</th>
                                <th className="text-left p-3">Client</th>
                                <th className="text-left p-3">Total</th>
                                <th className="text-left p-3">Status</th>
                                <th className="text-left p-3">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="border-t">

                                    <td className="p-3 font-medium">
                                        {inv.invoice_number}
                                    </td>

                                    <td className="p-3">
                                        {inv.client_name}
                                    </td>

                                    <td className="p-3">
                                        {inv.total} MAD
                                    </td>

                                    <td className="p-3">
                                        <span className={
                                            inv.status === 'paid'
                                                ? 'text-green-600 font-medium'
                                                : 'text-orange-500 font-medium'
                                        }>
                                            {inv.status}
                                        </span>
                                    </td>

                                    <td className="p-3">
                                        {inv.issue_date}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            )}

        </DashboardLayout>
    );
}