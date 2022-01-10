import { HOST_URL, IMAGE_PATH, IPFS_IMAGE_BASE } from '@app/constants';

export function getImageUrl(hash: string, host?: string, useGateway = true) {
  const hostUrl = host || HOST_URL;

  if (useGateway) {
    return `${IPFS_IMAGE_BASE}${hash}`;
  }

  return `${hostUrl}${IMAGE_PATH}${hash}`;
}
