import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

export default function Index({ quotes = [] }) {
    return (
        <DashboardLayout>
            <div className="space-y-8">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-slate-900">
                            Devis
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Gérez vos devis et convertissez-les en factures.
                        </p>
                    </div>

                    <Link
                        href="/quotes/create"
                        className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                        + Nouveau devis
                    </Link>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="rounded-3xl bg-white border border-slate-200 p-6">
                        <p className="text-sm text-slate-500">
                            Total devis
                        </p>

                        <h3 className="mt-3 text-3xl font-bold">
                            {quotes.length}
                        </h3>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200 p-6">
                        <p className="text-sm text-slate-500">
                            Acceptés
                        </p>

                        <h3 className="mt-3 text-3xl font-bold text-green-600">
                            {
                                quotes.filter(
                                    q => q.status === "accepted"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200 p-6">
                        <p className="text-sm text-slate-500">
                            En attente
                        </p>

                        <h3 className="mt-3 text-3xl font-bold text-orange-500">
                            {
                                quotes.filter(
                                    q => q.status === "pending"
                                ).length
                            }
                        </h3>
                    </div>

                </div>

                {/* EMPTY */}
                {quotes.length === 0 ? (

                    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm">

                        <div className="py-28 px-10 text-center">

                            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-50">

                                <svg
                                    className="h-12 w-12 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9 12h6m-6 4h6M9 8h6"
                                    />
                                </svg>

                            </div>

                            <h2 className="text-2xl font-semibold text-slate-900">
                                Aucun devis
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Créez votre premier devis.
                            </p>

                            <Link
                                href="/quotes/create"
                                className="mt-8 inline-flex rounded-2xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                            >
                                + Nouveau devis
                            </Link>

                        </div>

                    </div>

                ) : (

                    <div className="rounded-3xl bg-white border border-slate-200">
                        table  quotes
                    </div>

                )}

            </div>
        </DashboardLayout>
    );
}