import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useSocket(roomId) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000"); // or your deployed server URL

    socketRef.current.emit("join-room", roomId);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  return socketRef;
}
