import { useLatestMemes } from '@app/components/LatestMemes/LatestMemesProvider';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Link from 'next/link';
import React from 'react';

export function LatestMemes() {
  const { latest } = useLatestMemes();

  if (!latest?.length) {
    return null;
  }

  const lastId = latest[latest.length - 1].id;

  return (
    <div className="flex flex-1 mt-5">
      <Link href={`/m/${lastId}`}>
        <a className="text-lg text-primary-content py-3 font-semibold underline">
          View latest memes »
        </a>
      </Link>
    </div>
  );
}
