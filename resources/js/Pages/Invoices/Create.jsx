import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Create({ clients = [] }) {

    const { data, setData, post, processing, errors } = useForm({
        recipient: '',
        issue_date: new Date().toISOString().split('T')[0],
        currency: 'MAD',
        vat: false,
        items: [

            {
                qty: 1,
                type: 'Service',
                unit_price: 0,
                vat: 18,
                discount: 0,
                discount_type: '%',
                name: '',
                description: '',
            }
        ],
        notes: '',
        concluding_text: ''
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            {
                qty: 1,
                type: 'Service',
                unit_price: 0,
                vat: 18,
                discount: 0,
                discount_type: '%',
                name: '',
                description: '',
            }
        ]);
    };

    const updateItem = (index, key, value) => {
        const updated = [...data.items];
        updated[index][key] = value;
        setData('items', updated);
    };

    const removeItem = (index) => {
        setData('items', data.items.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('invoices.store'));
    };

    return (
        <form onSubmit={submit} className="min-h-screen bg-slate-100 text-slate-900">

            <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

                {/* HEADER */}
                <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-2">Nouvelle facture</p>
                        <h1 className="text-3xl font-semibold text-slate-900">Créez votre facture</h1>
                        <p className="mt-2 text-sm text-slate-500">Complétez les informations ci-dessous pour générer votre facture.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                            Numéro: FA202600001
                        </span>

                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Enregistrer
                        </button>
                    </div>
                </section>

                {Object.keys(errors).length > 0 && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                        <p className="font-semibold">Veuillez corriger les erreurs suivantes :</p>
                        <ul className="mt-3 list-disc space-y-1 pl-5">
                            {Object.entries(errors).map(([key, message]) => (
                                <li key={key}>{message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <section className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">

                    <div className="space-y-6">

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Destinataire</h2>
                                    <p className="mt-1 text-sm text-slate-500">Choisissez le client pour cette facture.</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <select
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                    value={data.recipient}
                                    onChange={(e) => setData("recipient", e.target.value)}
                                >

                                    <option value="">
                                        Choisissez un client...
                                    </option>

                                    {clients.map((client) => (
                                        <option
                                            key={client.id}
                                            value={client.id}
                                        >
                                            {client.name}
                                        </option>
                                    ))}

                                </select>
                                {errors.recipient && (
                                    <p className="mt-2 text-sm text-red-600">{errors.recipient}</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Informations</h2>
                                    <p className="mt-1 text-sm text-slate-500">Date d’émission, devise et TVA.</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <input
                                    type="date"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                    value={data.issue_date}
                                    onChange={e => setData('issue_date', e.target.value)}
                                />
                                {errors.issue_date && (
                                    <p className="mt-2 text-sm text-red-600">{errors.issue_date}</p>
                                )}

                                <select
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                    value={data.currency}
                                    onChange={e => setData('currency', e.target.value)}
                                >
                                    <option>MAD</option>
                                    <option>USD</option>
                                    <option>EUR</option>
                                </select>
                            </div>

                            <label className="mt-6 flex items-center gap-3 text-sm text-slate-700">
                                <input
                                    type="checkbox"
                                    checked={data.vat}
                                    onChange={e => setData('vat', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-slate-900"
                                />
                                VAT non applicable
                            </label>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Articles</h2>
                                    <p className="mt-1 text-sm text-slate-500">Ajoutez ou modifiez les lignes de facture.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                                >
                                    + Article
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                {data.items.map((item, index) => (
                                    <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                                        <div className="grid gap-3 md:grid-cols-[auto_1fr_150px_150px_auto] items-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-semibold text-slate-900">
                                                {index + 1}
                                            </div>

                                            <input
                                                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                                placeholder="Nom"
                                                value={item.name}
                                                onChange={e => updateItem(index, 'name', e.target.value)}
                                            />

                                            <input
                                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                                type="number"
                                                value={item.qty}
                                                onChange={e => updateItem(index, 'qty', e.target.value)}
                                                placeholder="Quantité"
                                            />

                                            <input
                                                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                                type="number"
                                                value={item.unit_price}
                                                onChange={e => updateItem(index, 'unit_price', e.target.value)}
                                                placeholder="Prix"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeItem(index)}
                                                className="rounded-2xl bg-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-200"
                                            >
                                                Supprimer
                                            </button>
                                        </div>

                                        <input
                                            className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                            placeholder="Description"
                                            value={item.description}
                                            onChange={e => updateItem(index, 'description', e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Résumé</h2>
                            <div className="mt-6 space-y-4 text-sm text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span>Total HT</span>
                                    <span>0,00 MAD</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>VAT</span>
                                    <span>0,00 MAD</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Remise</span>
                                    <span>0,00 MAD</span>
                                </div>
                            </div>
                            <div className="mt-6 rounded-3xl bg-slate-900 px-5 py-4 text-white">
                                <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em] text-slate-300">
                                    <span>Total TTC</span>
                                    <span>0,00 MAD</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Notes</h2>
                            <textarea
                                className="mt-4 h-36 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                placeholder="Notes"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                            />
                        </div>

                        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
                            <h2 className="text-lg font-semibold text-slate-900">Concluding text</h2>
                            <textarea
                                className="mt-4 h-36 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-slate-400"
                                placeholder="Concluding text"
                                value={data.concluding_text}
                                onChange={e => setData('concluding_text', e.target.value)}
                            />
                        </div>
                    </aside>
                </section>
            </main>
        </form>
    );
}

Create.layout = page => <DashboardLayout children={page} />;