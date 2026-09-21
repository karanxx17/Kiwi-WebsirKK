const express = require("express");
const {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  followEmployee,
} = require("../controllers/employeeController");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/:id/follow", followEmployee); // Public for guests
// Protected admin routes
router.post("/", authMiddleware, createEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;
