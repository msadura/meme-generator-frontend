// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { doesImageExist } from '@app/api/doesImageExist';
import { upload } from '@app/utils/pinata';
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
    const theme = body.theme || '';
    const hashtags = body.hashtags || [];

    const data = img.replace(/^data:image\/(.*);base64,/, '');
    const buff = Buffer.from(data, 'base64');
    const stream = Readable.from(buff);
    (stream as any).path = `${uuid()}.jpeg`;
    let imgData = '';

    const { hash, isDuplicate } = await upload(stream);
    imgData = `ipfs://${hash}`;

    if (isDuplicate) {
      const doesMemeExist = await doesImageExist(imgData);
      if (doesMemeExist) {
        throw 'This meme already exists!';
      }
    }

    res.status(200).json({ imgData });
  } catch (e: any) {
    const msg = typeof e === 'string' ? e : e.message;
    res.status(400).json({ message: msg || 'Wrong params.' });
  }
}
