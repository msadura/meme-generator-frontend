import { TOKEN_SYMBOL, ETH_SYMBOL } from '@app/constants';

export function getMintCurrencyLabel(currentCount: number, maxPaid: number) {
  return currentCount >= maxPaid ? TOKEN_SYMBOL : ETH_SYMBOL;
}
