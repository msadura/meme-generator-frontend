import { ethers } from 'ethers';

const getAccount = async (provider: ethers.providers.Web3Provider | null): Promise<string> => {
  await (provider?.provider as any).enable();
  const accounts = await provider?.listAccounts();

  return accounts ? accounts[0] : '';
};

export default getAccount;
