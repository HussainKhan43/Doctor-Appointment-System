// src/components/AdminSidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Lucide React Icons - Super clean & modern
import { 
  LayoutDashboard, 
 CalendarCheck, 
 Stethoscope, 
 Users, 
 LogOut,
 HeartPulse
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { path: '/admin/dashboard',     icon: LayoutDashboard,  label: 'Dashboard' },
    { path: '/admin/appointments',  icon: CalendarCheck,    label: 'Appointments' },
    { path: '/admin/doctors',       icon: Stethoscope,      label: 'Doctors' },
    { path: '/admin/patients',      icon: Users,            label: 'Patients' },
  ];

  return (
    <div className="d-flex flex-column h-100">
      {/* Logo / Title - Mobile + Desktop dono pe dikhega */}
      <div className="p-4 text-center border-bottom border-secondary">
        <div className="d-flex align-items-center justify-content-center gap-3">
          <HeartPulse size={32} className="text-primary" />
          <h4 className="text-white mb-0 fw-bold">DoctorApp</h4>
        </div>
        <small className="text-white-50 d-block mt-1">Admin Panel</small>
      </div>

      {/* Menu Items */}
      <ul className="nav flex-column flex-grow-1 px-3 pt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <li key={item.path} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link text-white d-flex align-items-center gap-3 rounded px-4 py-3 transition-all ${
                  isActive 
                    ? 'bg-primary shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon size={22} />
                <span className="fw-medium">{item.label}</span>
                {isActive && <div className="ms-auto"><i className="bi bi-chevron-right"></i></div>}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Logout Button - Bottom mein fixed */}
      <div className="p-3 border-top border-secondary">
        <button
          onClick={logout}
          className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-3 fw-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;