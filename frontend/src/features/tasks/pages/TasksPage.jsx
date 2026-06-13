import { useCallback, useEffect, useState } from "react";
import Loader from "../../../shared/components/Loader";
import DeleteConfirmModal from "../../../shared/components/DeleteConfirmModal";
import Pagination from "../../../shared/components/Pagination";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { useAuth } from "../../auth/hooks/useAuth";
import TaskPageHeader from "../components/TaskPageHeader";
import TaskStats from "../components/TaskStats";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";
import TaskModal from "../components/TaskModal";
import TaskViewModal from "../components/TaskViewModal";
import {
  getTasksApi,
  createTaskApi,
  updateTaskApi,
  deleteTaskApi,
} from "../services/task.api";
import { getProjectsApi } from "../../projects/services/project.api";
import { getUsersApi } from "../../users/services/user.api";
import { ROLES, getEntityId } from "../constants/taskConstant";

const DEFAULT_LIMIT = 10;

export default function TasksPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [viewTaskId, setViewTaskId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [assignedUserFilter, setAssignedUserFilter] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [page, setPage] = useState(1);

  const fetchTasks = useCallback(async () => {
    const res = await getTasksApi({
      page,
      limit: DEFAULT_LIMIT,
      search: searchTerm || undefined,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
      assignedUser: assignedUserFilter || undefined,
      dueDate: dueDateFilter || undefined,
    });

    setTasks(res?.data?.tasks || []);
    setPagination(
      res?.data?.pagination || {
        page,
        limit: DEFAULT_LIMIT,
        total: 0,
        totalPages: 1,
      },
    );
  }, [
    page,
    searchTerm,
    statusFilter,
    priorityFilter,
    assignedUserFilter,
    dueDateFilter,
  ]);

  const handleSearchTermChange = (value) => {
    setPage(1);
    setSearchTerm(value);
  };

  const handleStatusFilterChange = (value) => {
    setPage(1);
    setStatusFilter(value);
  };

  const handlePriorityFilterChange = (value) => {
    setPage(1);
    setPriorityFilter(value);
  };

  const handleAssignedUserFilterChange = (value) => {
    setPage(1);
    setAssignedUserFilter(value);
  };

  const handleDueDateFilterChange = (value) => {
    setPage(1);
    setDueDateFilter(value);
  };

  const fetchDependencies = useCallback(async () => {
    const requests = [getProjectsApi({ page: 1, limit: 100 })];

    if (isAdmin) {
      requests.push(getUsersApi({ page: 1, limit: 100 }));
    }

    const results = await Promise.all(requests);

    const projectsRes = results[0];
    setProjects(projectsRes?.data?.projects || []);

    if (isAdmin) {
      const usersRes = results[1];
      setUsers(usersRes?.data?.users || []);
    } else {
      setUsers([]);
    }
  }, [isAdmin]);

  useEffect(() => {
    let ignore = false;

    async function loadPage() {
      try {
        setLoading(true);
        await Promise.all([fetchTasks(), fetchDependencies()]);
      } catch (error) {
        if (!ignore) {
          showError(error?.response?.data?.message || "Failed to load tasks");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadPage();

    return () => {
      ignore = true;
    };
  }, [fetchTasks, fetchDependencies]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setIsViewModalOpen(false);
    setViewTaskId(null);
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const openViewModal = (task) => {
    setViewTaskId(getEntityId(task));
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewTaskId(null);
    setIsViewModalOpen(false);
  };

  const handleSubmit = async (payload) => {
    try {
      setSubmitting(true);

      if (selectedTask) {
        await updateTaskApi(getEntityId(selectedTask), payload);
        showSuccess("Task updated successfully");
      } else {
        await createTaskApi(payload);
        showSuccess("Task created successfully");
      }

      closeModal();
      await fetchTasks();
    } catch (error) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setDeleteModalOpen(true);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      await deleteTaskApi(getEntityId(taskToDelete));
      showSuccess("Task deleted successfully");
      setDeleteModalOpen(false);
      setTaskToDelete(null);

      if (tasks.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await fetchTasks();
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6 lg:space-y-8">
      <TaskPageHeader
        totalTasks={pagination.total}
        onAddTask={isAdmin ? openCreateModal : undefined}
      />

      <TaskStats tasks={tasks} />

      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        statusFilter={statusFilter}
        setStatusFilter={handleStatusFilterChange}
        priorityFilter={priorityFilter}
        setPriorityFilter={handlePriorityFilterChange}
        assignedUserFilter={assignedUserFilter}
        setAssignedUserFilter={handleAssignedUserFilterChange}
        dueDateFilter={dueDateFilter}
        setDueDateFilter={handleDueDateFilterChange}
        users={users}
      />

      <TaskTable
        tasks={tasks}
        onView={openViewModal}
        onEdit={openEditModal}
        onDelete={handleDeleteClick}
      />

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={setPage}
      />

      <TaskModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        loading={submitting}
        task={selectedTask}
        projects={projects}
        users={users}
      />

      <TaskViewModal
        open={isViewModalOpen}
        taskId={viewTaskId}
        onClose={closeViewModal}
        onEdit={openEditModal}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        title="Delete Task"
        description="This action cannot be undone. You are about to permanently remove this task."
        itemName={taskToDelete?.title}
        onClose={() => {
          setDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
}
