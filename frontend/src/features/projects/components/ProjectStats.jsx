import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import StatCard from "../../../shared/components/StatCard";
import { PROJECT_STATUS } from "../constants/projectStatus";

export default function ProjectStats({ projects }) {
  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) => project.status === PROJECT_STATUS.IN_PROGRESS,
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === PROJECT_STATUS.COMPLETED,
  ).length;

  const overdueProjects = projects.filter((project) => {
    if (project.status === PROJECT_STATUS.COMPLETED) return false;
    return project.dueDate && new Date(project.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Projects"
        value={totalProjects}
        icon={FolderKanban}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      />
      <StatCard
        title="In Progress"
        value={activeProjects}
        icon={Clock3}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Completed"
        value={completedProjects}
        icon={CheckCircle2}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard
        title="Overdue"
        value={overdueProjects}
        icon={AlertTriangle}
        iconBg="bg-red-50"
        iconColor="text-red-600"
      />
    </div>
  );
}
