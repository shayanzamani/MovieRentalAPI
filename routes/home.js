const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Here is the service for genres");
});

module.exports = router;
