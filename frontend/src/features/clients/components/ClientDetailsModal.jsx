import { useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  Building2,
  MapPin,
  CalendarDays,
  UserCircle2,
  Pencil,
} from "lucide-react";

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
        <Icon size={16} />
        {label}
      </div>
      <p className="mt-2 text-sm sm:text-base font-semibold text-slate-900 wrap-break-word">
        {value || "-"}
      </p>
    </div>
  );
}

export default function ClientDetailsModal({
  open,
  onClose,
  client,
  loading,
  onEdit,
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-110">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-dvh w-full max-w-full sm:max-w-175 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.25)] flex flex-col animate-slide-in">
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-5 border-b border-slate-200">
          <div className="min-w-0">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
              Client Details
            </div>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 wrap-break-word">
              {client?.name || "Client"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Full client profile and company information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
          {loading ? (
            <div className="py-16 flex justify-center">
              <div className="h-10 w-10 rounded-full border-4 border-slate-300 border-t-slate-900 animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-linear-to-r from-blue-50 via-indigo-50 to-violet-50 p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white text-indigo-700 flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                    {client?.name?.charAt(0)?.toUpperCase() || "C"}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 wrap-break-word">
                      {client?.name || "-"}
                    </h3>

                    <p className="mt-1 text-sm sm:text-base text-slate-600 wrap-break-word">
                      {client?.companyName || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={UserCircle2}
                  label="Client Name"
                  value={client?.name}
                />
                <DetailItem
                  icon={Building2}
                  label="Company Name"
                  value={client?.companyName}
                />
                <DetailItem icon={Mail} label="Email" value={client?.email} />
                <DetailItem icon={Phone} label="Phone" value={client?.phone} />
                <DetailItem
                  icon={CalendarDays}
                  label="Created Date"
                  value={
                    client?.createdAt
                      ? new Date(client.createdAt).toLocaleString()
                      : "-"
                  }
                />
                <DetailItem
                  icon={CalendarDays}
                  label="Last Updated"
                  value={
                    client?.updatedAt
                      ? new Date(client.updatedAt).toLocaleString()
                      : "-"
                  }
                />
              </div>

              <DetailItem
                icon={MapPin}
                label="Address"
                value={client?.address}
              />
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 px-5 sm:px-6 py-4 flex flex-col-reverse sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl border border-slate-200 font-medium hover:bg-slate-50 transition"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onEdit}
            disabled={loading || !client}
            className="flex-1 h-12 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Pencil size={16} />
            Edit Client
          </button>
        </div>
      </div>
    </div>
  );
}
