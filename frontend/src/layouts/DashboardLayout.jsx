import { Outlet } from "react-router-dom";
import Sidebar from "../shared/components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-violet-50">
      <Sidebar />

      <main
        className="
        lg:ml-72
        min-h-screen
        p-4
        sm:p-6
        lg:p-8
        pb-24
        lg:pb-8
        "
      >
        <Outlet />
      </main>
    </div>
  );
}