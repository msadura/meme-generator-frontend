import { HOST_URL, IMAGE_PATH } from '@app/constants';

export function getImageUrl(hash: string, host?: string) {
  const hostUrl = host || HOST_URL;
  return `${hostUrl}${IMAGE_PATH}${hash}`;
}
