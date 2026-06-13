import { useEffect, useState } from "react";
import {
  Users,
  FolderKanban,
  ListTodo,
  Clock3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import Loader from "../../../shared/components/Loader";
import DashboardHero from "../components/DashboardHero";
import ProgressCard from "../components/ProgressCard";
import StatusBreakdown from "../components/StatusBreakdown";
import EmptyState from "../../../shared/components/EmptyState";
import StatCard from "../../../shared/components/StatCard";
import { getDashboardStats } from "../services/dashboard.api";
import { useAuth } from "../../auth/hooks/useAuth";
import { showError } from "../../../shared/utils/toast";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        showError(
          error?.response?.data?.message ||
            "Failed to load dashboard statistics",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!stats) {
    return (
      <EmptyState
        title="Dashboard unavailable"
        description="Unable to load dashboard statistics. Please refresh the page."
      />
    );
  }

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="space-y-6 lg:space-y-8">
      <DashboardHero />

      {isAdmin ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Clients"
              value={stats.totalClients}
              icon={Users}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />
            <StatCard
              title="Total Projects"
              value={stats.totalProjects}
              icon={FolderKanban}
              iconBg="bg-violet-50"
              iconColor="text-violet-600"
            />
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              icon={ListTodo}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-600"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Pending Tasks"
              value={stats.pendingTasks}
              icon={Clock3}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
            />
            <StatCard
              title="Completed Tasks"
              value={stats.completedTasks}
              icon={CheckCircle2}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <StatCard
              title="Overdue Tasks"
              value={stats.overdueTasks}
              icon={AlertTriangle}
              iconBg="bg-red-50"
              iconColor="text-red-600"
            />
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="My Tasks"
            value={stats.totalTasks}
            icon={ListTodo}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <StatCard
            title="Pending Tasks"
            value={stats.pendingTasks}
            icon={Clock3}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={CheckCircle2}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Overdue Tasks"
            value={stats.overdueTasks}
            icon={AlertTriangle}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ProgressCard
          completed={stats.completedTasks}
          total={stats.totalTasks}
        />
        <StatusBreakdown
          pending={stats.pendingTasks}
          completed={stats.completedTasks}
          overdue={stats.overdueTasks}
        />
      </div>
    </div>
  );
}
