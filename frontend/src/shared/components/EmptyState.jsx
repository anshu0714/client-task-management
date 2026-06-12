export default function EmptyState({ title = "No data found" }) {
  return (
    <div className="bg-white rounded-xl p-8 text-center shadow">
      <p className="text-slate-500">{title}</p>
    </div>
  );
}
