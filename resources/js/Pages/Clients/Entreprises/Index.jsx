import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Create from "./Create";

export default function Index({ companies = [] }) {
    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    const filteredCompanies = companies.filter((company) =>
        (company.name ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleDelete = (company) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer ${company.name} ?`)) {
            router.delete(route("entreprises.destroy", company.id));
        }
    };

    return (
        <DashboardLayout>

            <div className="p-8 space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        {/* SEARCH */}
                        <div className="relative">

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Rechercher une entreprise..."
                                className="w-[320px] h-11 px-4 rounded-xl border border-gray-200 bg-white"
                            />

                        </div>

                        {/* COUNT */}
                        <div className="h-11 px-5 flex items-center rounded-xl border bg-white text-gray-500 font-semibold">
                            {filteredCompanies.length}
                        </div>

                    </div>

                    {/* BTN */}
                    <button
                        onClick={() =>
                            setOpenCreate(true)
                        }
                        className="h-11 px-6 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                    >
                        Ajouter une entreprise
                    </button>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {filteredCompanies.length ? (

                        filteredCompanies.map((company) => (

                            <div
                                key={company.id}
                                className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition relative group"
                            >

                                {/* TOP */}
                                <div className="flex justify-between">

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            {company.name}
                                        </h3>

                                        <p className="text-sm text-gray-400">
                                            {company.email || "—"}
                                        </p>

                                    </div>

                                    <span className="text-[10px] uppercase px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold">
                                        Entreprise
                                    </span>

                                </div>

                                {/* INFO */}
                                <div className="mt-6 space-y-2">

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-400">
                                            Téléphone
                                        </span>

                                        <span>
                                            {company.phone || "—"}
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-400">
                                            Pays
                                        </span>

                                        <span>
                                            {company.country || "—"}
                                        </span>

                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div className="mt-6 pt-4 border-t flex justify-between items-center">

                                    <span className="text-xs text-gray-400">
                                        {company.created_at}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-indigo-600">
                                            {company.invoices_count ?? 0} factures
                                        </span>

                                        {/* ACTION ICONS */}
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={route("entreprises.edit", company.id)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition"
                                                title="Modifier"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                </svg>
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(company)}
                                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                                                title="Supprimer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="col-span-full text-center py-20 text-gray-400">
                            Aucune entreprise trouvée
                        </div>

                    )}

                </div>

            </div>

            {openCreate && (
                <Create
                    onClose={() =>
                        setOpenCreate(false)
                    }
                />
            )}

        </DashboardLayout>
    );
}