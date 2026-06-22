import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    ChevronDown,
    Home,
    Users,
    ReceiptText,
    Package,
    ShoppingCart,
} from "lucide-react";

export default function Sidebar() {
    const page = usePage();
    const auth = page.props?.auth ?? {};

    const [openOrg, setOpenOrg] = useState(false);

    const [menus, setMenus] = useState({
        clients: true,
        billing: true,
        inventory: false,
        orders: false,
    });

    const toggle = (key) => {
        setMenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const active = (path) =>
        page.url.startsWith(path);

    const itemClass = (path) =>
        `
        flex items-center
        h-10
        px-3
        rounded-lg
        transition
        ${active(path)
            ? "bg-[#DCE9FF] text-[#4648D4] border-l-2 border-[#4648D4]"
            : "text-slate-700 hover:bg-[#EFF4FF]"
        }
    `;

    const subItem = (href, label) => (
        <Link
            href={href}
            className={`
                flex
                items-center
                h-9
                pl-11
                pr-3
                rounded-lg
                transition
                ${active(href)
                    ? "bg-[#DCE9FF] text-[#4648D4] border-l-2 border-[#4648D4]"
                    : "text-slate-600 hover:bg-[#EFF4FF]"
                }
            `}
        >
            {label}
        </Link>
    );

    return (
        <aside
            className="
                fixed
                left-0
                top-0
                h-screen
                w-[260px]
                bg-[#F8F9FF]
                border-r
                border-slate-200
                flex
                flex-col
                py-6
                overflow-y-auto
                z-50
            "
        >
            {/* Logo */}
            <div className="px-6 mb-8">
                <h1 className="text-2xl font-extrabold">
                    BILLIX
                </h1>
            </div>

            {/* Workspace */}
            <div className="px-4 mb-8 relative">

                <button
                    onClick={() =>
                        setOpenOrg(!openOrg)
                    }
                    className="
                        w-full
                        rounded-xl
                        border
                        bg-white
                        p-4
                    "
                >
                    <div className="flex items-center justify-between">

                        <div className="flex gap-3">

                            <div
                                className="
                                h-10
                                w-10
                                rounded-lg
                                bg-[#EFF4FF]
                                flex
                                items-center
                                justify-center
                                font-bold
                            "
                            >
                                {auth.tenant?.name?.charAt(
                                    0
                                ) || "M"}
                            </div>

                            <div className="text-left">

                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">
                                        {auth.tenant?.name || "Workspace"}
                                    </span>
                                    {auth.tenant?.id && (
                                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                                    )}
                                </div>

                                <div className="text-xs text-slate-500">
                                    {auth.tenant?.id ? "Actif" : "Aucune organisation"}
                                </div>

                            </div>

                        </div>

                        <ChevronDown
                            size={18}
                            className={
                                openOrg
                                    ? "rotate-180"
                                    : ""
                            }
                        />

                    </div>
                </button>

                {openOrg && (
                    <div className="mt-2 rounded-xl border bg-white overflow-hidden">

                        {(auth.tenants || []).map(
                            (tenant) => (
                                <Link
                                    key={tenant.id}
                                    href={route("tenants.switch", { tenant: tenant.id })}
                                    method="post"
                                    preserveScroll
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50"
                                >
                                    <span className="flex-1">{tenant.name}</span>
                                    {tenant.id === auth.tenant?.id && (
                                        <span className="text-indigo-600 font-bold text-sm ml-2">✓</span>
                                    )}
                                </Link>
                            )
                        )}

                        <Link
                            href={route("tenants.create")}
                            className="w-full flex items-center gap-2 px-4 py-3 border-t text-slate-600 hover:bg-slate-50"
                        >
                            <span>+</span>
                            <span>Créer une organisation</span>
                        </Link>

                    </div>
                )}

            </div>

            {/* Navigation */}
            <nav className="px-4 flex-1 space-y-2">

                <Link
                    href={route("dashboard")}
                    className={itemClass(
                        "/dashboard"
                    )}
                >
                    <Home size={18} />
                    <span className="ml-3">
                        Tableau de bord
                    </span>
                </Link>

                <Link
                    href="/users"
                    className={itemClass(
                        "/users"
                    )}
                >
                    <Users size={18} />
                    <span className="ml-3">
                        Utilisateurs
                    </span>
                </Link>

                {/* CLIENTS */}
                <div>

                    <button
                        onClick={() =>
                            toggle(
                                "clients"
                            )
                        }
                        className={itemClass(
                            "/clients"
                        )}
                    >
                        <Users size={18} />

                        <span className="ml-3 flex-1 text-left font-semibold">
                            Clients
                        </span>

                        <ChevronDown
                            size={16}
                            className={
                                menus.clients
                                    ? "rotate-180"
                                    : ""
                            }
                        />
                    </button>

                    {menus.clients && (
                        <div className="space-y-1">

                            {subItem(
                                route("clients.index"),
                                "Particuliers"
                            )}

                            {subItem(
                                "/clients/companies",
                                "Entreprises"
                            )}

                            {subItem(
                                "/suppliers",
                                "Fournisseurs"
                            )}

                        </div>
                    )}

                </div>

                {/* FACTURATION */}
                <div>

                    <button
                        onClick={() =>
                            toggle(
                                "billing"
                            )
                        }
                        className={itemClass(
                            "/quotes"
                        )}
                    >
                        <ReceiptText size={18} />

                        <span className="ml-3 flex-1 text-left font-semibold">
                            Facturation
                        </span>

                        <ChevronDown
                            size={16}
                            className={
                                menus.billing
                                    ? "rotate-180"
                                    : ""
                            }
                        />
                    </button>

                    {menus.billing && (
                        <div className="space-y-1">

                            {subItem(
                                "/quotes",
                                "Devis"
                            )}

                            {subItem(
                                "/invoices",
                                "Factures"
                            )}

                            {subItem(
                                "/delivery-notes",
                                "Bons de livraison"
                            )}

                        </div>
                    )}

                </div>

                {/* INVENTAIRE */}
                <div>

                    <button
                        onClick={() =>
                            toggle(
                                "inventory"
                            )
                        }
                        className={itemClass(
                            "/inventory"
                        )}
                    >
                        <Package size={18} />

                        <span className="ml-3 flex-1 text-left font-semibold">
                            Inventaire
                        </span>

                        <ChevronDown
                            size={16}
                            className={
                                menus.inventory
                                    ? "rotate-180"
                                    : ""
                            }
                        />
                    </button>

                    {menus.inventory && (
                        <div className="space-y-1">

                            {subItem(
                                "/stocks",
                                "Stock & Mouvements"
                            )}

                            {subItem(
                                "/storage-addresses",
                                "Adresses de stockage"
                            )}

                            {subItem(
                                "/products",
                                "Produits"
                            )}

                        </div>
                    )}

                </div>

                {/* COMMANDES */}
                <div>

                    <button
                        onClick={() =>
                            toggle(
                                "orders"
                            )
                        }
                        className={itemClass(
                            "/orders"
                        )}
                    >
                        <ShoppingCart
                            size={18}
                        />

                        <span className="ml-3 flex-1 text-left font-semibold">
                            Commandes
                        </span>

                        <ChevronDown
                            size={16}
                            className={
                                menus.orders
                                    ? "rotate-180"
                                    : ""
                            }
                        />
                    </button>

                    {menus.orders && (
                        <div className="space-y-1">

                            {subItem(
                                "/supplier-orders",
                                "Commandes fournisseur"
                            )}

                            {subItem(
                                "/customer-orders",
                                "Commandes client"
                            )}

                        </div>
                    )}

                </div>

            </nav>

            {/* Footer */}
            <div className="px-4 pt-6 border-t space-y-3">

                <button
                    className="
                        w-full
                        h-12
                        rounded-xl
                        bg-[#EFF4FF]
                        hover:bg-[#DCE9FF]
                        transition
                    "
                >
                    Paramètres
                </button>

                <Link
                    href={route(
                        "logout"
                    )}
                    method="post"
                    className="
                        w-full
                        h-12
                        rounded-xl
                        bg-[#EFF4FF]
                        hover:bg-[#DCE9FF]
                        transition
                        flex
                        items-center
                        justify-center
                    "
                >
                    Se déconnecter
                </Link>

            </div>

        </aside>
    );
}