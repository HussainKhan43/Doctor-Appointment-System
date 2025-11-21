// src/pages/admin/AdminLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';

// Lucide React se sirf Menu aur X icon import kiye
import { Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar - Fixed on Desktop, Toggle on Mobile */}
      <div
        className={`bg-dark text-white vh-100 position-fixed position-lg-static top-0 start-0 overflow-auto transition-all ${
          sidebarOpen ? 'd-block' : 'd-none'
        } d-lg-block`}
        style={{ width: '250px', zIndex: 1050 }}
      >
        <AdminSidebar />
      </div>

      {/* Main Content - Automatically pushes right on desktop */}
      <div className="flex-grow-1" style={{ marginLeft: '250px' }}>
        
        {/* Mobile Header with Lucide React Icons */}
        <nav className="navbar navbar-light bg-white shadow-sm d-lg-none">
          <div className="container-fluid px-3">
            <button
              className="btn btn-dark d-flex align-items-center justify-content-center p-2 rounded-circle"
              style={{ width: '44px', height: '44px' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <X size={26} strokeWidth={2.5} />
              ) : (
                <Menu size={26} strokeWidth={2.5} />
              )}
            </button>
            <span className="navbar-brand mb-0 fw-bold ms-3">Admin Panel</span>
          </div>
        </nav>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
            style={{ zIndex: 1040 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Page Content */}
        <div className="p-4 p-md-5 bg-light min-vh-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;