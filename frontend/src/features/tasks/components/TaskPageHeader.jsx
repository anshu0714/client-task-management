import { Plus } from "lucide-react";

import { useAuth } from "../../auth/hooks/useAuth";

export default function TaskPageHeader({
  totalTasks = 0,
  onAddTask,
}) {
  const { user } = useAuth();

  const isAdmin =
    user?.role === "ADMIN";

  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      sm:rounded-4xl
      border
      border-slate-200
      bg-white
      p-6
      sm:p-8
      shadow-sm
      "
    >
      {/* Background */}

      <div
        className="
        absolute
        -top-24
        -right-20
        h-64
        w-64
        rounded-full
        bg-linear-to-br
        from-amber-100
        via-orange-100
        to-red-100
        blur-3xl
        opacity-70
        "
      />

      <div
        className="
        absolute
        -bottom-20
        -left-20
        h-56
        w-56
        rounded-full
        bg-linear-to-br
        from-blue-100
        via-indigo-100
        to-violet-100
        blur-3xl
        opacity-70
        "
      />

      <div
        className="
        relative
        z-10
        flex
        flex-col
        gap-6
        lg:flex-row
        lg:items-center
        lg:justify-between
        "
      >
        {/* Left */}

        <div>
          <div
            className="
            inline-flex
            items-center
            rounded-full
            border
            border-amber-200
            bg-amber-50
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-amber-700
            "
          >
            Task Management
          </div>

          <h1
            className="
            mt-4
            text-3xl
            sm:text-4xl
            font-bold
            tracking-tight
            text-slate-900
            "
          >
            Tasks
          </h1>

          <p
            className="
            mt-3
            max-w-3xl
            text-sm
            sm:text-base
            text-slate-600
            "
          >
            Track deliverables, monitor deadlines,
            manage assignments and keep projects
            moving efficiently.
          </p>

          <div
            className="
            mt-5
            inline-flex
            items-center
            rounded-2xl
            bg-slate-100
            px-4
            py-2
            text-sm
            font-medium
            text-slate-700
            "
          >
            Total Tasks

            <span
              className="
              ml-3
              rounded-lg
              bg-white
              px-2.5
              py-1
              font-bold
              text-slate-900
              "
            >
              {totalTasks}
            </span>
          </div>
        </div>

        {/* Right */}

        {isAdmin && (
          <div className="shrink-0">
            <button
              onClick={onAddTask}
              className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-linear-to-r
              from-blue-600
              via-indigo-600
              to-violet-600
              px-5
              py-3
              font-semibold
              text-white
              shadow-lg
              shadow-indigo-500/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-indigo-500/30
              "
            >
              <Plus size={18} />

              Add Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}