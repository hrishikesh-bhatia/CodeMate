import { useState, useEffect } from "react";

function ChatSidebar({ socketRef, roomId, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!socketRef) return;

    socketRef.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.off("receive-message");
    };
  }, [socketRef]);

  const sendMessage = () => {
    if (input.trim()) {
      const msg = { roomId, username, message: input };
      socketRef.emit("send-message", msg);
      setMessages((prev) => [...prev, { ...msg, timestamp: new Date() }]);
      setInput("");
    }
  };

  return (
    <div className="chat-sidebar bg-gray-900 text-white p-4 w-80 h-full overflow-y-auto border-l border-gray-700">
      <h2 className="text-lg font-semibold mb-2">💬 Chat</h2>
      <div className="messages space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div key={i}>
            <span className="font-bold">{msg.username}:</span> {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow p-2 bg-gray-800 text-white rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}


export default ChatSidebar;
