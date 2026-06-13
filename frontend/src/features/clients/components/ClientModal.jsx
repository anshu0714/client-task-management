import { useEffect, useState } from "react";
import { X } from "lucide-react";

function getFormData(initialData) {
  return {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    companyName: initialData?.companyName || "",
    address: initialData?.address || "",
  };
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        {...props}
        className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}

function TextArea({ label, ...props }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <textarea
        {...props}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none resize-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    </div>
  );
}

function ClientForm({ initialData, onSubmit, onClose, loading }) {
  const [form, setForm] = useState(() => getFormData(initialData));

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      companyName: form.companyName.trim(),
      address: form.address.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <div className="shrink-0 flex items-start justify-between gap-4 pb-5 border-b border-slate-200">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {initialData ? "Edit Client" : "Add Client"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage client and company information.
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

      <div className="flex-1 overflow-y-auto py-6 space-y-5">
        <Input
          required
          label="Client Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="John Doe"
        />

        <Input
          required
          type="email"
          label="Email Address"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />

        <Input
          required
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 XXXXX XXXXX"
        />

        <Input
          required
          label="Company Name"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Acme Inc."
        />

        <TextArea
          required
          rows={5}
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Client address..."
        />
      </div>

      <div className="shrink-0 pt-5 border-t border-slate-200 flex flex-col-reverse sm:flex-row gap-3">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:flex-1 h-12 rounded-2xl border border-slate-200 font-medium hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:flex-1 h-12 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
              ? "Update Client"
              : "Create Client"}
        </button>
      </div>
    </form>
  );
}

export default function ClientModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const formKey = initialData?._id || initialData?.id || "new-client";

  return (
    <div className="fixed inset-0 z-100">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-dvh w-full max-w-full sm:max-w-155 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.25)] px-4 sm:px-6 py-5 animate-slide-in">
        <ClientForm
          key={formKey}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
          loading={loading}
        />
      </div>
    </div>
  );
}
