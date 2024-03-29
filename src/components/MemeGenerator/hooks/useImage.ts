import { downScaleImage, getImageCanvas } from '@app/utils/downscaleImage';
import { getImageScale } from '@app/utils/getImageScale';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export type MemeImage = { base64: string; width: number; height: number };
export const EMPTY_MEME_IMAGE = { base64: '', width: 0, height: 0 };

export function useImage(onSelect?: (img: string | HTMLImageElement) => void) {
  const [image, setImage] = useState<MemeImage>({ base64: '', width: 0, height: 0 });
  const [remoteUrl, setRemoteUrl] = useState('');
  const [imgObject, setImgObject] = useState<null | HTMLImageElement>(null);

  const selectImage = useCallback(
    async (file: File | string) => {
      let imgFile: Blob;
      if (typeof file === 'string') {
        if (!file.startsWith('http://') && !file.startsWith('https://')) {
          return;
        }

        try {
          // Try to load image, if cors occur then use internal proxy
          const res = await fetch(file);
          imgFile = await res.blob();
        } catch (e) {
          try {
            imgFile = await loadImageProxy(file);
          } catch (e) {
            toast.error('Failed to load image from url');
            return;
          }
        }
      } else {
        imgFile = file;
      }

      if (!imgFile) {
        return;
      }

      const image = await loadImage(imgFile);
      setImgObject(image);

      const imgDimensions = getDimensions(image);
      const scale = getImageScale(imgDimensions.width, imgDimensions.height);

      let base64 = '';
      if (scale < 1) {
        const cv = downScaleImage(image, scale);
        base64 = cv.toDataURL('image/jpeg');
        setImage({ width: cv.width, height: cv.height, base64 });
      } else {
        base64 = getImageCanvas(image).toDataURL('image/jpeg');
        setImage({ ...imgDimensions, base64 });
      }
      onSelect?.(image);
    },
    [onSelect]
  );

  const loadImage = async (file: Blob | string) => {
    const url = typeof file === 'string' ? file : URL.createObjectURL(file);
    const img = new Image();
    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    });
    img.src = url;
    await imgLoadPromise;

    return img;
  };

  const loadImageProxy = async (url: string) => {
    const res = await fetch(`/api/remote-image/${encodeURIComponent(url)}`);
    if (!res.ok) {
      throw 'Image Failed to load';
    }
    const data = await res.json();
    return data.imgData;
  };

  const getDimensions = (img: HTMLImageElement) => {
    return { width: img.naturalWidth, height: img.naturalHeight };
  };

  const clearImage = useCallback(() => {
    setImage({ base64: '', width: 0, height: 0 });
    setRemoteUrl('');
    setImgObject(null);
  }, []);

  useEffect(() => {
    if (remoteUrl) {
      selectImage(remoteUrl);
    }
  }, [remoteUrl, selectImage]);

  return { image, selectImage, remoteUrl, setRemoteUrl, clearImage };
}
