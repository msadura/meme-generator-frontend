//@ts-ignore
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import LogoText from '@app/components/LogoText/LogoText';
import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import { useRouter } from 'next/router';
import MetamaskButton from '@app/blockchain/MetamaskButton';
import Button from '@app/components/Button/Button';

export const Navbar = () => {
  const { pathname } = useRouter();
  const isOnMainPage = pathname === '/';
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <nav className="w-full top-0 left-0 right-0 z-50 flex items-center flex-wrap py-5 px-3 md:px-8 gap-5">
        <div className="flex flex-1 flex-row items-center space-between">
          <Link href="/">
            <a className="flex flex-row py-2 items-center relative">
              {/* <Image src={LogoImg} width={60} height={60} alt="logo" /> */}
              <LogoText />
              <span className="ml-3 text-md md:text-2xl tracking-wider text-secondary-focus uppercase md:tracking-widest font-comic">
                NFT Meme Generator
              </span>
              <div className="badge badge-primary absolute -right-2 -bottom-2 md:bottom-4 transform rotate-12">
                BETA
              </div>
            </a>
          </Link>
          <button
            className="inline-flex p-3 hover:bg-primary rounded lg:hidden text-white ml-auto hover:text-white outline-none"
            onClick={handleClick}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
        <div
          className={`${
            active ? '' : 'hidden'
          } w-full lg:inline-flex lg:flex-grow lg:w-auto text-white py-5 md:py-0`}>
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
            <div className="flex flex-row justify-center flex-1 items-center w-full lg:inline-flex lg:w-auto gap-5">
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
              <SocialIcons />
              <MetamaskButton />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
