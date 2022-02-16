// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next';
import { loadLatestMetadata } from '@app/api/loadLatestMetadata';
import { Meme } from '@app/types';

type Data =
  | Meme[]
  | null
  | {
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Wrong method.' });
    return;
  }

  try {
    const memes = await loadLatestMetadata();
    res.setHeader('Content-Type', 'image/jpg');
    res.status(200);
    res.send(memes);
  } catch (e: any) {
    const msg = typeof e === 'string' ? e : e.message;
    res.status(400).json({ message: msg || 'Wrong params.' });
  }
}
