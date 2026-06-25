import { useForm } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Link } from '@inertiajs/react';

export default function Create({ clients = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        recipient: '',
        currency: 'MAD',
        validity_days: 30,
        vat: false,
        items: [
            {
                name: '',
                description: '',
                type: 'Service',
                qty: 1,
                unit_price: 0,
                vat: 18,
                discount: 0,
                discount_type: '%',
            },
        ],
        general_discount: 0,
        general_discount_type: '%',
        notes: '',
        concluding_text: '',
        terms_conditions: '',
        footer_text: '',
        issue_date: new Date().toISOString().split('T')[0],
    });

    const addItem = () => {
        setData('items', [
            ...data.items,
            {
                name: '',
                description: '',
                type: 'Service',
                qty: 1,
                unit_price: 0,
                vat: 18,
                discount: 0,
                discount_type: '%',
            },
        ]);
    };

    const updateItem = (index, key, value) => {
        const updated = [...data.items];
        updated[index][key] = value;
        setData('items', updated);
    };

    const removeItem = (index) => {
        if (data.items.length > 1) {
            setData('items', data.items.filter((_, i) => i !== index));
        }
    };

    const moveItem = (index, direction) => {
        const items = [...data.items];
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        [items[index], items[target]] = [items[target], items[index]];
        setData('items', items);
    };

    const duplicateItem = (index) => {
        const items = [...data.items];
        items.splice(index + 1, 0, { ...items[index] });
        setData('items', items);
    };

    const calcLineTotalHT = (item) => (item.qty || 0) * (item.unit_price || 0);

    const calcLineDiscount = (item) => {
        const total = calcLineTotalHT(item);
        if (item.discount_type === '%') {
            return total * ((item.discount || 0) / 100);
        }
        return item.discount || 0;
    };

    const calcLineTotalTTC = (item) => {
        const total = calcLineTotalHT(item) - calcLineDiscount(item);
        const vatRate = data.vat ? 0 : (item.vat || 0) / 100;
        return total * (1 + vatRate);
    };

    const calcSubtotal = () => data.items.reduce((sum, item) => sum + calcLineTotalHT(item), 0);

    const calcGeneralDiscount = () => {
        const subtotal = calcSubtotal();
        if (data.general_discount_type === '%') {
            return subtotal * ((data.general_discount || 0) / 100);
        }
        return data.general_discount || 0;
    };

    const calcTotalHT = () => calcSubtotal() - calcGeneralDiscount();

    const calcTotalVAT = () => {
        if (data.vat) return 0;
        return data.items.reduce((sum, item) => {
            const lineTotal = calcLineTotalHT(item) - calcLineDiscount(item);
            const vatRate = (item.vat || 18) / 100;
            return sum + lineTotal * vatRate;
        }, 0);
    };

    const calcTotalTTC = () => calcTotalHT() + calcTotalVAT();

    const submit = (e) => {
        e.preventDefault();
        post(route('quotes.store'));
    };

    const formatPrice = (value) =>
        new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value) +
        ' ' +
        data.currency;

    return (
        <DashboardLayout>
            <form onSubmit={submit}>
                {/* Top Sticky Header */}
                <header className="sticky top-0 z-40 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <span className="text-lg font-semibold text-indigo-600">Nouveau Devis</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/quotes"
                            className="px-6 py-2 rounded-lg text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            Annuler
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 rounded-lg text-sm font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-60"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Enregistrer le devis
                        </button>
                    </div>
                </header>

                {/* Form Canvas */}
                <div className="max-w-6xl mx-auto p-6 space-y-10 pb-32">
                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                            <p className="font-semibold mb-2">Veuillez corriger les erreurs suivantes :</p>
                            <ul className="list-disc space-y-1 pl-5">
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Destinataire Section */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">Destinataire</h2>
                        <div className="relative max-w-xl">
                            <select
                                value={data.recipient}
                                onChange={(e) => setData('recipient', e.target.value)}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200"
                            >
                                <option value="">
                                    Sélectionner un destinataire...
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
                            <svg className="absolute right-4 top-3.5 text-gray-400 pointer-events-none w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </div>
                        {errors.recipient && <p className="text-sm text-red-600">{errors.recipient}</p>}
                    </section>

                    {/* Informations Section */}
                    <section className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900">Informations</h2>
                        <div className="flex flex-wrap gap-8 items-start">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Date d'émission</label>
                                <input
                                    type="date"
                                    value={data.issue_date}
                                    onChange={(e) => setData('issue_date', e.target.value)}
                                    className="h-10 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Durée de validité</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={data.validity_days}
                                        onChange={(e) => setData('validity_days', e.target.value)}
                                        className="w-20 h-10 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                    />
                                    <span className="text-sm text-gray-500">jours</span>
                                </div>
                                {errors.validity_days && <p className="text-sm text-red-600">{errors.validity_days}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 block">Devise</label>
                                <div className="relative w-40">
                                    <select
                                        value={data.currency}
                                        onChange={(e) => setData('currency', e.target.value)}
                                        className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-sm"
                                    >
                                        <option>MAD</option>
                                        <option>EUR</option>
                                        <option>USD</option>
                                    </select>
                                    <svg className="absolute right-3 top-2.5 text-gray-400 pointer-events-none w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pt-6">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.vat}
                                        onChange={(e) => setData('vat', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                                <span className="text-sm text-gray-600">TVA non applicable</span>
                            </div>
                        </div>
                    </section>

                    {/* Articles Section */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Articles</h2>
                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
                                </svg>
                                Ajouter un article
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-separate border-spacing-y-4">
                                <thead>
                                    <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                                        <th className="px-4 pb-2">#</th>
                                        <th className="px-4 pb-2 w-1/4">QTÉ / TYPE</th>
                                        <th className="px-4 pb-2">PRIX HT</th>
                                        <th className="px-4 pb-2">TVA</th>
                                        <th className="px-4 pb-2">RÉDUC.</th>
                                        <th className="px-4 pb-2 text-right">TOTAL HT</th>
                                        <th className="px-4 pb-2 text-right">TOTAL TTC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.items.map((item, index) => (
                                        <tr key={index}>
                                            <td colSpan="7">
                                                <div className="bg-white rounded-2xl border border-gray-200 p-6 relative group transition-all hover:shadow-md">
                                                    {/* Floating Actions */}
                                                    <div className="absolute -top-3 right-6 flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            type="button"
                                                            onClick={() => moveItem(index, -1)}
                                                            className="p-1 hover:text-indigo-600 transition-colors"
                                                            title="Monter"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M18 15l-6-6-6 6" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => moveItem(index, 1)}
                                                            className="p-1 hover:text-indigo-600 transition-colors"
                                                            title="Descendre"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M6 9l6 6 6-6" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(index)}
                                                            className="p-1 hover:text-red-500 transition-colors"
                                                            title="Supprimer"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <path d="M18 6L6 18M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => duplicateItem(index)}
                                                            className="p-1 hover:text-indigo-600 transition-colors"
                                                            title="Dupliquer"
                                                        >
                                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    {/* Row Inputs */}
                                                    <div className="grid grid-cols-12 gap-4 items-center">
                                                        <div className="col-span-1">
                                                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                                                                {index + 1}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-3 flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                value={item.qty}
                                                                onChange={(e) => updateItem(index, 'qty', e.target.value)}
                                                                className="w-16 h-11 px-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                            />
                                                            <div className="relative flex-1">
                                                                <select
                                                                    value={item.type}
                                                                    onChange={(e) => updateItem(index, 'type', e.target.value)}
                                                                    className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-sm"
                                                                >
                                                                    <option>Service</option>
                                                                    <option>Produit</option>
                                                                </select>
                                                                <svg className="absolute right-3 top-3 text-gray-400 pointer-events-none w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M6 9l6 6 6-6" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-2">
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                value={item.unit_price}
                                                                onChange={(e) => updateItem(index, 'unit_price', e.target.value)}
                                                                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                                placeholder="0,00"
                                                            />
                                                        </div>
                                                        <div className="col-span-1">
                                                            <input
                                                                type="number"
                                                                value={item.vat}
                                                                onChange={(e) => updateItem(index, 'vat', e.target.value)}
                                                                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-center"
                                                            />
                                                        </div>
                                                        <div className="col-span-2 flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                step="0.01"
                                                                value={item.discount}
                                                                onChange={(e) => updateItem(index, 'discount', e.target.value)}
                                                                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                            />
                                                            <div className="relative">
                                                                <select
                                                                    value={item.discount_type}
                                                                    onChange={(e) => updateItem(index, 'discount_type', e.target.value)}
                                                                    className="h-11 px-2 pr-6 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-sm"
                                                                >
                                                                    <option>%</option>
                                                                    <option>MAD</option>
                                                                </select>
                                                                <svg className="absolute right-1 top-3 text-gray-400 pointer-events-none w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                    <path d="M6 9l6 6 6-6" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1.5 text-right px-4">
                                                            <div className="bg-gray-50 h-11 flex items-center justify-end px-4 rounded-xl font-bold text-indigo-600 text-sm">
                                                                {formatPrice(calcLineTotalHT(item) - calcLineDiscount(item))}
                                                            </div>
                                                        </div>
                                                        <div className="col-span-1.5 text-right">
                                                            <div className="bg-gray-50 h-11 flex items-center justify-end px-4 rounded-xl font-bold text-gray-900 text-sm">
                                                                {formatPrice(calcLineTotalTTC(item))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Sub-row Details */}
                                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                                        <input
                                                            type="text"
                                                            value={item.name}
                                                            onChange={(e) => updateItem(index, 'name', e.target.value)}
                                                            className="h-11 px-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                            placeholder="Nom de l'article..."
                                                        />
                                                        <input
                                                            type="text"
                                                            value={item.description}
                                                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                                                            className="h-11 px-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                                            placeholder="Description optionnelle..."
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* General Discount & Summary */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        <div className="space-y-4">
                            <label className="text-lg font-semibold text-gray-900 block">Remise générale</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.general_discount}
                                    onChange={(e) => setData('general_discount', e.target.value)}
                                    className="w-32 h-11 px-4 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />
                                <div className="relative">
                                    <select
                                        value={data.general_discount_type}
                                        onChange={(e) => setData('general_discount_type', e.target.value)}
                                        className="h-11 px-4 pr-8 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none text-sm"
                                    >
                                        <option>%</option>
                                        <option>MAD</option>
                                    </select>
                                    <svg className="absolute right-2.5 top-3 text-gray-400 pointer-events-none w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>Total HT</span>
                                <span className="font-bold text-gray-900">{formatPrice(calcSubtotal())}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>Remise générale</span>
                                <span className="font-bold text-red-500">- {formatPrice(calcGeneralDiscount())}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>Total HT final</span>
                                <span className="font-bold text-gray-900">{formatPrice(calcTotalHT())}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-gray-600">
                                <span>TVA</span>
                                <span className="font-bold text-gray-900">{formatPrice(calcTotalVAT())}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-lg font-semibold text-gray-900">Total TTC</span>
                                <span className="text-2xl font-bold text-indigo-600">
                                    {formatPrice(calcTotalTTC())}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* Text Areas Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-lg font-semibold text-gray-900">Notes</label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                                placeholder="Notes supplémentaires..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-lg font-semibold text-gray-900">Texte de conclusion</label>
                            <textarea
                                value={data.concluding_text}
                                onChange={(e) => setData('concluding_text', e.target.value)}
                                className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                                placeholder="Merci pour votre confiance..."
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <label className="text-lg font-semibold text-gray-900">Conditions générales</label>
                            <textarea
                                value={data.terms_conditions}
                                onChange={(e) => setData('terms_conditions', e.target.value)}
                                className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                                placeholder="Conditions de paiement, délais de livraison..."
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <label className="text-lg font-semibold text-gray-900">Pied de page</label>
                            <textarea
                                value={data.footer_text}
                                onChange={(e) => setData('footer_text', e.target.value)}
                                className="w-full h-32 p-4 rounded-2xl border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none"
                                placeholder="Informations société, coordonnées bancaires..."
                            />
                        </div>
                    </section>
                </div>
            </form>
        </DashboardLayout>
    );
}