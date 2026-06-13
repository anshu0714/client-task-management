import { ListTodo, Clock3, CheckCircle2, AlertTriangle } from "lucide-react";
import StatCard from "../../../shared/components/StatCard";
import { TASK_STATUS } from "../constants/taskconstant";

export default function TaskStats({ tasks = [] }) {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(
    (task) => task.status === TASK_STATUS.PENDING,
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED,
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (task.status === TASK_STATUS.COMPLETED) return false;
    return task.dueDate && new Date(task.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Tasks"
        value={totalTasks}
        icon={ListTodo}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      />
      <StatCard
        title="Pending Tasks"
        value={pendingTasks}
        icon={Clock3}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />
      <StatCard
        title="Completed Tasks"
        value={completedTasks}
        icon={CheckCircle2}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        title="Overdue Tasks"
        value={overdueTasks}
        icon={AlertTriangle}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />
    </div>
  );
}
