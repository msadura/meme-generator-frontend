// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { pinata, testAuth, upload } from '@app/utils/pinata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import { v4 as uuid } from 'uuid';

type Data =
  | {
      imgData: string;
    }
  | {
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Wrong method.' });
    return;
  }

  try {
    const body = JSON.parse(req.body.body);
    const img = body.img;
    const data = img.replace(/^data:image\/(.*);base64,/, '');
    const buff = Buffer.from(data, 'base64');
    const stream = Readable.from(buff);
    (stream as any).path = `${uuid()}.jpeg`;
    const hash = await upload(stream);
    const imgData = `ipfs://${hash}`;

    res.status(200).json({ imgData });
  } catch (e: any) {
    console.log('🔥', e);
    const msg = typeof e === 'string' ? e : e.message;
    res.status(400).json({ message: msg || 'Wrong params.' });
  }
}
