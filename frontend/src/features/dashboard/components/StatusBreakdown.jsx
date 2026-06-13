export default function StatusBreakdown({ pending, completed, overdue }) {
  const total = pending + completed + overdue;

  const getWidth = (value) => {
    return total ? `${(value / total) * 100}%` : "0%";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="mb-6 text-base font-semibold text-slate-900 sm:mb-8 sm:text-lg">
        Task Distribution
      </h3>

      <div className="space-y-5 sm:space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-700 sm:text-base">
              Completed
            </span>
            <span className="text-sm font-medium text-slate-900 sm:text-base">
              {completed}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: getWidth(completed) }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-700 sm:text-base">Pending</span>
            <span className="text-sm font-medium text-slate-900 sm:text-base">
              {pending}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: getWidth(pending) }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-700 sm:text-base">Overdue</span>
            <span className="text-sm font-medium text-slate-900 sm:text-base">
              {overdue}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-red-500"
              style={{ width: getWidth(overdue) }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
