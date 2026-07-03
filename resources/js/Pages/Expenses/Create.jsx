import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        recurrence: "fixed",
        monthly_amount: "",
    });

    const submit = (e) => {
        e.preventDefault();

        router.post("/expenses", {
            name: form.name,
            recurrence: form.recurrence,
            monthly_amount:
                form.recurrence === "fixed"
                    ? form.monthly_amount
                    : null,
        });
    };

    return (
        <DashboardLayout>
            <Head title="Ajouter une dépense" />

            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />

            <aside className="fixed right-0 top-0 h-screen w-full max-w-[480px] bg-white z-50 shadow-2xl flex flex-col">

                {/* Header */}
                <div className="px-8 pt-8 pb-6 border-b">
                    <div className="flex justify-between">

                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">
                                Ajouter une dépense
                            </h1>

                            <p className="text-slate-500 mt-2">
                                Créer une nouvelle catégorie
                            </p>
                        </div>

                        <button
                            onClick={() => window.history.back()}
                            className="h-10 w-10 rounded-full hover:bg-slate-100"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={submit}
                    className="flex-1 overflow-y-auto px-8 py-8 space-y-8"
                >
                    {/* Nom */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-3">
                            Nom de la catégorie
                        </label>

                        <input
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="
                                w-full
                                rounded-2xl
                                border
                                px-4
                                py-4
                                outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                            placeholder="Saisir le nom"
                        />
                    </div>

                    {/* Recurrence */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-slate-500 mb-3">
                            Récurrence
                        </label>

                        <div className="grid grid-cols-2 gap-4">

                            {/* Variable */}
                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        recurrence: "variable",
                                        monthly_amount: "",
                                    })
                                }
                                className={`
                                    rounded-2xl
                                    py-5
                                    border
                                    font-semibold
                                    transition
                                    ${
                                        form.recurrence === "variable"
                                            ? "border-indigo-600 border-2 text-indigo-600"
                                            : "border-slate-300"
                                    }
                                `}
                            >
                                Variable
                            </button>

                            {/* Fixe */}
                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        recurrence: "fixed",
                                    })
                                }
                                className={`
                                    rounded-2xl
                                    py-5
                                    border
                                    font-semibold
                                    transition
                                    ${
                                        form.recurrence === "fixed"
                                            ? "border-indigo-600 border-2 text-indigo-600"
                                            : "border-slate-300"
                                    }
                                `}
                            >
                                Fixe
                            </button>
                        </div>
                    </div>

                    {/* Montant kayban ghir Fixe */}
                    {form.recurrence === "fixed" && (
    <>
        {/* Montant mensuel */}
        <div>

            <label className="block text-xs uppercase font-bold text-slate-500 mb-3">
                Montant mensuel (MAD)
            </label>

            <div className="relative">

                <span className="absolute left-4 top-4 text-slate-500">
                    MAD
                </span>

                <input
                    value={form.monthly_amount}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            monthly_amount: e.target.value,
                        })
                    }
                    type="number"
                    className="
                        w-full
                        rounded-2xl
                        border
                        py-4
                        pl-16
                        pr-5
                        text-right
                        text-xl
                        font-semibold
                        outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                    "
                    placeholder="0.00"
                />

            </div>

            <p className="mt-3 text-sm text-slate-500">
                Montant fixe appliqué chaque mois.
            </p>

        </div>

        {/* Tableau des mois */}
        <div>

            <label className="block text-xs uppercase font-bold text-slate-500 mb-3">
                Montants par mois
            </label>

            <div className="grid grid-cols-3 gap-3">

                {[
                    "Jan",
                    "Fév",
                    "Mar",
                    "Avr",
                    "Mai",
                    "Juin",
                    "Juil",
                    "Août",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Déc",
                ].map((month) => (

                    <div key={month} className="space-y-2">

                        <div className="text-center text-sm font-semibold">
                            {month}
                        </div>

                        <input
                            type="number"
                            placeholder="0"
                            className="
                                w-full
                                rounded-xl
                                border
                                px-3
                                py-2
                                text-center
                                outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                            "
                        />

                    </div>

                ))}

            </div>

        </div>
    </>
)}
                </form>

                {/* Footer */}
                <div className="p-8 border-t">

                    <button
                        type="submit"
                        onClick={submit}
                        className="
                            w-full
                            rounded-2xl
                            bg-indigo-600
                            text-white
                            py-4
                            font-bold
                            hover:bg-indigo-700
                        "
                    >
                        Créer la catégorie
                    </button>

                </div>
            </aside>
        </DashboardLayout>
    );
}