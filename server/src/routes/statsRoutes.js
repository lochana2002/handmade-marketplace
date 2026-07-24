const express = require("express");
const router = express.Router();

const {
  getMarketplaceStats,
} = require("../controllers/statsController");

router.get("/", getMarketplaceStats);

module.exports = router;