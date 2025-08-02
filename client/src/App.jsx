import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import AuthPage from "./pages/Auth";
import Index from "./pages/Index";


function App() {
  return (
    // <h1 className="bg-purple-700">Checking if it is there</h1>
    <Routes>
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/Landing" element={<Index />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
