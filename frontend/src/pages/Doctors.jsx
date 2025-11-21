import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { Stethoscope, Calendar, Star, Loader2, User, Phone, Mail } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/api/doctors`);
        setDoctors(res.data.data || res.data);
      } catch (err) {
        setError("Failed to load doctors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const isLoggedIn = () => !!localStorage.getItem("token");

  const openBookingModal = async (doctorId) => {
    if (!isLoggedIn()) {
      alert("Please log in first to book an appointment!");
      return;
    }

    try {
      const res = await axios.get(`${BACKEND_URL}/api/doctors/${doctorId}`);
      const doctor = res.data.data || res.data;

      setSelectedDoctor(doctor);
      setShowModal(true);
      setSubmitSuccess(false);
      setSubmitError("");

      // Reset form with pre-filled user data
      formik.resetForm();
      formik.setValues({
        patientName: localStorage.getItem("userName") || "",
        phone: localStorage.getItem("userPhone") || "",
        email: localStorage.getItem("userEmail") || "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      alert("Doctor details not found!");
    }
  };

  // Formik + Yup Validation Schema
  const validationSchema = Yup.object({
    patientName: Yup.string().required("Patient name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    date: Yup.date()
      .min(new Date(), "Date cannot be in the past")  // ← YEHI LINE FIX KI
      .required("Please select a date"),
    time: Yup.string().required("Please select a time"),
    message: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      patientName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setSubmitError("");
      setSubmitSuccess(false);

      try {
        const token = localStorage.getItem("token");

        await axios.post(
          `${BACKEND_URL}/api/appointments`,
          {
            doctorId: selectedDoctor._id,
            doctorName: selectedDoctor.name,
            ...values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setSubmitSuccess(true);
        setTimeout(() => {
          setShowModal(false);
          formik.resetForm();
        }, 2000);
      } catch (err) {
        setSubmitError(
          err.response?.data?.message || "Failed to book appointment. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const gradientStyles = `
    .btn-gradient { background: linear-gradient(135deg, #3b82f6, #8b5cf6); border: none; }
    .btn-gradient:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(59, 130, 246, 0.4); }
    .doctor-card:hover { transform: translateY(-12px); box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important; }
    .doctor-img { height: 280px; object-fit: cover; transition: transform 0.5s ease; }
    .doctor-card:hover .doctor-img { transform: scale(1.1); }
    .badge-gradient { background: linear-gradient(135deg, #10b981, #34d399); }
  `;

  if (loading) return <div className="text-center py-5"><Loader2 size={60} className="animate-spin text-primary" /></div>;
  if (error) return <Alert variant="danger" className="m-5">{error}</Alert>;

  return (
    <>
      <style>{gradientStyles}</style>

      {/* Doctors List */}
      <section className="py-5 bg-light" style={{ background: "linear-gradient(to bottom, #f8fafc, #e2e8f0)" }}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <span className="badge bg-primary text-white px-4 py-2 rounded-pill mb-3">
              <Stethoscope className="me-2" size={18} /> Meet Our Specialists
            </span>
            <h2 className="display-5 fw-bold">
              Our <span style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Expert Doctors
              </span>
            </h2>
            <p className="lead text-muted col-lg-8 mx-auto">
              Highly qualified and experienced doctors dedicated to providing you the best care
            </p>
          </div>

          <Row className="g-4 g-xl-5">
            {doctors.map((doc) => (
              <Col md={6} lg={4} key={doc._id}>
                <Card className="doctor-card shadow-lg h-100 bg-white border-0 rounded-4 overflow-hidden">
                  <div className="position-relative">
                    <Card.Img
                      variant="top"
                      src={doc.img || "https://via.placeholder.com/300x280?text=No+Image"}
                      alt={doc.name}
                      className="doctor-img"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300x280?text=Not+Found")}
                    />
                    <span className="position-absolute top-0 end-0 m-3 badge badge-gradient text-white px-3 py-2 rounded-pill shadow">
                      <Star size={14} className="me-1" fill="white" /> {doc.rating || "4.9"}
                    </span>
                  </div>

                  <Card.Body className="text-center p-4">
                    <h4 className="fw-bold text-dark mb-1">{doc.name}</h4>
                    <p className="text-primary fw-semibold mb-3">{doc.specialty}</p>

                    <div className="d-flex justify-content-center gap-4 text-muted small mb-4">
                      <div>
                        <strong className="text-dark">{doc.experience || "10+ Years"}</strong>
                        <br /> Experience
                      </div>
                      <div>
                        <strong className="text-dark">{doc.patients || "1000+"}</strong>
                        <br /> Patients
                      </div>
                    </div>

                    <Button
                      className="btn-gradient text-white px-5 py-3 rounded-pill fw-semibold w-100"
                      onClick={() => openBookingModal(doc._id)}
                    >
                      <Calendar size={18} className="me-2" />
                      Book Appointment
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Booking Modal with Formik + Yup */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered backdrop="static">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="fw-bold">
            Book Appointment with <span className="text-primary">{selectedDoctor?.name}</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {submitSuccess && <Alert variant="success">Appointment booked successfully!</Alert>}
          {submitError && <Alert variant="danger">{submitError}</Alert>}

          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label><User size={16} className="me-2" />Patient Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="patientName"
                    {...formik.getFieldProps("patientName")}
                    isInvalid={formik.touched.patientName && formik.errors.patientName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.patientName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label><Phone size={16} className="me-2" />Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    {...formik.getFieldProps("phone")}
                    isInvalid={formik.touched.phone && formik.errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label><Mail size={16} className="me-2" />Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    {...formik.getFieldProps("email")}
                    isInvalid={formik.touched.email && formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    min={new Date().toISOString().split("T")[0]}  // ← Yeh bhi add kar
                    {...formik.getFieldProps("date")}
                    isInvalid={formik.touched.date && formik.errors.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Preferred Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="time"
                    {...formik.getFieldProps("time")}
                    isInvalid={formik.touched.time && formik.errors.time}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.time}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Message (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                {...formik.getFieldProps("message")}
                placeholder="Any symptoms or special requests..."
              />
            </Form.Group>

            <div className="d-flex gap-3 justify-content-end">
              <Button
                variant="primary"
                type="submit"
                disabled={submitting || formik.isSubmitting}
                className="btn-gradient px-5"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin me-2" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)} disabled={submitting}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}