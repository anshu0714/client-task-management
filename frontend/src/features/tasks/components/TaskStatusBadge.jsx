import { Clock3, Loader2, CheckCircle2 } from "lucide-react";
import { TASK_STATUS } from "../constants/taskconstant";

export default function TaskStatusBadge({ status }) {
  const statusConfig = {
    [TASK_STATUS.PENDING]: {
      label: "Pending",
      icon: Clock3,
      className: "bg-amber-50 text-amber-700 border-amber-200",
    },
    [TASK_STATUS.IN_PROGRESS]: {
      label: "In Progress",
      icon: Loader2,
      className: "bg-blue-50 text-blue-700 border-blue-200",
    },
    [TASK_STATUS.COMPLETED]: {
      label: "Completed",
      icon: CheckCircle2,
      className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
  };

  const config = statusConfig[status] || statusConfig[TASK_STATUS.PENDING];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}
