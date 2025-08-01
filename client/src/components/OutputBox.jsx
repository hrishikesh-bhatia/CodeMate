function OutputBox({ output, time, memory }) {
  return (
    <div className="bg-black text-green-400 p-4 rounded-md mt-4 h-56 overflow-auto text-sm">
      <pre className="whitespace-pre-wrap">{output}</pre>
      {time && memory && (
        <div className="text-gray-400 mt-2 text-xs">
          ⏱ Execution Time: {time}s | 💾 Memory: {memory} KB
        </div>
      )}
    </div>
  );
}

export default OutputBox;
