import { useEffect, useMemo, useState } from "react";

import Loader from "../../../shared/components/Loader";
import ProjectPageHeader from "../components/ProjectPageHeader";
import ProjectStats from "../components/ProjectStats";
import ProjectFilters from "../components/ProjectFilters";
import ProjectTable from "../components/ProjectTable";
import ProjectModal from "../components/ProjectModal";
import ProjectDetailsModal from "../components/ProjectDetailsModal";
import DeleteConfirmModal from "../../../shared/components/DeleteConfirmModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [clientFilter, setClientFilter] = useState("ALL");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const getEntityId = (item) => item?.id || item?._id || "";

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes] = await Promise.all([
        getProjectsApi({ page: 1, limit: 100 }),
        getClientsApi({ page: 1, limit: 100 }),
      ]);

      setProjects(projectsRes?.data?.projects || []);
      setClients(clientsRes?.data?.clients || []);
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to load data");
    }
  };

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const [projectsRes, clientsRes] = await Promise.all([
          getProjectsApi({ page: 1, limit: 100 }),
          getClientsApi({ page: 1, limit: 100 }),
        ]);

        if (!ignore) {
          setProjects(projectsRes?.data?.projects || []);
          setClients(clientsRes?.data?.clients || []);
        }
      } catch (error) {
        if (!ignore) {
          showError(error?.response?.data?.message || "Failed to load data");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter((project) =>
        `${project?.name || ""} ${project?.client?.name || ""}`
          .toLowerCase()
          .includes(q),
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter((project) => project?.status === statusFilter);
    }

    if (clientFilter !== "ALL") {
      filtered = filtered.filter(
        (project) => getEntityId(project?.client) === clientFilter,
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "az":
          return (a?.name || "").localeCompare(b?.name || "");
        case "za":
          return (b?.name || "").localeCompare(a?.name || "");
        case "oldest":
          return (
            new Date(a?.createdAt || 0).getTime() -
            new Date(b?.createdAt || 0).getTime()
          );
        default:
          return (
            new Date(b?.createdAt || 0).getTime() -
            new Date(a?.createdAt || 0).getTime()
          );
      }
    });
  }, [projects, searchTerm, sortBy, statusFilter, clientFilter]);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleView = (project) => {
    setViewingProject(project);
    setViewModalOpen(true);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const confirmDeleteProject = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProjectApi(getEntityId(projectToDelete));
      showSuccess("Project deleted successfully");
      setDeleteModalOpen(false);
      setProjectToDelete(null);
      await fetchData();
    } catch (error) {
      showError(error?.response?.data?.message || "Delete failed");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (editingProject) {
        await updateProjectApi(getEntityId(editingProject), formData);
        showSuccess("Project updated successfully");
      } else {
        await createProjectApi(formData);
        showSuccess("Project created successfully");
      }

      setEditingProject(null);
      setIsModalOpen(false);
      await fetchData();
    } catch (error) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <ProjectPageHeader
        totalProjects={projects.length}
        onAddProject={handleOpenCreate}
      />

      <ProjectStats projects={projects} />

      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        clientFilter={clientFilter}
        setClientFilter={setClientFilter}
        clients={clients}
      />

      <ProjectTable
        projects={filteredProjects}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ProjectModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingProject}
        loading={submitting}
        clients={clients}
      />

      <ProjectDetailsModal
        open={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setViewingProject(null);
        }}
        project={viewingProject}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        title="Delete Project"
        description="This action cannot be undone. You are about to permanently remove this project."
        itemName={
          projectToDelete
            ? `${projectToDelete?.name || "Project"} (${projectToDelete?.client?.name || "No Client"})`
            : ""
        }
        onClose={() => {
          setDeleteModalOpen(false);
          setProjectToDelete(null);
        }}
        onConfirm={confirmDeleteProject}
        loading={submitting}
      />
    </div>
  );
}
