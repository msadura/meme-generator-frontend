import { useContext } from 'react';

import { BlockchainContext } from './BlockchainContext';

export const useBlockchain = () => useContext(BlockchainContext);

export default useBlockchain;
