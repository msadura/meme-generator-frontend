import Button from '@app/components/Button/Button';
import React, { useEffect, useRef } from 'react';
import { useImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { Canvas } from '@app/components/Canvas/Canvas';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import TrashIcon from '@public/trash.svg';
import HelpIcon from '@public/help.svg';

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
import { DAC_URL, OPENSEA_COLLECTION } from '@app/constants';
import { Faq } from '@app/components/Faq/Faq';
import MetamaskButton from '@app/blockchain/MetamaskButton';
import { StickerImagePicker } from '@app/components/StickerImagePicker/StickerImagePicker';
import { SecondaryBox } from '@app/components/SecondaryBox/SecondaryBox';
import { LatestMemes } from '@app/components/LatestMemes/LatestMemes';
import { useGlobal } from '@app/components/GlobalProvider/GlobalProvider';

type Props = {
  scrollToFaq: () => void;
};
export function MemeGenerator({ scrollToFaq }: Props): JSX.Element {
  const { image, selectImage, remoteUrl, setRemoteUrl, clearImage } = useImage();
  const { hasMemeSelected, bgImg, getImageUrl, setBackgroundImg, addImage } = useCanvas();
  const { isConnectedWithWeb3, isWrongChain } = useBlockchain();
  const { generate, isUploading, isMinting } = useMeme();
  const { themes } = useLoadThemes();
  const stickerImage = useImage(addImage);
  const { setOnNavLogoClick } = useGlobal();

  useEffect(() => {
    setOnNavLogoClick(clearImage);

    return () => setOnNavLogoClick(null);
  }, [clearImage, setOnNavLogoClick]);

  useEffect(() => {
    setBackgroundImg(image);
  }, [image, setBackgroundImg]);

  useResetLastMinted();

  return (
    <div className="flex-col generator-content">
      <div className="flex flex-col flex-1 md:flex-row gap-2">
        <div className="flex flex-col flex-initial md:w-[40%] gap-3 max-w-lg">
          {!hasMemeSelected && (
            <div className="flex flex-col flex-1 p-4">
              <div className="max-w-md">
                <h2 className="font-network text-3xl md:text-4xl text-primary-content py-1 lg:py-3 text-shadow-glow">
                  Hello Dog!
                </h2>
                <p className="text-lg py-2 lg:pb-10">
                  Unleash your inner Memelord and create the world&apos;s greatest memes! As NFTs.
                  For free.
                </p>
                <p className="text-lg py-3 pb-6 text-secondary-focus">
                  LFG? Then pick the image and let&apos;s roll! Wanna dive deeper?{' '}
                  <a className="link" onClick={scrollToFaq}>
                    Read more in FAQ
                  </a>
                  .
                </p>
              </div>
              <MemeBgImagePicker
                selectImage={selectImage}
                remoteUrl={remoteUrl}
                setRemoteUrl={setRemoteUrl}
              />

              <div className="flex flex-row flex-wrap justify-between items-center md:items-start gap-5 mt-5">
                <div className="flex flex-col flex-1">
                  <p className="text-lg text-primary-content py-3 font-semibold">Founded by:</p>
                  <a href={DAC_URL} title="View on OpenSea" target="_blank" rel="noreferrer">
                    <SecondaryBox className="!w-44 !px-0">Doge Art Club</SecondaryBox>
                  </a>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="text-lg text-primary-content py-3 font-semibold">
                    Visit our gallery:
                  </p>
                  <a
                    className="w-[150px]"
                    href={OPENSEA_COLLECTION}
                    title="View on OpenSea"
                    target="_blank"
                    rel="noreferrer">
                    <Image
                      src="https://storage.googleapis.com/opensea-static/Logomark/Badge%20-%20Available%20On%20-%20Dark.png"
                      alt="Available on OpenSea"
                      width={150}
                      height={53}
                    />
                  </a>
                </div>
              </div>
            </div>
          )}

          {hasMemeSelected && (
            <div className="flex flex-col p-4 rounded drop-shadow bg-base-300 bg-opacity-80 gap-3">
              <div className="flex flex-row justify-between items-center ">
                <span className="text-lg italic">Got your image? give it a bit of fun!</span>
                <span className="text-sm italic">
                  <a className="link inline-flex items-center gap-1" onClick={scrollToFaq}>
                    FAQ
                    <Image src={HelpIcon} width={20} height={20} />
                  </a>
                </span>
              </div>

              <Tabs />

              <StickerImagePicker selectImage={stickerImage.selectImage} />

              <Button onClick={clearImage}>
                <Image src={TrashIcon} width={15} height={15} />
                <span className="ml-3">Change image</span>
              </Button>

              {isConnectedWithWeb3 && !isWrongChain && (
                <Button
                  disabled={!isConnectedWithWeb3}
                  className={classNames(
                    'btn-primary flex mt-3',
                    (isUploading || isMinting) && 'loading'
                  )}
                  onClick={() =>
                    generate(getImageUrl(), { width: bgImg?.width, height: bgImg?.height })
                  }>
                  <Image src={RocketColorIcon} width={25} height={25} />
                  <span className="ml-3">
                    {!isConnectedWithWeb3 && 'CONNECT TO GENERATE'}
                    {isConnectedWithWeb3 && !isUploading && !isMinting && 'GENERATE MEME'}
                    {isUploading && 'UPLOADING'}
                    {isMinting && 'MINTING'}
                  </span>
                </Button>
              )}
              {(!isConnectedWithWeb3 || isWrongChain) && <MetamaskButton />}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col w-11/12 md:w-[60%] relative justify-center mx-auto">
          <Canvas className="flex flex-1 w-full h-full justify-center" />

          {!hasMemeSelected && (
            <div className="flex w-full h-full items-center justify-center min-h-[60vh] md:min-h-0">
              <ThemesGrid themes={themes} onSelect={(theme: Theme) => setRemoteUrl(theme.url)} />
            </div>
          )}
        </div>

        <MemeGeneratedModal onMakeAnother={clearImage} />
      </div>

      <div className="pl-2">
        <LatestMemes />
      </div>
    </div>
  );
}
