import React from 'react';
import { Navigate } from 'react-router-dom';
import { FaExclamationCircle } from 'react-icons/fa';

// Higher-order component (HOC) for handling authentication
const withAuth = (Component) => {
  return (props) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      // Render a message and an icon if authentication token doesn't exist
      return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
          <FaExclamationCircle size={50} style={{ color: 'red' }} />
          <p style={{ fontSize: '20px', marginTop: '10px' }}>You're not authorized. Please sign in.</p>
        </div>
      );
    }
    // Render the component with authentication token as prop
    return <Component authToken={authToken} {...props} />;
  };
};

export default withAuth;
