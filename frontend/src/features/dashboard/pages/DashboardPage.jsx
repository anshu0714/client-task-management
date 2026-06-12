import { useEffect, useState } from "react";

import Loader from "../../../shared/components/Loader";
import StatCard from "../../../shared/components/StatCard";

import { getDashboardStats } from "../services/dashboard.api";
import { showError } from "../../../shared/utils/toast";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        showError(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!stats) {
    return <div>Failed to load dashboard</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard title="Total Clients" value={stats.totalClients} />

        <StatCard title="Total Projects" value={stats.totalProjects} />

        <StatCard title="Total Tasks" value={stats.totalTasks} />

        <StatCard title="Pending Tasks" value={stats.pendingTasks} />

        <StatCard title="Completed Tasks" value={stats.completedTasks} />

        <StatCard title="Overdue Tasks" value={stats.overdueTasks} />
      </div>
    </div>
  );
}
