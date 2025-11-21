// src/pages/admin/AdminLogin.jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, HeartPulse } from 'lucide-react';
import { BACKEND_URL } from "../../../utils/config.js";
import axios from "axios";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, {
        email: form.email,
        password: form.password,
      });

      if (res.data.success) {
        if (res.data.firstTime) {
          setSuccess("First time login! Admin account created successfully!");
        }
        login(res.data.token);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                    <HeartPulse size={40} className="text-primary" />
                    <h3 className="mb-0 fw-bold">DoctorCare</h3>
                  </div>
                  <h5 className="fw-bold text-dark mb-2">Admin Panel</h5>
                  <p className="text-muted small mb-0">Sign in to manage your dashboard</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Email</label>
                    <div className="position-relative">
                      <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <input
                        type="email"
                        className="form-control form-control-lg ps-5"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-medium">Password</label>
                    <div className="position-relative">
                      <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg ps-5 pe-5"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {error && <div className="alert alert-danger small py-2">{error}</div>}
                  {success && <div className="alert alert-success small py-2">{success}</div>}

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="remember" />
                      <label className="form-check-label small" htmlFor="remember">Remember me</label>
                    </div>
                    <a href="#" className="text-decoration-none small text-primary">Forgot Password?</a>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg w-100 fw-medium"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        Signing In...
                      </span>
                    ) : (
                      <span className="d-flex align-items-center justify-content-center gap-2">
                        <ShieldCheck size={20} />
                        Login to Dashboard
                      </span>
                    )}
                  </button>

                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;