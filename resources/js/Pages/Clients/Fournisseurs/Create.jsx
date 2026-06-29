import { useForm } from "@inertiajs/react";
import {
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Building2,
    Globe,
    FileText,
} from "lucide-react";

export default function Create({
    onClose,
}) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "Maroc",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(
            route("fournisseurs.store"),
            {
                preserveScroll: true,

                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (

        <div className="fixed inset-0 z-[999]">

            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="
                    absolute
                    inset-0
                    bg-black/20
                    backdrop-blur-sm
                "
            />

            {/* DRAWER */}

            <div
                className="
                    absolute
                    right-0
                    top-0
                    h-screen
                    w-full
                    max-w-[500px]
                    bg-white
                    shadow-2xl
                    flex
                    flex-col
                    animate-[slide_.25s_ease]
                "
            >

                {/* HEADER */}

                <header className="p-6 border-b">

                    <div className="flex justify-between">

                        <div>

                            <h2 className="text-xl font-bold">
                                Nouveau fournisseur
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                Ajouter un nouveau fournisseur
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                p-2
                                rounded-lg
                                hover:bg-slate-100
                            "
                        >
                            <X size={20} />
                        </button>

                    </div>

                </header>

                {/* BODY */}

                <form
                    id="supplier-form"
                    onSubmit={submit}
                    className="
                        flex-1
                        overflow-y-auto
                        p-6
                        space-y-8
                    "
                >

                    <Input
                        label="Nom *"
                        icon={<User size={16} />}
                        value={data.name}
                        error={errors.name}
                        onChange={(v) =>
                            setData("name", v)
                        }
                    />

                    <Input
                        label="E-mail"
                        icon={<Mail size={16} />}
                        value={data.email}
                        error={errors.email}
                        onChange={(v) =>
                            setData("email", v)
                        }
                    />

                    <Input
                        label="Téléphone"
                        icon={<Phone size={16} />}
                        value={data.phone}
                        error={errors.phone}
                        onChange={(v) =>
                            setData("phone", v)
                        }
                    />

                    <div className="border-t pt-6">

                        <h3
                            className="
                                text-xs
                                font-bold
                                text-gray-400
                                mb-5
                            "
                        >
                            ADRESSE
                        </h3>

                        <div className="space-y-5">

                            <Input
                                label="Adresse"
                                icon={<MapPin size={16} />}
                                value={data.address}
                                error={errors.address}
                                onChange={(v) =>
                                    setData(
                                        "address",
                                        v
                                    )
                                }
                            />

                            <Input
                                label="Ville"
                                icon={<Building2 size={16} />}
                                value={data.city}
                                error={errors.city}
                                onChange={(v) =>
                                    setData(
                                        "city",
                                        v
                                    )
                                }
                            />

                            <Input
                                label="Pays"
                                icon={<Globe size={16} />}
                                value={data.country}
                                error={errors.country}
                                onChange={(v) =>
                                    setData(
                                        "country",
                                        v
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="border-t pt-6">

                        <h3
                            className="
                                text-xs
                                font-bold
                                text-gray-400
                                mb-5
                            "
                        >
                            NOTES
                        </h3>

                        <label className="text-sm">

                            <div className="flex gap-2 mb-2">

                                <FileText size={16} />

                                Notes

                            </div>

                            <textarea
                                rows={5}
                                value={data.notes}
                                onChange={(e) =>
                                    setData(
                                        "notes",
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    bg-slate-50
                                    p-4
                                "
                            />

                        </label>

                    </div>

                </form>

                {/* FOOTER */}

                <footer
                    className="
                        p-5
                        border-t
                        flex
                        justify-end
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-slate-100
                        "
                    >
                        Annuler
                    </button>

                    <button
                        form="supplier-form"
                        type="submit"
                        disabled={processing}
                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-indigo-500
                            text-white
                        "
                    >
                        {
                            processing
                                ? "Création..."
                                : "Créer le fournisseur"
                        }

                    </button>

                </footer>

            </div>

        </div>

    );

}

function Input({
    label,
    icon,
    value,
    onChange,
    error,
}) {

    return (

        <div>

            <label
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    mb-2
                "
            >

                {icon}

                {label}

            </label>

            <input
                value={value}
                onChange={(e) =>
                    onChange(
                        e.target.value
                    )
                }
                className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    bg-slate-50
                    focus:ring-2
                    focus:ring-indigo-200
                "
            />

            {
                error && (

                    <p
                        className="
                            text-red-500
                            text-xs
                            mt-1
                        "
                    >
                        {error}
                    </p>

                )
            }

        </div>

    );

}