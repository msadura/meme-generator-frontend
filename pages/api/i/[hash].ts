// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pinata, testAuth, upload } from '@app/utils/pinata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';
import { ethers } from 'ethers';
import { CONTRACTS } from '@app/addresses';
import { nft } from '@app/abi';
import { loadImageBufffer } from '@app/api/loadImageBuffer';

type Data =
  | Buffer
  | {
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Wrong method.' });
    return;
  }

  const { hash } = req.query;
  if (!hash) {
    res.status(400).json({ message: 'No image hash provided.' });
    return;
  }

  try {
    const imgBuffer = await loadImageBufffer(hash as string);
    res.setHeader('Content-Type', 'image/jpg');
    res.status(200);
    res.send(imgBuffer);
  } catch (e: any) {
    const msg = typeof e === 'string' ? e : e.message;
    res.status(400).json({ message: msg || 'Wrong params.' });
  }
}
