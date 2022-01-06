import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import Img from 'next/image';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Button from '@app/components/Button/Button';
import Link from 'next/link';
import Logo2Img from '@public/dac-logo-border.png';
import OpenseaImg from '@public/opensea.svg';
import CopyImg from '@public/copy.svg';
import Image from 'next/image';
import { MEME_PATH, OPENSEA_BASE } from '@app/constants';
import { toast } from 'react-toastify';
import { CONTRACTS } from '@app/addresses';

export function MemeGeneratedModal(): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false);
  const { getImageUrl, setBackgroundImg, bgImg } = useCanvas();
  const { lastMintedId } = useMeme();
  const img = getImageUrl();
  const [memeUrl, setMemeUrl] = useState('');
  const openseaUrl = `${OPENSEA_BASE}${CONTRACTS.nft}/${lastMintedId}`;

  const copyShareUrl = async (url: string) => {
    try {
      // This will work only on https:// !!
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch (e) {
      toast.error('Could not copy link.');
    }
  };

  const makeAnother = () => {
    setBackgroundImg(null);
  };

  useEffect(() => {
    if (lastMintedId && img && bgImg) {
      const mUrl = `${window?.location.origin}/${MEME_PATH}${lastMintedId}`;
      setMemeUrl(mUrl);
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
    <div className="fixed z-50 w-full h-full overflow-y-auto top-0 left-0 backdrop">
      <div className="m-3">
        <div className="flex flex-col bg-base-200 p-3 md:p-8 mt-20 rounded-md shadow-lg mx-auto max-w-xl">
          <div className="text-xl font-salt items-center justify-center p-3 pb-5">
            <p className="text-center">Nice piece of art!</p>
          </div>
          <div className="flex flex-1 relative items-center justify-center">
            <Img src={img} width={bgImg?.width} height={bgImg?.height} />
          </div>

          <div className="text-lg text-secondary italic items-center justify-center mt-3">
            <p className="">Share it with other doges:</p>
          </div>

          <div className="flex flex-col mt-3 mb-3 gap-3">
            <div className="flex flex-col md:flex-row flex-1 gap-0 md:gap-3">
              <div className="flex flex-row items-center gap-3">
                <div className="relative flex w-10">
                  <Image src={Logo2Img} alt="DAC" />
                </div>
                <div className="flex w-24">Meme link:</div>
              </div>

              <div className="flex flex-row flex-1 items-center truncate">
                <div className="flex flex-1 truncate">
                  <a
                    className="link link-primary truncate min-w-0"
                    href={memeUrl}
                    target="_blank"
                    rel="noreferrer">
                    {memeUrl}
                  </a>
                </div>

                <div data-tip="Copy meme link" className="tooltip tooltip-left">
                  <Button
                    class="btn btn-square btn-accent text-primary-content"
                    onClick={() => copyShareUrl(memeUrl)}>
                    <div className="relative w-5 h-5">
                      <Image src={CopyImg} alt="copy" layout="fill" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row flex-1 gap-0 md:gap-3">
              <div className="flex flex-row items-center gap-3">
                <div className="relative flex w-10">
                  <Image src={OpenseaImg} alt="Opensea" />
                </div>
                <div className="flex w-24">Opensea link:</div>
              </div>

              <div className="flex flex-row flex-1 items-center truncate">
                <div className="flex flex-1 truncate">
                  <a
                    className="link link-primary truncate min-w-0"
                    href={openseaUrl}
                    target="_blank"
                    rel="noreferrer">
                    {openseaUrl}
                  </a>
                </div>

                <div data-tip="Copy opensea link" className="tooltip tooltip-left">
                  <Button
                    class="btn btn-square btn-accent text-primary-content"
                    onClick={() => copyShareUrl(openseaUrl)}>
                    <div className="relative w-5 h-5">
                      <Image src={CopyImg} alt="copy" layout="fill" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>

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
