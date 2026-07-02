import React, { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Pet Catalog', to: '/catalog' },
];

export default function PublicLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, user, role, logout } = useAuthStore();
  const { themeMode, toggleTheme } = useUIStore();
  const [expanded, setExpanded] = useState(false);

  // Logout the user and redirect to login page
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Figure out which dashboard to go to based on user role
  const getDashboardPath = () => {
    if (role === 'Admin') return '/admin/dashboard';
    if (role === 'Supplier') return '/supplier/dashboard';
    return '/customer/profile'; // Customers don't have a big dashboard, just a profile
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-body" >
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm" expanded={expanded}  sticky="top" >
        <div className="container"  fluid>
          <Link className="navbar-brand text-primary fw-bolder d-flex align-items-center gap-2" to="/" >
            <i className="bi bi-suit-heart-fill" ></i> PetShop
          </Link>
          
          <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#public-navbar-nav" aria-controls="public-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")}>
            <span className="navbar-toggler-icon" ></span>
          </button>
          
          <div className="collapse navbar-collapse"  id="public-navbar-nav">
            <div className="navbar-nav me-auto" >
              {navLinks.map((l) => (
                <Link to={l.to} key={l.to} onClick={() => setExpanded(false)} className="nav-link fw-medium">
                  {l.label}
                </Link>
              ))}
            </div>

            <div className="d-flex align-items-center gap-3 mt-3 mt-md-0" >
              {/* Theme Toggle */}
              <button className="btn btn-link p-0 text-body"  onClick={toggleTheme}>
                {themeMode === 'dark' ? <i className="bi bi-sun-fill fs-5" ></i> : <i className="bi bi-moon-stars-fill fs-5" ></i>}
              </button>

              {/* User Actions */}
              {isAuthenticated ? (
                <div className="dropdown"  >
                  <button className="rounded-circle d-flex align-items-center justify-content-center p-0" type="button"  id="dropdown-user"  style={{ width: '36px', height: '36px' }} data-bs-toggle="dropdown" aria-expanded="false">
                    {user?.username?.[0]?.toUpperCase()}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" >
                    <li><button className="dropdown-item" type="button"  onClick={() => { navigate(getDashboardPath()); setExpanded(false); }}>
                      <i className="bi bi-speedometer2 me-2" ></i> Dashboard
                    </button></li>
                    <li><hr className="dropdown-divider"  /></li>
                    <li><button className="dropdown-item text-danger" type="button" onClick={handleLogout} >
                      <i className="bi bi-box-arrow-right me-2" ></i> Logout
                    </button></li>
                  </ul>
                </div>
              ) : (
                <div className="d-flex gap-2" >
                  <button className="btn btn-outline-primary btn-sm"  onClick={() => { navigate('/login'); setExpanded(false); }}>Login</button>
                  <button className="btn btn-primary btn-sm"  onClick={() => { navigate('/register'); setExpanded(false); }}>Register</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Actual Page Content goes here! */}
      <main className="flex-grow-1" >
        <Outlet />
      </main>
    </div>
  );
}