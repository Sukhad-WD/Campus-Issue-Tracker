import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Form.css';

const ReportIssue: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Wi-Fi',
    description: '',
    location: '',
    priority: 'Medium',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/issues', formData);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card card">
        <h2>Report New Issue</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              name="title" 
              placeholder="e.g., Wi-Fi not working in Library" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Category</label>
              <select name="category" onChange={handleChange}>
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Lost Items">Lost Items</option>
                <option value="Hostel">Hostel</option>
                <option value="Library">Library</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select name="priority" onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input 
              name="location" 
              placeholder="e.g., Block A, 2nd Floor" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              rows={4} 
              placeholder="Provide more details about the issue..." 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input 
              name="imageUrl" 
              placeholder="https://example.com/image.jpg" 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssue;
