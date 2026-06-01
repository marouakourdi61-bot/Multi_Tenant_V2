export default function MetricCard({ title, value, description }) {
    return (
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-gray-400 mt-2">{description}</p>
        </div>
    )
}   