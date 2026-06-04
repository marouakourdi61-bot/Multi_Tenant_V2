import { Link } from "@inertiajs/react";

export default function Sidebar() {
    return (
        <aside className="w-[260px] h-screen border-r border-outline-variant bg-surface flex flex-col py-6 px-4">

            {/* Logo */}
            <div className="mb-6 px-2">
                <h1 className="text-2xl font-bold tracking-tight">
                    BILLIX
                </h1>
            </div>

            {/* Org */}
            {/* Create Organization */}
            <Link
                href="/tenants/create"
                className="block p-3 mb-4 border border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
            >
                <div className="text-sm font-semibold text-blue-700">
                    + Créer une organisation
                </div>

                <div className="text-xs text-blue-500">
                    Nouveau workspace
                </div>
            </Link>

            {/* Nav */}
            <nav className="flex flex-col gap-1 text-sm">

                <Link href="/dashboard" className="px-3 py-2 rounded-lg bg-primary/10 text-primary">
                    Dashboard
                </Link>

                <Link href="/quotes" className="px-3 py-2 rounded-lg hover:bg-gray-100">
                    Quotes
                </Link>

                <Link href="/invoices" className="px-3 py-2 rounded-lg hover:bg-gray-100">
                    Invoices
                </Link>

                <Link href="/clients" className="px-3 py-2 rounded-lg hover:bg-gray-100">
                    Clients
                </Link>

                <div className="mt-4 text-xs text-gray-400 uppercase px-3">
                    Invoicing
                </div>

                <Link href="/invoices" className="px-3 py-2 rounded-lg hover:bg-gray-100">
                    Delivery Notes
                </Link>

            </nav>
        </aside>
    );
}