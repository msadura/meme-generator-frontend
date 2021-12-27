import { Navbar } from '@app/components/Navbar';
import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '@app/components/Button/Button';
import { Header } from '@app/components/Header/Header';
import { MemeGenerator } from '@app/components/MemeGenerator/MemeGenerator';

const Home: NextPage = () => {
  return (
    <div className="bg-base-100 min-h-screen w-full flex flex-1 flex-col main-bg">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 text-white-primary flex-col gap-5 max-w-7xl mx-auto">
        <Navbar />
        <div className="flex items-center justify-center px-3 md:px-8">
          <MemeGenerator />
        </div>
      </main>
      <footer className="flex flex-row items-center justify-center p-5">
        <div className="text-white-secondary">©dogeartclub 2021.</div>
      </footer>
    </div>
  );
};

export default Home;
