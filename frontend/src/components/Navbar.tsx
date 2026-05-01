import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, LayoutDashboard, PlusCircle, ShieldCheck, User as UserIcon } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="site-header">
      <div className="main-title">
        <Link to="/" className="heading-link">
          Campus Issue Tracker
        </Link>
      </div>
      
      <nav className="top-navbar">
        <div className="nav-box">
          <Link to="/" className="nav-link" title="Dashboard">
            <LayoutDashboard size={20} />
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link to="/report" className="nav-link" title="Report Issue">
            <PlusCircle size={20} />
            <span className="nav-text">Report</span>
          </Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="nav-link admin-link" title="Admin Panel">
              <ShieldCheck size={20} />
              <span className="nav-text">Admin</span>
            </Link>
          )}
          <div className="nav-user-section">
            <div className="user-icon-circle">
              <UserIcon size={18} />
            </div>
            <span className="nav-username">{user.username}</span>
            <button onClick={handleLogout} className="logout-button" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
