// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

// Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './pages/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAppointments from './pages/admin/ManageAppointments';
import ManageDoctors from './pages/admin/ManageDoctors';
import Patients from './pages/admin/Patients';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes with Header & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes (No Header/Footer, only Sidebar) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<ManageAppointments />} />
          <Route path="/admin/doctors" element={<ManageDoctors />} />
                    <Route path="/admin/patients" element={<Patients />} />

        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;