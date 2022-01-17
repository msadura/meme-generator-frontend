import React, { useEffect, useState, useRef } from 'react';
import ChevronImg from '@public/chevron-right.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Spinner from '@app/components/Spinner';
import { useRouter } from 'next/router';

type Props = {
  id: number;
};

export default function MemeNav({ id }: Props): JSX.Element {
  const { totalSupply } = useMeme();
  const [isNextLoading, setIsNextLoading] = useState(false);
  const [isPrevLoading, setIsPrevLoading] = useState(false);

  const router = useRouter();

  const navCallback = useRef(() => {
    setIsNextLoading(false);
    setIsPrevLoading(false);
  }).current;

  useEffect(() => {
    router.events.on('routeChangeComplete', navCallback);

    return () => {
      router.events.off('routeChangeStart', navCallback);
    };
  }, [navCallback, router.events]);

  return (
    <>
      {id > 1 && (
        <Link href={`${id - 1}`}>
          <a onClick={() => setIsPrevLoading(true)}>
            <div className="z-20 fixed left-0 top-1/2 w-7 h-14 md:w-10 md:h-20 bg-primary rotate-180 flex items-center justify-center cursor-pointer rounded">
              {!isPrevLoading && <Image src={ChevronImg} alt="previous" />}
              {isPrevLoading && <Spinner className="-mr-1" />}
            </div>
          </a>
        </Link>
      )}
      {id < totalSupply && (
        <Link href={`${id + 1}`}>
          <a onClick={() => setIsNextLoading(true)}>
            <div className="z-20 fixed right-0 top-1/2 w-7 h-14 md:w-10 md:h-20 bg-primary flex items-center justify-center cursor-pointer rounded">
              {!isNextLoading && <Image src={ChevronImg} alt="next" />}
              {isNextLoading && <Spinner className="-mr-1" />}
            </div>
          </a>
        </Link>
      )}
    </>
  );
}
