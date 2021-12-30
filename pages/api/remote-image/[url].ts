// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data =
  | {
      imgData: string;
    }
  | {
      message: string;
    };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ message: 'No url provided.' });
    return;
  }

  try {
    const response = await axios.get(decodeURI(url as string), { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const imgData = `data:image/jpg;base64,${base64}`;
    res.status(200).json({ imgData });
  } catch (e) {
    res.status(403).json({ message: 'Your image could not be load.' });
  }
}
