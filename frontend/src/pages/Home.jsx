// Home.jsx
import { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { 
  Calendar, Heart, Brain, Smile, Stethoscope, Clock, Shield, 
  Star, ArrowRight, CheckCircle, Users, Award, Phone, 
  HeartPulse, Zap
} from 'lucide-react';
import './Home.css';

export default function Home() {
  const [hoveredService, setHoveredService] = useState(null);
  
  const services = [
    {
      id: 1,
      name: "Cardiology",
      icon: Heart,
      description: "Expert heart care and cardiovascular treatments with advanced diagnostics",
      color: "danger"
    },
    {
      id: 2,
      name: "Dental Care",
      icon: Smile,
      description: "Comprehensive dental services and oral health solutions",
      color: "info"
    },
    {
      id: 3,
      name: "Neurology",
      icon: Brain,
      description: "Advanced neurological care and brain health treatments",
      color: "primary"
    },
    {
      id: 4,
      name: "General Medicine",
      icon: Stethoscope,
      description: "Complete health checkups and comprehensive consultations",
      color: "success"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round the clock medical support whenever you need"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your health data is always protected with encryption"
    },
    {
      icon: Award,
      title: "Top Rated Doctors",
      description: "Verified healthcare professionals with proven track records"
    },
    {
      icon: Users,
      title: "1M+ Patients",
      description: "Trusted by millions of satisfied patients worldwide"
    }
  ];

  const stats = [
    { number: "500+", label: "Expert Doctors", icon: Stethoscope },
    { number: "1M+", label: "Happy Patients", icon: Users },
    { number: "50+", label: "Specializations", icon: Award },
    { number: "24/7", label: "Support", icon: Clock }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container className="hero-content">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="hero-badge">
                <Award size={20} className="me-2" />
                <span>Trusted Healthcare Platform</span>
              </div>
              
              <h1 className="hero-title">
                Your Health,<br />
                <span className="hero-highlight">Our Priority</span>
              </h1>
              
              <p className="hero-subtitle">
                Book appointments with top doctors instantly. Experience healthcare that's fast, reliable, and always there for you.
              </p>
              
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Button className="btn-hero-primary">
                  <Calendar size={20} />
                  Book Appointment
                  <ArrowRight size={20} />
                </Button>
                
                <Button className="btn-hero-outline">
                  <Phone size={20} />
                  Emergency: 911
                </Button>
              </div>

              <div className="rating-section">
                <div className="avatar-group">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="avatar"></div>
                  ))}
                </div>
                <div>
                  <div className="stars mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                    ))}
                  </div>
                  <small>Rated 4.9/5 by 10k+ patients</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <Container>
          <Row className="g-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Col key={i} xs={6} md={3}>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Icon size={32} />
                    </div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <Container>
          <div className="section-header">
            <div className="section-badge">
              <Zap size={18} />
              Why Choose Us
            </div>
            <h2 className="section-title">
              Experience <span className="section-highlight">Healthcare Excellence</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive medical services delivered with care and precision
            </p>
          </div>

          <Row className="g-4">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Col key={i} md={6} lg={3}>
                  <Card className="feature-card">
                    <Card.Body className="text-center">
                      <div className="feature-icon">
                        <Icon size={32} />
                      </div>
                      <h5 className="fw-bold mb-3">{feature.title}</h5>
                      <p className="text-muted mb-0">{feature.description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <Container>
          <div className="section-header">
            <div className="section-badge">
              <HeartPulse size={18} />
              Our Specialties
            </div>
            <h2 className="section-title">
              Our <span className="section-highlight">Medical Services</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive healthcare solutions delivered by expert specialists
            </p>
          </div>

          <Row className="g-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Col key={service.id} md={6} lg={3}>
                  <Card 
                    className={`service-card service-card-${service.color}`}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <Card.Body className="p-4">
                      <div className={`service-icon service-icon-${service.color}`}>
                        <Icon size={40} />
                      </div>
                      
                      <h5 className="fw-bold mb-3">{service.name}</h5>
                      
                      <p className="text-muted mb-4">{service.description}</p>
                      
                      <a href="#" className="service-link">
                        Learn More
                        <ArrowRight size={18} className={hoveredService === service.id ? 'arrow-active' : ''} />
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <Container>
          <div className="cta-content">
            <div className="cta-badge">
              <CheckCircle size={20} className="me-2" />
              <span className="fw-semibold">Ready to Get Started?</span>
            </div>
            
            <h2 className="cta-title">
              Take Control of Your Health Today
            </h2>
            
            <p className="cta-subtitle">
              Join millions of satisfied patients who trust us for their healthcare needs.<br />
              Book your first consultation now and experience the difference.
            </p>
            
            <Button className="btn-hero-primary" size="lg">
              <Calendar size={24} />
              Book Your Appointment
              <ArrowRight size={24} />
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}