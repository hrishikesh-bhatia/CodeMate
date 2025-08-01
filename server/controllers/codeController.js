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
        //process.env.JUDGE0_API_KEY,
      }
    );

    const { stdout, stderr, status } = response.data;

    res.json({
      stdout,
      stderr,
      status,
    });
  } catch (err) {
    console.error("Judge0 Error:", err.response?.data || err.message);
  res.status(500).json({ error: err.response?.data || "Code execution failed." });
    // console.error("Judge0 Error:", err.message);
    // res.status(500).json({ error: "Code execution failed." });
  }
};

module.exports = runCode