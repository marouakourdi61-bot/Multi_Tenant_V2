import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index({ expenses = [] }) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        recurrence: "fixed",
        amount: "",
    });

    const months = [
        "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
        "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc",
    ];

    const totalExpenses = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );

    function submit(e) {
        e.preventDefault();
        post(route("expenses.store"), {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <DashboardLayout>

            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* Breadcrumbs and Title */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="material-symbols-outlined text-base">home</span>
                        <span className="material-symbols-outlined text-base">chevron_right</span>
                        <span className="text-indigo-600 font-medium">Dépenses</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Dépenses</h1>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#4648D4] text-white rounded-lg font-semibold shadow-sm hover:opacity-90 transition-all"
                    >
                        <span className="material-symbols-outlined">add</span>
                        <span>Ajouter une dépense</span>
                    </button>
                    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-1">
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="font-bold px-2">2026</span>
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* KPI Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Expenses Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-red-500 tracking-wider">Total des dépenses</span>
                                <div className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalExpenses.toLocaleString()} MAD
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-red-500">
                            <span className="material-symbols-outlined text-sm">category</span>
                            <span>Sur {expenses.length} catégorie(s)</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 opacity-10"></div>
                    </div>

                    {/* Total Revenues Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-green-600 tracking-wider">Total des revenus</span>
                                <div className="text-3xl font-bold text-gray-900 mt-1">0,00 MAD</div>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600">
                            <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
                            <span>Sur 0 source de revenu</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 opacity-10"></div>
                    </div>

                    {/* Net Savings Card */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Épargne nette</span>
                                <div className="text-3xl font-bold text-gray-900 mt-1">0,00 MAD</div>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-indigo-600">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            <span>Solde positif</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 opacity-10"></div>
                    </div>

                </div>

                {/* Main Data Table Container */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">

                    {/* Table Header */}
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex flex-col">
                            <h3 className="font-semibold text-gray-900">Répartition mensuelle</h3>
                            <p className="text-xs text-gray-400">
                                Cliquez sur une cellule pour modifier • Entrée pour enregistrer • Échap pour annuler
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-gray-200">
                                <button className="px-3 py-1 text-xs hover:text-indigo-600 transition-colors">Vue globale</button>
                                <button className="px-3 py-1 bg-indigo-600 text-white rounded-md shadow-sm text-xs">Vue détaillée</button>
                            </div>
                        </div>
                    </div>

                    {/* Grid Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1200px]">
                            <thead>
                                <tr className="bg-white border-b border-gray-200">
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400 sticky left-0 bg-white z-10 w-64 border-r border-gray-200">
                                        Catégorie
                                    </th>
                                    {months.map((month, i) => (
                                        <th
                                            key={month}
                                            className={`p-4 text-xs font-bold uppercase text-center ${
                                                i === 5
                                                    ? "text-indigo-600 bg-indigo-50/50 relative"
                                                    : "text-gray-400"
                                            }`}
                                        >
                                            <div className="flex items-center justify-center gap-1">
                                                {i === 5 && <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>}
                                                {month}
                                            </div>
                                            {i === 5 && (
                                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-600"></div>
                                            )}
                                        </th>
                                    ))}
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400 text-center bg-white sticky right-0 border-l border-gray-200">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">

                                {/* Expenses Section */}
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <button
                                            onClick={() => setOpen(true)}
                                            className="flex items-center gap-2 text-indigo-600 hover:underline font-medium text-sm"
                                        >
                                            <span className="material-symbols-outlined text-lg"></span>
                                            Ajouter une catégorie de dépense
                                        </button>
                                    </td>
                                    <td className="p-4 text-center text-gray-400 italic text-xs" colSpan={12}>
                                        Aucune dépense enregistrée
                                    </td>
                                    <td className="p-4 sticky right-0 bg-white border-l border-gray-200 text-center font-bold">
                                        {totalExpenses.toFixed(2)}
                                    </td>
                                </tr>

                                {/* Revenues Header Row */}
                                <tr className="bg-gray-50/30">
                                    <td className="p-4 sticky left-0 bg-gray-50/30 z-10 font-bold uppercase text-xs text-green-600 border-r border-gray-200">
                                        Revenus
                                    </td>
                                    <td className="p-4" colSpan={12}>
                                        <div className="flex items-center gap-4">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                                <span className="ml-3 text-sm font-medium text-gray-900">
                                                    Calculer depuis les factures
                                                </span>
                                            </label>
                                            <span className="text-xs text-gray-400">(Factures payées par mois)</span>
                                        </div>
                                    </td>
                                    <td className="p-4 sticky right-0 bg-gray-50/30 border-l border-gray-200"></td>
                                </tr>

                                {/* Revenue Action Row */}
                                <tr className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-200">
                                        <button className="flex items-center gap-2 text-green-600 hover:underline font-medium text-sm">
                                            <span className="material-symbols-outlined text-lg"></span>
                                            Ajouter une catégorie de revenu
                                        </button>
                                    </td>
                                    <td className="p-4" colSpan={12}></td>
                                    <td className="p-4 sticky right-0 bg-white border-l border-gray-200 text-center font-bold text-green-600">
                                        0,00
                                    </td>
                                </tr>

                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
                                    <td className="p-4 sticky left-0 bg-gray-100 z-10 border-r border-gray-200">
                                        Net (Revenus - Dépenses)
                                    </td>
                                    {months.map((month) => (
                                        <td key={month} className="p-4 text-center text-gray-400">
                                            —
                                        </td>
                                    ))}
                                    <td className="p-4 text-center text-green-600 sticky right-0 bg-gray-100 border-l border-gray-200">
                                        {(0 - totalExpenses).toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </div>

            {/* CREATE DRAWER */}
            {open && (
                <div className="fixed inset-0 z-50">

                    {/* Backdrop */}
                    <div
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <aside className="absolute right-0 top-0 h-screen w-full max-w-[480px] bg-white shadow-2xl flex flex-col">

                        {/* Header */}
                        <div className="p-6 flex justify-between border-b">
                            <div>
                                <h1 className="text-2xl font-bold">Ajouter une dépense</h1>
                                <p className="text-sm text-slate-500 mt-1">Créer une nouvelle catégorie</p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="flex-1 overflow-auto p-6 space-y-8">

                            {/* Nom */}
                            <div>
                                <label className="block text-xs font-bold uppercase mb-2">Nom</label>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData("name", e.target.value)}
                                    className="w-full rounded-xl border px-4 py-3"
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Récurrence */}
                            <div>
                                <label className="block mb-3 text-xs font-bold uppercase">Récurrence</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setData("recurrence", "variable")}
                                        className={`rounded-xl py-5 border ${
                                            data.recurrence === "variable"
                                                ? "border-indigo-600 bg-indigo-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        Variable
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData("recurrence", "fixed")}
                                        className={`rounded-xl py-5 border ${
                                            data.recurrence === "fixed"
                                                ? "border-indigo-600 bg-indigo-50"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        Fixe
                                    </button>
                                </div>
                            </div>

                            {/* Montant */}
                            <div>
                                <label className="block mb-2 text-xs font-bold uppercase">Montant</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.amount}
                                    onChange={(e) => setData("amount", e.target.value)}
                                    className="w-full rounded-xl border px-4 py-4 text-right"
                                />
                                {errors.amount && (
                                    <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                {processing ? "Création..." : "Créer la catégorie"}
                            </button>

                        </form>

                    </aside>

                </div>
            )}

        </DashboardLayout>
    );
}