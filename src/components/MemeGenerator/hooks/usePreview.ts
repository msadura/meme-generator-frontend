import { EMPTY_MEME_IMAGE, MemeImage } from '@app/components/MemeGenerator/hooks/useImage';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { toast } from 'react-toastify';
import { usePublicProvider } from '@app/components/PublicProvider/PublicProvider';
import { useDrawer } from '@app/hooks/useDrawer';

type Props = {
  drawer: ethers.Contract | null;
  text: any;
  image: MemeImage;
};

export function usePreview({ image, text }: Props) {
  const [preview, setPreview] = useState<MemeImage>(EMPTY_MEME_IMAGE);
  const { signer } = useBlockchain();
  const [isLoading, setIsLoading] = useState(false);
  const publicProvider = usePublicProvider();
  const drawer = useDrawer(publicProvider);

  const loadPreview = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!drawer) {
        return;
      }

      const res = await drawer?.getMemeImage([
        image.base64,
        image.width,
        image.height,
        text.top,
        text.bottom,
        text.size,
        text.color,
        text.stroke
      ]);

      setPreview({ base64: res, width: image.width, height: image.height });
    } catch (e) {
      toast.error('Failed to load meme preview from chain');
      setPreview(EMPTY_MEME_IMAGE);
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
      setPreview(EMPTY_MEME_IMAGE);
    }
  }, [image.base64, image.height, image.width, loadPreview, signer]);

  return { preview, isLoading };
}
