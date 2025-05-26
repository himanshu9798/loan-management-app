// src/components/ApplyLoan.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ApplyLoan.css";

const ApplyLoan = () => {
  const navigate = useNavigate();

  // Fetch loggedInUser from localStorage and get username (or fallback)
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = loggedUser?.username || null;

  const [form, setForm] = useState({
    amount: "",
    tenure: "",
    purpose: "",
  });

  // If user not logged in, redirect or show message
  if (!user) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        You are not logged in. Please <a href="/login">login</a> first.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newLoan = {
      id: Date.now(), // unique id
      user, // username string only
      amount: form.amount,
      tenure: form.tenure,
      purpose: form.purpose,
      status: "Pending", // default status
      appliedOn: new Date().toLocaleDateString(),
    };

    // Get existing loans or empty array
    const existingLoans = JSON.parse(localStorage.getItem("loans")) || [];

    // Add new loan
    existingLoans.push(newLoan);

    // Save updated loans to localStorage
    localStorage.setItem("loans", JSON.stringify(existingLoans));

    Swal.fire({
      icon: "success",
      title: "Loan Application Submitted!",
      text: `Your loan application of ₹${form.amount} has been submitted successfully.`,
      confirmButtonText: "Back to Dashboard",
    }).then(() => {
      navigate("/user"); // redirect to user dashboard
    });
  };

  return (
    <div className="apply-loan-container">
      <h2>Apply for a New Loan</h2>
      <form onSubmit={handleSubmit} className="apply-loan-form">
        <div className="form-group">
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Tenure (in months)</label>
          <input
            type="number"
            value={form.tenure}
            onChange={(e) => setForm({ ...form, tenure: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Purpose of Loan</label>
          <textarea
            rows="3"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="submit-loan-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
