import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import ClientsPage from "../features/clients/pages/ClientPage";
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import TasksPage from "../features/tasks/pages/TasksPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "clients",
        element: <ClientsPage />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
  path: "tasks",
  element: <TasksPage />,
},
    ],
  },
]);
