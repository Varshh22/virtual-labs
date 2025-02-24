import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const styles = {
    sidebar: {
      width: '250px',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'var(--white)',
      padding: '24px',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRadius: '24px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    profileSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '40px',
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      marginBottom: '12px',
      objectFit: 'cover',
    },
    name: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'var(--text-primary)',
      marginBottom: '4px',
    },
    department: {
      fontSize: '14px',
      color: 'var(--secondary-color)',
    },
    nav: {
      width: '100%',
    },
    navItem: {
      marginBottom: '20px',
    },
    link: {
      textDecoration: 'none',
      color: 'var(--secondary-color)',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      width: '100%',
      transition: 'all 0.2s ease',
    },
    activeLink: {
      color: 'var(--primary-color)',
      backgroundColor: 'rgba(0, 133, 255, 0.1)',
    },
    bottomSection: {
      borderTop: '1px solid var(--gray-light)',
      paddingTop: '20px',
      width: '100%',
      marginTop: 'auto',
    },
    logoutButton: {
      color: '#FF4D4D',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '12px 16px',
      width: '100%',
      fontSize: '16px',
    },
  };

  // ✅ Ensure active selection works correctly (fixes both being active)
  const isActive = (path) => location.pathname === path;

  const getLinkStyle = (path) => ({
    ...styles.link,
    ...(isActive(path) ? styles.activeLink : {}),
  });

  return (
    <div style={styles.sidebar}>
      {/* Profile Section */}
      <div style={styles.profileSection}>
        <img src="/assets/Login.png" alt="Profile" style={styles.profileImage} />
        <h2 style={styles.name}>Aster Seawalker</h2>
        <span style={styles.department}>Computer Science</span>
      </div>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        <div style={styles.navItem}>
          <Link to="/dashboard" style={getLinkStyle('/dashboard')}>
            ⊞ Dashboard
          </Link>
        </div>
        <div style={styles.navItem}>
          <Link to="/my-experiments" style={getLinkStyle('/my-experiments')}>
            🔬 My Experiments
          </Link>
        </div>
        <div style={styles.navItem}>
          <Link to="/experiments" style={getLinkStyle('/experiments')}>
            🧪 All Experiments
          </Link>
        </div>
        <div style={styles.navItem}>
          <Link to="/todo" style={getLinkStyle('/todo')}>
            📅 To-do
          </Link>
        </div>
      </nav>

      {/* Bottom Section (Settings & Logout) */}
      <div style={styles.bottomSection}>
        <div style={styles.navItem}>
          <Link to="/settings" style={getLinkStyle('/settings')}>
            <Settings size={20} />
            Settings
          </Link>
        </div>
        <div style={styles.navItem}>
          <button style={styles.logoutButton} onClick={() => navigate('/')}>
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
