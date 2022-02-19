import { SecondaryBox } from '@app/components/SecondaryBox/SecondaryBox';
import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import { DAC_URL } from '@app/constants';
import Image from 'next/image';
import React from 'react';
import DAC from '@public/dac-logo-border.png';

export function Footer(): JSX.Element {
  return (
    <footer className="flex flex-1 flex-col md:flex-row items-center justify-between p-5 gap-5">
      <div></div>
      <div className="text-white-secondary justify-center">
        <a className="hover:underline" href="https://dogeartclub.com">
          ©dogeartclub.com 2021.
        </a>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3">
        <span>Connect with us:</span>
        <a
          className="inline-flex"
          href={DAC_URL}
          title="View on OpenSea"
          target="_blank"
          rel="noreferrer">
          {/* <SecondaryBox className="!px-2 !py-2">Doge Art Club</SecondaryBox> */}
          <Image src={DAC} alt="DOge Art Club" width={40} height={40} />
        </a>
        <SocialIcons />
      </div>
    </footer>
  );
}
