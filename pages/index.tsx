import { Navbar } from '@app/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import { MemeGenerator } from '@app/components/MemeGenerator/MemeGenerator';
import { CanvasProvider } from '@app/components/Canvas/CanvasProvider';
import { Faq } from '@app/components/Faq/Faq';
import { useRef } from 'react';
import { Footer } from '@app/components/Footer/Footer';
import { LatestMemesProvider } from '@app/components/LatestMemes/LatestMemesProvider';
import { IMG_CLOUDFRONT } from '@app/constants';

const Home: NextPage = () => {
  const faqRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen w-full flex flex-1 flex-col main-bg">
      <div className="bg-memes">
        <Head>
          <title>Proof of MEME</title>
          <meta
            name="description"
            content="Proof Of Meme - NFT Meme Generator by Doge Art Club. Mint memes as NFTs without coding, for free."
          />
          <link rel="icon" href="/favicon.ico" />

          <meta property="og:url" content="https://memes.art" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Proof of Meme" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            property="og:description"
            content="Proof Of Meme - NFT Meme Generator by Doge Art Club. Mint memes as NFTs without coding, for free."
          />
          <meta property="og:image" content={`${IMG_CLOUDFRONT}bg/memes.jpg`} />
        </Head>

        <Navbar />
        <main className="flex flex-1 text-white-primary flex-col gap-5">
          <div className="flex flex-1 flex-col px-3 md:pr-8 md:pl-4">
            <CanvasProvider>
              <MemeGenerator
                scrollToFaq={() =>
                  faqRef.current?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }
              />
            </CanvasProvider>

            <div ref={faqRef} className="flex mt-16">
              <Faq />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
