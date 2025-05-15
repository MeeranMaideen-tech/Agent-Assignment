import React, { useState } from 'react';
import axios from 'axios';

const UnassignedContactRow = ({ contact, agents, onAssigned }) => {
  const [selectedAgent, setSelectedAgent] = useState('');

  const assignContact = async () => {
    if (!selectedAgent) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/contacts/assign/${contact._id}`, {
        agentId: selectedAgent,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAssigned(); // Refresh parent list
    } catch (err) {
      console.error('Failed to assign contact', err);
    }
  };

  return (
    <tr className="border-t">
      <td className="py-2 px-4">{contact.firstName}</td>
      <td className="py-2 px-4">{contact.phone}</td>
      <td className="py-2 px-4">{contact.notes}</td>
      <td className="py-2 px-4 flex gap-2">
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
        <button
          onClick={assignContact}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Assign
        </button>
      </td>
    </tr>
  );
};

export default UnassignedContactRow;
