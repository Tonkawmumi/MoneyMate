import { ArrowUpRight } from "lucide-react";

function SummaryCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl p-3" style={{ backgroundColor: iconBg }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>

        {/* <div className="flex items-center gap-1 rounded-xl bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">
          <ArrowUpRight size={12} />
          Overview
        </div> */}
        
      </div>

      <p className="mb-2 text-sm font-medium text-slate-600">
        {title}
      </p>

      <h3 className="text-2xl font-medium tracking-tight text-slate-900">
        {value}
      </h3>

    </div>
  );
}

export default SummaryCard;
