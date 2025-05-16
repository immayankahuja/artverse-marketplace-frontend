
import React from 'react';
import { Navigate } from 'react-router-dom';

// We'll redirect from Index to Home since we're using Home as our main page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
