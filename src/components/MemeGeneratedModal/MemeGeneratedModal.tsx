import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import Img from 'next/image';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Button from '@app/components/Button/Button';
import Link from 'next/link';
import ShareSection from '@app/components/ShareSection/ShareSection';

export function MemeGeneratedModal(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const { getImageUrl, setBackgroundImg, bgImg } = useCanvas();
  const { lastMintedId, resetLastMinted } = useMeme();
  const img = getImageUrl();

  const makeAnother = () => {
    setBackgroundImg(null);
    resetLastMinted();
  };

  useEffect(() => {
    if (lastMintedId && img && bgImg) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [img, bgImg, lastMintedId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isOpen || !img || !bgImg) {
    return null;
  }

  return (
    <div className="fixed z-50 w-full h-full overflow-y-auto top-0 left-0 backdrop">
      <div className="m-3">
        <div className="flex flex-col bg-base-200 p-3 md:p-8 mt-5 rounded-md shadow-lg mx-auto max-w-xl">
          <div className="text-xl font-salt items-center justify-center p-3 pb-5">
            <p className="text-center">Nice piece of art!</p>
          </div>
          <div className="flex flex-1 relative items-center justify-center">
            <Img src={img} width={bgImg?.width} height={bgImg?.height} />
          </div>

          <ShareSection id={lastMintedId} />

          <div className="flex-col md:flex-row flex gap-5 mt-5">
            <Link href={`/m/${lastMintedId}`}>
              <a className="flex flex-1">
                <Button className="btn-primary flex flex-1">Go to meme page</Button>
              </a>
            </Link>

            <Button className="btn-warning flex flex-1" onClick={() => makeAnother()}>
              Make another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
