const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',   // Reference to agent (User model)
      default: null, // null means unassigned
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
