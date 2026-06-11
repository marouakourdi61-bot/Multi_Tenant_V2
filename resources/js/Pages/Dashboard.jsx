import DashboardLayout from "@/Layouts/DashboardLayout";
import MetricCard from "@/Components/MetricCard";
import InvoiceStatus from "@/Components/InvoiceStatus";
import EmptyState from "@/Components/EmptyState";

export default function Dashboard() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Tableau de bord</h1>
                    <p className="mt-2 text-sm text-slate-500">Bienvenue, voici un aperçu de votre activité.</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <MetricCard title="Revenu total" value="0 MAD" description="Gains cumulés" />
                    <MetricCard title="En attente" value="0 MAD" description="Factures impayées" />
                    <MetricCard title="Clients" value="0" description="Clients actifs" />
                    <MetricCard title="Factures" value="0" description="Nombre total" />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Invoices Overview */}
                    <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Aperçu des factures</h2>
                                <p className="mt-1 text-sm text-slate-500">Aucune facture créée pour le moment.</p>
                            </div>
                        </div>

                        <EmptyState
                            title="Aucune facture pour le moment"
                            buttonText="Créer une facture"
                        />
                    </div>

                    {/* Status Widget */}
                    <InvoiceStatus />
                </div>
            </div>
        </DashboardLayout>
    );
}