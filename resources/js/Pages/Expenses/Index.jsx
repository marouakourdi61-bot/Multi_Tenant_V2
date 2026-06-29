import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index({
    expenses = [],
    year,
}) {
    return (
        <DashboardLayout>

            <div className="p-6 space-y-6">

                {/* Header */}

                <div>

                    <p className="text-sm text-slate-500">
                        Dépenses
                    </p>

                    <h1 className="text-3xl font-bold">
                        Dépenses
                    </h1>

                </div>

                {/* Action */}

                <div className="flex justify-between">

                    <button
                        className="
                        px-6
                        py-3
                        rounded-lg
                        bg-indigo-600
                        text-white
                        font-semibold
                        "
                    >
                        Ajouter une dépense
                    </button>

                    <div className="font-bold">

                        {year}

                    </div>

                </div>

                {/* Stats */}

                <div
                    className="
                    grid
                    md:grid-cols-3
                    gap-5
                    "
                >

                    <Card
                        title="Total dépenses"
                        value="0 MAD"
                    />

                    <Card
                        title="Total revenus"
                        value="0 MAD"
                    />

                    <Card
                        title="Épargne nette"
                        value="0 MAD"
                    />

                </div>

                {/* Table */}

                <div
                    className="
                    bg-white
                    rounded-xl
                    border
                    overflow-hidden
                    "
                >

                    <div className="p-6">

                        Tableau dépenses

                    </div>

                </div>

                {/* Empty */}

                {!expenses.length && (

                    <div
                        className="
                        py-20
                        text-center
                        "
                    >

                        <h2
                            className="
                            text-xl
                            font-bold
                            "
                        >
                            Aucune donnée
                        </h2>

                        <p className="text-slate-500">

                            Commencez par ajouter une dépense

                        </p>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

function Card({
    title,
    value,
}) {
    return (

        <div
            className="
            bg-white
            rounded-xl
            border
            p-6
            "
        >

            <p className="text-sm">

                {title}

            </p>

            <h2
                className="
                text-3xl
                font-bold
                mt-3
                "
            >

                {value}

            </h2>

        </div>

    );
}