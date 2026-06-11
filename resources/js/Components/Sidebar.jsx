import { Link, usePage } from "@inertiajs/react";

export default function Sidebar() {

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
            <Link
                href={route('tenants.create')}
                className="mb-6 block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
            >
                <div className="text-sm font-semibold text-slate-900">
                    {auth.tenant?.name || "Créer une organisation"}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                    Workspace
                </div>
            </Link>

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