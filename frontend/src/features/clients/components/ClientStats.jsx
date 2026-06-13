import { Users, Building2, UserPlus, Database } from "lucide-react";
import StatCard from "../../../shared/components/StatCard";

export default function ClientStats({ clients = [] }) {
  const totalClients = clients.length;

  const totalCompanies = new Set(
    clients
      .map((client) => client.companyName?.trim()?.toLowerCase())
      .filter(Boolean),
  ).size;

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const newClientsThisMonth = clients.filter((client) => {
    if (!client.createdAt) return false;

    const date = new Date(client.createdAt);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Total Clients"
        value={totalClients}
        icon={Users}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />

      <StatCard
        title="Companies"
        value={totalCompanies}
        icon={Building2}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
      />

      <StatCard
        title="Added This Month"
        value={newClientsThisMonth}
        icon={UserPlus}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />

      <StatCard
        title="Records"
        value={totalClients}
        icon={Database}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />
    </div>
  );
}
