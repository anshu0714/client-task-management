import {
  Plus,
  FolderKanban,
} from "lucide-react";

export default function ProjectPageHeader({
  totalProjects = 0,
  onAddProject,
}) {
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
      p-5
      sm:p-8
      shadow-sm
      "
    >
      {/* Decorative Gradient */}

      <div
        className="
        absolute
        -top-20
        -right-20
        h-64
        w-64
        rounded-full
        bg-linear-to-br
        from-blue-100
        via-indigo-100
        to-violet-100
        blur-3xl
        opacity-80
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

        <div className="min-w-0">
          <div
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-indigo-200
            bg-indigo-50
            px-3
            py-1
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-indigo-700
            "
          >
            <FolderKanban size={14} />
            Project Management
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
            Projects
          </h1>

          <p
            className="
            mt-3
            max-w-4xl
            text-sm
            sm:text-base
            text-slate-600
            "
          >
            Manage project delivery,
            monitor progress,
            track deadlines and
            organize client work
            from a centralized
            workspace.
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
            Total Projects

            <span
              className="
              ml-2
              font-bold
              text-slate-900
              "
            >
              {totalProjects}
            </span>
          </div>
        </div>

        {/* Right */}

        <div
          className="
          flex
          w-full
          sm:w-auto
          "
        >
          <button
            onClick={onAddProject}
            className="
            w-full
            sm:w-auto
            inline-flex
            items-center
            justify-center
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

            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}