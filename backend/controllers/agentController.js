const User = require('../models/User');

// 🧾 GET /api/agents/pending
exports.getPendingAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent', isApproved: false });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pending agents' });
  }
};

// ✅ GET /api/agents/approved
exports.getApprovedAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent', isApproved: true });
    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching approved agents' });
  }
};

// 🔓 PATCH /api/agents/approve/:id
exports.approveAgent = async (req, res) => {
  try {
    const agentId = req.params.id;

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent') {
      return res.status(404).json({ message: 'Agent not found' });
    }

    agent.isApproved = true;
    await agent.save();

    res.status(200).json({ message: 'Agent approved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving agent' });
  }
};
