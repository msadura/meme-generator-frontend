import Button from '@app/components/Button/Button';
import React, { useEffect, useRef } from 'react';
import Img from 'next/image';
import { useImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { Canvas } from '@app/components/Canvas/Canvas';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import TrashIcon from '@public/trash.svg';

import RocketColorIcon from '@public/rocket-color.svg';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import { classNames } from '@app/utils/classNames';
import { MemeGeneratedModal } from '@app/components/MemeGeneratedModal/MemeGeneratedModal';
import useResetLastMinted from '@app/components/MemeGenerator/hooks/useResetLastMinted';
import { useLoadThemes } from '@app/components/ThemesGrid/hooks/useLoadThemes';
import { ThemesGrid } from '@app/components/ThemesGrid/ThemesGrid';
import { Theme } from '@app/types';
import MemeBgImagePicker from '@app/components/MemeBgImagePicker/MemeBgImagePicker';
import Tabs from '@app/components/Tabs/Tabs';
import Image from 'next/image';
import { OPENSEA_COLLECTION } from '@app/constants';
import { Faq } from '@app/components/Faq/Faq';

type Props = {
  scrollToFaq: () => void;
};
export function MemeGenerator({ scrollToFaq }: Props): JSX.Element {
  const { image, selectImage, remoteUrl, setRemoteUrl, clearImage } = useImage();
  const { hasMemeSelected, bgImg, getImageUrl, setBackgroundImg } = useCanvas();
  const { isConnectedWithWeb3 } = useBlockchain();
  const { generate, isUploading, isMinting } = useMeme();
  const { themes } = useLoadThemes();

  useEffect(() => {
    setBackgroundImg(image);
  }, [image, setBackgroundImg]);

  useResetLastMinted();

  return (
    <div className="flex flex-col flex-1 md:flex-row gap-5 generator-content ">
      <div className="flex flex-col flex-initial md:w-1/3 gap-3">
        {!hasMemeSelected && (
          <div className="flex flex-col flex-1">
            <div className="max-w-md">
              <h2 className="font-salt text-xl md:text-3xl underline text-primary py-3">
                Hello Dog!
              </h2>
              <p className="text-xl py-3 pb-10">
                Unleash your inner Memelord and create the world&apos;s greatest memes! As NFTs. For
                free.
              </p>
              <p className="text-lg text-secondary-focus py-3 pb-6">
                LFG? Then pick the image and let&apos;s roll! Wanna dive deeper?{' '}
                <a className="link" onClick={scrollToFaq}>
                  Read more
                </a>
                .
              </p>
            </div>
            <MemeBgImagePicker
              selectImage={selectImage}
              remoteUrl={remoteUrl}
              setRemoteUrl={setRemoteUrl}
            />

            <div className="flex flex-col flex-1 justify-center items-center md:items-start">
              <p className="text-lg text-accent-focus py-3 font-semibold">Visit our gallery:</p>
              <a href={OPENSEA_COLLECTION} title="View on OpenSea" target="_blank" rel="noreferrer">
                <Image
                  src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Dark.png"
                  alt="Available on OpenSea"
                  width={220}
                  height={78}
                />
              </a>
            </div>
          </div>
        )}

        {hasMemeSelected && (
          <>
            <span className="text-lg italic">Got your image? give it a bit of fun!</span>

            <Tabs />

            <Button onClick={clearImage}>
              <Img src={TrashIcon} width={20} height={20} />
              <span className="ml-3">Change image</span>
            </Button>

            <Button
              disabled={!isConnectedWithWeb3}
              className={classNames(
                'btn-primary flex mt-3',
                (isUploading || isMinting) && 'loading'
              )}
              onClick={() =>
                generate(getImageUrl(), { width: bgImg?.width, height: bgImg?.height })
              }>
              {isConnectedWithWeb3 && <Img src={RocketColorIcon} width={25} height={25} />}
              <span className="ml-3">
                {!isConnectedWithWeb3 && 'CONNECT TO GENERATE'}
                {isConnectedWithWeb3 && !isUploading && !isMinting && 'GENERATE MEME'}
                {isUploading && 'UPLOADING'}
                {isMinting && 'MINTING'}
              </span>
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col w-11/12 md:w-2/3 relative justify-center mx-auto">
        <Canvas className="flex flex-1 w-full h-full justify-center" />

        {!hasMemeSelected && (
          <div className="flex w-full h-full items-center justify-center md:min-h-0">
            <ThemesGrid themes={themes} onSelect={(theme: Theme) => setRemoteUrl(theme.url)} />
          </div>
        )}
      </div>

      <MemeGeneratedModal />
    </div>
  );
}
