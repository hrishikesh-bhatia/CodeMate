import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import CodeEditor from "../components/CodeEditor";
import VoiceChat from "../components/VoiceChat";
import ChatSidebar from "../components/ChatSidebar";
const role = localStorage.getItem("role");
function Room() {
  const { roomId } = useParams();
  const socketRef = useSocket(roomId);
   console.log(role);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Room ID: {roomId}</h2>
      <VoiceChat socket={socketRef} roomId={roomId} />
      {/* <CodeEditor socketRef={socketRef} roomId={roomId} /> */}
      <div className="flex">
  <div className="flex-grow">
    {/* Your editor and controls */}
    <CodeEditor socketRef={socketRef} roomId={roomId} />
  </div>
  <ChatSidebar socketRef={socketRef} roomId={roomId} username={role} />
</div>

    </div>
  );
}

export default Room;
