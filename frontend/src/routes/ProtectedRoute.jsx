// src/routes/ProtectedRoute.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="d-flex justify-content-center mt-5"><div className="spinner-border"></div></div>;

  return user ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;