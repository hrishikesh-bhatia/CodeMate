import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import AuthPage from "./pages/Auth";



function App() {
  return (
    <Routes>
      <Route path="/Auth" element={<AuthPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default App;
