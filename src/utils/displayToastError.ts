import { toast } from 'react-toastify';

type Error = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};

export const displayToastError = (e: Error) => {
  toast.error(e.response?.data?.message || e.message || 'Unknown error 🐛');
};
