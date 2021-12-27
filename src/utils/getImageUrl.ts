import { IPFS_IMAGE_BASE } from '@app/constants';

export function getImageUrl(ipfsUrl: string) {
  if (!ipfsUrl.startsWith('ipfs://')) {
    return ipfsUrl;
  }

  const id = ipfsUrl.replace('ipfs://', '');
  return `${IPFS_IMAGE_BASE}${id}`;
}
