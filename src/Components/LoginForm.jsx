import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/login', form);

      // Save JWT in localStorage
      localStorage.setItem('token', res.data.token);

      // Redirect based on role
      const role = res.data.user.role;
      const isApproved = res.data.user.isApproved;

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'agent' && isApproved) {
        navigate('/dashboard');
      } else {
        setMessage('Your agent account is pending approval.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {message && (
        <div className="text-sm mb-4 bg-red-100 text-red-700 px-4 py-2 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
