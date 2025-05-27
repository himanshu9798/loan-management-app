import React from "react";
import { useNavigate } from "react-router-dom";
import EMIChart from "./EMIChart";
import LoanApplicationButton from "./LoanApplicationButton";
import Notifications from "./Notifications";
import "./home.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const [currentDate, setCurrentDate] = useState("");

  const handleLogout = () => {
    // localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const timer = setInterval(() => {
      const formatted = dayjs().format("YYYY-MMM-DD HH:mm:ss");
      setCurrentDate(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>LoanXpert</h1>
        </div>
        <div className="header-right">
          <span>
            Welcome, <strong>{user.username}</strong>
            <br />
            <strong>{currentDate}</strong>
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Dashboard Main Cards */}
      <main className="dashboard-main">
        <h2>Dashboard Overview</h2>
        <div className="card-grid">
          <div
            className="dashboard-card card-1"
            onClick={() => navigate("/my-loans")}
            style={{ cursor: "pointer" }}
          >
            <h3>My Loan Applications</h3>
            <p>Track your loan status, history, and application progress.</p>
          </div>
          <div
            className="dashboard-card card-2"
            onClick={() => navigate("/emi-calculator")}
            style={{ cursor: "pointer" }}
          >
            <h3>EMI Calculator</h3>
            <p>Plan your payments with our interactive EMI calculator.</p>
          </div>

          <div
            className="dashboard-card card-3"
            onClick={() => navigate("/account-settings")}
            style={{ cursor: "pointer" }}
          >
            <h3>Account Settings</h3>
            <p>Manage your personal details, password, and preferences.</p>
          </div>
        </div>
      </main>

      {/* Graph and Apply Button */}
      <section className="dashboard-extras">
        <div className="emi-trend-section">
          <h3>EMI Payment Trends</h3>
          <EMIChart />
        </div>

        <div className="loan-button-wrapper">
          <LoanApplicationButton />
        </div>
      </section>

      {/* Additional Info Sections */}
      <section className="dashboard-extras">
        {/* Loan Summary */}
        <div className="loan-summary">
          <h3>Loan Summary</h3>
          <div className="summary-cards">
            <div className="summary-card approved">
              <h4>Approved</h4>
              <p>₹2,50,000</p>
            </div>
            <div className="summary-card pending">
              <h4>Pending</h4>
              <p>₹1,20,000</p>
            </div>
            <div className="summary-card rejected">
              <h4>Rejected</h4>
              <p>₹80,000</p>
            </div>
          </div>
        </div>

        {/* EMI Reminder */}
        <div className="emi-reminder">
          <h3>Upcoming EMI</h3>
          <div className="emi-box">
            <p>
              <strong>Date:</strong> 5th June 2025
            </p>
            <p>
              <strong>Amount:</strong> ₹10,500
            </p>
            <button className="pay-now-btn">Pay Now</button>
          </div>
        </div>

        {/* Support Section */}
        <div className="support-section">
          <h3>Need Help?</h3>
          <p>Contact our support team 24/7 for assistance.</p>
          <button className="support-btn">Contact Support</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>© 2025 LoanXpert. All rights reserved.</p>
          <p>
            Designed and developed by{" "}
            <a
              href="https://www.linkedin.com/in/himanshukumarbarnawal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Himanshu Kumar Barnawal
            </a>
          </p>

          <nav className="footer-nav">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </nav>

          <div className="social-icons">
            <a
              href="https://facebook.com/loanxpert"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/facebook.svg" alt="Facebook" />
            </a>
            <a
              href="https://twitter.com/loanxpert"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/twitter.svg" alt="Twitter" />
            </a>
            <a
              href="https://linkedin.com/company/loanxpert"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/icons/linkedin.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </footer>

      {/* Real-time Notifications */}
      <Notifications />
    </div>
  );
};

export default Home;
