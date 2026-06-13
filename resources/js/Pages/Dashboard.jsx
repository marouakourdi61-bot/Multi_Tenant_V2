import DashboardLayout from "@/Layouts/DashboardLayout";
import MetricCard from "@/Components/MetricCard";
import InvoiceStatus from "@/Components/InvoiceStatus";
import EmptyState from "@/Components/EmptyState";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { stats, recent_invoices } = usePage().props;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'MAD',
        }).format(value || 0);
    };

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
                    <MetricCard 
                        title="Revenu total" 
                        value={formatCurrency(stats?.total_revenue)} 
                        description="Gains cumulés" 
                    />
                    <MetricCard 
                        title="En attente" 
                        value={formatCurrency(stats?.pending_amount)} 
                        description="Factures impayées" 
                    />
                    <MetricCard 
                        title="Clients" 
                        value={stats?.clients_count || 0} 
                        description="Clients actifs" 
                    />
                    <MetricCard 
                        title="Factures" 
                        value={stats?.total_invoices || 0} 
                        description="Nombre total" 
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Invoices Overview */}
                    <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900">Aperçu des factures</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    {recent_invoices?.length === 0 
                                        ? "Aucune facture créée pour le moment." 
                                        : `${recent_invoices?.length} facture(s) récente(s)`}
                                </p>
                            </div>
                        </div>

                        {recent_invoices?.length === 0 ? (
                            <EmptyState
                                title="Aucune facture pour le moment"
                                buttonText="Créer une facture"
                            />
                        ) : (
                            <div className="mt-6 space-y-3">
                                {recent_invoices?.map((invoice) => (
                                    <div 
                                        key={invoice.id} 
                                        className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50"
                                    >
                                        <div>
                                            <p className="font-medium text-slate-900">{invoice.invoice_number}</p>
                                            <p className="text-sm text-slate-500">{invoice.recipient}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-slate-900">
                                                {formatCurrency(invoice.total)}
                                            </p>
                                            <p className={`text-xs font-medium ${
                                                invoice.status === 'paid' ? 'text-green-600' : 'text-orange-600'
                                            }`}>
                                                {invoice.status === 'paid' ? 'Payée' : 'En attente'}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Widget */}
                    <InvoiceStatus />
                </div>
            </div>
        </DashboardLayout>
    );
}