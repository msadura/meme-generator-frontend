import { SecondaryBox } from '@app/components/SecondaryBox/SecondaryBox';
import SocialIcons from '@app/components/SocialIcons/SocialIcons';
import { DAC_URL } from '@app/constants';
import Image from 'next/image';
import React from 'react';
import DAC from '@public/dac-logo-border.png';

export function Footer(): JSX.Element {
  return (
    <footer className="flex flex-1 flex-col md:flex-row items-center justify-between p-5 gap-5">
      <div>
        <div className="flex flex-col flex-1">
          <p className="text-lg text-primary-content font-semibold">Powered by:</p>
          <a
            className="w-[150px] p-3 bg-white rounded inline-flex items-center"
            href="https://polygon.technology/"
            title="View on OpenSea"
            target="_blank"
            rel="noreferrer">
            <Image
              src="https://docs.polygon.technology/img/polygon/polygon-logo.webp"
              alt="Polygon Technology"
              width={145}
              height={32}
            />
          </a>
        </div>
      </div>
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
