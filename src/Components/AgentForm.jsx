import React, { useState } from 'react';
import axios from 'axios';

const AgentForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/register', {
        ...form,
        role: 'agent',        // Force agent role
      });

      setMessage(res.data.message || 'Agent created successfully.');
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', password: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create agent.');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div
          className={`text-sm px-4 py-2 rounded ${
            success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

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

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
      >
        Add Agent
      </button>
    </form>
  );
};

export default AgentForm;
