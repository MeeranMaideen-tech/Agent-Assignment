const express = require('express');
const router = express.Router();
const {
  getPendingAgents,
  getApprovedAgents,
  approveAgent,
} = require('../controllers/agentController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// 🔐 Protected by admin auth
router.get('/pending', verifyToken, isAdmin, getPendingAgents);
router.get('/approved', verifyToken, isAdmin, getApprovedAgents);
router.patch('/approve/:id', verifyToken, isAdmin, approveAgent);

module.exports = router;
