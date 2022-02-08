import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Link from 'next/link';
import React from 'react';

export function LatestMemes() {
  const { totalSupply } = useMeme();
  if (!totalSupply) {
    return null;
  }

  return (
    <div className="flex flex-1 mt-5">
      <Link href="/m/1">
        <a className="text-lg text-primary-content py-3 font-semibold underline">
          View latest memes »
        </a>
      </Link>
    </div>
  );
}
