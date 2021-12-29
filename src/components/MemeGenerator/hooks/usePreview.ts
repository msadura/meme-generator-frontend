import { MemeImage } from '@app/components/MemeGenerator/hooks/useImage';
import { MemeText } from '@app/components/MemeGenerator/hooks/useText';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  drawer: ethers.Contract | null;
  text: MemeText;
  image: MemeImage;
};

export function usePreview({ drawer, image, text }: Props) {
  const [preview, setPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadPreview = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await drawer?.getMemeSvg([
        image.base64,
        image.width,
        image.height,
        text.top,
        text.bottom,
        text.size,
        text.color,
        text.stroke
      ]);
      console.log('🔥', 'prev loaded', res);
      setPreview(`data:image/svg+xml,${encodeURIComponent(res)}`);
    } catch (e) {
      console.log('🔥', 'fail');
    } finally {
      setIsLoading(false);
    }
  }, [
    drawer,
    image.base64,
    image.height,
    image.width,
    text.bottom,
    text.color,
    text.size,
    text.stroke,
    text.top
  ]);

  useEffect(() => {
    if (image.base64) {
      loadPreview();
    } else {
      setPreview('');
    }
  }, [image.base64, image.height, image.width, loadPreview]);

  return { preview, isLoading };
}
