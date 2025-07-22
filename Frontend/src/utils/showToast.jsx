// src/utils/toastHelper.js
import { toast } from 'react-toastify';

export const showToast = (message, type = 'success') => {
  const options = {
    position: 'top-center',
    autoClose: 2000,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warn':
      toast.warn(message, options);
      break;
    default:
      toast(message, options);
  }
};
