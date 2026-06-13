import {
  FolderKanban,
  Building2,
  CalendarDays,
  Clock3,
  Pencil,
  Trash2,
  AlertTriangle,
  Eye,
} from "lucide-react";
import EmptyState from "../../../shared/components/EmptyState";
import { PROJECT_STATUS } from "../constants/projectStatus";

function getEntityId(item) {
  return item?.id || item?._id || "";
}

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

export default function ProjectTable({ projects, onView, onEdit, onDelete }) {
  if (!projects?.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <EmptyState title="No projects found" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
        <p className="mt-1 text-sm text-slate-500">
          {projects.length} projects found
        </p>
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-275">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Client
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Timeline
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => {
              const badge = getStatusBadge(project.status);
              const overdue = isOverdue(project);

              return (
                <tr
                  key={getEntityId(project)}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-100 to-blue-100">
                        <FolderKanban size={22} className="text-indigo-600" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {project?.name}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {project?.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-violet-500" />
                      <span className="font-medium text-slate-700">
                        {project?.client?.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={14} />
                        {project?.startDate
                          ? new Date(project.startDate).toLocaleDateString()
                          : "-"}
                      </div>

                      <div
                        className={`flex items-center gap-2 text-sm ${
                          overdue ? "text-red-600" : "text-slate-600"
                        }`}
                      >
                        {overdue ? (
                          <AlertTriangle size={14} />
                        ) : (
                          <Clock3 size={14} />
                        )}
                        {project?.dueDate
                          ? new Date(project.dueDate).toLocaleDateString()
                          : "-"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(project)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100"
                        title="View Project"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => onEdit(project)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-indigo-600 transition hover:bg-indigo-50"
                        title="Edit Project"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(project)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 transition hover:bg-red-50"
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-200 lg:hidden">
        {projects.map((project) => {
          const badge = getStatusBadge(project.status);
          const overdue = isOverdue(project);

          return (
            <div
              key={getEntityId(project)}
              className="p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-slate-900">
                    {project?.name}
                  </h3>
                  <p className="mt-1 truncate text-sm text-slate-500">
                    {project?.client?.name || "-"}
                  </p>
                </div>

                <span
                  className={`shrink-0 inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CalendarDays size={14} />
                  Start{" "}
                  {project?.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : "-"}
                </div>

                <div
                  className={`flex items-center gap-2 text-sm ${
                    overdue ? "text-red-600" : "text-slate-600"
                  }`}
                >
                  {overdue ? <AlertTriangle size={14} /> : <Clock3 size={14} />}
                  Due{" "}
                  {project?.dueDate
                    ? new Date(project.dueDate).toLocaleDateString()
                    : "-"}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <button
                  onClick={() => onView(project)}
                  className="h-11 rounded-xl border border-slate-200 font-medium text-slate-700"
                >
                  View
                </button>

                <button
                  onClick={() => onEdit(project)}
                  className="h-11 rounded-xl border border-slate-200 font-medium text-indigo-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(project)}
                  className="h-11 rounded-xl border border-red-200 font-medium text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
