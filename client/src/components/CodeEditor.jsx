import { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import OutputBox from "./OutputBox";




function CodeEditor({ socketRef, roomId }) {
  const editorRef = useRef(null);
  const [time, setTime] = useState(null);
  const [memory, setMemory] = useState(null);

  const [code, setCode] = useState("// Start coding...");
  const [stdin, setStdin] = useState("");

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Listen for code changes from server
    socketRef.current.on("code-update", (incomingCode) => {
      if (incomingCode !== editorRef.current.getValue()) {
        editorRef.current.setValue(incomingCode);
      }
    });
  };

  const handleChange = (newCode) => {
    setCode(newCode);
    socketRef.current.emit("code-change", { roomId, code: newCode });
  };


  const [output, setOutput] = useState("");
const [languageId, setLanguageId] = useState(63); // 63 = JavaScript
const [loading, setLoading] = useState(false);

// const handleRunCode = async () => {
//   setLoading(true);
//   try {
//     socketRef.current.emit("run-code", {
//      code,
//     languageId,
//     roomId
//   });

//     // const { stdout, stderr, status } = response.data;
//     // const display = stdout || stderr || status.description || "No output";
//     // setOutput(display);
//   } catch (err) {
//     setOutput("Execution failed.");
//   }
//   setLoading(false);
// };

const handleRunCode = () => {
  console.log("🚀 Emitting 'run-code' with:", { code, languageId, roomId });
  setLoading(true);
  socketRef.current.emit("run-code", {
    code,
    languageId,
    stdin,
    roomId
  });
};


//   useEffect(() => {
//   if (!socketRef.current) return;

//   socketRef.current.on("code-output", ({ output }) => {
//     console.log("📥 Received 'code-output':", output);
//     setOutput(output);
//     setLoading(false);
//   });

//   return () => {
//     socketRef.current.off("code-output");
//   };
// }, []);


//   useEffect(() => {
  
//   const socket = socketRef.current;
//   if (!socket)  {
//     console.log("YOYOYO");
//     return;
//   }

//   const handleOutput = ({ output }) => {
//     console.log("📥 Received 'code-output':", output);
//     setOutput(output);
//     setLoading(false);
//   };

//   socket.on("code-output", handleOutput);

//   return () => {
//     socket.off("code-output", handleOutput); // ✅ precise cleanup
//   };
// }, []);


  useEffect(() => {
  const interval = setInterval(() => {
    const socket = socketRef.current;
    if (socket) {
      socket.on("code-output", handleOutput);
      clearInterval(interval);
    }
  }, 100);

  const handleOutput = ({ output }) => {
    console.log("📥 Received 'code-output':", output);
    setOutput(output);
    setTime(time);
    setMemory(memory);
    setLoading(false);
  };

  return () => {
    const socket = socketRef.current;
    if (socket) socket.off("code-output", handleOutput);
    clearInterval(interval);
  };
}, []);


  return (
    <>
    <div className="flex items-center gap-4 mb-2">
  <select
    className="p-2 rounded bg-gray-800 text-white"
    value={languageId}
    onChange={(e) => setLanguageId(parseInt(e.target.value))}
  >
    <option value="63">JavaScript</option>
    <option value="71">Python</option>
    <option value="54">C++</option>
    <option value="62">Java</option>
  </select>

   <textarea
  className="w-full p-2 mt-2 rounded bg-gray-900 text-white border border-gray-700 h-24"
  placeholder="Enter custom input (stdin)..."
  value={stdin}
  onChange={(e) => setStdin(e.target.value)}
></textarea>



  <button
    onClick={handleRunCode}
    className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
    disabled={loading}
  >
    {loading ? "Running..." : "Run Code"}
  </button>
</div>


    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue={code}
      onMount={handleEditorDidMount}
      onChange={handleChange}
      theme="vs-dark"
    />
     
    <OutputBox output={output} time={time} memory={memory} />


    </>
    
  );
}

export default CodeEditor;
