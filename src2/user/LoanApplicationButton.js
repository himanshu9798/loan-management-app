// src/components/LoanApplicationButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoanApplicationButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/apply-loan');
  };

  return (
    <button className="apply-loan-btn" onClick={handleClick}>
      Apply for New Loan
    </button>
  );
};

export default LoanApplicationButton;
