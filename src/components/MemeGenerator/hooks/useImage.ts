import { downScaleImage, getImageCanvas } from '@app/utils/downscaleImage';
import { getImageScale } from '@app/utils/getImageScale';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export function useImage() {
  const [image, setImage] = useState({ base64: '', width: 0, height: 0 });
  const [remoteUrl, setRemoteUrl] = useState('');

  const selectImage = useCallback(async (file: File | string) => {
    let imgFile: Blob;
    if (typeof file === 'string') {
      if (!file.startsWith('http://') && !file.startsWith('https://')) {
        return;
      }

      try {
        const res = await fetch(file);
        imgFile = await res.blob();
        console.log('🔥', 'eut?', res);
      } catch (e) {
        console.log('🔥', 'wroong', e);
        toast.error('Failed to load image from url');
        return;
      }
    } else {
      imgFile = file;
    }
    console.log('🔥', 'load start', imgFile);
    const image = await loadImage(imgFile);
    console.log('🔥i', image);
    const imgDimensions = getDimensions(image);
    console.log('🔥', imgDimensions);
    const scale = getImageScale(imgDimensions.width, imgDimensions.height);

    if (scale < 1) {
      console.log('🔥scale:', scale);
      const cv = downScaleImage(image, scale);
      console.log('🔥', 'scaled:', cv.width, cv.height);
      const base64 = cv.toDataURL('image/jpeg');
      console.log('🔥', base64);
      setImage({ ...imgDimensions, base64 });
    } else {
      const base64 = getImageCanvas(image).toDataURL('image/jpeg');
      setImage({ ...imgDimensions, base64 });
    }
  }, []);

  const loadImage = async (file: Blob | string) => {
    const url = typeof file === 'string' ? file : URL.createObjectURL(file);
    const img = new Image();
    // img.setAttribute('crossOrigin', '');

    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    });
    img.src = url;
    await imgLoadPromise;

    return img;
  };

  const getDimensions = (img: HTMLImageElement) => {
    return { width: img.naturalWidth, height: img.naturalHeight };
  };

  useEffect(() => {
    if (remoteUrl) {
      console.log('🔥', 'remote set');
      selectImage(remoteUrl);
    }
  }, [remoteUrl, selectImage]);

  return { image, selectImage, remoteUrl, setRemoteUrl };
}
