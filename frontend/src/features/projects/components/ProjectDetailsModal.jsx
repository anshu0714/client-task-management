import {
  X,
  Building2,
  CalendarDays,
  Clock3,
  FolderKanban,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { PROJECT_STATUS } from "../constants/projectStatus";

function getStatusBadge(status) {
  switch (status) {
    case PROJECT_STATUS.COMPLETED:
      return {
        label: "Completed",
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    case PROJECT_STATUS.IN_PROGRESS:
      return {
        label: "In Progress",
        className: "bg-blue-50 text-blue-700 border-blue-200",
      };
    case PROJECT_STATUS.NOT_STARTED:
    default:
      return {
        label: "Not Started",
        className: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
}

function isOverdue(project) {
  if (project?.status === PROJECT_STATUS.COMPLETED) return false;
  return project?.dueDate && new Date(project.dueDate) < new Date();
}

export default function ProjectDetailsModal({ open, onClose, project }) {
  if (!open || !project) return null;

  const badge = getStatusBadge(project.status);
  const overdue = isOverdue(project);

  return (
    <div className="fixed inset-0 z-110">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 h-full w-full bg-white shadow-2xl sm:w-155 lg:w-175">
        <div className="flex h-full flex-col p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                <FolderKanban size={14} />
                Project Details
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl wrap-break-word">
                {project?.name || "Untitled Project"}
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                View complete project information, timeline and status.
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

          <div className="flex-1 space-y-6 overflow-y-auto py-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-slate-500">Project</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 wrap-break-word">
                    {project?.name || "-"}
                  </h3>
                </div>

                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              {overdue && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  <AlertTriangle size={16} />
                  This project is overdue.
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Building2 size={18} className="text-violet-500" />
                  <p className="text-sm font-medium">Client</p>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {project?.client?.name || "-"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {project?.client?.companyName || "No company"}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <CalendarDays size={18} className="text-indigo-500" />
                  <p className="text-sm font-medium">Start Date</p>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {project?.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock3
                    size={18}
                    className={overdue ? "text-red-500" : "text-blue-500"}
                  />
                  <p className="text-sm font-medium">Due Date</p>
                </div>
                <p
                  className={`mt-3 text-lg font-semibold ${overdue ? "text-red-600" : "text-slate-900"}`}
                >
                  {project?.dueDate
                    ? new Date(project.dueDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <FolderKanban size={18} className="text-emerald-500" />
                  <p className="text-sm font-medium">Created</p>
                </div>
                <p className="mt-3 text-lg font-semibold text-slate-900">
                  {project?.createdAt
                    ? new Date(project.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-slate-600">
                <FileText size={18} className="text-slate-500" />
                <p className="text-sm font-medium">Description</p>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {project?.description?.trim() ||
                  "No description provided for this project."}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-full rounded-2xl border border-slate-200 font-medium transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
