import { Meme } from '@app/types';
import React, { useEffect, useState } from 'react';
import Logo2Img from '@public/dac-logo-border.png';
import OpenseaImg from '@public/opensea.svg';
import CopyImg from '@public/copy.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { MEME_PATH, OPENSEA_BASE } from '@app/constants';
import { CONTRACTS } from '@app/addresses';
import Button from '@app/components/Button/Button';

type Props = {
  id: number;
};

export default function ShareSection({ id }: Props): JSX.Element {
  const [memeUrl, setMemeUrl] = useState('');
  const openseaUrl = `${OPENSEA_BASE}${CONTRACTS.nft}/${id}`;

  useEffect(() => {
    const mUrl = `${window?.location.origin}/${MEME_PATH}${id}`;
    if (mUrl) {
      setMemeUrl(mUrl);
    }
  }, [id]);

  const copyShareUrl = async (url: string) => {
    try {
      // This will work only on https:// !!
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard');
    } catch (e) {
      toast.error('Could not copy link.');
    }
  };
  return (
    <>
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
                className="btn btn-square btn-accent text-primary-content"
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
            <div className="flex flex-1 truncate mr-2">
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
                className="btn btn-square btn-accent text-primary-content"
                onClick={() => copyShareUrl(openseaUrl)}>
                <div className="relative w-5 h-5">
                  <Image src={CopyImg} alt="copy" layout="fill" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
