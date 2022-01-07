import Spinner from '@app/components/Spinner';
import React from 'react';
import Image from 'next/image';
import LogoImg from '@public/dac-logo-border.png';

export default function MemePageFallback(): JSX.Element | null {
  return (
    <div className="bg-base-300 min-h-screen w-full main-bg">
      <main
        className="w-screen h-screen text-white-primary mx-auto px-0 md:px-5 
        flex flex-1 items-center justify-center flex-col gap-3">
        <div className="w-1/4 h-1/4 relative">
          <Image src={LogoImg} layout="fill" objectFit="contain" alt="DAC MEME" />
        </div>
        <p className="text-lg font-salt uppercase">Meme is loading</p>
        <Spinner />
      </main>
    </div>
  );
}
