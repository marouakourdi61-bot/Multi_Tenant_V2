import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, router } from "@inertiajs/react";

export default function CreateOrganization() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
        email: "",
        legal_form: "",
        address: "",
        address_complement: "",
        postal_code: "",
        city: "",
        country: "",
        timezone: "Europe/Paris",

    });

    const submit = (e) => {
        e.preventDefault();

        post(route('tenants.store'), {
            onSuccess: () => {
                router.reload({ only: ['auth'] });
            },
        });
    };

    return (
        <DashboardLayout>

            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

                <main className="bg-white w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden relative flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <header className="p-6 pb-2">

                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-semibold text-gray-800">
                                Création de votre organisation
                            </h1>

                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 border border-gray-200 rounded-full p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                            Les informations ci-dessous seront nécessaires pour
                            la génération des devis et factures.
                        </p>

                    </header>

                    {/* Form */}
                    <div className="flex-1 overflow-y-auto p-6 pt-2">

                        <form
                            onSubmit={submit}
                            className="space-y-5"
                        >
                            {Object.keys(errors).length > 0 && (
                                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    <p className="font-semibold">Veuillez corriger les erreurs suivantes :</p>
                                    <ul className="mt-2 list-disc space-y-1 pl-5">
                                        {Object.entries(errors).map(([key, message]) => (
                                            <li key={key}>{message}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Adresse email professionnelle
                                </label>

                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Organization Name */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Nom de mon organisation
                                </label>

                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);

                                        setData(
                                            "slug",
                                            e.target.value
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")
                                        );
                                    }}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                />

                                {errors.name && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Legal Form */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Forme juridique
                                </label>

                                <select
                                    value={data.legal_form}
                                    onChange={(e) => setData("legal_form", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                >
                                    <option value="">Choisir</option>
                                    <option value="auto_entrepreneur">
                                        Auto-entrepreneur
                                    </option>
                                    <option value="sarl">SARL</option>
                                    <option value="sas">SAS</option>
                                </select>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Adresse
                                </label>

                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData("address", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                />
                            </div>

                            {/* Postal code + City */}
                            <div className="grid grid-cols-2 gap-4">

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Code postal
                                    </label>

                                    <input
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData("postal_code", e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">
                                        Ville
                                    </label>

                                    <input
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData("city", e.target.value)}
                                        className="w-full mt-1 px-3 py-2 border rounded-lg"
                                    />
                                </div>

                            </div>

                            {/* Country */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Pays
                                </label>

                                <select
                                    value={data.country}
                                    onChange={(e) => setData("country", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                >
                                    <option value="">Choisir</option>
                                    <option value="MA">Maroc</option>
                                    <option value="FR">France</option>
                                    <option value="BE">Belgique</option>
                                </select>
                            </div>

                            {/* Timezone */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Fuseau horaire
                                </label>

                                <select
                                    value={data.timezone}
                                    onChange={(e) => setData("timezone", e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-lg"
                                >
                                    <option value="Africa/Casablanca">
                                        Casablanca
                                    </option>

                                    <option value="Europe/Paris">
                                        Paris
                                    </option>
                                </select>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-end gap-4 pt-6">

                                <button
                                    type="button"
                                    className="px-8 py-3 bg-slate-100 text-gray-700 font-medium rounded-full hover:bg-slate-200"
                                >
                                    Annuler
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-10 py-3 bg-green-400 text-white font-semibold rounded-full hover:bg-green-500"
                                >
                                    Enregistrer
                                </button>

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </DashboardLayout>
    );
}