import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomId.trim()) return alert("Please enter a valid Room ID");
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 shadow-md p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-green-400 mb-8">Student Panel</h2>
        <nav className="space-y-4">
          <button className="text-left w-full text-gray-300 hover:text-green-400">Join Room</button>
          <button className="text-left w-full text-gray-300 hover:text-green-400">My Sessions</button>
          <button className="text-left w-full text-gray-300 hover:text-green-400">Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-4">
        <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Join a Room 🎓</h1>
          <p className="text-gray-400 mb-6">Enter the Room ID shared by your teacher to join the session.</p>
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            ✅ Join Room
          </button>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
