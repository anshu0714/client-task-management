import { Outlet } from "react-router-dom";

import Sidebar from "../shared/components/Sidebar";
import Navbar from "../shared/components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
