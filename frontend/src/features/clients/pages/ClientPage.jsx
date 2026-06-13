import { useEffect, useMemo, useState } from "react";
import Loader from "../../../shared/components/Loader";
import DeleteConfirmModal from "../../../shared/components/DeleteConfirmModal";
import Pagination from "../../../shared/components/Pagination";
import ClientPageHeader from "../components/ClientPageHeader";
import ClientStats from "../components/ClientStats";
import ClientFilters from "../components/ClientFilters";
import ClientTable from "../components/ClientTable";
import ClientModal from "../components/ClientModal";
import ClientDetailsModal from "../components/ClientDetailsModal";
import {
  getClientsApi,
  createClientApi,
  updateClientApi,
  deleteClientApi,
  getClientByIdApi,
} from "../services/client.api";
import { showError, showSuccess } from "../../../shared/utils/toast";
import { useAuth } from "../../auth/hooks/useAuth";

const DEFAULT_LIMIT = 10;
const STATS_LIMIT = 1000;

export default function ClientsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  const [clients, setClients] = useState([]);
  const [allClientsForStats, setAllClientsForStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 1,
  });

  const getClientId = (client) => client?._id || client?.id;

  const fetchClients = async (targetPage = page) => {
    const res = await getClientsApi({ page: targetPage, limit: DEFAULT_LIMIT });

    setClients(res?.data?.clients || []);
    setPagination(
      res?.data?.pagination || {
        page: targetPage,
        limit: DEFAULT_LIMIT,
        total: 0,
        totalPages: 1,
      },
    );
  };

  const fetchStatsClients = async () => {
    const res = await getClientsApi({ page: 1, limit: STATS_LIMIT });
    setAllClientsForStats(res?.data?.clients || []);
  };

  useEffect(() => {
    let ignore = false;

    async function loadClients() {
      try {
        setLoading(true);

        const [pageRes, statsRes] = await Promise.all([
          getClientsApi({ page, limit: DEFAULT_LIMIT }),
          getClientsApi({ page: 1, limit: STATS_LIMIT }),
        ]);

        if (!ignore) {
          setClients(pageRes?.data?.clients || []);
          setPagination(
            pageRes?.data?.pagination || {
              page,
              limit: DEFAULT_LIMIT,
              total: 0,
              totalPages: 1,
            },
          );
          setAllClientsForStats(statsRes?.data?.clients || []);
        }
      } catch (error) {
        if (!ignore) {
          showError(error?.response?.data?.message || "Failed to load clients");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    void loadClients();

    return () => {
      ignore = true;
    };
  }, [page]);

  const filteredClients = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = [...clients].filter((client) => {
      const text = [
        client?.name,
        client?.email,
        client?.phone,
        client?.companyName,
        client?.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(normalizedSearch);
    });

    return filtered.sort((a, b) => {
      const aName = a?.name || "";
      const bName = b?.name || "";
      const aCompany = a?.companyName || "";
      const bCompany = b?.companyName || "";

      switch (sortBy) {
        case "az":
          return aName.localeCompare(bName);
        case "za":
          return bName.localeCompare(aName);
        case "company-az":
          return aCompany.localeCompare(bCompany);
        case "company-za":
          return bCompany.localeCompare(aCompany);
        case "oldest":
          return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
        default:
          return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
      }
    });
  }, [clients, searchTerm, sortBy]);

  const handleSearchTermChange = (value) => {
    setPage(1);
    setSearchTerm(value);
  };

  const handleSortByChange = (value) => {
    setPage(1);
    setSortBy(value);
  };

  const handleOpenCreate = () => {
    if (!isAdmin) return;
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEdit = (client) => {
    if (!isAdmin) return;
    setEditingClient(client);
    setDetailsOpen(false);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (client) => {
    if (!isAdmin) return;
    setClientToDelete(client);
    setDeleteModalOpen(true);
  };

  const handleView = async (client) => {
    const id = getClientId(client);
    if (!id) return;

    setDetailsOpen(true);
    setDetailsLoading(true);

    try {
      const res = await getClientByIdApi(id);
      setSelectedClient(res?.data || null);
    } catch (error) {
      showError(
        error?.response?.data?.message || "Failed to load client details",
      );
      setDetailsOpen(false);
      setSelectedClient(null);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      if (editingClient) {
        await updateClientApi(getClientId(editingClient), formData);
        showSuccess("Client updated successfully");
      } else {
        await createClientApi(formData);
        showSuccess("Client created successfully");
      }

      setIsModalOpen(false);
      setEditingClient(null);

      await Promise.all([fetchClients(), fetchStatsClients()]);

      if (selectedClient && editingClient) {
        const updatedId = getClientId(editingClient);
        const detailsRes = await getClientByIdApi(updatedId);
        setSelectedClient(detailsRes?.data || null);
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDeleteClient = async () => {
    if (!clientToDelete) return;

    try {
      await deleteClientApi(getClientId(clientToDelete));
      showSuccess("Client deleted successfully");

      if (getClientId(selectedClient) === getClientId(clientToDelete)) {
        setDetailsOpen(false);
        setSelectedClient(null);
      }

      setDeleteModalOpen(false);
      setClientToDelete(null);

      if (clients.length === 1 && page > 1) {
        setPage((prev) => prev - 1);
      } else {
        await Promise.all([fetchClients(), fetchStatsClients()]);
      }
    } catch (error) {
      showError(error?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <ClientPageHeader
        totalClients={pagination.total}
        onAddClient={handleOpenCreate}
      />

      <ClientStats clients={allClientsForStats} />

      <ClientFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        sortBy={sortBy}
        setSortBy={handleSortByChange}
        total={filteredClients.length}
      />

      <ClientTable
        clients={filteredClients}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onView={handleView}
        canManage={isAdmin}
      />

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        limit={pagination.limit}
        onPageChange={setPage}
      />

      <ClientModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClient(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingClient}
        loading={submitting}
      />

      <ClientDetailsModal
        open={detailsOpen}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedClient(null);
        }}
        client={selectedClient}
        loading={detailsLoading}
        onEdit={() => {
          if (selectedClient) handleEdit(selectedClient);
        }}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        title="Delete Client"
        description="This action cannot be undone. You are about to permanently remove this client."
        itemName={
          clientToDelete
            ? `${clientToDelete?.name} (${clientToDelete?.companyName})`
            : ""
        }
        onClose={() => {
          setDeleteModalOpen(false);
          setClientToDelete(null);
        }}
        onConfirm={confirmDeleteClient}
      />
    </div>
  );
}
