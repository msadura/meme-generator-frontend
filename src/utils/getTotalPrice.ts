import { ethers } from 'ethers';

export function getTotalPrice(
  unitPrice: ethers.BigNumber | null,
  quantity: number,
  formatted?: boolean
) {
  if (!unitPrice) {
    return '-';
  }

  const total = unitPrice.mul(ethers.BigNumber.from(quantity.toString()));
  return formatted ? ethers.utils.formatEther(total) : total;
}
