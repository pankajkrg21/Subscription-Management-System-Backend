const express = require("express");
const router = express.Router();

const {
  getAllSubscriptions,
  getSingleSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription
} = require("../controllers/subscriptionController");


router.get("/", getAllSubscriptions);         
router.get("/:id", getSingleSubscription);    
router.post("/", createSubscription);         
router.put("/:id", updateSubscription);       
router.delete("/:id", deleteSubscription);   

module.exports = router;
