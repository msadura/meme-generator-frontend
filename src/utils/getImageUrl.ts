import { FILE_EXTENSION, IMG_CLOUDFRONT, MEME_CLOUDFRONT_PATH } from '@app/constants';
import { IPFS_IMAGE_BASE } from '@app/constants';

export function getImageUrl(hash: string, useGateway = true) {
  if (useGateway) {
    return `${IPFS_IMAGE_BASE}${hash}`;
  }

  return `${IMG_CLOUDFRONT}${MEME_CLOUDFRONT_PATH}${hash}${FILE_EXTENSION}`;
}
