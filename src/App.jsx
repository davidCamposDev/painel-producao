import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProgressoTurno from "./pages/ProgressoTurno";
import Apontamento from "./pages/Apontamento";
import Login from "./pages/login";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

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
      </Layout>
    </BrowserRouter>
  );
}

export default App;
