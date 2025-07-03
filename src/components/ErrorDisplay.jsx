// src/components/ErrorDisplay.jsx
import React from 'react';

const ErrorDisplay = ({ message }) => {
  return (
    <div className="alert alert-danger text-center" role="alert">
      {message}
    </div>
  );
};

export default ErrorDisplay;
