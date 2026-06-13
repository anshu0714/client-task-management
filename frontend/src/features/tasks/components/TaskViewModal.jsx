import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  FolderKanban,
  User,
  Building2,
  AlignLeft,
  MessageSquare,
  Clock3,
  Pencil,
} from "lucide-react";
import { getTaskByIdApi } from "../services/task.api";
import {
  getCommentsApi,
  createCommentApi,
} from "../../comments/services/comment.api";
import { showError, showSuccess } from "../../../shared/utils/toast";
import Loader from "../../../shared/components/Loader";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskPriorityBadge from "./TaskPriorityBadge";
import { getEntityId } from "../constants/taskConstant";

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        <Icon size={16} />
        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="wrap-break-word text-sm font-medium text-slate-900">
        {value || "-"}
      </p>
    </div>
  );
}

export default function TaskViewModal({ open, taskId, onClose, onEdit }) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (!open || !taskId) return;

    let ignore = false;

    async function loadTaskDetails() {
      try {
        setLoading(true);
        const [taskRes, commentsRes] = await Promise.all([
          getTaskByIdApi(taskId),
          getCommentsApi(taskId),
        ]);

        if (ignore) return;

        setTask(taskRes?.data || null);
        setComments(commentsRes?.data || []);
      } catch (error) {
        if (!ignore) {
          showError(
            error?.response?.data?.message || "Failed to load task details",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTaskDetails();

    return () => {
      ignore = true;
    };
  }, [open, taskId]);

  const handleAddComment = async () => {
    if (!taskId || !commentText.trim()) return;

    try {
      setCommentLoading(true);
      const res = await createCommentApi(taskId, { text: commentText.trim() });
      setComments((prev) => [res.data, ...prev]);
      setCommentText("");
      showSuccess("Comment added successfully");
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-130">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-3xl">
        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Task Details</h2>
            <p className="mt-1 text-sm text-slate-500">
              Review task information, assignment and discussion.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <Loader />
          ) : !task ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Task details could not be loaded.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <h3 className="wrap-break-word text-2xl font-bold text-slate-900">
                      {task.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {task.description ||
                        "No description added for this task."}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <TaskPriorityBadge priority={task.priority} />
                    <TaskStatusBadge status={task.status} />
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard
                    icon={FolderKanban}
                    label="Project"
                    value={task.project?.name || task.project?.projectName}
                  />
                  <InfoCard
                    icon={Building2}
                    label="Client"
                    value={
                      task.project?.client?.name ||
                      task.project?.client?.companyName
                    }
                  />
                  <InfoCard
                    icon={User}
                    label="Assigned User"
                    value={task.assignedUser?.name}
                  />
                  <InfoCard
                    icon={CalendarDays}
                    label="Due Date"
                    value={
                      task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"
                    }
                  />
                  <InfoCard
                    icon={Clock3}
                    label="Created At"
                    value={
                      task.createdAt
                        ? new Date(task.createdAt).toLocaleString()
                        : "-"
                    }
                  />
                  <InfoCard
                    icon={Clock3}
                    label="Updated At"
                    value={
                      task.updatedAt
                        ? new Date(task.updatedAt).toLocaleString()
                        : "-"
                    }
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <AlignLeft size={18} className="text-slate-500" />
                  <h4 className="font-semibold text-slate-900">Description</h4>
                </div>
                <p className="text-sm leading-7 text-slate-700">
                  {task.description || "No description available."}
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-slate-500" />
                    <h4 className="font-semibold text-slate-900">Comments</h4>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      comments.length
                        ? "border-sky-200 bg-sky-50 text-sky-700"
                        : "border-slate-200 bg-slate-100 text-slate-500"
                    }`}
                  >
                    {comments.length} comment{comments.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mb-4 flex gap-3">
                  <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-2xl border border-slate-200 px-4 py-3"
                  />
                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={commentLoading}
                    className="self-end h-12 rounded-2xl bg-slate-900 px-5 font-semibold text-white disabled:opacity-50"
                  >
                    {commentLoading ? "Posting..." : "Post"}
                  </button>
                </div>

                {comments.length ? (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <div
                        key={getEntityId(comment)}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-slate-900">
                            {comment.user?.name || "User"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {comment.createdAt
                              ? new Date(comment.createdAt).toLocaleString()
                              : ""}
                          </p>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                    No comments added yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={onClose}
            className="h-12 flex-1 rounded-2xl border border-slate-200 font-medium"
          >
            Close
          </button>

          {task && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(task);
              }}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 font-semibold text-white"
            >
              <Pencil size={16} />
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
