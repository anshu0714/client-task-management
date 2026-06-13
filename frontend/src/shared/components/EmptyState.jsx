export default function EmptyState({
  title = "No data found",
  description,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}