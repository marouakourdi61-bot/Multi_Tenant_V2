import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { ChevronDown, Check, Settings, Plus } from "lucide-react";

export default function Sidebar() {
    const [openOrg, setOpenOrg] = useState(false);
    const page = usePage();
    const auth = page.props?.auth ?? {};

    // console.log('auth props', auth);

    return (
        <aside className="w-[280px] h-screen border-r border-slate-200 bg-white flex flex-col py-6 px-4 overflow-y-auto">

            {/* Logo */}
            <div className="mb-8 px-2">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    BILLIX
                </h1>
            </div>

            {/* Organization Card */}
            <div className="relative mb-6">

                <button
                    onClick={() => setOpenOrg(!openOrg)}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:bg-slate-50"
                >
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700">
                                {auth.tenant?.name?.charAt(0) || "N"}
                            </div>

                            <div>
                                <div className="text-sm font-semibold text-slate-900">
                                    {auth.tenant?.name || "Créer une organisation"}
                                </div>

                                <div className="text-xs text-slate-500">
                                    Workspace
                                </div>
                            </div>

                        </div>

                        <ChevronDown
                            size={18}
                            className={`transition ${openOrg ? "rotate-180" : ""
                                }`}
                        />

                    </div>
                </button>

                {openOrg && (
                    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

                        {(auth.tenants || []).map((tenant) => (
                            <div
                                key={tenant.id}
                                className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
                            >
                                <div className="flex items-center gap-3">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold">
                                        {tenant.name.charAt(0)}
                                    </div>

                                    <span
                                        className={
                                            tenant.id === auth.tenant?.id
                                                ? "font-medium text-indigo-600"
                                                : "text-slate-700"
                                        }
                                    >
                                        {tenant.name}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    {tenant.id === auth.tenant?.id && (
                                        <Check
                                            size={16}
                                            className="text-indigo-600"
                                        />
                                    )}

                                    <Settings
                                        size={16}
                                        className="text-slate-400"
                                    />

                                </div>
                            </div>
                        ))}

                        <div className="px-4 py-3 text-xs font-semibold uppercase text-slate-400">
                            ORGANISATIONS
                        </div>

                        <Link
                            href={route("tenants.create")}
                            className="flex items-center gap-3 border-t px-4 py-4 text-slate-700 hover:bg-slate-50"
                        >
                            <Plus size={18} />

                            Créer une organisation
                        </Link>

                    </div>
                )}

            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 text-sm">

                <Link
                    href={route('dashboard')}
                    className="rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                    Dashboard
                </Link>

                <Link
                    href="/quotes"
                    className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Devis
                </Link>

                <Link
                    href={route('invoices.index')}
                    className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Factures
                </Link>

                <Link
                    href="/clients"
                    className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Clients
                </Link>

                {/* Divider */}
                <div className="my-3 border-t border-slate-200"></div>

                <div className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    Facturation
                </div>

                <Link
                    href="/invoices"
                    className="rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                    Bons de livraison
                </Link>

            </nav>

            {/* Footer */}
            <div className="mt-auto border-t border-slate-200 pt-4">
                <div className="flex flex-col gap-3">
                    <button className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
                        Paramètres
                    </button>
                    <Link
                        href={route('logout')}
                        method="post"
                        className="w-full rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 transition hover:bg-red-100"
                    >
                        Se déconnecter
                    </Link>
                </div>
            </div>
        </aside>
    );
}