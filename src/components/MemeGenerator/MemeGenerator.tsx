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
import { MemeText } from '@app/components/MemeText/MemeText';
import MemeBgImagePicker from '@app/components/MemeBgImagePicker/MemeBgImagePicker';

export function MemeGenerator(): JSX.Element {
  const { image, selectImage, remoteUrl, setRemoteUrl, clearImage } = useImage();
  const { hasMemeSelected, bgImg, getImageUrl, setBackgroundImg } = useCanvas();
  const { isConnectedWithWeb3 } = useBlockchain();
  const { generate, isUploading, isMinting } = useMeme();
  const { themes } = useLoadThemes();
  console.log('🔥t', themes);

  useEffect(() => {
    setBackgroundImg(image);
  }, [image, setBackgroundImg]);

  useResetLastMinted();

  return (
    <div className="flex flex-col flex-1 md:flex-row gap-5">
      <div className="flex flex-col flex-initial md:w-1/3 gap-3">
        <MemeBgImagePicker
          selectImage={selectImage}
          remoteUrl={remoteUrl}
          setRemoteUrl={setRemoteUrl}
        />

        {hasMemeSelected && (
          <span className="text-lg italic">Got your image? give it a bit of fun!</span>
        )}

        <div className="tabs">
          <a className="tab tab-bordered flex-1">TEXT</a>
          <a className="tab tab-bordered flex-1 tab-lifted font-bold text-secondary-focus opacity-1 border-secondary-focus">
            PEPE
          </a>
          <a className="tab tab-bordered flex-1">FACES</a>
        </div>

        <MemeText />

        {hasMemeSelected && (
          <Button onClick={clearImage}>
            <Img src={TrashIcon} width={20} height={20} />
            <span className="ml-3">Change image</span>
          </Button>
        )}

        {hasMemeSelected && (
          <div className="flex flex-row gap-3">
            <Button
              disabled={!isConnectedWithWeb3}
              className={classNames(
                'btn-primary flex flex-1 mt-3',
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
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col w-11/12 md:w-2/3 relative justify-center mx-auto">
        <Canvas className="flex flex-1 w-full h-full justify-center" />

        {!hasMemeSelected && (
          <div className="flex w-full h-full items-center justify-center">
            <ThemesGrid themes={themes} onSelect={(theme: Theme) => setRemoteUrl(theme.url)} />
          </div>
        )}

        {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
          {isLoading && <Spinner className="w-16 h-16 md:w-28 md:h-28 text-primary" />}
        </div> */}
      </div>

      <MemeGeneratedModal />
    </div>
  );
}
