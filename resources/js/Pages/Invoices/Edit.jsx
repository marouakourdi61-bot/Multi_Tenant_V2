import React, { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Edit({ invoice }) {
    const { data, setData, put, processing, errors } = useForm({
        recipient: invoice.recipient || '',
        currency: invoice.currency || 'MAD',
        vat: invoice.vat ?? false,
        items: invoice.items || [],
        notes: invoice.notes || '',
        concluding_text: invoice.concluding_text || '',
        issue_date: invoice.issue_date ? invoice.issue_date.split('T')[0] : new Date().toISOString().slice(0,10),
        status: invoice.status || 'draft',
    });

    const [itemText, setItemText] = useState('');

    function submit(e) {
        e.preventDefault();
        put(`/invoices/${invoice.id}`);
    }

    function addItem() {
        if (!itemText) return;
        const items = Array.isArray(data.items) ? [...data.items] : [];
        items.push({ description: itemText, qty: 1, unit_price: 0 });
        setData('items', items);
        setItemText('');
    }

    return (
        <DashboardLayout>
            <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-medium">Statut:</span>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${data.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {data.status === 'paid' ? 'Payé' : (data.status === 'pending' ? 'En attente' : 'Brouillon')}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/invoices/${invoice.id}`} className="btn-secondary">Annuler</Link>
                        <button onClick={submit} disabled={processing} className="btn-primary flex items-center gap-2">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                            Enregistrer les modifications
                        </button>
                    </div>
                </header>

                <form onSubmit={submit} className="space-y-8">
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-800">Destinataire</h2>
                        <div className="relative max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                            </div>
                            <input
                                value={data.recipient}
                                onChange={e => setData('recipient', e.target.value)}
                                className="block w-full pl-10 pr-10 py-2.5 text-base border-slate-200 rounded-lg bg-white"
                                placeholder="Client / Société"
                            />
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-800">Informations</h2>
                        <div className="flex flex-wrap items-end gap-6">
                            <div className="w-64">
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Date d'émission</label>
                                <input type="date" value={data.issue_date} onChange={e => setData('issue_date', e.target.value)} className="w-full border-slate-200 rounded-lg py-2 pl-3 pr-10 text-sm" />
                            </div>

                            <div className="w-48">
                                <label className="block text-sm font-medium text-slate-500 mb-1.5">Devise</label>
                                <select value={data.currency} onChange={e => setData('currency', e.target.value)} className="w-full border-slate-200 rounded-lg py-2 pl-3 pr-10 text-sm bg-white">
                                    <option value="MAD">MAD (DH)</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3 pb-2">
                                <label className="text-sm font-medium text-slate-800 mr-2">TVA</label>
                                <input type="checkbox" checked={!!data.vat} onChange={e => setData('vat', e.target.checked)} className="h-5 w-5" />
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-slate-800">Articles</h2>
                        <div className="overflow-x-auto">
                            <div className="mb-3">
                                <div className="flex gap-2">
                                    <input value={itemText} onChange={e => setItemText(e.target.value)} placeholder="Nouvel article (libellé)" className="flex-1 border-slate-200 rounded-lg py-2 px-3" />
                                    <button type="button" onClick={addItem} className="btn-outline-primary">Ajouter</button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {Array.isArray(data.items) && data.items.map((it, idx) => (
                                    <div key={idx} className="card p-4 relative">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-medium">{it.description || 'Article ' + (idx+1)}</div>
                                                <div className="text-sm text-slate-500">Qty: {it.qty} — Prix: {it.unit_price}</div>
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => {
                                                    const items = [...data.items];
                                                    items.splice(idx,1);
                                                    setData('items', items);
                                                }} className="text-red-500">Supprimer</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="max-w-xs space-y-2">
                        <h3 className="text-sm font-medium text-slate-500">Remise générale</h3>
                        <div className="flex gap-2">
                            <input className="w-full border-slate-200 rounded-lg py-2 px-3 text-sm" type="text" placeholder="0" />
                            <div className="relative">
                                <select className="border-slate-200 rounded-lg py-2 pl-3 pr-8 text-sm appearance-none bg-white">
                                    <option>%</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className="card overflow-hidden">
                        <div className="p-6 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">Total HT</span>
                                <span className="font-bold text-slate-800">{data.items?.reduce((s, it) => s + ((it.qty||0)*(it.unit_price||0)), 0).toFixed(2)} MAD</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-500 font-medium">TVA</span>
                                <span className="font-bold text-slate-800">{data.vat ? 'Calculée' : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3">
                                <span className="text-lg font-bold text-slate-800">Total TTC</span>
                                <span className="text-2xl font-bold text-indigo-600">{(data.items?.reduce((s, it) => s + ((it.qty||0)*(it.unit_price||0)), 0)).toFixed(2)} MAD</span>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-600">Notes</label>
                            <textarea value={data.notes} onChange={e => setData('notes', e.target.value)} className="w-full border-slate-200 rounded-lg p-3 text-sm" rows="3" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-600">Texte de conclusion</label>
                            <textarea value={data.concluding_text} onChange={e => setData('concluding_text', e.target.value)} className="w-full border-slate-200 rounded-lg p-3 text-sm" rows="3" />
                        </div>
                    </section>
                </form>
            </main>
        </DashboardLayout>
    );
}
