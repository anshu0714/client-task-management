import { Search, ArrowUpDown, Filter, FolderKanban } from "lucide-react";
import { PROJECT_STATUS } from "../constants/projectStatus";

export default function ProjectFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  statusFilter,
  setStatusFilter,
  clientFilter,
  setClientFilter,
  clients,
}) {
  const getEntityId = (item) => item?.id || item?._id || "";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search project or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="relative">
            <ArrowUpDown
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Name A-Z</option>
              <option value="za">Name Z-A</option>
            </select>
          </div>

          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-400"
            >
              <option value="ALL">All Status</option>
              <option value={PROJECT_STATUS.NOT_STARTED}>Not Started</option>
              <option value={PROJECT_STATUS.IN_PROGRESS}>In Progress</option>
              <option value={PROJECT_STATUS.COMPLETED}>Completed</option>
            </select>
          </div>

          <div className="relative">
            <FolderKanban
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <select
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="h-12 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-indigo-400"
            >
              <option value="ALL">All Clients</option>
              {clients.map((client) => (
                <option key={getEntityId(client)} value={getEntityId(client)}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-600">
            Project Filters
          </div>
        </div>
      </div>
    </div>
  );
}
