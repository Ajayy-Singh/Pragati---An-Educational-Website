import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
<footer className="footer-custom pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">About Us</h5>
            <p className="small text-light">
              We provide well-organized, semester-wise notes for B.Tech students
              to make learning easier and effective.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="/resourse" className="footer-link">
                  Subjects
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4 text-light">
            <h5 className="fw-bold mb-3 text-light">Contact</h5>
            <p className="small mb-1 text-light">📍 Bhopal, India</p>
            <p className="small mb-1 text-light">📧 info@pragati.com</p>
            <p className="small text-light">📞 +91 9876543210</p>
          </div>

          {/* Social Links */}
          <div className="col-md-3 mb-4 text-light">
            <h5 className="fw-bold mb-3 text-light">Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#" className="fs-4 footer-icon">
                <FaFacebook />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaTwitter />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaLinkedin />
              </a>
              <a href="#" className="fs-4 footer-icon">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Bottom Line */}
        <p className="text-center mb-1 small text-light">
          © {new Date().getFullYear()} <strong>Pragati</strong>. All rights
          reserved.
        </p>
        <p className="text-center mb-0 small text-light">
          Designed with <span style={{ color: "red" }}>❤️</span> by{" "}
          <strong className="text-gradient">Pragati Team</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
