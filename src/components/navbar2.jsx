import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }

  const links = [
    { label: "Dashboard", path: "/ProgressoTurno" },
    { label: "Apontamento", path: "/apontamento" },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <div className="flex gap-1">
        {links.map(({ label, path }) => {
          const ativo = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                ativo
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <button
        onClick={logout}
        className="px-4 py-1.5 rounded-md text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
      >
        Sair
      </button>
    </div>
  );
}
