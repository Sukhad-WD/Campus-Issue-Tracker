import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Issue } from '../types';
import { Search, Clock, MapPin, AlertCircle } from 'lucide-react';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/issues', {
        params: { keyword, category, status }
      });
      setIssues(data);
    } catch (err) {
      console.error('Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [category, status]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchIssues();
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Open': return 'status-open';
      case 'In Progress': return 'status-progress';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Your Reported Issues</h1>
        <div className="filters">
          <form className="search-box" onSubmit={handleSearch}>
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search issues..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </form>
          <div className="select-filters">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Wi-Fi">Wi-Fi</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Lost Items">Lost Items</option>
              <option value="Hostel">Hostel</option>
              <option value="Library">Library</option>
              <option value="Other">Other</option>
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="loading-state">Loading issues...</div>
      ) : issues.length === 0 ? (
        <div className="empty-state card">
          <AlertCircle size={48} />
          <p>No issues found. Start by reporting a new one!</p>
        </div>
      ) : (
        <div className="issues-grid">
          {issues.map(issue => (
            <div key={issue._id} className="issue-card card">
              <div className="issue-header">
                <span className={`status-badge ${getStatusClass(issue.status)}`}>
                  {issue.status}
                </span>
                <span className={`priority-tag ${getPriorityClass(issue.priority)}`}>
                  {issue.priority} Priority
                </span>
              </div>
              <h3>{issue.title}</h3>
              <p className="issue-desc">{issue.description}</p>
              <div className="issue-meta">
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{issue.location}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="issue-footer">
                <span className="category-tag">{issue.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
