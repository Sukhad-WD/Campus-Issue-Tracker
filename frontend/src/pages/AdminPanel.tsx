import React, { useEffect, useState } from 'react';
import api from '../services/api';
import type { Issue } from '../types';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import '../styles/Admin.css';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllIssues = async () => {
    try {
      const { data } = await api.get('/issues');
      setIssues(data);
    } catch (err) {
      console.error('Admin fetch failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllIssues();
    }
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/issues/${id}/status`, { status });
      setIssues(issues.map(iss => iss._id === id ? { ...iss, status } as Issue : iss));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <h1>Admin Management Panel</h1>
      <p className="admin-subtitle">View and manage all reported campus issues</p>
      
      {loading ? (
        <p>Loading all issues...</p>
      ) : (
        <div className="admin-table-container card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Issue</th>
                <th>Reported By</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue._id}>
                  <td>
                    <div className="issue-info">
                      <span className="issue-title">{issue.title}</span>
                      <span className="issue-loc">{issue.location}</span>
                    </div>
                  </td>
                  <td>{issue.reportedBy.username}</td>
                  <td>{issue.category}</td>
                  <td>
                    <span className={`priority-tag priority-${issue.priority.toLowerCase()}`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${issue.status.toLowerCase().replace(' ', '-')}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={issue.status} 
                      onChange={(e) => updateStatus(issue._id, e.target.value)}
                      className="status-select"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
