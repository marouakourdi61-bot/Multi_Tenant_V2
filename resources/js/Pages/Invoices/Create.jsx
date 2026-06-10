import { useForm } from '@inertiajs/react';
import DashboardLayout from '../../../Layouts/DashboardLayout';

export default function Create() {

    const { data, setData, post, processing } = useForm({
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
        post('/invoices');
    };

    return (
        <form onSubmit={submit} className="min-h-screen bg-surface font-sans text-on-surface">

            <main className="max-w-6xl mx-auto px-container-padding py-8">

                {/* HEADER */}
                <header className="flex items-center justify-between pb-6 border-b border-outline-variant mb-8">
                    <h1 className="text-xl font-semibold text-on-surface-variant">
                        FA202600001
                    </h1>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-6 py-2.5 text-sm font-medium border border-outline-variant rounded-md hover:bg-surface-container"
                        >
                            Cancel
                        </button>

                        <button type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-primary text-on-primary rounded-md btn-shadow hover:brightness-110"
                        >
                            Save Invoice
                        </button>
                    </div>
                </header>

                {/* RECIPIENT */}
                <section className="mb-10">
                    <h2 className="text-lg font-bold mb-4">Recipient</h2>

                    <select
                        className="w-full max-w-lg h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-xl"
                        value={data.recipient}
                        onChange={e => setData('recipient', e.target.value)}
                    >
                        <option value="">Select a recipient...</option>
                        <option>Client A</option>
                        <option>Client B</option>
                    </select>
                </section>

                {/* INFO */}
                <section className="space-y-6 mb-10">
                    <h2 className="text-lg font-bold">Information</h2>

                    <div className="flex flex-wrap gap-8">
                        <input
                            className="w-64 h-11 px-4 border border-outline-variant rounded-xl"
                            value={data.issue_date}
                            onChange={e => setData('issue_date', e.target.value)}
                        />

                        <select
                            className="w-48 h-11 px-4 border border-outline-variant rounded-xl"
                            value={data.currency}
                            onChange={e => setData('currency', e.target.value)}
                        >
                            <option>MAD</option>
                            <option>USD</option>
                            <option>EUR</option>
                        </select>
                    </div>

                    <label className="flex items-center gap-3 mt-4">
                        <input
                            type="checkbox"
                            checked={data.vat}
                            onChange={e => setData('vat', e.target.checked)}
                        />
                        VAT not applicable
                    </label>
                </section>

                {/* ITEMS */}
                <section className="space-y-4 mb-10">
                    <h2 className="text-lg font-bold">Articles</h2>

                    {data.items.map((item, index) => (
                        <div key={index} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 space-y-4">

                            <div className="grid grid-cols-12 gap-4 items-center">

                                <div className="col-span-1 text-center font-bold">
                                    {index + 1}
                                </div>

                                <input
                                    className="col-span-1 h-11 border border-outline-variant rounded-xl text-center"
                                    type="number"
                                    value={item.qty}
                                    onChange={e => updateItem(index, 'qty', e.target.value)}
                                />

                                <select
                                    className="col-span-2 h-11 border border-outline-variant rounded-xl"
                                    value={item.type}
                                    onChange={e => updateItem(index, 'type', e.target.value)}
                                >
                                    <option>Service</option>
                                    <option>Product</option>
                                </select>

                                <input
                                    className="col-span-3 h-11 border border-outline-variant rounded-xl px-3"
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={e => updateItem(index, 'name', e.target.value)}
                                />

                                <input
                                    className="col-span-2 h-11 border border-outline-variant rounded-xl px-3"
                                    type="number"
                                    value={item.unit_price}
                                    onChange={e => updateItem(index, 'unit_price', e.target.value)}
                                />

                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                    className="col-span-1 text-red-500"
                                >
                                    X
                                </button>
                            </div>

                            <input
                                className="w-full h-11 border border-outline-variant rounded-xl px-3"
                                placeholder="Description"
                                value={item.description}
                                onChange={e => updateItem(index, 'description', e.target.value)}
                            />
                        </div>
                    ))}

                    <button type="button" onClick={addItem} className="text-primary font-semibold">
                        + Add Article
                    </button>
                </section>

                {/* FOOTER */}
                <section className="grid grid-cols-12 gap-8">

                    <div className="col-span-7 space-y-6">
                        <textarea
                            className="w-full border border-outline-variant rounded-2xl p-4"
                            placeholder="Notes"
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                        />

                        <textarea
                            className="w-full border border-outline-variant rounded-2xl p-4"
                            placeholder="Concluding text"
                            value={data.concluding_text}
                            onChange={e => setData('concluding_text', e.target.value)}
                        />
                    </div>

                    <div className="col-span-5">
                        <div className="bg-surface-container border border-outline-variant rounded-[2.5rem] p-8 space-y-4">

                            <div className="flex justify-between">
                                <span>Total HT</span>
                                <span>0,00 MAD</span>
                            </div>

                            <div className="flex justify-between">
                                <span>VAT</span>
                                <span>0,00 MAD</span>
                            </div>

                            <div className="border-t pt-4 flex justify-between font-bold">
                                <span>Total TTC</span>
                                <span className="text-primary">0,00 MAD</span>
                            </div>
                        </div>
                    </div>

                </section>

            </main>
        </form>
    );
}

Create.layout = page => <DashboardLayout children={page} />;