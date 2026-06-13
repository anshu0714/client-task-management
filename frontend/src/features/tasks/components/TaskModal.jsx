import { useState } from "react";
import { X, Calendar, User, FolderKanban } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import {
  ROLES,
  TASK_STATUS,
  TASK_STATUS_OPTIONS,
  TASK_PRIORITY,
  TASK_PRIORITY_OPTIONS,
  getEntityId,
} from "../constants/taskConstant";

const EMPTYFORM = {
  title: "",
  description: "",
  project: "",
  assignedUser: "",
  priority: TASK_PRIORITY.MEDIUM,
  status: TASK_STATUS.PENDING,
  dueDate: "",
};

function getInitialForm(task) {
  if (!task) return EMPTYFORM;

  return {
    title: task.title || "",
    description: task.description || "",
    project: getEntityId(task.project),
    assignedUser: getEntityId(task.assignedUser),
    priority: task.priority || TASK_PRIORITY.MEDIUM,
    status: task.status || TASK_STATUS.PENDING,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  };
}

function TaskModalForm({ onClose, onSubmit, loading, task, projects, users }) {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  const [form, setForm] = useState(() => getInitialForm(task));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAdmin) {
      onSubmit(form);
      return;
    }

    onSubmit({ status: form.status });
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-200 p-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {task ? "Edit Task" : "Create Task"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage project assignments and delivery.
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50"
          type="button"
        >
          <X size={18} />
        </button>
      </div>

      <form
        id="task-form"
        onSubmit={handleSubmit}
        className="flex-1 space-y-5 overflow-y-auto p-6"
      >
        {!isAdmin ? (
          <div>
            <label className="mb-2 block text-sm font-medium">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="h-12 w-full rounded-2xl border border-slate-200 px-4"
            >
              {TASK_STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium">
                Task Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-2xl border border-slate-200 px-4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project
                </label>
                <div className="relative">
                  <FolderKanban
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4"
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option
                        key={getEntityId(project)}
                        value={getEntityId(project)}
                      >
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Assigned User
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    name="assignedUser"
                    value={form.assignedUser}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4"
                  >
                    <option value="">Select User</option>
                    {users.map((item) => (
                      <option key={getEntityId(item)} value={getEntityId(item)}>
                        {item.name} ({item.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 px-4"
                >
                  {TASK_PRIORITY_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="h-12 w-full rounded-2xl border border-slate-200 px-4"
                >
                  {TASK_STATUS_OPTIONS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Due Date
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </form>

      <div className="flex gap-3 border-t border-slate-200 p-6">
        <button
          type="button"
          onClick={onClose}
          className="h-12 flex-1 rounded-2xl border border-slate-200 font-medium"
        >
          Cancel
        </button>
        <button
          form="task-form"
          type="submit"
          disabled={loading}
          className="h-12 flex-1 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </>
  );
}

export default function TaskModal({
  open,
  onClose,
  onSubmit,
  loading,
  task,
  projects,
  users,
}) {
  if (!open) return null;

  const modalKey = getEntityId(task) || "new-task";

  return (
    <div className="fixed inset-0 z-120">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />
      <div className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-2xl">
        <TaskModalForm
          key={modalKey}
          onClose={onClose}
          onSubmit={onSubmit}
          loading={loading}
          task={task}
          projects={projects}
          users={users}
        />
      </div>
    </div>
  );
}
