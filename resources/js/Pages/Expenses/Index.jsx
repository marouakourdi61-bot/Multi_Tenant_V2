import { useState, useRef } from "react";
import { router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const MONTHS = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc",
];

export default function Index({ expenses = [], invoices = [] }) {

    // console.log(expenses);
    
    const [editingCell, setEditingCell] = useState(null);
    const [editValue, setEditValue] = useState("");
    const year = 2026;

    function getAmount(expense, monthIndex) {
        const month = expense.months?.find(
            (m) => m.month === monthIndex + 1 && Number(m.year) === year
        );
        return month ? Number(month.amount) : 0;
    }

    function getRowTotal(expense) {
        if (!expense.months) return 0;
        return expense.months
            .filter((m) => Number(m.year) === year)
            .reduce((sum, m) => sum + Number(m.amount), 0);
    }

    function getColumnTotal(monthIndex) {
        return expenses.reduce((sum, exp) => sum + getAmount(exp, monthIndex), 0);
    }

    function getRevenueForMonth(monthIndex) {
        return invoices
            .filter((inv) => {
                const date = new Date(inv.issue_date);
                return date.getMonth() === monthIndex && date.getFullYear() === year;
            })
            .reduce((sum, inv) => sum + Number(inv.total), 0);
    }

    function getNetForMonth(monthIndex) {
        return getRevenueForMonth(monthIndex) - getColumnTotal(monthIndex);
    }

    const grandTotal = expenses.reduce((sum, exp) => sum + getRowTotal(exp), 0);
    const totalRevenue = invoices
        .filter((inv) => new Date(inv.issue_date).getFullYear() === year)
        .reduce((sum, inv) => sum + Number(inv.total), 0);
    const netTotal = totalRevenue - grandTotal;

    function startEdit(expense, monthIndex, currentValue) {
        setEditingCell({ expenseId: expense.id, month: monthIndex });
        // Si la cellule est vide et que c'est une dépense fixe, proposer le montant mensuel par défaut
        const defaultValue = currentValue === 0 && expense.recurrence === "fixed"
            ? Number(expense.amount)
            : currentValue;
        setEditValue(defaultValue.toString());
    }

    function saveEdit() {
        if (!editingCell) return;
        const cell = editingCell;
        const { expenseId, month } = cell;
        const amount = parseFloat(editValue) || 0;

        // Clear editing state immediately to prevent race conditions
        setEditingCell(null);

        router.post(
            route("expenses.month.update", expenseId),
            { year, month: month + 1, amount, _method: "put" },
            { preserveScroll: true }
        );
    }

    function cancelEdit() {
        setEditingCell(null);
        setEditValue("");
    }

    function isEditing(expenseId, monthIndex) {
        return (
            editingCell &&
            editingCell.expenseId === expenseId &&
            editingCell.month === monthIndex
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-6">

                {/* Breadcrumbs */}
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
                    <a
                        href={route("expenses.create")}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#4648D4] text-white rounded-lg font-semibold shadow-sm hover:opacity-90 transition-all"
                    >
                        <span className="material-symbols-outlined"></span>
                        <span>Ajouter une dépense</span>
                    </a>
                    <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-lg p-1">
                        <span className="font-bold px-2">{year}</span>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-red-500 tracking-wider">Total des dépenses</span>
                                <div className="text-3xl font-bold text-gray-900 mt-1">
                                    {grandTotal.toLocaleString()} MAD
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}></span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-red-500">
                            <span className="material-symbols-outlined text-sm">category</span>
                            <span>Sur {expenses.length} catégorie(s)</span>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 opacity-10"></div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-green-600 tracking-wider">Total des revenus</span>
                                <div className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalRevenue.toLocaleString()} MAD
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}></span>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 opacity-10"></div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Épargne nette</span>
                                <div className={`text-3xl font-bold mt-1 ${netTotal > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {netTotal.toLocaleString()} MAD
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}></span>
                            </div>
                        </div>
                        <div className={`absolute bottom-0 left-0 w-full h-1 ${netTotal >= 0 ? 'bg-indigo-600' : 'bg-red-500'} opacity-10`}></div>
                    </div>
                </div>

                {/* Excel-like Grid */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[1200px]">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="p-3 text-xs font-bold uppercase text-gray-500 sticky left-0 bg-gray-50 z-10 w-56 border-r border-gray-200">
                                        Catégorie
                                    </th>
                                    {MONTHS.map((month, i) => (
                                        <th
                                            key={month}
                                            className={`p-3 text-xs font-bold uppercase text-center border-r border-gray-100 ${
                                                i === 5 ? "text-indigo-600 bg-indigo-50" : "text-gray-500"
                                            }`}
                                            style={{ minWidth: "90px" }}
                                        >
                                            {month}
                                        </th>
                                    ))}
                                    <th className="p-3 text-xs font-bold uppercase text-center text-gray-700 sticky right-0 bg-gray-50 border-l border-gray-200" style={{ minWidth: "90px" }}>
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-3 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${expense.recurrence === "fixed" ? "bg-indigo-500" : "bg-amber-500"}`}></span>
                                                {expense.name}
                                                <span className="text-[10px] text-gray-400 uppercase font-bold ml-1">
                                                    {expense.recurrence === "fixed" ? "Fixe" : "Var"}
                                                </span>
                                            </div>
                                        </td>
                                        {MONTHS.map((_, monthIdx) => (
                                            <td
                                                key={monthIdx}
                                                className="p-1 text-center border-r border-gray-50 cursor-cell"
                                                    onClick={() => {
                                                        if (!isEditing(expense.id, monthIdx)) {
                                                            startEdit(expense, monthIdx, getAmount(expense, monthIdx));
                                                        }
                                                    }}
                                            >
                                                {isEditing(expense.id, monthIdx) ? (
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editValue}
                                                        autoFocus
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") saveEdit();
                                                            if (e.key === "Escape") cancelEdit();
                                                        }}
                                                        onBlur={saveEdit}
                                                        className="w-full px-2 py-1.5 text-center text-sm font-semibold border-2 border-indigo-500 rounded-md outline-none"
                                                    />
                                                ) : (
                                                    <span className={`text-sm font-medium cursor-pointer hover:text-indigo-600 transition-colors px-2 py-1.5 block ${
                                                        getAmount(expense, monthIdx) > 0 ? "text-gray-900" : "text-gray-300"
                                                    }`}>
                                                        {getAmount(expense, monthIdx) > 0
                                                            ? getAmount(expense, monthIdx).toFixed(2)
                                                            : "—"}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                        <td className="p-3 text-sm font-bold text-gray-900 text-center sticky right-0 bg-white border-l border-gray-200">
                                            {getRowTotal(expense).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}

                                {expenses.length === 0 && (
                                    <tr>
                                        <td className="p-6 text-center text-gray-400 italic" colSpan={14}>
                                            <a href={route("expenses.create")} className="text-indigo-600 hover:underline font-medium">
                                                Ajouter une catégorie de dépense
                                            </a>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-bold text-gray-900 border-t-2 border-gray-300">
                                    <td className="p-3 sticky left-0 bg-gray-100 z-10 border-r border-gray-200">
                                        Net (Revenus − Dépenses)
                                    </td>
                                    {MONTHS.map((_, monthIdx) => (
                                        <td key={monthIdx} className={`p-3 text-center border-r border-gray-200 ${getNetForMonth(monthIdx) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {getNetForMonth(monthIdx).toFixed(2)}
                                        </td>
                                    ))}
                                    <td className={`p-3 text-center sticky right-0 bg-gray-100 border-l border-gray-200 ${netTotal >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {netTotal.toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}