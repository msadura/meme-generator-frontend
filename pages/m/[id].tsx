import { Navbar } from '@app/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { loadMetadata } from '@app/api/loadMetadata';
import { HOST_URL, IMAGE_PATH, IPFS_IMAGE_BASE } from '@app/constants';
import { getImageUrl } from '@app/utils/getImageUrl';
import ShareSection from '@app/components/ShareSection/ShareSection';
import MemeNav from '@app/components/MemeNav/MemeNav';
import { loadTotalSupply } from '@app/api/loadTotalSupply';
import { Meme } from '@app/types';
import Image from 'next/image';
import Spinner from '@app/components/Spinner';
import MemePageFallback from '@app/components/MemePageFallback/MemePageFallback';
import { useState, useEffect } from 'react';
import LogoText from '@app/components/LogoText/LogoText';
import { useMemeImage } from '@app/hooks/useMemeImage';

type Props = {
  meme: Meme;
};

const MemePage: NextPage<Props> = ({ meme }) => {
  const router = useRouter();
  const { isLoaded, url, onError, onLoad } = useMemeImage(meme?.imageHash);

  if (router.isFallback) {
    return <MemePageFallback />;
  }

  return (
    <div className="bg-base-300 min-h-screen w-full flex flex-col main-bg">
      <Head>
        <title>{meme.name}</title>
        <meta
          name="description"
          content="NFT Meme Generator by Doge Art Club. Mint memes as NFTs without coding, for free."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content={`${IPFS_IMAGE_BASE}${meme.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meme.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="og:description"
          content="NFT Meme Generator by Doge Art Club. Mint memes as NFTs without coding, for free."
        />
        <meta property="og:image" content={`${HOST_URL}${IMAGE_PATH}${meme.imageHash}`} />
      </Head>

      <Navbar />
      <main className="text-white-primary px-0 md:px-5 flex flex-1 flex-col h-screen">
        <p className="text-lg font-salt text-center">{meme.name}</p>
        <div className="mx-auto flex flex-1 w-full">
          {!!meme.width && !!meme.height && (
            <div className="flex flex-1 items-center justify-center relative my-5">
              <div
                className="relative flex flex-1 w-full h-full min-h-[60vh] md:min-h-0"
                style={{ maxWidth: meme.width, maxHeight: meme.height }}>
                <div className="z-20">
                  <Image
                    key={url}
                    src={url}
                    onLoadingComplete={onLoad}
                    onError={onError}
                    layout="fill"
                    alt={meme.name}
                    loading="eager"
                    objectFit="contain"
                    objectPosition="center center"
                  />
                </div>

                {/* <img
                  src={getImageUrl(meme.imageHash)}
                  alt={meme.name}
                  className="max-w-full object-contain mx-auto relative z-10"
                  // onLoad={() => setLoaderHidden(true)}
                /> */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-5">
                    <div className="relative opacity-40">
                      <LogoText className="!w-40 opacity-50" />
                    </div>
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          )}
          {(!meme.width || !meme.height) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getImageUrl(meme.imageHash)}
              alt={meme.name}
              className="max-w-full object-contain mx-auto my-5"
            />
          )}
        </div>

        <div>
          <div className="flex-1 max-w-2xl flex-col mx-auto px-3">
            {<ShareSection id={meme.id} />}
          </div>
        </div>

        <MemeNav id={meme.id} />
      </main>
      <footer className="flex flex-row items-center justify-center p-5">
        <div className="text-white-secondary">©dogeartclub 2021.</div>
      </footer>
    </div>
  );
};

export async function getStaticPaths() {
  const totalSupply = await loadTotalSupply();
  type Path = { params: { id: string } };
  let paths: Path[] = [];
  if (totalSupply > 0) {
    paths = new Array(totalSupply).fill(true).map((_, i) => ({ params: { id: String(i + 1) } }));
  }

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  let meme: Meme | null = null;

  try {
    meme = await loadMetadata(Number(id));
  } catch (e) {
    console.log('🔥', e);
  }

  if (!meme) {
    return { notFound: true };
  }

  return {
    props: { meme }
  };
}

export default MemePage;
