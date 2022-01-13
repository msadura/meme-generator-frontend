import getErrorMessage from '@app/blockchain/getErrorMessage';
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
  const message = getErrorMessage(e);
  if (message) {
    toast.error(e.response?.data?.message || e.message || 'Unknown error 🐛');
  }
};
