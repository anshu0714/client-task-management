import { useAuth } from "../../features/auth/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <div>
        <h1 className="font-semibold">Client Task Management</h1>
      </div>

      <div className="flex items-center gap-4">
        <span>{user?.name}</span>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
