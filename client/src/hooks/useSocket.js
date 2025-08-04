// ✅ useSocket.js (clean version)
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function useSocket(roomId) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://codemate-backend-ju5r.onrender.com");
    setSocket(newSocket);

    newSocket.emit("join-room", roomId);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId]);

  return socket;
}
