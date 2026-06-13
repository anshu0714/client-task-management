import { useState } from "react";
import { X } from "lucide-react";
import { showError } from "../../../shared/utils/toast";
import { PROJECT_STATUS } from "../constants/projectStatus";

function getEntityId(item) {
  return item?.id || item?._id || "";
}

function getFormData(initialData) {
  return {
    client: initialData?.client ? getEntityId(initialData.client) : "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    startDate: initialData?.startDate?.slice(0, 10) || "",
    dueDate: initialData?.dueDate?.slice(0, 10) || "",
    status: initialData?.status || PROJECT_STATUS.NOT_STARTED,
  };
}

function ProjectForm({ initialData, onSubmit, onClose, loading, clients }) {
  const [form, setForm] = useState(() => getFormData(initialData));

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.dueDate) < new Date(form.startDate)) {
      showError("Due date must be after start date");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            {initialData ? "Edit Project" : "Create Project"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage project planning and delivery timelines.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="h-10 w-10 shrink-0 rounded-xl border border-slate-200 transition hover:bg-slate-50"
        >
          <X size={18} className="mx-auto" />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto py-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Client
          </label>
          <select
            required
            name="client"
            value={form.client}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-indigo-400"
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={getEntityId(client)} value={getEntityId(client)}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Project Name
          </label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Website Redesign"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Start Date
            </label>
            <input
              required
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              required
              type="date"
              name="dueDate"
              min={form.startDate}
              value={form.dueDate}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-indigo-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 outline-none focus:border-indigo-400"
          >
            <option value={PROJECT_STATUS.NOT_STARTED}>Not Started</option>
            <option value={PROJECT_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={PROJECT_STATUS.COMPLETED}>Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Project description..."
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 h-12 rounded-2xl border border-slate-200 font-medium transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex-1 h-12 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 font-semibold text-white transition disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : initialData
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
}

export default function ProjectModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
  clients,
}) {
  if (!open) return null;

  const formKey = initialData?.id || initialData?._id || "new-project";

  return (
    <div className="fixed inset-0 z-100">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-full w-full bg-white p-4 shadow-2xl sm:w-155 sm:p-6 lg:w-170">
        <ProjectForm
          key={formKey}
          initialData={initialData}
          onSubmit={onSubmit}
          onClose={onClose}
          loading={loading}
          clients={clients}
        />
      </div>
    </div>
  );
}
