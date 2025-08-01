const express = require("express");
const  runCode  = require("../controllers/codeController.js") ;

const router = express.Router();

router.post("/run", runCode);

module.exports = router;
