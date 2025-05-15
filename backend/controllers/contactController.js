const Contact = require('../models/Contact');
const User = require('../models/User');
const XLSX = require('xlsx');

// 🧾 Upload and auto-distribute contacts
exports.uploadContacts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Validate format
    const isValid = rawData.every(row =>
      row.FirstName && row.Phone && row.Notes !== undefined
    );
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid file format' });
    }

    // Get 5 approved agents
    const agents = await User.find({ role: 'agent', isApproved: true }).limit(5);
    if (agents.length < 1) {
      return res.status(400).json({ message: 'No approved agents available' });
    }

    // Distribute contacts evenly
    const distributedContacts = rawData.map((row, index) => {
      const agent = agents[index % agents.length];
      return {
        firstName: row.FirstName,
        phone: row.Phone.toString(),
        notes: row.Notes,
        agentId: agent._id,
      };
    });

    await Contact.insertMany(distributedContacts);

    return res.status(200).json({ message: 'Contacts uploaded and distributed successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Server error during upload' });
  }
};

// 📋 Agent - get assigned contacts
exports.getAssignedContacts = async (req, res) => {
  try {
    const agentId = req.user.userId;
    const contacts = await Contact.find({ agentId });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Get assigned contacts error:', err);
    res.status(500).json({ message: 'Failed to fetch assigned contacts' });
  }
};

// 👀 Admin - get unassigned contacts
exports.getUnassignedContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ agentId: null });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Get unassigned contacts error:', err);
    res.status(500).json({ message: 'Failed to fetch unassigned contacts' });
  }
};

// 🛠️ Admin - manually assign a contact
exports.assignContactToAgent = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { agentId } = req.body;

    const agent = await User.findById(agentId);
    if (!agent || agent.role !== 'agent' || !agent.isApproved) {
      return res.status(400).json({ message: 'Invalid or unapproved agent' });
    }

    await Contact.findByIdAndUpdate(contactId, { agentId });
    res.status(200).json({ message: 'Contact assigned to agent successfully' });
  } catch (err) {
    console.error('Assign contact error:', err);
    res.status(500).json({ message: 'Failed to assign contact' });
  }
};
