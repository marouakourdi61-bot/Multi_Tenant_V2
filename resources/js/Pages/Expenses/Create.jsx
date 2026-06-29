import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/react";
import { X } from "lucide-react";

export default function Create() {

    const {
        data,
        setData,
        post,
        processing,
    } = useForm({

        name: "",

        recurrence: "fixed",

        amount: "",

    });

    function submit(e) {

        e.preventDefault();

        post(
            route(
                "expenses.store"
            )
        );
    }

    return (

        <DashboardLayout>

            {/* overlay */}

            <div
                className="
                fixed
                inset-0
                bg-black/20
                backdrop-blur-sm
                z-40
                "
            />

            {/* drawer */}

            <aside
                className="
                fixed
                right-0
                top-0
                h-screen
                w-full
                max-w-[480px]
                bg-white
                z-50
                flex
                flex-col
                shadow-2xl
                "
            >

                {/* header */}

                <div
                    className="
                    p-6
                    flex
                    justify-between
                    "
                >

                    <div>

                        <h1
                            className="
                            text-2xl
                            font-bold
                            "
                        >
                            Ajouter une dépense
                        </h1>

                        <p
                            className="
                            text-sm
                            text-slate-500
                            "
                        >
                            Créer une nouvelle catégorie
                        </p>

                    </div>

                    <Link
                        href={route(
                            "expenses.index"
                        )}
                    >

                        <X />

                    </Link>

                </div>

                <form
                    onSubmit={submit}
                    className="
                    flex-1
                    overflow-auto
                    p-6
                    space-y-8
                    "
                >

                    {/* nom */}

                    <div>

                        <label
                            className="
                            block
                            text-xs
                            font-bold
                            uppercase
                            mb-2
                            "
                        >
                            Nom
                        </label>

                        <input
                            value={data.name}
                            onChange={(e)=>

                                setData(
                                    "name",
                                    e.target.value
                                )

                            }
                            className="
                            w-full
                            rounded-xl
                            border
                            px-4
                            py-3
                            "
                        />

                    </div>

                    {/* recurrence */}

                    <div>

                        <label
                            className="
                            block
                            mb-3
                            text-xs
                            font-bold
                            uppercase
                            "
                        >
                            Récurrence
                        </label>

                        <div
                            className="
                            grid
                            grid-cols-2
                            gap-3
                            "
                        >

                            <button
                                type="button"
                                onClick={()=>

                                    setData(
                                        "recurrence",
                                        "variable"
                                    )

                                }
                                className={`
                                rounded-xl
                                py-5
                                border

                                ${
                                    data.recurrence ===
                                    "variable"

                                    ?

                                    "border-indigo-600"

                                    :

                                    ""
                                }
                                `}
                            >

                                Variable

                            </button>

                            <button
                                type="button"
                                onClick={()=>

                                    setData(
                                        "recurrence",
                                        "fixed"
                                    )

                                }
                                className={`
                                rounded-xl
                                py-5
                                border

                                ${
                                    data.recurrence ===
                                    "fixed"

                                    ?

                                    "border-indigo-600"

                                    :

                                    ""
                                }
                                `}
                            >

                                Fixe

                            </button>

                        </div>

                    </div>

                    {/* amount */}

                    <div>

                        <label
                            className="
                            block
                            mb-2
                            text-xs
                            font-bold
                            uppercase
                            "
                        >
                            Montant
                        </label>

                        <input
                            value={data.amount}
                            onChange={(e)=>

                                setData(
                                    "amount",
                                    e.target.value
                                )

                            }
                            className="
                            w-full
                            rounded-xl
                            border
                            px-4
                            py-4
                            text-right
                            "
                        />

                    </div>

                    <button
                        disabled={processing}
                        className="
                        w-full
                        bg-indigo-600
                        text-white
                        py-4
                        rounded-xl
                        font-bold
                        "
                    >

                        Créer la catégorie

                    </button>

                </form>

            </aside>

        </DashboardLayout>

    );

}