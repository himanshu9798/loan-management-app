
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('New loan application received!');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <ToastContainer position="top-right" autoClose={5000} />;
};

export default Notifications;
