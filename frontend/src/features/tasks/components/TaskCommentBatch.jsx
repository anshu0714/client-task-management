import { MessageSquare } from "lucide-react";

export default function TaskCommentBadge({ count = 0 }) {
  const hasComments = count > 0;

  return (
    <span
      className={`inline-flex min-w-9 items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
        hasComments
          ? "border-sky-200 bg-sky-50 text-sky-700"
          : "border-slate-200 bg-slate-50 text-slate-500"
      }`}
      title={`${count}`}
    >
      <MessageSquare size={12} />
      <span>{count}</span>
    </span>
  );
}