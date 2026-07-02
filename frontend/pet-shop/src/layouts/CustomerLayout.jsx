import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';

const navItems = [
  { label: 'My Profile', to: '/customer/profile', icon: 'bi-person' },
  { label: 'My Pets', to: '/customer/my-pets', icon: 'bi-suit-heart' },
  { label: 'My Transactions', to: '/customer/transactions', icon: 'bi-receipt' },
  { label: 'Browse Pets', to: '/catalog', icon: 'bi-search-heart' },
];

export default function CustomerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { themeMode, toggleTheme } = useUIStore();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const handleLogout = () => { 
    logout(); 
    navigate('/login'); 
  };
  const SidebarContent = () => (
    <div className="d-flex flex-column h-100 bg-body-tertiary border-end shadow-sm"  style={{ width: '280px' }}>
      <div className="p-3 border-bottom d-flex align-items-center gap-2 text-primary fw-bolder fs-5 text-nowrap" >
        <i className="bi bi-suit-heart-fill" ></i> PetShop
      </div>
      
      <div className="p-3 border-bottom d-flex align-items-center gap-3" >
        <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"  style={{ width: '40px', height: '40px' }}>
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <div className="flex-grow-1 overflow-hidden" >
          <div className="fw-bold text-truncate" >{user?.username}</div>
          <div className="text-muted text-truncate"  style={{ fontSize: '13px' }}>Customer</div>
        </div>
      </div>
      
      <div className="flex-grow-1 overflow-auto py-2" >
        <div className="navbar-nav flex-column px-2 gap-1" >
          {navItems.map(({ label, to, icon }) => {
            const active = location.pathname === to;
            return (
              <Link 
                to={to} 
                key={to}
                onClick={() => setShowMobileSidebar(false)}
                className={`d-flex align-items-center gap-3 px-3 py-2 rounded-2 ${active ? 'bg-primary text-white shadow-sm' : 'text-body hover-bg-light'}`}
                style={{ fontWeight: active ? '600' : '500' }}
              >
                <i className={` ${`bi ${icon} fs-5`}`.trim()} ></i> {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="p-2 border-top mt-auto bg-body" >
        <button className="btn btn-light w-100 d-flex align-items-center gap-2 text-danger justify-content-start"  onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" ></i> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="d-flex min-vh-100 bg-body" >
      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block sticky-top vh-100" >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Offcanvas) */}
      <div className={` ${`offcanvas offcanvas-start ${showMobileSidebar ? 'show' : ''}`}`.trim()}  style={{ width: '280px', visibility: showMobileSidebar ? 'visible' : 'hidden' }} tabIndex="-1">
        <SidebarContent />
      </div>
      {showMobileSidebar && <div className="offcanvas-backdrop fade show"  onClick={() => setShowMobileSidebar(false)}></div>}

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden min-vh-100" >
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom shadow-sm px-3 py-2 d-flex align-items-center justify-content-between" sticky="top" >
          <div className="d-flex align-items-center gap-2" >
            <button className="btn btn-link d-lg-none p-0 text-body"  onClick={() => setShowMobileSidebar(true)}>
              <i className="bi bi-list fs-3" ></i>
            </button>
            <h5 className="mb-0 fw-bold d-none d-sm-block" >Customer Portal</h5>
          </div>
          
          <div className="d-flex align-items-center gap-3" >
            <button className="btn btn-link p-0 text-body"  onClick={toggleTheme}>
              {themeMode === 'dark' ? <i className="bi bi-sun-fill fs-5" ></i> : <i className="bi bi-moon-stars-fill fs-5" ></i>}
            </button>
            
            <div className="dropdown d-none d-lg-block"  >
              <button className="btn border-0 shadow-none d-flex align-items-center gap-2" type="button"  size="sm"  data-bs-toggle="dropdown" aria-expanded="false">
                 Account
              </button>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0" >
                <li><button className="dropdown-item text-danger" type="button" onClick={handleLogout} >
                  <i className="bi bi-box-arrow-right me-2" ></i> Logout
                </button></li>
              </ul>
            </div>
          </div>
        </nav>
        
        {/* Actual Page Content */}
        <div className="p-3 p-md-4 flex-grow-1 overflow-auto" >
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}
