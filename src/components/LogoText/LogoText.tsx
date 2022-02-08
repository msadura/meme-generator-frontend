import React from 'react';
import LogoImg from '@public/dac-logo-text.png';
import Logo2Img from '@public/DAC.svg';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

type Props = {
  className?: string;
};

export default function LogoText({ className }: Props): JSX.Element {
  return (
    <Link href="/" passHref>
      <a className={classNames('relative flex w-32 lg:w-44', className)}>
        <Image src={Logo2Img} alt="DAC" />
      </a>
    </Link>
  );
}
