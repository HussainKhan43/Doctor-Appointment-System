import { Container, Row, Col } from "react-bootstrap";
import { 
  HeartPulse, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="gy-4">
          {/* About Section */}
          <Col lg={4} md={6}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <HeartPulse size={32} className="text-primary" />
              <h4 className="mb-0 fw-bold text-white">DoctorCare</h4>
            </div>
            <p className="text-white-50 mb-3">
              Your trusted healthcare partner providing 24×7 medical support with experienced doctors and modern facilities.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white-50 hover-text-primary transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h5 className="fw-bold mb-3 text-white">Quick Links</h5>
            <ul className="list-unstyled">
               <li className="mb-2">
                <a href="/" className="text-white-50 text-decoration-none hover-text-white transition-all">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white-50 text-decoration-none hover-text-white transition-all">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="/doctors" className="text-white-50 text-decoration-none hover-text-white transition-all">
                  Doctors
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-white-50 text-decoration-none hover-text-white transition-all">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3 text-white">Our Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-white-50">Emergency Care</li>
              <li className="mb-2 text-white-50">General Consultation</li>
              <li className="mb-2 text-white-50">Diagnostic Services</li>
              <li className="mb-2 text-white-50">Specialized Treatment</li>
              <li className="mb-2 text-white-50">Health Checkups</li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <h5 className="fw-bold mb-3 text-white">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start gap-2">
                <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-white-50">
                  123 Medical Street, Andheri, Mumbai - 400053
                </span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <span className="text-white-50">+91 98765 43210</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <span className="text-white-50">info@doctorcare.com</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Clock size={18} className="text-primary flex-shrink-0" />
                <span className="text-white-50">24×7 Available</span>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <hr className="border-secondary my-4" />
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-2 mb-md-0">
            <small className="text-white-50">
              © {new Date().getFullYear()} DoctorCare Hospital. Made By Hussain Khan
            </small>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <small>
              <a href="#" className="text-white-50 text-decoration-none hover-text-white me-3">
                Privacy Policy
              </a>
              <a href="#" className="text-white-50 text-decoration-none hover-text-white me-3">
                Terms of Service
              </a>
              <a href="#" className="text-white-50 text-decoration-none hover-text-white">
                Sitemap
              </a>
            </small>
          </Col>
        </Row>
      </Container>

      <style >{`
        .hover-text-primary:hover {
          color: #0d6efd !important;
        }
        .hover-text-white:hover {
          color: #ffffff !important;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
      `}</style>
    </footer>
  );
}