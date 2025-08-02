const axios = require("axios");
require("dotenv").config({ path: "../.env" });

const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const runCode = async (req, res) => {
  const { code, languageId, stdin } = req.body;

  try {
    const response = await axios.post(
      JUDGE0_URL,
      {
        source_code: code,
        language_id: languageId,
        stdin: stdin || ""
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        }
      }
    );

    const { stdout, stderr, compile_output, status, time, memory } = response.data;

    // 🧠 Determine output and error
    const hasError = status?.description !== "Accepted";
    const errorMessage = compile_output || stderr || null;

    res.json({
      output: stdout || "",
      error: hasError ? errorMessage : null,
      status: hasError ? "error" : "success",
      time,
      memory
    });
  } catch (err) {
    console.error("Judge0 Error:", err.response?.data || err.message);
    res.status(500).json({
      output: "",
      error: err.response?.data?.message || "Code execution failed.",
      status: "error",
      time: null,
      memory: null
    });
  }
};

module.exports = runCode;
