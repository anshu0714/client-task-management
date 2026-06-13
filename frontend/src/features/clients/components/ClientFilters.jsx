import { Search, ArrowUpDown } from "lucide-react";

export default function ClientFilters({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  total = 0,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by client name, email, company, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <ArrowUpDown
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm outline-none cursor-pointer transition-all focus:border-indigo-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="az">Name A-Z</option>
              <option value="za">Name Z-A</option>
              <option value="company-az">Company A-Z</option>
              <option value="company-za">Company Z-A</option>
            </select>
          </div>

          <div className="h-12 px-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-600 flex items-center font-medium">
            Results:
            <span className="ml-2 font-bold text-slate-900">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
