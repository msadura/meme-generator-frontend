import { ethers } from 'ethers';

export function tokenDisplay(value: string | number | ethers.BigNumber | null) {
  let val: string | number = 0;
  if (value !== null && ethers.BigNumber.isBigNumber(value)) {
    val = ethers.utils.formatEther(value);
  } else if (value == null) {
    return '-';
  } else {
    val = value;
  }

  return Number(val).toFixed(2);
}
