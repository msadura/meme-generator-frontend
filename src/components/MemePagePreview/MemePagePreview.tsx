import Spinner from '@app/components/Spinner';
import React from 'react';

export default function MemePagePreview(): JSX.Element | null {
  return (
    <div className="bg-base-300 min-h-screen w-full main-bg">
      <main className="text-white-primary mx-auto px-0 md:px-5 flex flex-1 items-center jsutify-center">
        <p className="text-lg font-salt uppercase">Meme is loading</p>
        <Spinner />
      </main>
    </div>
  );
}
