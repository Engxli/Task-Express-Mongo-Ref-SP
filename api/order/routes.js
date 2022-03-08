const express = require("express");

const { checkout } = require("./controllers");

const router = express.Router();

router.post("/checkout", checkout);

module.exports = router;
