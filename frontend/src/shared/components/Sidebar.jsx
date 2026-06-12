import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h2 className="text-xl font-bold mb-8">Task Manager</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard">Dashboard</NavLink>

        {user?.role === "ADMIN" && (
          <>
            <NavLink to="/clients">Clients</NavLink>

            <NavLink to="/projects">Projects</NavLink>
          </>
        )}

        <NavLink to="/tasks">Tasks</NavLink>
      </nav>
    </aside>
  );
}
