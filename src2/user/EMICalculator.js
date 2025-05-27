import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EMICalculator.css";
import dayjs from "dayjs";

const EMICalculator = () => {
  const navigate = useNavigate();

  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEMI = (e) => {
    e.preventDefault();

    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const N = parseInt(tenure);
    const R = annualRate / (12 * 100); // monthly rate

    if (!P || !R || !N || !startDate) {
      alert("Please fill all fields correctly.");
      return;
    }

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const breakdown = [];
    let balance = P;
    let currentDate = dayjs(startDate);

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principalPaid = emi - interest;
      balance -= principalPaid;

      breakdown.push({
        month: currentDate.format("MMMM YYYY"),
        emi: emi.toFixed(2),
        principal: principalPaid.toFixed(2),
        interest: interest.toFixed(2),
        balanceLeft: balance > 0 ? balance.toFixed(2) : "0.00",
      });

      currentDate = currentDate.add(1, "month");
    }

    setResult({
      emi: emi.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      startDate: dayjs(startDate).format("DD MMM YYYY"),
      endDate: currentDate.subtract(1, "month").format("DD MMM YYYY"),
      months: N,
    });

    setSchedule(breakdown);
  };

  return (
    <div className="emi-calculator-page">
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
          <div className="form-group">
            <label>EMI Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="calculate-btn">
            Calculate EMI
          </button>
        </form>
      </div>
      {result && (
        <div className="emi-result-container">
          <h3 className="result-title">📊 EMI Summary</h3>
          <div className="summary-cards">
            <div className="summary-card">
              <h4>Monthly EMI</h4>
              <p>₹{result.emi}</p>
            </div>
            <div className="summary-card">
              <h4>Total Interest</h4>
              <p>₹{result.totalInterest}</p>
            </div>
            <div className="summary-card">
              <h4>Total Payment</h4>
              <p>₹{result.totalPayment}</p>
            </div>
            <div className="summary-card">
              <h4>Start Date</h4>
              <p>{result.startDate}</p>
            </div>
            <div className="summary-card">
              <h4>End Date</h4>
              <p>{result.endDate}</p>
            </div>
          </div>

          <h3 className="schedule-heading">📅 Payment Schedule</h3>
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>EMI</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Balance Left</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.month}</td>
                  <td>₹{item.emi}</td>
                  <td>₹{item.principal}</td>
                  <td>₹{item.interest}</td>
                  <td>₹{item.balanceLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="back-btn" onClick={() => navigate("/user")}>
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
