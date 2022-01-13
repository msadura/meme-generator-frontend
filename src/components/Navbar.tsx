import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MetamaskButton from '@app/blockchain/MetamaskButton';
import LogoImg from '@public/fmn_logo.png';
import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import LogoText from '@app/components/LogoText/LogoText';
import Button from '@app/components/Button/Button';
import { useRouter } from 'next/router';
import RocketColorIcon from '@public/rocket-color.svg';
import { NetworkButton } from '@app/components/NetworkButton/NetworkButton';

export const Navbar = () => {
  const { pathname } = useRouter();
  const isOnMainPage = pathname === '/';

  return (
    <>
      <nav className="w-full top-0 left-0 right-0 z-50 flex items-center flex-wrap justify-between py-5 px-3 md:px-8 gap-5">
        <Link href="/">
          <a className="flex flex-row py-2 items-center relative">
            {/* <Image src={LogoImg} width={60} height={60} alt="logo" /> */}
            <LogoText />
            <span className="ml-3 text-lg md:text-xl font-semibold tracking-wider text-secondary uppercase tracking-widest font-salt">
              NFT Meme Generator
            </span>
            <div className="badge badge-primary absolute -right-2 -bottom-2 md:bottom-4 transform rotate-12">
              BETA
            </div>
          </a>
        </Link>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          {!isOnMainPage && (
            <Link href="/">
              <a>
                <Button className="btn-accent">
                  {/* <Image src={RocketColorIcon} width={25} height={25} alt="Add meme" /> */}
                  <span className="ml-2">CREATE MEME</span>
                </Button>
              </a>
            </Link>
          )}
          <MetamaskButton />
          <SocialIcons />
        </div>
      </nav>
    </>
  );
};
