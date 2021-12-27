import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MetamaskButton from '@app/blockchain/MetamaskButton';
import LogoImg from '@public/fmn_logo.png';
import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import LogoText from '@app/components/LogoText/LogoText';

export const Navbar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="w-full top-0 left-0 right-0 z-50 flex items-center flex-wrap justify-between py-5 px-3 md:px-8 gap-5">
        <Link href="/">
          <a className="flex flex-row py-2 items-center">
            {/* <Image src={LogoImg} width={60} height={60} alt="logo" /> */}
            <LogoText />
            <span className="ml-3 text-xl font-semibold tracking-wider text-secondary uppercase tracking-widest font-salt">
              Meme Generator
            </span>
          </a>
        </Link>
        <div className="flex flex-wrap gap-5 items-center justify-center">
          <MetamaskButton />
          <SocialIcons />
        </div>
      </nav>
    </>
  );
};
