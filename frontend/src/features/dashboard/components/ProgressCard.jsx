export default function ProgressCard({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const progressColor =
    percentage >= 90
      ? "#10b981"
      : percentage >= 70
        ? "#3b82f6"
        : percentage >= 40
          ? "#f59e0b"
          : "#ef4444";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <h3 className="font-semibold text-slate-900">Completion Rate</h3>

      <div className="mt-8 flex items-center justify-center">
        <div className="relative h-36 w-36 sm:h-40 sm:w-40">
          <svg viewBox="0 0 150 150" className="h-full w-full -rotate-90">
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
            />
            <circle
              cx="75"
              cy="75"
              r={radius}
              fill="none"
              stroke={progressColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {percentage}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
