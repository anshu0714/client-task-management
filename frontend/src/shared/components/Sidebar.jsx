import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ListTodo,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Sidebar() {
  const { user, logout } = useAuth();

  const navClass = ({ isActive }) =>
    `
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-2xl
    transition-all
    duration-200
    border
    ${
      isActive
        ? `
          bg-gradient-to-r
          from-blue-100
          to-indigo-100
          text-indigo-700
          border-indigo-300
          font-semibold
          shadow-sm
        `
        : `
          border-transparent
          text-slate-500
          hover:bg-white/80
          hover:border-slate-200
          hover:text-slate-700
        `
    }
  `;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* MOBILE HEADER */}

      <div
        className="
        lg:hidden
        sticky
        top-0
        z-40
        bg-white/90
        backdrop-blur-xl
        border-b
        border-slate-200
        px-4
        py-3
        "
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
              h-10
              w-10
              rounded-xl
              bg-linear-to-br
              from-blue-500
              via-indigo-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              font-black
              shadow-lg
              shadow-blue-500/20
              "
            >
              T
            </div>

            <h2
              className="
              text-xl
              font-black
              tracking-tight
              bg-linear-to-r
              from-blue-600
              via-indigo-600
              to-violet-600
              bg-clip-text
              text-transparent
              "
            >
              TaskFlow
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span
              className="
              max-w-25
              truncate
              text-sm
              font-medium
              text-slate-700
              "
            >
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="
              flex
              items-center
              justify-center
              h-7
              w-7
              rounded-xl
              bg-red-50
              border
              border-red-200
              text-red-600
              "
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP SIDEBAR */}

      <aside
        className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        h-screen
        w-72
        bg-linear-to-b
        from-blue-50
        via-white
        to-violet-50
        border-r
        border-slate-300
        flex-col
        z-50
        "
      >
        <div className="p-6 border-b border-slate-300">
          <div className="flex items-center gap-3">
            <div
              className="
              h-12
              w-12
              rounded-2xl
              bg-linear-to-br
              from-blue-500
              via-indigo-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              font-black
              text-lg
              shadow-xl
              shadow-blue-500/30
              "
            >
              T
            </div>

            <div>
              <h2
                className="
                text-2xl
                font-black
                tracking-tight
                bg-linear-to-r
                from-blue-600
                via-indigo-600
                to-violet-600
                bg-clip-text
                text-transparent
                "
              >
                TaskFlow
              </h2>

              <p className="text-xs text-slate-600">
                Client Management
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <p
            className="
            px-4
            mb-4
            text-xs
            uppercase
            tracking-[0.2em]
            font-bold
            text-slate-700
            "
          >
            Workspace
          </p>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={navClass}
            >
              <LayoutDashboard
                size={20}
                strokeWidth={1.8}
              />
              Dashboard
            </NavLink>

            {user?.role === "ADMIN" && (
              <>
                <NavLink
                  to="/clients"
                  className={navClass}
                >
                  <Users
                    size={20}
                    strokeWidth={1.8}
                  />
                  Clients
                </NavLink>

                <NavLink
                  to="/projects"
                  className={navClass}
                >
                  <FolderKanban
                    size={20}
                    strokeWidth={1.8}
                  />
                  Projects
                </NavLink>
              </>
            )}

            <NavLink
              to="/tasks"
              className={navClass}
            >
              <ListTodo
                size={20}
                strokeWidth={1.8}
              />
              Tasks
            </NavLink>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-300">
          <div
            className="
            rounded-2xl
            border
            border-slate-300
            bg-linear-to-r
            from-slate-50
            to-blue-50
            p-4
            "
          >
            <p className="font-semibold text-slate-900 truncate">
              {user?.name}
            </p>

            <button
              onClick={handleLogout}
              className="
              mt-4
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-red-200
              bg-red-50
              py-2.5
              text-red-600
              hover:bg-red-100
              transition
              "
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAV */}

      <div
        className="
        lg:hidden
        fixed
        bottom-0
        left-0
        right-0
        z-50
        bg-linear-to-r
        from-blue-50
        via-white
        to-violet-50
        border-t-2
        border-slate-300
        shadow-[0_-8px_30px_rgba(15,23,42,0.08)]
        "
      >
        <nav
          className="
          flex
          justify-around
          items-center
          min-h-19
          pt-3
          pb-[max(1rem,env(safe-area-inset-bottom))]
          "
        >
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `
              flex
              flex-col
              items-center
              gap-1
              px-3
              py-2
              rounded-2xl
              text-xs
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-indigo-100 text-indigo-600 font-semibold scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }
              `
            }
          >
            <LayoutDashboard
              size={22}
              strokeWidth={1.8}
            />
            Dashboard
          </NavLink>

          {user?.role === "ADMIN" && (
            <>
              <NavLink
                to="/clients"
                className={({ isActive }) =>
                  `
                  flex
                  flex-col
                  items-center
                  gap-1
                  px-3
                  py-2
                  rounded-2xl
                  text-xs
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-emerald-100 text-emerald-600 font-semibold scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }
                  `
                }
              >
                <Users
                  size={22}
                  strokeWidth={1.8}
                />
                Clients
              </NavLink>

              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `
                  flex
                  flex-col
                  items-center
                  gap-1
                  px-3
                  py-2
                  rounded-2xl
                  text-xs
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-violet-100 text-violet-600 font-semibold scale-105"
                      : "text-slate-400 hover:text-slate-600"
                  }
                  `
                }
              >
                <FolderKanban
                  size={22}
                  strokeWidth={1.8}
                />
                Projects
              </NavLink>
            </>
          )}

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `
              flex
              flex-col
              items-center
              gap-1
              px-3
              py-2
              rounded-2xl
              text-xs
              transition-all
              duration-200
              ${
                isActive
                  ? "bg-amber-100 text-amber-600 font-semibold scale-105"
                  : "text-slate-400 hover:text-slate-600"
              }
              `
            }
          >
            <ListTodo
              size={22}
              strokeWidth={1.8}
            />
            Tasks
          </NavLink>
        </nav>
      </div>
    </>
  );
}