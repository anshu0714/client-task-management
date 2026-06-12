import { useEffect, useState } from "react";

import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import Button from "../../../shared/components/Button";

import {
  getClientsApi,
  createClientApi,
  updateClientApi,
  deleteClientApi,
} from "../services/client.api";

import { showError, showSuccess } from "../../../shared/utils/toast";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [editingClient, setEditingClient] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      companyName: "",
      address: "",
    });

    setEditingClient(null);
  };

  const fetchClients = async () => {
    try {
      const res = await getClientsApi();

      setClients(res.data.clients || []);
    } catch (error) {
      showError(error?.response?.data?.message || "Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchClients();
    };

    void load();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (client) => {
    setEditingClient(client);

    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      companyName: client.companyName,
      address: client.address,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (editingClient) {
        await updateClientApi(editingClient._id, form);

        showSuccess("Client updated");
      } else {
        await createClientApi(form);

        showSuccess("Client created");
      }

      resetForm();

      await fetchClients();
    } catch (error) {
      showError(error?.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this client?");

    if (!confirmed) return;

    try {
      await deleteClientApi(id);

      showSuccess("Client deleted");

      fetchClients();
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
          {editingClient ? "Edit Client" : "Add Client"}
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="companyName"
            placeholder="Company Name"
            value={form.companyName}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-3 rounded md:col-span-2"
          />

          <div className="md:col-span-2 flex gap-3">
            <Button type="submit" loading={submitting}>
              {editingClient ? "Update Client" : "Create Client"}
            </Button>

            {editingClient && (
              <button
                type="button"
                onClick={resetForm}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Clients</h2>
        </div>

        {!clients.length ? (
          <div className="p-6">
            <EmptyState title="No clients found" />
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Company</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="border-b">
                  <td className="p-4">{client.name}</td>

                  <td className="p-4">{client.companyName}</td>

                  <td className="p-4">{client.email}</td>

                  <td className="p-4">{client.phone}</td>

                  <td className="p-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(client)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(client._id)}
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
