export default function InvoiceStatus() {
    return (
        <div className="bg-white border rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Status</h3>

            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span>Paid</span>
                    <span className="text-green-600">0</span>
                </div>

                <div className="flex justify-between">
                    <span>Pending</span>
                    <span className="text-yellow-600">0</span>
                </div>

                <div className="flex justify-between">
                    <span>Overdue</span>
                    <span className="text-red-600">0</span>
                </div>
            </div>
        </div>
    )
}