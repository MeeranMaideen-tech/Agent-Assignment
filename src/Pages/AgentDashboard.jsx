// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ContactTable from '../Components/ContactTable';

// const AgentDashboard = () => {
//   const [contacts, setContacts] = useState([]);
//   const [message, setMessage] = useState('');

//   const fetchContacts = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await axios.get('/api/contacts/assigned', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setContacts(res.data);
//     } catch (err) {
//       setMessage('Failed to load assigned contacts.');
//     }
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>

//       {message && <p className="text-red-500">{message}</p>}

//       {contacts.length > 0 ? (
//         <ContactTable contacts={contacts} />
//       ) : (
//         <p className="text-gray-600">No contacts assigned to you yet.</p>
//       )}
//     </div>
//   );
// };

// export default AgentDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactTable from '../Components/ContactTable';

const AgentDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [agentName, setAgentName] = useState('');

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');

      // Decode token (you could do this server-side too)
      const payload = JSON.parse(atob(token.split('.')[1]));
      setAgentName(payload.name || 'Agent');

      const res = await axios.get('/api/contacts/assigned', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContacts(res.data);
    } catch (err) {
      setMessage('Failed to load assigned contacts.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          👋 Welcome, {agentName || 'Agent'}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <p className="text-sm text-gray-600">
          You have <strong>{contacts.length}</strong> assigned leads.
        </p>
      </div>

      {message && (
        <p className="text-red-500 bg-white p-3 rounded-md shadow">{message}</p>
      )}

      {contacts.length > 0 ? (
        <ContactTable contacts={contacts} />
      ) : (
        <p className="text-gray-600 mt-4">No contacts assigned to you yet.</p>
      )}
    </div>
  );
};

export default AgentDashboard;
