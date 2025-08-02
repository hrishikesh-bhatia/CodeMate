import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuid();
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-500 mb-8">CodeMate Admin</h2>
        <nav className="space-y-4">
          <button className="text-left w-full text-gray-300 hover:text-blue-400">Dashboard</button>
          <button className="text-left w-full text-gray-300 hover:text-blue-400">Rooms</button>
          <button className="text-left w-full text-gray-300 hover:text-blue-400">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to CodeMate 👋</h1>
          <p className="text-gray-400 mb-6">Create a new room to start collaborating instantly.</p>
          <button
            onClick={handleCreateRoom}
            className="bg-gray-950 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
             Create Room
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
