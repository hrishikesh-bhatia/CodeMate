import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function Home() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuid();
    navigate(`/room/${newRoomId}`);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to CodeMate</h1>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Create Room
      </button>
    </div>
  );
}

export default Home;
