import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingAgents = () => {
  const [agents, setAgents] = useState([]);
  const [message, setMessage] = useState('');

  const fetchPendingAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/agents/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data);
    } catch (err) {
      setMessage('Failed to load pending agents.');
    }
  };

  const handleApprove = async (agentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/agents/approve/${agentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage('Agent approved.');
      fetchPendingAgents(); // Refresh list
    } catch (err) {
      setMessage('Failed to approve agent.');
    }
  };

  useEffect(() => {
    fetchPendingAgents();
  }, []);

  return (
    <div>
      {message && (
        <div className="mb-4 text-sm text-blue-600">{message}</div>
      )}

      {agents.length === 0 ? (
        <p className="text-gray-600">No pending agents.</p>
      ) : (
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Email</th>
              <th className="py-2 px-3 text-left">Phone</th>
              <th className="py-2 px-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id} className="border-t">
                <td className="py-2 px-3">{agent.name}</td>
                <td className="py-2 px-3">{agent.email}</td>
                <td className="py-2 px-3">{agent.phone}</td>
                <td className="py-2 px-3 text-center">
                  <button
                    onClick={() => handleApprove(agent._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingAgents;
