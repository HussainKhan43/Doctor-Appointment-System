// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { 
  CalendarCheck, 
  Clock, 
  Stethoscope, 
  IndianRupee,
  UserPlus,
  TrendingUp,
  Star,
  Bell,
  CalendarDays  // ← New icon for Total Appointments
} from 'lucide-react';
import { BACKEND_URL } from "../../../utils/config.js"; 

// Reusable Stat Card
const StatCard = ({ title, value, subtitle, icon: Icon, gradient }) => (
  <Card className="h-100 border-0 shadow-lg overflow-hidden position-relative hover-lift">
    <Card.Body className="p-4 text-white" style={{ background: gradient, borderRadius: '16px' }}>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <Icon size={38} className="opacity-90" />
        <span className="badge bg-white bg-opacity-20 px-3 py-2 rounded-pill">Live</span>
      </div>
      <h2 className="display-5 fw-bold mb-1">{value}</h2>
      <p className="mb-0 opacity-90 fw-medium">{title}</p>
      <small className="opacity-75">{subtitle}</small>
      <div className="position-absolute bottom-0 start-0 w-100">
        <svg viewBox="0 0 1440 120" className="w-100">
          <path fill="rgba(255,255,255,0.1)" d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,74.7C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </Card.Body>
  </Card>
);

const QuickStat = ({ icon: Icon, value, label, color }) => (
  <Card className="text-center border-0 shadow-sm hover-lift transition-all">
    <Card.Body className="p-4">
      <div className={`d-inline-flex p-3 rounded-circle mb-3 ${color} text-white`}>
        <Icon size={32} />
      </div>
      <h3 className="fw-bold mb-1">{value}</h3>
      <p className="text-muted mb-0 small">{label}</p>
    </Card.Body>
  </Card>
);

const AdminDashboard = () => {
  const [totalInquiries, setTotalInquiries] = useState("-");
  const [activeDoctors, setActiveDoctors] = useState("-");
  const [todaysBookings, setTodaysBookings] = useState("-");
  const [totalAppointments, setTotalAppointments] = useState("-");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      if (!token) {
        console.error("No admin token found");
        return;
      }

      try {
        // 1. Total Inquiries
        const inquiryRes = await axios.get(`${BACKEND_URL}/api/contact/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTotalInquiries(inquiryRes.data.total || inquiryRes.data.data?.total || "0");

        // 2. Active Doctors
        const doctorRes = await axios.get(`${BACKEND_URL}/api/doctors/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setActiveDoctors(doctorRes.data.total || doctorRes.data.data?.total || "0");

        // 3. NEW FAST ROUTE: Appointment Stats (Recommended & Optimized)
        const statsRes = await axios.get(`${BACKEND_URL}/api/appointments/stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const stats = statsRes.data; // ya statsRes.data.data — backend ke hisaab se adjust kar lena

        setTotalAppointments(stats.totalAppointments || stats.total || "0");
        setTodaysBookings(stats.todaysAppointments || stats.today || stats.todaysBookings || "0");

      } catch (err) {
        console.error("Dashboard data fetch error:", err.response?.data || err.message);
        setTotalInquiries("0");
        setActiveDoctors("0");
        setTodaysBookings("0");
        setTotalAppointments("0");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Container fluid className="py-4">
      <div className="mb-5">
        <h1 className="display-5 fw-bold text-dark mb-2">Welcome back, Admin!</h1>
        <p className="text-muted fs-5">
          {new Date().toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <Row className="g-4 mb-5">
        {/* Total Inquiries */}
        <Col xs={12} md={6} xl={3}>
          <StatCard
            title="Total Inquiries"
            value={totalInquiries}
            subtitle="Contact form submissions"
            icon={CalendarCheck}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </Col>

        {/* Total Appointments - Ab Naya Box Add Kar Diya */}
        <Col xs={12} md={6} xl={3}>
          <StatCard
            title="Total Appointments"
            value={totalAppointments}
            subtitle="All time bookings"
            icon={CalendarDays}
            gradient="linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
          />
        </Col>

        {/* Today's Bookings */}
        <Col xs={12} md={6} xl={3}>
          <StatCard
            title="Monthly Revenue"
            value={50000}
            subtitle="Scheduled for today"
            icon={Clock}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
        </Col>

        {/* Active Doctors */}
        <Col xs={12} md={6} xl={3}>
          <StatCard
            title="Active Doctors"
            value={activeDoctors}
            subtitle="Available for booking"
            icon={Stethoscope}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </Col>
      </Row>

      {/* Quick Overview */}
      <h4 className="mb-4 text-dark fw-bold">Quick Overview</h4>
      <Row className="g-4">
        <Col xs={6} sm={6} md={4} lg={3}>
          <QuickStat icon={UserPlus} value="42" label="New Patients" color="bg-success" />
        </Col>
        <Col xs={6} sm={6} md={4} lg={3}>
          <QuickStat icon={TrendingUp} value="89%" label="Completion Rate" color="bg-primary" />
        </Col>
        <Col xs={6} sm={6} md={4} lg={3}>
          <QuickStat icon={Star} value="4.8" label="Average Rating" color="bg-warning" />
        </Col>
        <Col xs={6} sm={6} md={4} lg={3}>
          <QuickStat icon={Bell} value="5" label="Pending Reviews" color="bg-danger" />
        </Col>
      </Row>

      {/* Hover Effect */}
      <style jsx>{`
        .hover-lift {
          transition: all 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </Container>
  );
};

export default AdminDashboard;