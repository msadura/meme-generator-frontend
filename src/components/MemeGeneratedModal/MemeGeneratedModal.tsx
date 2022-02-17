import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import Img from 'next/image';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Button from '@app/components/Button/Button';
import Link from 'next/link';
import ShareSection from '@app/components/ShareSection/ShareSection';
import { Dialog, Transition } from '@headlessui/react';
import { Modal } from '@app/components/Modal/Modal';

type Props = {
  onMakeAnother: () => void;
};

export function MemeGeneratedModal({ onMakeAnother }: Props): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const { getImageUrl, setBackgroundImg, bgImg } = useCanvas();
  const { lastMintedId, resetLastMinted } = useMeme();
  const img = getImageUrl();

  const makeAnother = () => {
    setBackgroundImg(null);
    resetLastMinted();
    onMakeAnother?.();
  };

  useEffect(() => {
    if (lastMintedId && img && bgImg) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [img, bgImg, lastMintedId]);

  if (!isOpen || !img || !bgImg) {
    return null;
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-col max-w-lg mx-auto">
        <div className="text-xl font-salt items-center justify-center p-3 pb-5">
          <p className="text-center">Bro, that&apos;s sick!</p>
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
    </Modal>
  );
}
