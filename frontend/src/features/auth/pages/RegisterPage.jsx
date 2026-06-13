import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { signupApi } from "../services/auth.api";
import { showError, showSuccess } from "../../../shared/utils/toast";

const INITIAL_FORM = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);

  const passwordChecks = useMemo(() => {
    return {
      minLength: form.password.length >= 6,
      hasName: form.name.trim().length >= 2,
      passwordsMatch:
        form.password.length > 0 &&
        form.confirmPassword.length > 0 &&
        form.password === form.confirmPassword,
    };
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      return showError("Name must be at least 2 characters");
    }

    if (form.password.length < 6) {
      return showError("Password must be at least 6 characters");
    }

    if (form.password !== form.confirmPassword) {
      return showError("Passwords do not match");
    }

    try {
      setLoading(true);

      await signupApi({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      showSuccess("Account created successfully");
      navigate("/login");
    } catch (error) {
      showError(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const checklist = [
    { label: "Name is at least 2 characters", ok: passwordChecks.hasName },
    {
      label: "Password is at least 6 characters",
      ok: passwordChecks.minLength,
    },
    { label: "Passwords match", ok: passwordChecks.passwordsMatch },
  ];

  return (
    <div className="min-h-dvh bg-linear-to-br from-slate-100 via-white to-violet-100">
      <div className="mx-auto grid min-h-dvh w-full max-w-7xl lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-8 xl:p-10">
          <div>
            <div className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 text-base font-black text-white shadow-xl shadow-indigo-500/20">
                T
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500">Client Task Management</p>
              </div>
            </div>

            <div className="mt-10 max-w-lg">
              <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-700">
                Team Workspace
              </span>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-900">
                Create your workspace account
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Manage clients, projects, tasks, and delivery in one focused
                workflow.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold text-slate-900">After signup</p>
            <div className="mt-3 space-y-2.5">
              {[
                "Account is created as employee by default.",
                "Admins manage clients, projects, and tasks.",
                "Employees update status and add comments.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-emerald-100 p-1 text-emerald-600">
                    <CheckCircle2 size={13} />
                  </div>
                  <p className="text-sm text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-6">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-violet-600 font-black text-white">
                T
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight text-slate-900">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-500">Create account</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                Get started
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Create your account to access the workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Anshu Jha"
                    value={form.name}
                    onChange={handleChange}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Minimum 6 characters"
                    value={form.password}
                    onChange={handleChange}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={17}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-400 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="space-y-1.5">
                  {checklist.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <CheckCircle2
                        size={15}
                        className={
                          item.ok ? "text-emerald-600" : "text-slate-300"
                        }
                      />
                      <span
                        className={`text-xs ${
                          item.ok ? "text-emerald-700" : "text-slate-500"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight size={17} />}
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
