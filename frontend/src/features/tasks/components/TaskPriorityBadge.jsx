import {
  ArrowDown,
  Minus,
  ArrowUp,
} from "lucide-react";

export default function TaskPriorityBadge({
  priority,
}) {
  const priorityConfig = {
    LOW: {
      label: "Low",
      icon: ArrowDown,
      className:
        "bg-slate-100 text-slate-700 border-slate-200",
    },

    MEDIUM: {
      label: "Medium",
      icon: Minus,
      className:
        "bg-amber-50 text-amber-700 border-amber-200",
    },

    HIGH: {
      label: "High",
      icon: ArrowUp,
      className:
        "bg-red-50 text-red-700 border-red-200",
    },
  };

  const config =
    priorityConfig[priority] ||
    priorityConfig.MEDIUM;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        border
        text-xs
        font-semibold
        whitespace-nowrap
        ${config.className}
      `}
    >
      <Icon size={14} />

      {config.label}
    </span>
  );
}