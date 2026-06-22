import { useForm } from "@inertiajs/react";
import {
    X,
    User,
    Mail,
    Phone,
    MapPin,
    Building2,
} from "lucide-react";

export default function Create({ onClose }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
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

        post(route("clients.store"), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* DRAWER */}
            <aside className="relative w-full max-w-[480px] h-screen bg-white shadow-2xl flex flex-col">

                {/* HEADER */}
                <header className="px-8 pt-8 pb-6 border-b border-slate-100">
                    <div className="flex justify-between">

                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">
                                Nouveau client
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Ajouter un nouveau client à votre organisation
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

                    {/* NAME */}
                    <Input
                        icon={<User size={16} />}
                        label="Nom *"
                        value={data.name}
                        error={errors.name}
                        onChange={(v) => setData("name", v)}
                    />

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

                    <Input
                        icon={<MapPin size={16} />}
                        label="Adresse"
                        value={data.address}
                        error={errors.address}
                        onChange={(v) => setData("address", v)}
                    />

                    <Input
                        icon={<Building2 size={16} />}
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

                    <select
                        value={data.country}
                        onChange={(e) =>
                            setData("country", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                        <option value="MA">Maroc</option>
                        <option value="FR">France</option>
                        <option value="US">USA</option>
                    </select>

                    <textarea
                        rows={4}
                        value={data.notes}
                        onChange={(e) =>
                            setData("notes", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                        placeholder="Notes..."
                    />

                </form>

                {/* FOOTER */}
                <footer className="p-6 border-t flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-full border"
                    >
                        Annuler
                    </button>

                    {/* 🔥 IMPORTANT FIX HERE */}
                    <button
                        type="submit"
                        disabled={processing}
                        onClick={submit}
                        className="px-6 py-3 rounded-full bg-[#A29BFE] text-white"
                    >
                        {processing ? "Création..." : "Créer"}
                    </button>

                </footer>

            </aside>
        </div>
    );
}

/* INPUT */
function Input({ label, value, onChange, error, icon }) {
    return (
        <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700">
                {icon}
                {label}
            </label>

            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"
            />

            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}