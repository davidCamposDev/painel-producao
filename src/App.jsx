import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import ProgressoTurno from "./pages/ProgressoTurno";
import Apontamento from "./pages/apontamento";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* rota inicial */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login */}
        <Route path="/login" element={<Login />} />

        {/* protegidas */}
        <Route
          path="/ProgressoTurno"
          element={
            <PrivateRoute>
              <ProgressoTurno />
            </PrivateRoute>
          }
        />

        <Route
          path="/apontamento"
          element={
            <PrivateRoute>
              <Apontamento />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
