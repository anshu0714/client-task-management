import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { showError, showSuccess } from "../../../shared/utils/toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(form);
      showSuccess("Login successful");
      navigate("/dashboard");
    } catch (error) {
      showError(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-100">
      <div className="relative flex h-full items-center justify-center px-4 py-4 sm:px-6">
        <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-60 w-60 rounded-full bg-violet-100/60 blur-3xl" />

        <div className="relative z-10 grid h-full max-h-230 w-full max-w-6xl overflow-hidden rounded-4xl border border-slate-200 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.10)] backdrop-blur-xl lg:grid-cols-[1.02fr_0.98fr]">
          <div className="hidden lg:flex flex-col justify-between border-r border-slate-200 bg-linear-to-br from-slate-50 via-white to-indigo-50/50 p-8 xl:p-10">
            <div>
              <div className="inline-flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 text-lg font-black text-white shadow-lg shadow-indigo-500/20">
                  T
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    TaskFlow
                  </h1>
                  <p className="text-sm text-slate-500">
                    Client Task Management
                  </p>
                </div>
              </div>

              <div className="mt-12 max-w-md">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
                  Welcome Back
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight text-slate-900">
                  Manage clients, projects and tasks without losing focus.
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A simple workspace for delivery tracking, team assignments and
                  deadline visibility.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Role-based workflow
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Admins control operations, employees work on assigned tasks
                  only.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">
                  Clean delivery tracking
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Monitor status, comments, priorities and deadlines from one
                  dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="flex h-full items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
              <div className="mb-6 lg:hidden">
                <div className="inline-flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 text-base font-black text-white shadow-lg shadow-indigo-500/20">
                    T
                  </div>
                  <div>
                    <h2 className="bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-2xl font-black tracking-tight text-transparent">
                      TaskFlow
                    </h2>
                    <p className="text-sm text-slate-500">
                      Client Task Management
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-6">
                  <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700">
                    Secure Login
                  </div>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                    Sign in
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Continue to your workspace dashboard.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <LockKeyhole
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 px-5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "Login"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={18}
                      className="mt-0.5 text-emerald-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Protected access
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Authenticated access with role-based permissions.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
