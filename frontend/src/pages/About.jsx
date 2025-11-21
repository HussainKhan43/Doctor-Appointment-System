import React from "react";
import {
  Users,
  Stethoscope,
  Globe,
  Award,
  Heart,
  Shield,
  Clock,
  Target,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import AboutImg from "../../src/assets/about.jpg.webp";

export default function About() {
  const stats = [
    { Icon: Users, number: "10,000+", label: "Happy Patients", gradient: "linear-gradient(135deg, #0d6efd, #0a58ca)" },
    { Icon: Stethoscope, number: "500+", label: "Expert Doctors", gradient: "linear-gradient(135deg, #a855f7, #ec4899)" },
    { Icon: Globe, number: "50+", label: "Clinic Locations", gradient: "linear-gradient(135deg, #198754, #157347)" },
    { Icon: Award, number: "15+", label: "Years Experience", gradient: "linear-gradient(135deg, #ffc107, #ff9800)" },
  ];

  const values = [
    { Icon: Heart, title: "Patient First", desc: "Your health and comfort are our top priorities in every decision we make" },
    { Icon: Shield, title: "Trust & Safety", desc: "Maintaining the highest standards of medical care and data security" },
    { Icon: Clock, title: "24/7 Availability", desc: "Round-the-clock medical support whenever you need us" },
    { Icon: Target, title: "Quality Care", desc: "Evidence-based treatments delivered by qualified professionals" },
  ];

  const features = [
    "World-class healthcare facilities",
    "Modern medical technology",
    "Highly qualified doctors",
    "24×7 emergency support",
    "Affordable healthcare plans",
    "Patient-centric approach",
  ];

  return (
    <>
      <style>{`
        .hero-gradient {
          background: linear-gradient(135deg, #1e40af 0%, #4338ca 50%, #6b21a8 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-gradient::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          border-radius: 50%;
        }
        .mission-gradient {
          background: linear-gradient(135deg, #1d4ed8 0%, #6366f1 50%, #8b5cf6 100%);
        }
        .text-gradient {
          background: linear-gradient(to right, #fbbf24, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .stat-card {
          transition: all 0.3s ease;
          border: none;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-gradient);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .stat-card:hover::before {
          transform: scaleX(1);
        }
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        .value-card {
          transition: all 0.3s ease;
          border: none;
          background: #ffffff;
        }
        .value-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
        }
        .value-card .icon-wrapper {
          transition: transform 0.3s ease;
        }
        .value-card:hover .icon-wrapper {
          transform: scale(1.1);
        }
        .feature-item {
          transition: all 0.2s ease;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }
        .feature-item:hover {
          background: rgba(13, 110, 253, 0.05);
          transform: translateX(5px);
        }
        .mission-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .mission-card:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-5px);
        }
        .cta-button {
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .cta-button:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(13, 110, 253, 0.4) !important;
        }
        .about-image-wrapper {
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        }
        .about-image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(13,110,253,0.1), rgba(107,33,168,0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .about-image-wrapper:hover::after {
          opacity: 1;
        }
      `}</style>

      <div style={{ background: "linear-gradient(to bottom, #dbeafe, #f8fafc, #f1f5f9)", minHeight: "100vh" }}>
        
        {/* Hero Section */}
        <section className="hero-gradient text-white py-5 position-relative">
          <Container className="py-5">
            <div className="text-center position-relative" style={{ zIndex: 1 }}>
              <Badge bg="light" text="dark" className="px-4 py-2 mb-4 d-inline-flex align-items-center" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                <Award className="me-2" size={18} />
                Trusted Healthcare Partner
              </Badge>
              <h1 className="display-2 fw-bold mb-4" style={{ letterSpacing: "-1px" }}>
                About <span className="text-gradient">DoctorCare</span>
              </h1>
              <p className="lead mx-auto" style={{ maxWidth: "700px", opacity: 0.95, fontSize: "1.25rem" }}>
                Transforming healthcare delivery through technology, compassion, and excellence.
              </p>
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-5" style={{ marginTop: "-50px" }}>
          <Container>
            <Row className="g-4">
              {stats.map((stat, i) => (
                <Col xs={6} md={3} key={i}>
                  <Card className="stat-card h-100 text-center p-4 shadow-lg" style={{ "--card-gradient": stat.gradient }}>
                    <div 
                      className="text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto icon-wrapper"
                      style={{ width: 80, height: 80, background: stat.gradient }}
                    >
                      <stat.Icon size={38} />
                    </div>
                    <h3 className="fw-bold mb-1" style={{ fontSize: "2.2rem" }}>{stat.number}</h3>
                    <p className="text-muted mb-0 fw-medium">{stat.label}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Story Section */}
        <section className="py-5 bg-white">
          <Container>
            <Row className="g-5 align-items-center">
              <Col lg={7}>
                <h2 className="display-5 fw-bold mb-4">
                  Our <span className="text-primary">Story</span>
                </h2>
                <p className="lead text-muted mb-4" style={{ fontSize: "1.15rem" }}>
                  DoctorCare is a trusted medical appointment platform dedicated to
                  revolutionizing healthcare delivery through innovation and compassion.
                </p>
                <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>
                  We provide world-class healthcare services powered by modern
                  technology and supported by a team of highly qualified medical
                  professionals who care deeply about your wellbeing.
                </p>
                <Row className="mt-4 g-3">
                  {features.map((f, i) => (
                    <Col xs={6} key={i}>
                      <div className="d-flex align-items-start feature-item">
                        <CheckCircle className="text-success me-3 flex-shrink-0 mt-1" size={22} />
                        <span style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>{f}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>

              <Col lg={5}>
                <div className="about-image-wrapper">
                  <img
                    src={AboutImg}
                    alt="About DoctorCare"
                    className="img-fluid"
                    style={{ width: "100%", height: "550px", objectFit: "cover" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Core Values */}
        <section className="py-5">
          <Container>
            <div className="text-center mb-5">
              <h2 className="display-5 fw-bold">
                Our <span className="text-primary">Core Values</span>
              </h2>
              <p className="text-muted mt-3" style={{ fontSize: "1.1rem" }}>
                The principles that guide everything we do
              </p>
            </div>
            <Row className="g-4">
              {values.map((v, i) => (
                <Col md={6} lg={3} key={i}>
                  <Card className="value-card h-100 text-center p-4 shadow">
                    <div 
                      className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 mx-auto icon-wrapper"
                      style={{ width: 75, height: 75 }}
                    >
                      <v.Icon size={36} />
                    </div>
                    <h5 className="fw-bold mb-3">{v.title}</h5>
                    <p className="text-muted small" style={{ lineHeight: 1.7 }}>{v.desc}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Mission Section */}
        <section className="mission-gradient text-white py-5">
          <Container className="text-center py-4">
            <h2 className="display-4 fw-bold mb-4">Making Healthcare Accessible for Everyone</h2>
            <p className="lead mx-auto mb-5" style={{ maxWidth: "800px", opacity: 0.95, fontSize: "1.2rem" }}>
              We believe that everyone deserves access to quality healthcare. Our mission is to leverage 
              technology to break down barriers and create a healthier tomorrow.
            </p>
            <Row className="g-4 justify-content-center">
              {[
                { Icon: TrendingUp, text: "Continuous Innovation" }, 
                { Icon: Heart, text: "Patient Satisfaction" }, 
                { Icon: Shield, text: "Quality Assurance" }
              ].map((item, i) => (
                <Col md={4} key={i}>
                  <Card className="mission-card border-0 p-4">
                    <item.Icon size={52} className="mx-auto mb-3" />
                    <p className="fw-bold mb-0" style={{ fontSize: "1.1rem" }}>{item.text}</p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-5 bg-white">
          <Container className="text-center py-4">
            <h2 className="display-5 fw-bold mb-4">Join Our Healthcare Community</h2>
            <p className="text-muted mb-4" style={{ fontSize: "1.1rem" }}>
              Experience world-class healthcare today
            </p>
            <Button 
              variant="primary" 
              size="lg" 
              className="cta-button px-5 py-3 rounded-pill shadow-lg"
            >
              Get Started Today <CheckCircle className="ms-2" size={20} />
            </Button>
          </Container>
        </section>

      </div>
    </>
  );
}