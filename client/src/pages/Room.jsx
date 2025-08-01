import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import CodeEditor from "../components/CodeEditor";

function Room() {
  const { roomId } = useParams();
  const socketRef = useSocket(roomId);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Room ID: {roomId}</h2>
      <CodeEditor socketRef={socketRef} roomId={roomId} />
    </div>
  );
}

export default Room;
