import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import getErrorMessage from './getErrorMessage';

export type TxStatus = 'pending' | 'success' | 'error' | null;

type Props = {
  onSuccess?: () => void;
  onError?: (msg?: string) => void;
  onPending?: () => void;
};

export default function usePendingTx({ onSuccess, onError, onPending }: Props) {
  const [tx, setTx] = useState<ethers.providers.TransactionResponse | null>(null);
  const [status, setStatus] = useState<TxStatus>(null);
  const [message, setMessage] = useState('');

  const setTransaction = (tx: ethers.providers.TransactionResponse | null) => {
    setStatus('pending');
    onPending?.();
    setMessage('');
    setTx(tx);
  };

  useEffect(() => {
    if (!tx) {
      return;
    }

    const handlePending = async () => {
      try {
        await tx.wait();
        setStatus('success');
        onSuccess?.();
      } catch (e) {
        setStatus('error');

        const msg = getErrorMessage(e);
        setMessage(msg);
        onError?.(msg);
      }
    };

    handlePending();
  }, [onError, onSuccess, tx]);

  return {
    tx,
    setTransaction,
    status,
    message,
    isPending: status === 'pending',
    isError: status === 'error',
    isSuccess: status === 'success'
  };
}
