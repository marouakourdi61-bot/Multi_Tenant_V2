export default function InvoiceStatus() {
    return (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">Statut des factures</h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-slate-700">Payées</span>
                    </div>
                    <span className="font-semibold text-slate-900">0</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <span className="text-sm font-medium text-slate-700">En attente</span>
                    </div>
                    <span className="font-semibold text-slate-900">0</span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-slate-700">En retard</span>
                    </div>
                    <span className="font-semibold text-slate-900">0</span>
                </div>
            </div>
        </div>
    )
}