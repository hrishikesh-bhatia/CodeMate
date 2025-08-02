import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import AuthPage from "./pages/Auth";
import Index from "./pages/Index";
import ProtectedRoute from "./contexts/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/" element={<Index />} />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room/:roomId"
        element={
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
