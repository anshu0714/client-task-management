import { Plus } from "lucide-react";

export default function ClientPageHeader({ totalClients = 0, onAddClient }) {
  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-linear-to-br from-blue-100 via-indigo-100 to-violet-100 blur-3xl opacity-80" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
            Client Management
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Clients
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-600">
            Add, update, review and manage client records with complete contact
            and company information.
          </p>

          <div className="mt-5 inline-flex items-center rounded-2xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            Total Clients:
            <span className="ml-2 font-bold text-slate-900">
              {totalClients}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={onAddClient}
            className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <Plus size={18} />
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
}
