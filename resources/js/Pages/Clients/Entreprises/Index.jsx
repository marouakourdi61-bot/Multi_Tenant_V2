import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Create from "./Create";

export default function Index({ companies = [] }) {
    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    const filteredClients = clients.filter((client) =>
        (client.name ?? "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

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
                            {filteredClients.length}
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

                    {filteredClients.length ? (

                        filteredClients.map((client) => (

                            <div
                                key={client.id}
                                className="bg-white rounded-2xl border p-6 shadow-sm hover:shadow-md transition"
                            >

                                {/* TOP */}
                                <div className="flex justify-between">

                                    <div>

                                        <h3 className="font-bold text-lg">
                                            {client.name}
                                        </h3>

                                        <p className="text-sm text-gray-400">
                                            {client.email || "—"}
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
                                            {client.phone || "—"}
                                        </span>

                                    </div>

                                    <div className="flex justify-between text-sm">

                                        <span className="text-gray-400">
                                            Pays
                                        </span>

                                        <span>
                                            {client.country || "—"}
                                        </span>

                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div className="mt-6 pt-4 border-t flex justify-between">

                                    <span className="text-xs text-gray-400">
                                        {client.created_at}
                                    </span>

                                    <span className="text-xs font-semibold text-indigo-600">
                                        {client.invoices_count ?? 0} factures
                                    </span>

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