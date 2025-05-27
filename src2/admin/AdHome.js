import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './adhome.css';

const AdHome = () => {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const allLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(allLoans);
  }, []);

  const uniqueUsers = [...new Set(loans.map(loan => loan.user))];

  const updateLoanStatus = (loanId, newStatus) => {
    const updatedLoans = loans.map(loan =>
      loan.id === loanId ? { ...loan, status: newStatus } : loan
    );
    setLoans(updatedLoans);
    localStorage.setItem("loans", JSON.stringify(updatedLoans));
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
    <h2>Admin Dashboard - Loan Applications</h2>
    <button className="logout-btn" onClick={handleLogout}>Logout</button>
  </div>

  <div className="admin-stats">
    <p><strong>Total Applicants:</strong> {uniqueUsers.length}</p>
  </div>

      {uniqueUsers.map((username, idx) => {
        const userLoans = loans.filter(loan => loan.user === username);
        return (
          <div className={`user-loans-card user-${idx}`} key={idx}>
            <h3>{username}'s Loan Applications</h3>
            <table className="user-loans-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Amount (₹)</th>
                  <th>Tenure</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Applied On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userLoans.map(loan => (
                  <tr key={loan.id}>
                    <td>{loan.id}</td>
                    <td>{Number(loan.amount).toLocaleString()}</td>
                    <td>{loan.tenure}</td>
                    <td>{loan.purpose}</td>
                    <td className={`statuss ${loan.status?.toLowerCase() || 'pending'}`}>
                      {loan.status || 'Pending'}
                    </td>
                    <td>{loan.appliedOn || "-"}</td>
                    <td>
                      <button className="approve-btn"
                        onClick={() => updateLoanStatus(loan.id, "Approved")}
                        disabled={loan.status === "Approved"}
                      >
                        Approve
                      </button>
                      <button className="reject-btn"
                        onClick={() => updateLoanStatus(loan.id, "Rejected")}
                        disabled={loan.status === "Rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default AdHome;
