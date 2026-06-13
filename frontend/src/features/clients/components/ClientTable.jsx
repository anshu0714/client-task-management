import {
  Building2,
  Mail,
  Phone,
  Pencil,
  Trash2,
  CalendarDays,
  Eye,
} from "lucide-react";
import EmptyState from "../../../shared/components/EmptyState";

export default function ClientTable({
  clients,
  onEdit,
  onDelete,
  onView,
  canManage = false,
}) {
  if (!clients?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12">
        <EmptyState
          title="No clients found"
          description="Try changing your search or add a new client record."
        />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="px-4 sm:px-6 py-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Clients</h2>
          <p className="text-sm text-slate-500">
            {clients.length} records found
          </p>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-245">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => {
              const clientId = client?._id || client?.id;

              return (
                <tr
                  key={clientId}
                  onClick={() => onView(client)}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                        {client?.name?.charAt(0)?.toUpperCase() || "C"}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {client?.name || "-"}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {client?.email || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2
                        size={16}
                        className="text-violet-500 shrink-0"
                      />
                      <span className="font-medium text-slate-700 truncate">
                        {client?.companyName || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-600 truncate">
                          {client?.email || "-"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-600">
                          {client?.phone || "-"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-sm text-slate-600">
                      {client?.createdAt
                        ? new Date(client.createdAt).toLocaleDateString()
                        : "-"}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(client);
                        }}
                        className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-all"
                      >
                        <Eye size={16} />
                      </button>

                      {canManage && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(client);
                            }}
                            className="h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(client);
                            }}
                            className="h-10 w-10 rounded-xl border border-red-200 flex items-center justify-center text-red-600 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y divide-slate-200">
        {clients.map((client) => {
          const clientId = client?._id || client?.id;

          return (
            <div
              key={clientId}
              onClick={() => onView(client)}
              className="p-4 sm:p-5 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 min-w-0">
                  <div className="h-11 w-11 rounded-xl bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                    {client?.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">
                      {client?.name || "-"}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {client?.companyName || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(client);
                    }}
                    className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700"
                  >
                    <Eye size={15} />
                  </button>

                  {canManage && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(client);
                        }}
                        className="h-9 w-9 rounded-xl border border-slate-200 flex items-center justify-center text-indigo-600"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(client);
                        }}
                        className="h-9 w-9 rounded-xl border border-red-200 flex items-center justify-center text-red-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-600 truncate">
                    {client?.email || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {client?.phone || "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {client?.createdAt
                      ? new Date(client.createdAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
