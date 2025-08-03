import { useRef, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import OutputBox from "./OutputBox";

function CodeEditor({ socketRef, roomId }) {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const [code, setCode] = useState("// Start coding...");
  const [stdin, setStdin] = useState("");
  const [languageId, setLanguageId] = useState(63); // 63 = JavaScript
  const [output, setOutput] = useState("");
  const [time, setTime] = useState(null);
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(false);

  const decorationsRef = useRef({});

  // 🖊️ Editor mount handler
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Set initial code
    editor.setValue(code);

    // Emit cursor position
    editor.onDidChangeCursorPosition((e) => {
      const position = e.position;
      socketRef?.emit("cursor-change", {
        roomId,
        position,
        userId: socketRef.id,
      });
    });
  };

  // 📝 Code change handler
  const handleChange = (newCode) => {
    setCode(newCode);
    socketRef?.emit("code-change", { roomId, code: newCode });
  };

  // ▶️ Run code handler
  const handleRunCode = () => {
    setLoading(true);
    socketRef?.emit("run-code", {
      code,
      languageId,
      stdin,
      roomId,
    });
  };

  // 🔌 Socket listeners
  useEffect(() => {
    if (!socketRef) return;

    socketRef.emit("join-room", roomId);

    const handleCodeUpdate = (incomingCode) => {
      console.log("🔥 Received latest code:", incomingCode);
      if (incomingCode !== editorRef.current?.getValue()) {
        editorRef.current?.setValue(incomingCode);
      }
    };

    const handleOutput = ({ output, time, memory, error, status }) => {
      console.log("📥 Received 'code-output':", { output, error, status });

      if (status === "error" && error) {
        setOutput(`❌ Error:\n${error}`);
      } else {
        setOutput(output);
      }

      setTime(time);
      setMemory(memory);
      setLoading(false);
    };

    const handleCursorChange = ({ position, userId }) => {
      if (userId === socketRef.id || !editorRef.current || !monacoRef.current) return;

      const editor = editorRef.current;
      const monaco = monacoRef.current;

      // Remove old decoration
      if (decorationsRef.current[userId]) {
        editor.deltaDecorations(decorationsRef.current[userId], []);
      }

      // Add new decoration
      decorationsRef.current[userId] = editor.deltaDecorations([], [
        {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          options: {
            className: "remote-cursor",
            stickiness: monaco.editor.TrackedRangeStickiness.NeverGrowsWhenTypingAtEdges,
          },
        },
      ]);
    };

    socketRef.on("code-update", handleCodeUpdate);
    socketRef.on("code-output", handleOutput);
    socketRef.on("cursor-change", handleCursorChange);

    return () => {
      socketRef.off("code-update", handleCodeUpdate);
      socketRef.off("code-output", handleOutput);
      socketRef.off("cursor-change", handleCursorChange);
    };
  }, [socketRef]);

  // 🧠 Language mapping
  const getMonacoLanguage = (id) => {
    switch (id) {
      case 63: return "javascript";
      case 71: return "python";
      case 54: return "cpp";
      case 62: return "java";
      default: return "plaintext";
    }
  };

  return (
    <>
      {/* 🧠 Controls */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-4">
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

          <button
            onClick={handleRunCode}
            className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Running..." : "Run Code"}
          </button>
        </div>

        <textarea
          className="w-full p-2 rounded bg-gray-900 text-white border border-gray-700 h-24"
          placeholder="Enter custom input (stdin)..."
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
        ></textarea>
      </div>

      {/* 🧑‍💻 Monaco Editor */}
      <Editor
        height="90vh"
        language={getMonacoLanguage(languageId)}
        onMount={handleEditorDidMount}
        onChange={handleChange}
        theme="vs-dark"
      />

      {/* 📤 Output */}
      <OutputBox output={output} time={time} memory={memory} />
    </>
  );
}

export default CodeEditor;
