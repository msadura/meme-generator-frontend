import Spinner from '@app/components/Spinner';
import React from 'react';
import LogoText from '@app/components/LogoText/LogoText';

export default function MemePageFallback(): JSX.Element | null {
  return (
    <div className="bg-base-300 h-screen w-screen main-bg">
      <main
        className="w-screen h-screen text-white-primary mx-auto px-0 md:px-5 
        flex flex-1 items-center justify-center flex-col gap-3">
        <div className="w-1/4 h-1/4 relative flex items-center justify-center">
          <LogoText className="!w-60 opacity-50" />
        </div>
        <p className="text-3xl font-comic uppercase tracking-widest">Meme is loading</p>
        <Spinner />
      </main>
    </div>
  );
}
