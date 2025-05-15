import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      setSuccess(false);
      return;
    }

    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (!allowedTypes.includes(file.type)) {
      setMessage('Invalid file type. Please upload a .csv, .xlsx, or .xls file.');
      setSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('/api/contacts/upload', formData, {

        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message || 'File uploaded and tasks assigned successfully.');
      setSuccess(true);
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'File upload failed.');
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

      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border rounded-lg bg-white"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
      >
        Upload and Distribute
      </button>
    </form>
  );
};

export default UploadForm;
