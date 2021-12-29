import { MAX_IMAGE_SIZE } from '@app/constants';

export function getImageScale(width: number, height: number) {
  const size = width > height ? width : height;
  if (size <= MAX_IMAGE_SIZE) {
    return 1;
  }

  return MAX_IMAGE_SIZE / size;
}
