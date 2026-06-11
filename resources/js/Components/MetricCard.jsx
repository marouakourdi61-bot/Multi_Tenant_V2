export default function MetricCard({ title, value, description }) {
    return (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{title}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
            <p className="mt-2 text-xs text-slate-500">{description}</p>
        </div>
    )
}   