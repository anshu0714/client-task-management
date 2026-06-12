export default function Button({
  children,
  loading,
  ...props
}) {
  return (
    <button
      disabled={loading}
      {...props}
      className="w-full bg-slate-900 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}