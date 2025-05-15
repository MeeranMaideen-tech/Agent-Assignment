import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UnassignedContactRow from '../Components/UnContactRow';

const ManualAssign = () => {
  const [contacts, setContacts] = useState([]);
  const [agents, setAgents] = useState([]);

  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const [contactRes, agentRes] = await Promise.all([
        axios.get('/api/contacts/unassigned', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('/api/agents/approved', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setContacts(contactRes.data);
      setAgents(agentRes.data);
    } catch (err) {
      console.error('Error loading data', err);
    }
  };

  const refreshContacts = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Manual Assignment</h1>

      {contacts.length === 0 ? (
        <p className="text-gray-600">All contacts have been assigned.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Notes</th>
              <th className="py-2 px-4 text-left">Assign To</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <UnassignedContactRow
                key={contact._id}
                contact={contact}
                agents={agents}
                onAssigned={refreshContacts}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManualAssign;
