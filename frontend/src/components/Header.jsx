import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  HeartPulse, Home, Info, Stethoscope, Mail,
  LogIn, LogOut, User, Lock, Phone, Eye, EyeOff
} from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from "../../utils/config.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";   // <-- Yeh add kiya

// Validation Schemas
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

const registerSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name too short").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().matches(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Invalid Indian number").optional(),
  password: Yup.string().min(6, "Password must be 6+ chars").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required("Confirm password is required"),
});

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (savedUser && token) setUser(JSON.parse(savedUser));
  }, []);

  const openModal = (loginMode = true) => {
    setIsLogin(loginMode);
    setShowModal(true);
    setExpanded(false);
  };

  const handleClose = () => setShowModal(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored"
    });
    navigate("/");
  };

  const handleSuccess = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    toast.success(isLogin ? `Welcome back, ${data.user.name.split(" ")[0]}!` : `Account created successfully! Welcome ${data.user.name.split(" ")[0]}!`, {
      position: "top-center",
      autoClose: 4000,
      theme: "colored"
    });

    setTimeout(() => handleClose(), 1200);
  };

  return (
    <>
      {/* ==================== Dynamic Navbar ==================== */}
      <Navbar bg="white" expand="lg" className="shadow-sm py-3 sticky-top" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
            <HeartPulse size={32} className="text-primary" />
            <span className="text-dark">Doctor<span className="text-primary">Care</span></span>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="ms-auto align-items-lg-center gap-2">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} className="px-3 py-2 rounded d-flex align-items-center gap-2 fw-medium">
                <Home size={18} /> <span>Home</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)} className="px-3 py-2 rounded d-flex align-items-center gap-2 fw-medium">
                <Info size={18} /> <span>About</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/doctors" onClick={() => setExpanded(false)} className="px-3 py-2 rounded d-flex align-items-center gap-2 fw-medium">
                <Stethoscope size={18} /> <span>Doctors</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)} className="px-3 py-2 rounded d-flex align-items-center gap-2 fw-medium">
                <Mail size={18} /> <span>Contact</span>
              </Nav.Link>

              {user ? (
                <div className="d-flex align-items-center gap-3">
                  <span className="fw-medium d-none d-lg-block">
                    Hi, <span className="text-primary">{user.name.split(" ")[0]}</span>
                  </span>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}
                    className="d-flex align-items-center gap-2">
                    <LogOut size={18} />
                    <span className="d-none d-sm-block">Logout</span>
                  </Button>
                </div>
              ) : (
                <Button variant="primary" onClick={() => openModal(true)}
                  className="px-4 py-2 d-flex align-items-center gap-2 shadow-sm">
                  <LogIn size={18} /> <span>Login</span>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ==================== Auth Modal ==================== */}
      <Modal show={showModal} onHide={handleClose} centered size="md">
        <Modal.Body className="p-0">
          <div className="row g-0">
            <div className="col-md-5 d-none d-md-flex bg-primary text-white p-5 flex-column justify-content-center">
              <HeartPulse size={48} className="mb-3" />
              <h3 className="fw-bold mb-3">Welcome to DoctorCare</h3>
              <p className="text-white-50 small">Your trusted healthcare partner</p>
            </div>

            <div className="col-md-7 p-4 p-md-5">
              <div className="text-center mb-4">
                <h4 className="fw-bold">{isLogin ? "Welcome Back!" : "Create Account"}</h4>
              </div>

              <Formik
                initialValues={{ name: "", email: "", phone: "", password: "", confirmPassword: "" }}
                validationSchema={isLogin ? loginSchema : registerSchema}
                onSubmit={async (values, { setSubmitting, setFieldError }) => {
                  try {
                    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
                    const payload = isLogin
                      ? { email: values.email, password: values.password }
                      : { name: values.name, email: values.email, phone: values.phone || "", password: values.password };

                    const res = await axios.post(`${BACKEND_URL}${endpoint}`, payload);
                    handleSuccess(res.data);

                  } catch (err) {
                    const msg = err.response?.data?.message || "Invalid credentials or server error";
                    setFieldError("email", msg);
                    toast.error(msg, { position: "top-center", autoClose: 4000, theme: "colored" });
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form>
                    {!isLogin && (
                      <div className="mb-3">
                        <label className="form-label small fw-medium">Full Name</label>
                        <div className="position-relative">
                          <User size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Field name="name" type="text" placeholder="John Doe"
                            className={`form-control ps-5 py-2 ${touched.name && errors.name ? 'is-invalid' : ''}`} />
                          <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label small fw-medium">Email Address</label>
                      <div className="position-relative">
                        <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <Field name="email" type="email" placeholder="you@example.com"
                          className={`form-control ps-5 py-2 ${touched.email && errors.email ? 'is-invalid' : ''}`} />
                        <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="mb-3">
                        <label className="form-label small fw-medium">Phone (Optional)</label>
                        <div className="position-relative">
                          <Phone size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Field name="phone" type="tel" placeholder="+919876543210"
                            className={`form-control ps-5 py-2 ${touched.phone && errors.phone ? 'is-invalid' : ''}`} />
                          <ErrorMessage name="phone" component="div" className="text-danger small mt-1" />
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label small fw-medium">Password</label>
                      <div className="position-relative">
                        <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <Field name="password">
                          {({ field }) => (
                            <input {...field} type={showPassword ? "text" : "password"} placeholder="••••••••"
                              className={`form-control ps-5 pe-5 py-2 ${touched.password && errors.password ? 'is-invalid' : ''}`} />
                          )}
                        </Field>
                        <button type="button" className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-3"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                      </div>
                    </div>

                    {!isLogin && (
                      <div className="mb-3">
                        <label className="form-label small fw-medium">Confirm Password</label>
                        <div className="position-relative">
                          <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                          <Field name="confirmPassword">
                            {({ field }) => (
                              <input {...field} type={showConfirmPassword ? "text" : "password"} placeholder="••••••••"
                                className={`form-control ps-5 pe-5 py-2 ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`} />
                            )}
                          </Field>
                          <button type="button" className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted p-0 me-3"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <ErrorMessage name="confirmPassword" component="div" className="text-danger small mt-1" />
                        </div>
                      </div>
                    )}

                    <Button type="submit" variant="primary" disabled={isSubmitting} className="w-100 py-2 fw-bold mt-3">
                      {isSubmitting ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
                    </Button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-4">
                <small className="text-muted">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button type="button" className="btn btn-link p-0 text-primary fw-medium"
                    onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign up" : "Login"}
                  </button>
                </small>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}