// import React from 'react';
// import AgentForm from '../Components/AgentForm';
// import UploadForm from '../Components/UploadForm';
// import PendingAgents from '../Components/PendingAgents';

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Add New Agent</h2>
//           <AgentForm />
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Upload Leads (CSV)</h2>
//           <UploadForm />
//         </div>
//       </div>

//       <div className="mt-8 bg-white p-4 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Pending Agent Approvals</h2>
//         <PendingAgents />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';
import AgentForm from '../Components/AgentForm';
import UploadForm from '../Components/UploadForm';
import PendingAgents from '../Components/PendingAgents';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">👑 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">Add New Agent</h2>
          <AgentForm />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-blue-700">Upload Leads</h2>
          <UploadForm />
        </div>
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">Pending Agent Approvals</h2>
        <PendingAgents />
      </div>
    </div>
  );
};

export default AdminDashboard;
