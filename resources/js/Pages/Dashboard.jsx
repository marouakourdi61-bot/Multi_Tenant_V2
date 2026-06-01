import DashboardLayout from "@/Layouts/DashboardLayout";
import MetricCard from "@/Components/MetricCard";
import InvoiceStatus from "@/Components/InvoiceStatus";
import EmptyState from "@/Components/EmptyState";

export default function Dashboard() {
    return (
        <DashboardLayout>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

                <MetricCard title="Total Revenue" value="0 MAD" description="Lifetime earnings" />
                <MetricCard title="Pending" value="0 MAD" description="Unpaid invoices" />
                <MetricCard title="Clients" value="0" description="Active clients" />
                <MetricCard title="Invoices" value="0" description="Total invoices" />

            </div>
         

            {/* Main */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                <div className="xl:col-span-3 bg-white rounded-2xl border p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Invoices Overview
                    </h2>

                    <EmptyState
                        title="No invoices yet"
                        buttonText="Create invoice"
                    />
                </div>

                <InvoiceStatus />

            </div>

        </DashboardLayout>
    );
}