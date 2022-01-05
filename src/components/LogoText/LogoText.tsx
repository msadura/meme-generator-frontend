import React from 'react';
import LogoImg from '@public/dac-logo-text.png';
import Logo2Img from '@public/dac-logo-border.png';
import Link from 'next/link';
import Image from 'next/image';

export default function LogoText(): JSX.Element {
  return (
    <Link href="/" passHref>
      <div className="relative flex w-10 md:w-24">
        <Image src={Logo2Img} alt="DAC" />
      </div>
    </Link>
  );
}
