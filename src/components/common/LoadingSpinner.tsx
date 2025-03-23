import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full my-auto">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
  </div>
);

export default LoadingSpinner;