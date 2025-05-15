const express = require('express');
const router = express.Router();

const {
  uploadContacts,
  getAssignedContacts,
  getUnassignedContacts,
  assignContactToAgent,
} = require('../controllers/contactController');

const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// 🧾 Upload and auto-distribute contacts (Admin only)
router.post('/upload', verifyToken, isAdmin, upload.single('file'), uploadContacts);

// 📋 Agent - see assigned contacts
router.get('/assigned', verifyToken, getAssignedContacts);

// 👀 Admin - view unassigned leads
router.get('/unassigned', verifyToken, isAdmin, getUnassignedContacts);

// 🛠️ Admin - manually assign a contact
router.patch('/assign/:id', verifyToken, isAdmin, assignContactToAgent);

module.exports = router;
