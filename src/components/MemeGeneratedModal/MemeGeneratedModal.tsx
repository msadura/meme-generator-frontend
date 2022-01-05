import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import Img from 'next/image';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Button from '@app/components/Button/Button';
import Link from 'next/link';

export function MemeGeneratedModal(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const { getImageUrl, setBackgroundImg, bgImg } = useCanvas();
  const { lastMintedId } = useMeme();
  const img = getImageUrl();

  const makeAnother = () => {
    setBackgroundImg(null);
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

  if (!isOpen || !img || !bgImg) {
    return null;
  }

  return (
    <div className="fixed z-50 w-screen h-screen overflow-y-auto top-0 left-0 backdrop">
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col bg-base-200 p-5 pt-20 mt-20 rounded-md shadow-lg self-center max-w-xl">
          <div className="flex flex-1 relative">
            <Img src={img} width={bgImg?.width} height={bgImg?.height} />
          </div>
          <div className="flex-col md:flex-row flex gap-5 mt-5">
            <Link href={`/m/${lastMintedId}`}>
              <a className="flex flex-1">
                <Button className="btn-primary flex flex-1">Go to image page</Button>
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
