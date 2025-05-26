// src/components/EMICalculator.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EMICalculator.css";

const EMICalculator = () => {
  const navigate = useNavigate();

  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();

    const P = parseFloat(principal);
    const R = parseFloat(rate) / (12 * 100); // monthly interest rate
    const N = parseInt(tenure);

    if (!P || !R || !N) {
      alert("Please enter valid values");
      return;
    }

    // EMI formula
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="emi-calculator-container">
      <h2>EMI Calculator</h2>
      <form onSubmit={calculateEMI} className="emi-form">
        <div className="form-group">
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className="form-group">
          <label>Tenure (Months)</label>
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            required
            min="1"
          />
        </div>

        <button type="submit" className="calculate-btn">
          Calculate EMI
        </button>
      </form>

      {emi && (
        <div className="emi-result">
          <h3>Your EMI: ₹{emi}</h3>
        </div>
      )}

      <button className="back-btn" onClick={() => navigate("/user")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default EMICalculator;
