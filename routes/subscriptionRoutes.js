const express = require("express");
const router = express.Router();

const {
  getAllSubscriptions,
  getSingleSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription
} = require("../controllers/subscriptionController");

// CRUD Routes

router.get("/", getAllSubscriptions);          // Read all
router.get("/:id", getSingleSubscription);    // Read single
router.post("/", createSubscription);         // Create
router.put("/:id", updateSubscription);       // Update
router.delete("/:id", deleteSubscription);    // Delete

module.exports = router;
