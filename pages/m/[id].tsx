import { Navbar } from '@app/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { loadMetadata } from '@app/api/loadMetadata';
import { HOST_URL, IMAGE_PATH, MEME_PATH } from '@app/constants';
import { getImageUrl } from '@app/utils/getImageUrl';
import ShareSection from '@app/components/ShareSection/ShareSection';
import MemeNav from '@app/components/MemeNav/MemeNav';
import { loadTotalSupply } from '@app/api/loadTotalSupply';
import { Meme } from '@app/types';

type Props = {
  meme: Meme;
};

const Home: NextPage<Props> = ({ meme }) => {
  return (
    <div className="bg-base-300 min-h-screen w-full main-bg">
      <Head>
        <title>{meme.name}</title>
        <meta name="description" content="Doge Art Club memes" />
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:url" content={`${HOST_URL}${MEME_PATH}${meme.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meme.name} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:description" content="First NFT memes in the world!" />
        <meta property="og:image" content={`${HOST_URL}${IMAGE_PATH}${meme.imageHash}`} />
      </Head>

      <Navbar />
      <main className="text-white-primary mx-auto px-0 md:px-5">
        <p className="text-lg font-salt text-center">{meme.name}</p>
        <div className="mx-auto">
          <img
            src={getImageUrl(meme.imageHash)}
            alt={meme.name}
            className="max-w-full object-contain mx-auto my-5"
          />
        </div>

        <div className="flex max-w-2xl flex-col flex-1 mx-auto px-3">
          {<ShareSection id={meme.id} />}
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

  const paths = new Array(totalSupply)
    .fill(true)
    .map((_, i) => ({ params: { id: String(i + 1) } }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: any) {
  const { id } = params;
  const meme = await loadMetadata(Number(id));

  return {
    props: { meme }
  };
}

export default Home;
