import { useState } from "react";
import { router } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "@/Layouts/DashboardLayout";

import Create from "./Create";
import Edit from "./Edit";

export default function Index({
    suppliers = [],
}) {

    const [search, setSearch] =
        useState("");

    const [openCreate, setOpenCreate] =
        useState(false);

    const [openEdit, setOpenEdit] =
        useState(false);

    const [
        selectedSupplier,
        setSelectedSupplier,
    ] = useState(null);

    const filteredSuppliers =
        suppliers.filter(
            (supplier) =>
                (
                    supplier.name ??
                    ""
                )
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <DashboardLayout>

            <main className="px-8 pt-8 pb-12">

                {/* ACTION BAR */}

                <div className="flex flex-wrap items-center gap-4 mb-8">

                    <div className="relative flex-1 max-w-sm">

                        <input
                            type="text"
                            placeholder="Rechercher un fournisseur..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                h-11
                                px-4
                                rounded-xl
                                border
                                bg-white
                                shadow-sm
                            "
                        />

                    </div>

                    <div
                        className="
                            h-11
                            px-4
                            rounded-xl
                            border
                            bg-white
                            flex
                            items-center
                            font-semibold
                        "
                    >
                        {filteredSuppliers.length}
                    </div>

                    <button
                        onClick={() =>
                            setOpenCreate(
                                true
                            )
                        }
                        className="
                            h-11
                            px-6
                            rounded-xl
                            bg-[#4648D4]
                            text-white
                            hover:opacity-90
                        "
                    >
                        Ajouter un fournisseur
                    </button>

                </div>

                {/* GRID */}

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                        gap-6
                    "
                >

                    {
                        filteredSuppliers.length
                            ? (

                                filteredSuppliers.map(
                                    (
                                        supplier
                                    ) => (

                                        <div
                                            key={
                                                supplier.id
                                            }
                                            className="
                                                bg-white
                                                rounded-2xl
                                                border
                                                p-6
                                                shadow-sm
                                                hover:shadow-lg
                                                transition
                                                flex
                                                flex-col
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <div className="flex justify-between">

                                                    <div>

                                                        <h3 className="font-bold text-lg">

                                                            {
                                                                supplier.name
                                                            }

                                                        </h3>

                                                        <div className="w-10 h-[2px] bg-slate-200 mt-2" />

                                                    </div>

                                                    <span
                                                        className="
                                                            px-3
                                                            py-1
                                                            rounded-full
                                                            bg-indigo-50
                                                            text-indigo-600
                                                            text-xs
                                                        "
                                                    >
                                                        Fournisseur
                                                    </span>

                                                </div>

                                                <div className="mt-6 space-y-3">

                                                    <Row
                                                        label="Email"
                                                        value={
                                                            supplier.email
                                                        }
                                                    />

                                                    <Row
                                                        label="Téléphone"
                                                        value={
                                                            supplier.phone
                                                        }
                                                    />

                                                    <Row
                                                        label="Pays"
                                                        value={
                                                            supplier.country
                                                        }
                                                    />

                                                </div>

                                            </div>

                                            <div
                                                className="
                                                    mt-6
                                                    pt-4
                                                    border-t
                                                    flex
                                                    justify-between
                                                    items-center
                                                "
                                            >

                                                <span
                                                    className="
                                                        text-xs
                                                        text-gray-400
                                                    "
                                                >
                                                    {
                                                        supplier.created_at
                                                    }
                                                </span>

                                                <div className="flex gap-2">

                                                    <button
                                                        onClick={() => {

                                                            setSelectedSupplier(
                                                                supplier
                                                            );

                                                            setOpenEdit(
                                                                true
                                                            );

                                                        }}
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            hover:bg-indigo-50
                                                            text-indigo-600
                                                            transition
                                                        "
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        onClick={() => {

                                                            if (
                                                                confirm(
                                                                    "Voulez-vous vraiment supprimer ce fournisseur ?"
                                                                )
                                                            ) {

                                                                router.delete(
                                                                    route(
                                                                        "fournisseurs.destroy",
                                                                        supplier.id
                                                                    )
                                                                );

                                                            }

                                                        }}
                                                        className="
                                                            p-2
                                                            rounded-lg
                                                            hover:bg-red-50
                                                            text-red-500
                                                            transition
                                                        "
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                )

                            )

                            : (

                                <div className="col-span-full">

                                    <div
                                        className="
                                            bg-white
                                            rounded-2xl
                                            border
                                            py-20
                                            text-center
                                        "
                                    >

                                        Aucun fournisseur

                                    </div>

                                </div>

                            )
                    }

                </div>

            </main>

            {/* CREATE */}

            {
                openCreate && (

                    <Create
                        onClose={() =>
                            setOpenCreate(
                                false
                            )
                        }
                    />

                )
            }

            {/* EDIT */}

            {
                openEdit &&
                selectedSupplier && (

                    <Edit
                        supplier={
                            selectedSupplier
                        }
                        onClose={() => {

                            setOpenEdit(
                                false
                            );

                            setSelectedSupplier(
                                null
                            );

                        }}
                    />

                )
            }

        </DashboardLayout>

    );

}

function Row({
    label,
    value,
}) {

    return (

        <div className="flex justify-between text-sm">

            <span className="text-gray-400">

                {label}

            </span>

            <span>

                {value || "—"}

            </span>

        </div>

    );

}