import { useState } from "react";
import Button from "../../../shared/components/Button";

function getFormData(initialData) {
  return {
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    companyName: initialData?.companyName || "",
    address: initialData?.address || "",
  };
}

function ClientForm({ onClose, onSubmit, initialData, loading }) {
  const [form, setForm] = useState(() => getFormData(initialData));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl w-full max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? "Edit Client" : "Add Client"}
      </h2>

      <div className="space-y-3">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="companyName"
          placeholder="Company Name"
          value={form.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
      </div>

      <div className="flex gap-3 mt-5">
        <Button type="submit" loading={loading}>
          Save
        </Button>

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded"
        >
          Cancel
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
  if (!open) return null;

  const formKey = initialData?._id || initialData?.id || "new-client";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <ClientForm
        key={formKey}
        onClose={onClose}
        onSubmit={onSubmit}
        initialData={initialData}
        loading={loading}
      />
    </div>
  );
}
