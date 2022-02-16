import LogoText from '@app/components/LogoText/LogoText';
import { Meme } from '@app/types';
import { getImageUrl } from '@app/utils/getImageUrl';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  meme: Meme;
  size?: number;
};

export const MemeThumb = ({ meme, size = 100 }: Props) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="relative rounded overflow-hidden bg-base-200 border border-solid border-accent drop-shadow-lg"
      style={{ width: size, height: size }}>
      <div className="relative z-50 w-full h-full">
        <Image
          src={getImageUrl(meme.imageHash, '', true)}
          layout="fill"
          objectFit="contain"
          objectPosition="center center"
          alt={meme.name}
          onLoadingComplete={() => setImgLoaded(true)}
          // TODO - load from cloudfront + onError ipfs
        />
      </div>

      {!imgLoaded && (
        <div className="absolute inset-0 z-10">
          <div className="relative flex items-center justify-center flex-col gap-3 w-full h-full">
            <LogoText className="!w-32 opacity-50 logoSpinner" />
          </div>
        </div>
      )}
    </div>
  );
};
