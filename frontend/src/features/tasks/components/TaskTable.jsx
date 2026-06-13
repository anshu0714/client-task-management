import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  FolderKanban,
  User,
  Eye,
  Pencil,
  Trash2,
  MoreVertical,
} from "lucide-react";
import EmptyState from "../../../shared/components/EmptyState";
import { useAuth } from "../../auth/hooks/useAuth";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";
import { ROLES, getEntityId } from "../constants/taskConstant";

function TaskActionsMenu({ task, isAdmin, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleAction = (event, callback) => {
    event.stopPropagation();
    setOpen(false);
    callback(task);
  };

  return (
    <div
      className="relative"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50"
        aria-label="Open task actions"
        aria-expanded={open}
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-20 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={(e) => handleAction(e, onView)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Eye size={16} className="text-slate-500" />
            View
          </button>

          <button
            type="button"
            onClick={(e) => handleAction(e, onEdit)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil size={16} className="text-indigo-600" />
            Edit
          </button>

          {isAdmin && (
            <button
              type="button"
              onClick={(e) => handleAction(e, onDelete)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function TaskTable({ tasks = [], onView, onEdit, onDelete }) {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  if (!tasks.length) {
    return (
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-12">
        <EmptyState title="No tasks found" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Tasks</h2>
        <p className="mt-1 text-sm text-slate-500">
          {tasks.length} task{tasks.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Task
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Assigned To
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Priority
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Due Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => {
              const taskId = getEntityId(task);

              return (
                <tr
                  key={taskId}
                  onClick={() => onView(task)}
                  className="cursor-pointer border-b border-slate-100 transition-all hover:bg-slate-50/70"
                  title="View task details"
                >
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {task.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {task.description || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <FolderKanban size={16} className="text-violet-500" />
                      <span className="text-slate-700">
                        {task.project?.name || task.project?.projectName || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-blue-500" />
                      <span className="text-slate-700">
                        {task.assignedUser?.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td
                    className="px-6 py-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TaskPriorityBadge priority={task.priority} />
                  </td>

                  <td
                    className="px-6 py-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TaskStatusBadge status={task.status} />
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <CalendarDays size={15} />
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"}
                    </div>
                  </td>

                  <td
                    className="px-6 py-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-end">
                      <TaskActionsMenu
                        task={task}
                        isAdmin={isAdmin}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="xl:hidden">
        {tasks.map((task) => {
          const taskId = getEntityId(task);

          return (
            <div
              key={taskId}
              onClick={() => onView(task)}
              className="cursor-pointer border-b border-slate-200 p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{task.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {task.project?.name || task.project?.projectName || "-"}
                  </p>
                </div>

                <div onClick={(e) => e.stopPropagation()}>
                  <TaskActionsMenu
                    task={task}
                    isAdmin={isAdmin}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </div>
              </div>

              <div
                className="mt-4 flex flex-wrap gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <TaskPriorityBadge priority={task.priority} />
                <TaskStatusBadge status={task.status} />
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-500">
                <p>Assigned: {task.assignedUser?.name || "-"}</p>
                <p>
                  Due:{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
