import { Search, Filter, CalendarDays } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { ROLES, getEntityId } from "../constants/taskConstant";

export default function TaskFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  assignedUserFilter,
  setAssignedUserFilter,
  dueDateFilter,
  setDueDateFilter,
  users = [],
}) {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-5 flex items-center gap-2">
        <Filter size={18} className="text-slate-500" />
        <h3 className="font-semibold text-slate-900">Filters</h3>
      </div>

      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${
          isAdmin ? "xl:grid-cols-5" : "xl:grid-cols-4"
        }`}
      >
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search tasks, project, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="INPROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        {isAdmin && (
          <select
            value={assignedUserFilter}
            onChange={(e) => setAssignedUserFilter(e.target.value)}
            className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-indigo-400"
          >
            <option value="">All Users</option>
            {users.map((item) => (
              <option key={getEntityId(item)} value={getEntityId(item)}>
                {item.name}
              </option>
            ))}
          </select>
        )}

        <div className="relative">
          <CalendarDays
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="date"
            value={dueDateFilter}
            onChange={(e) => setDueDateFilter(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-indigo-400"
          />
        </div>
      </div>
    </div>
  );
}
