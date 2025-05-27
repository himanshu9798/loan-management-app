import React from "react";
import "./LoanApplications.css";

const UserLoan = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const user = loggedUser?.username || null;

  const loans = JSON.parse(localStorage.getItem("loans")) || [];

  const userLoans = loans.filter((loan) => loan.user === user);

  return (
    <div className="loan-applications-container">
      <h2>My Loan Applications</h2>
      {userLoans.length === 0 ? (
        <p>You have no loan applications yet.</p>
      ) : (
        <table className="loans-table">
          <thead>
            <tr>
              <th>Applied On</th>
              <th>Amount (₹)</th>
              <th>Tenure (months)</th>
              <th>Purpose</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userLoans.map((loan) => (
              <tr
                key={loan.id}
                // onClick={() => alert(`Loan status: ${loan.status}`)}
                style={{ cursor: "pointer" }}
              >
                <td>{loan.appliedOn}</td>
                <td>{loan.amount}</td>
                <td>{loan.tenure}</td>
                <td>{loan.purpose}</td>
                <td className={`status ${loan.status.toLowerCase()}`}>
                  {loan.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserLoan;
