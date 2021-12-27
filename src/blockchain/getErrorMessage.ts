import { serializeError } from 'eth-rpc-errors';

export default function getErrorMessage(e: any): string {
  const parsedError: any = serializeError(e);
  const originalError = parsedError?.data?.originalError;

  // User rejected
  if (e.code === 4001) {
    return '';
  }

  if (originalError) {
    if (originalError?.code === 'INSUFFICIENT_FUNDS') {
      return 'You do not have enough ETH for this transaction.';
    }

    if (originalError?.code === 'UNPREDICTABLE_GAS_LIMIT') {
      if (originalError.error?.message) {
        const msg = originalError.error?.message.replace('execution reverted:', '');
        return msg;
      }
    }
  }

  return 'Transaction error, something went wrong.';
}
