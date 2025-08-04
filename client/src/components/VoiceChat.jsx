import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

function VoiceChat({ socket, roomId }) {
  const [myPeer, setMyPeer] = useState(null);
  const [stream, setStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);

  const peersRef = useRef({});
  const audioElementsRef = useRef({});

  useEffect(() => {
    if (!socket) return;

    // ✅ Create Peer first
    const peer = new Peer(undefined, {
      host: "https://codemate-backend-ju5r.onrender.com",
      port: 443,
      path: "/voice",
      secure: true,
    });

    setMyPeer(peer);
    console.log("🎯 Peer object created:", peer);

    // ✅ Attach listeners immediately
    peer.on("open", (id) => {
      console.log("🆔 Peer open with ID:", id);
      socket.emit("join-voice", id, roomId);
    });

    peer.on("error", (err) => {
      console.error("❌ Peer error:", err);
    });

    peer.on("call", (call) => {
      if (!stream) {
        console.warn("⚠️ No local stream to answer call");
        return;
      }

      call.answer(stream);

      call.on("stream", (remoteStream) => {
        console.log("🔊 Received remote stream:", remoteStream);
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.play();

        audioElementsRef.current[call.peer] = audio;
        peersRef.current[call.peer] = call;
      });

      call.on("close", () => {
        if (audioElementsRef.current[call.peer]) {
          audioElementsRef.current[call.peer].pause();
          delete audioElementsRef.current[call.peer];
        }
        delete peersRef.current[call.peer];
      });

      call.on("error", (err) => {
        console.error("⚠️ Call error:", err);
      });
    });

    socket.onAny((event, ...args) => {
      console.log("📡 Incoming socket event:", event, args);
    });

    socket.on("user-joined-voice", (userId) => {
      if (peersRef.current[userId] || !stream) return;

      const call = peer.call(userId, stream);
      console.log("📞 Calling peer:", userId);

      call.on("stream", (remoteStream) => {
        const audio = new Audio();
        audio.srcObject = remoteStream;
        audio.play();

        audioElementsRef.current[userId] = audio;
        peersRef.current[userId] = call;
      });

      call.on("close", () => {
        if (audioElementsRef.current[userId]) {
          audioElementsRef.current[userId].pause();
          delete audioElementsRef.current[userId];
        }
        delete peersRef.current[userId];
      });

      call.on("error", (err) => {
        console.error("⚠️ Call error with", userId, ":", err);
      });
    });

    socket.on("user-left-voice", (userId) => {
      if (peersRef.current[userId]) {
        peersRef.current[userId].close();
      }
    });

    // ✅ Get mic access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        console.log("🎙️ Mic access granted");
      })
      .catch((err) => {
        console.error("❌ Mic access failed:", err.name, err.message);
      });

    return () => {
      socket.off("user-joined-voice");
      socket.off("user-left-voice");
      peer.destroy();
      Object.values(audioElementsRef.current).forEach(audio => audio.pause());
    };
  }, [socket, roomId]);

  // 🎙️ Toggle mic on/off
  const toggleMic = async () => {
    if (isMicOn) {
      const audioTrack = stream?.getAudioTracks()[0];
      if (audioTrack) audioTrack.stop();
      setStream(null);
      setIsMicOn(false);
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const newTrack = newStream.getAudioTracks()[0];
        setStream(newStream);
        setIsMicOn(true);

        Object.values(peersRef.current).forEach((call) => {
          const sender = call.peerConnection
            .getSenders()
            .find((s) => s.track?.kind === "audio");

          if (sender) {
            sender.replaceTrack(newTrack);
          } else {
            call.peerConnection.addTrack(newTrack, newStream);
          }
        });
      } catch (err) {
        console.error("❌ Error turning mic back on:", err);
      }
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleMic}
        className={`px-3 py-1 rounded text-white text-xs ${isMicOn ? "bg-green-600" : "bg-red-600"} hover:opacity-80`}
      >
        {isMicOn ? "Mic On" : "Mic Off"}
      </button>
    </div>
  );
}

export default VoiceChat;
