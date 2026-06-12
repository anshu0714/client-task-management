import { useEffect, useState } from "react";

import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import Button from "../../../shared/components/Button";

import { getClientsApi } from "../../clients/services/client.api";

import {
  getProjectsApi,
  createProjectApi,
  updateProjectApi,
  deleteProjectApi,
} from "../services/project.api";

import { showSuccess, showError } from "../../../shared/utils/toast";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState({
    client: "",
    name: "",
    description: "",
    startDate: "",
    dueDate: "",
    status: "NOT_STARTED",
  });

  const resetForm = () => {
    setForm({
      client: "",
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      status: "NOT_STARTED",
    });

    setEditingProject(null);
  };

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        getProjectsApi(),
        getClientsApi(),
      ]);

      setProjects(projectsRes.data.projects || []);
      setClients(clientsRes.data.clients || []);
    } catch {
      showError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    setForm({
      client: project.client?._id,
      name: project.name,
      description: project.description || "",
      startDate: project.startDate?.slice(0, 10),
      dueDate: project.dueDate?.slice(0, 10),
      status: project.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const validateDates = () => {
    const start = new Date(form.startDate);
    const due = new Date(form.dueDate);

    if (due <= start) {
      showError("Due date must be after start date");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    try {
      setSubmitting(true);

      if (editingProject) {
        await updateProjectApi(editingProject._id, form);

        showSuccess("Project updated");
      } else {
        await createProjectApi(form);

        showSuccess("Project created");
      }

      resetForm();

      await fetchData();
    } catch (error) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete project?");

    if (!confirmed) return;

    try {
      await deleteProjectApi(id);

      showSuccess("Project deleted");

      await fetchData();
    } catch (error) {
      showError(error?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {editingProject ? "Edit Project" : "Add Project"}
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>

          <input
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <div>
            <label className="block mb-2 font-medium">Start Date</label>

            <input
              type="date"
              name="startDate"
              value={form.startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Due Date</label>

            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              min={form.startDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-3 rounded md:col-span-2"
          />

          <div>
            <label className="block mb-2 font-medium">Status</label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="NOT_STARTED">Not Started</option>

              <option value="IN_PROGRESS">In Progress</option>

              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <Button type="submit" loading={submitting}>
              {editingProject ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Projects</h2>
        </div>

        {!projects.length ? (
          <div className="p-6">
            <EmptyState title="No projects found" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-4 text-left">Project</th>

                <th className="p-4 text-left">Client</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-left">Due Date</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b">
                  <td className="p-4">{project.name}</td>

                  <td className="p-4">{project.client?.name}</td>

                  <td className="p-4">{project.status}</td>

                  <td className="p-4">
                    {new Date(project.dueDate).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
