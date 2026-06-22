import { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Create from "./Create";

export default function Index({ clients = [] }) {
    const [search, setSearch] = useState("");
    const [openCreate, setOpenCreate] = useState(false);

    const filteredClients = clients.filter((c) =>
        (c.name ?? "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DashboardLayout>

            <div className="p-8 space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4 flex-1 max-w-md">

                        {/* SEARCH */}
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                
                            </span>

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher une client..."
                                className="w-full h-11 pl-10 pr-4 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* COUNT */}
                        <div className="h-11 px-4 flex items-center gap-2 border rounded-xl bg-white text-gray-500 font-semibold">
                            <span className="material-symbols-outlined text-[18px]">
                                groups
                            </span>
                            {filteredClients.length}
                        </div>

                    </div>

                    {/* BUTTON OPEN MODAL */}
                    <button
                        type="button"
                        onClick={() => setOpenCreate(true)}
                        className="h-11 px-6 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition flex items-center justify-center"
                    >
                        Ajouter un client
                    </button>

                </div>

                {/* CLIENTS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                            <div
                                key={client.id}
                                className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col h-[180px]"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">
                                        {client.name}
                                    </h3>

                                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase rounded">
                                        CLIENT
                                    </span>
                                </div>

                                <p className="text-gray-400 text-sm mb-auto">
                                    {client.email || "—"}
                                </p>

                                <div className="pt-4 border-t border-dashed flex justify-between text-xs text-gray-400">
                                    <span>{client.created_at}</span>
                                    <span>{client.invoices_count ?? 0} factures</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <div className="text-gray-400 text-lg">
                                Aucun client trouvé
                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* MODAL */}
            {openCreate && (
                <Create
                    key="create-client"
                    onClose={() => setOpenCreate(false)}
                />
            )}

        </DashboardLayout>
    );
}