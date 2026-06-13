export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBg = "bg-indigo-50",
  iconColor = "text-indigo-600",
}) {
  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-5
      sm:p-6
      transition-all
      duration-300
      hover:shadow-lg
      hover:border-slate-300
      "
    >
      <div className="flex items-start gap-3">
        <div
          className={`
          h-11
          w-11
          shrink-0
          rounded-xl
          flex
          items-center
          justify-center
          ${iconBg}
          `}
        >
          <Icon
            size={20}
            className={iconColor}
          />
        </div>

        <p
          className="
          mt-3
          text-sm
          font-medium
          text-slate-600
          leading-tight
          "
        >
          {title}
        </p>
      </div>

      <h3
        className="
        mt-5
        text-3xl
        sm:text-4xl
        font-bold
        tracking-tight
        text-slate-900
        truncate
        "
      >
        {value}
      </h3>
    </div>
  );
}