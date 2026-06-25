import { useForm } from "@inertiajs/react";
import {
    X,
    Building2,
    Mail,
    Phone,
    MapPin,
    FileText,
    Hash,
} from "lucide-react";

export default function Create({ onClose }) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        name: "",
        ice: "",
        rc: "",
        if_number: "",
        cnss: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal_code: "",
        country: "MA",
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("entreprises.store"), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">

            {/* BACKDROP */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />

            {/* DRAWER */}
            <aside className="relative w-full max-w-[560px] h-screen bg-white shadow-2xl flex flex-col">

                {/* HEADER */}
                <header className="px-8 pt-8 pb-6 border-b">

                    <div className="flex justify-between">

                        <div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                Nouvelle entreprise
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">
                                Ajouter une entreprise à votre organisation
                            </p>

                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
                        >
                            <X size={18} />
                        </button>

                    </div>

                </header>

                {/* FORM */}
                <form
                    onSubmit={submit}
                    className="flex-1 overflow-y-auto px-8 py-6 space-y-8"
                >

                    {/* ENTREPRISE */}
                    <Input
                        icon={<Building2 size={16} />}
                        label="Nom entreprise *"
                        value={data.name}
                        error={errors.name}
                        onChange={(v) => setData("name", v)}
                    />

                    {/* IDENTIFIANTS */}
                    <div className="grid grid-cols-2 gap-4">

                        <Input
                            icon={<Hash size={15} />}
                            label="ICE"
                            value={data.ice}
                            error={errors.ice}
                            onChange={(v) => setData("ice", v)}
                        />

                        <Input
                            icon={<Hash size={15} />}
                            label="RC"
                            value={data.rc}
                            error={errors.rc}
                            onChange={(v) => setData("rc", v)}
                        />

                        <Input
                            icon={<FileText size={15} />}
                            label="IF"
                            value={data.if_number}
                            error={errors.if_number}
                            onChange={(v) => setData("if_number", v)}
                        />

                        <Input
                            icon={<FileText size={15} />}
                            label="CNSS"
                            value={data.cnss}
                            error={errors.cnss}
                            onChange={(v) => setData("cnss", v)}
                        />

                    </div>

                    {/* CONTACT */}
                    <Input
                        icon={<Mail size={16} />}
                        label="Email"
                        value={data.email}
                        error={errors.email}
                        onChange={(v) => setData("email", v)}
                    />

                    <Input
                        icon={<Phone size={16} />}
                        label="Téléphone"
                        value={data.phone}
                        error={errors.phone}
                        onChange={(v) => setData("phone", v)}
                    />

                    {/* ADRESSE */}
                    <Input
                        icon={<MapPin size={16} />}
                        label="Adresse"
                        value={data.address}
                        error={errors.address}
                        onChange={(v) => setData("address", v)}
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <Input
                            label="Ville"
                            value={data.city}
                            error={errors.city}
                            onChange={(v) => setData("city", v)}
                        />

                        <Input
                            label="Code postal"
                            value={data.postal_code}
                            error={errors.postal_code}
                            onChange={(v) => setData("postal_code", v)}
                        />

                    </div>

                    {/* COUNTRY */}
                    <select
                        value={data.country}
                        onChange={(e) =>
                            setData("country", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-xl border bg-slate-50"
                    >
                        <option value="MA">
                            Maroc
                        </option>

                        <option value="FR">
                            France
                        </option>

                        <option value="US">
                            USA
                        </option>

                    </select>

                    {/* NOTES */}
                    <textarea
                        rows={5}
                        value={data.notes}
                        onChange={(e) =>
                            setData(
                                "notes",
                                e.target.value
                            )
                        }
                        placeholder="Notes..."
                        className="w-full rounded-xl border bg-slate-50 px-4 py-3 resize-none"
                    />

                </form>

                {/* FOOTER */}
                <footer className="border-t p-6 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-full border"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={submit}
                        disabled={processing}
                        className="px-6 py-3 rounded-full bg-[#A29BFE] text-white"
                    >
                        {
                            processing
                                ? "Création..."
                                : "Créer"
                        }
                    </button>

                </footer>

            </aside>

        </div>
    );
}

/* INPUT */

function Input({
    label,
    value,
    onChange,
    error,
    icon,
}) {
    return (
        <div>

            <label className="flex gap-2 mb-2 text-sm font-semibold">

                {icon}
                {label}

            </label>

            <input
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border bg-slate-50"
            />

            {error && (
                <p className="text-xs mt-1 text-red-500">
                    {error}
                </p>
            )}

        </div>
    );
}