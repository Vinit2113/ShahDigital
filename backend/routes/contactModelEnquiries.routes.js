const express = require("express");
const verifyToken = require("../utils/verifyToken");
const onlyAdmins = require("../middleware/requireAdmin.middleware");
const contactModel = require("../controllers/admin/contactModel.controller");
const listEnquiries = require("../controllers/admin/listEnquiries.controller");
const updateEnquiryStatus = require("../controllers/admin/updateEnquiryStatus.controller");
const { adminWriteLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/submit", contactModel);

router.post("/list", verifyToken, onlyAdmins, listEnquiries);
router.post(
  "/update-status/:enquiry_id",
  adminWriteLimiter,
  verifyToken,
  onlyAdmins,
  updateEnquiryStatus,
);

module.exports = router;
