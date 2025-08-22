import React from 'react';

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-20 animate-fade-in-out">
      {message}
    </div>
  );
};

export default Notification;
