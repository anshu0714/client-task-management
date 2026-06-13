import { Link } from "react-router-dom";
import { Plus, ListTodo } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";

export default function DashboardHero() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="relative overflow-hidden rounded-3xl sm:rounded-4xl">
      <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-violet-600 to-blue-600" />
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative z-10 px-5 py-6 sm:p-8">
        <p className="text-xs font-medium text-indigo-100 sm:text-sm">
          CLIENT TASK MANAGEMENT
        </p>

        <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl lg:text-4xl wrap-break-word">
          Welcome back, {user?.name}
        </h1>

        <p className="mt-2 max-w-4xl text-sm text-indigo-100 sm:text-base">
          {isAdmin
            ? "Monitor projects, track team performance and manage client delivery from a single workspace."
            : "Track assigned tasks, monitor deadlines and keep project delivery on schedule."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {isAdmin ? (
            <>
              <Link
                to="/clients"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-100"
              >
                <Plus size={16} />
                New Client
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Plus size={16} />
                New Project
              </Link>

              <Link
                to="/tasks"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/15 px-4 py-2.5 text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <Plus size={16} />
                New Task
              </Link>
            </>
          ) : (
            <Link
              to="/tasks"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-medium text-slate-900 shadow-sm transition-all hover:bg-slate-100"
            >
              <ListTodo size={16} />
              View My Tasks
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
