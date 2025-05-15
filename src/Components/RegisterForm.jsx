// import React, { useState } from 'react';
// import axios from 'axios';

// const RegisterForm = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     role: 'agent',
//   });

//   const [message, setMessage] = useState('');
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('/api/register', form);
//       setMessage(res.data.message || 'Registered successfully.');
//       setSuccess(true);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Registration failed.');
//       setSuccess(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
//       <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

//       {message && (
//         <div
//           className={`text-sm px-4 py-2 mb-4 rounded ${
//             success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 text-sm font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Phone</label>
//           <input
//             type="text"
//             name="phone"
//             placeholder="+91..."
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             value={form.phone}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Password</label>
//           <input
//             type="password"
//             name="password"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Role</label>
//           <select
//             name="role"
//             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             value={form.role}
//             onChange={handleChange}
//           >
//             <option value="agent">Agent</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'agent',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/register', form);
      setMessage(res.data.message || 'Registered successfully.');
      setSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'agent',
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registration failed.');
      setSuccess(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      {message && (
        <div
          className={`text-sm px-4 py-2 mb-4 rounded ${
            success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {form.role === 'agent' && success
            ? 'Registered successfully. Please wait for admin approval before logging in.'
            : message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select
            name="role"
            className="w-full px-3 py-2 border rounded-lg"
            value={form.role}
            onChange={handleChange}
          >
            <option value="agent">Agent</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Register
        </button>
      </form>

      {success && (
        <div className="text-center mt-4">
          <button
            onClick={() => (window.location.href = '/login')}
            className="text-blue-600 hover:underline font-medium"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
