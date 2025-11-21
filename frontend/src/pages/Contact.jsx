import React from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Phone, Mail, MapPin, Send, Clock, CheckCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; 
import { BACKEND_URL } from "../../utils/config.js"; 

export default function Contact() {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian number")
        .required("Phone number is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().min(10, "Message too short").required("Message is required"),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const res = await axios.post(`${BACKEND_URL}/api/contact`, values);

        if (res.data.success) {
          toast.success("Message sent successfully! We'll reply soon", {
            position: "top-center",
            autoClose: 5000,
            theme: "colored",
          });
          resetForm();
        } else {
          toast.error("Failed to send message. Try again!");
        }
      } catch (err) {
        toast.error("Network error. Check your connection.");
        console.error("Contact form error:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ToastContainer position="top-center" />

      {/* Styling – bilkul same */}
      <style >{`
        .contact-card {
          border-radius: 1.5rem;
          border: none;
          overflow: hidden;
        }
        .btn-gradient {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 50px;
          padding: 12px 40px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
        }
        .form-control:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }
        .info-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 1.5rem;
          padding: 2rem;
          height: 100%;
        }
        .info-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }
      `}</style>

      <section className="py-5" style={{ background: "linear-gradient(to bottom, #f0f9ff, #e0f2fe, #f8fafc)" }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <span className="badge bg-primary text-white px-4 py-2 rounded-pill mb-3">
              <Phone className="me-2" size={18} />
              Get in Touch
            </span>
            <h2 className="display-5 fw-bold mb-3">
              Contact <span style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                DoctorCare
              </span>
            </h2>
            <p className="lead text-muted col-lg-8 mx-auto">
              Have questions? We're here 24/7 to help you with appointments, queries, or emergencies.
            </p>
          </div>

          <Row className="g-5">
            <Col lg={7}>
              <Card className="contact-card shadow-xl border-0">
                <Card.Body className="p-5">
                  <h3 className="fw-bold mb-4">Send us a Message</h3>

                  <Form onSubmit={formik.handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            className={`py-3 rounded-pill border-2 ${formik.touched.fullName && formik.errors.fullName ? "is-invalid" : ""}`}
                            style={{ borderColor: "#e2e8f0" }}
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.fullName && formik.errors.fullName && (
                            <div className="text-danger small mt-1">{formik.errors.fullName}</div>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            className={`py-3 rounded-pill border-2 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                            style={{ borderColor: "#e2e8f0" }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <div className="text-danger small mt-1">{formik.errors.email}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="g-3 mt-2">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Phone Number</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            placeholder="+91 98765 43210"
                            className={`py-3 rounded-pill border-2 ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
                            style={{ borderColor: "#e2e8f0" }}
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.phone && formik.errors.phone && (
                            <div className="text-danger small mt-1">{formik.errors.phone}</div>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">Subject</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            placeholder="Appointment / Query"
                            className={`py-3 rounded-pill border-2 ${formik.touched.subject && formik.errors.subject ? "is-invalid" : ""}`}
                            style={{ borderColor: "#e2e8f0" }}
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.subject && formik.errors.subject && (
                            <div className="text-danger small mt-1">{formik.errors.subject}</div>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mt-3">
                      <Form.Label className="fw-semibold">Your Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Tell us how we can help you..."
                        className={`rounded-3 ${formik.touched.message && formik.errors.message ? "is-invalid" : ""}`}
                        style={{ borderColor: "#e2e8f0" }}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.message && formik.errors.message && (
                        <div className="text-danger small mt-1">{formik.errors.message}</div>
                      )}
                    </Form.Group>

                    <div className="mt-4">
                      <Button
                        type="submit"
                        className="btn-gradient text-white fw-bold px-5"
                        disabled={formik.isSubmitting}
                      >
                        <Send size={20} className="me-2" />
                        {formik.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Side Info – 100% same */}
            <Col lg={5}>
              <div className="info-card shadow-xl">
                <h3 className="fw-bold mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="d-flex gap-4">
                    <div className="info-icon"><Phone size={28} /></div>
                    <div>
                      <h5 className="fw-bold">Phone</h5>
                      <p className="mb-0 opacity-90">+91 98765 43210</p>
                      <p className="mb-0 opacity-90">+91 1800-123-4567 (Toll Free)</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4">
                    <div className="info-icon"><Mail size={28} /></div>
                    <div>
                      <h5 className="fw-bold">Email</h5>
                      <p className="mb-0 opacity-90">support@doctorcare.in</p>
                      <p className="mb-0 opacity-90">appointments@doctorcare.in</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4">
                    <div className="info-icon"><MapPin size={28} /></div>
                    <div>
                      <h5 className="fw-bold">Address</h5>
                      <p className="mb-0 opacity-90">123 Healthcare Avenue</p>
                      <p className="mb-0 opacity-90">Mumbai, Maharashtra 400001</p>
                    </div>
                  </div>

                  <div className="d-flex gap-4">
                    <div className="info-icon"><Clock size={28} /></div>
                    <div>
                      <h5 className="fw-bold">Available 24/7</h5>
                      <p className="mb-0 opacity-90">Emergency Support</p>
                      <p className="mb-0 opacity-90">Instant Appointment Booking</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-4 bg-white bg-opacity-20 rounded-3 text-center">
                  <CheckCircle size={40} className="mb-3 text-white" />
                  <p className="fw-bold mb-0">Average Response Time: <span className="text-warning">Under 5 Minutes</span></p>
                </div>
              </div>
            </Col>
          </Row>

          <div className="mt-5 text-center">
            <div className="alert alert-danger d-inline-block py-3 px-5 rounded-pill border-0">
              <strong>Emergency?</strong> Call <strong className="text-decoration-underline">108</strong> or visit nearest hospital immediately.
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}