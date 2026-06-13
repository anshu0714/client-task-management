import { AlertTriangle } from "lucide-react";

export default function DeleteConfirmModal({
  open,
  title,
  description,
  itemName,
  loading,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-200
      flex
      items-center
      justify-center
      p-4
      "
    >
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="
        absolute
        inset-0
        bg-slate-900/60
        backdrop-blur-sm
        "
      />

      {/* Modal */}

      <div
        className="
        relative
        w-full
        max-w-md
        rounded-3xl
        bg-white
        p-6
        shadow-2xl
        animate-in
        fade-in
        zoom-in-95
        "
      >
        <div
          className="
          h-14
          w-14
          rounded-2xl
          bg-red-100
          flex
          items-center
          justify-center
          text-red-600
          mb-5
          "
        >
          <AlertTriangle size={28} />
        </div>

        <h2
          className="
          text-xl
          font-bold
          text-slate-900
          "
        >
          {title}
        </h2>

        <p
          className="
          mt-3
          text-sm
          text-slate-600
          "
        >
          {description}
        </p>

        <div
          className="
          mt-4
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-3
          "
        >
          <p
            className="
            text-sm
            font-semibold
            text-red-700
            wrap-break-word
            "
          >
            {itemName}
          </p>
        </div>

        <div
          className="
          mt-6
          flex
          gap-3
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
            flex-1
            h-12
            rounded-2xl
            border
            border-slate-200
            font-medium
            hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
            flex-1
            h-12
            rounded-2xl
            bg-red-600
            text-white
            font-semibold
            hover:bg-red-700
            disabled:opacity-50
            "
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}