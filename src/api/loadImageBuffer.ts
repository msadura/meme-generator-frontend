import axios from 'axios';

export async function loadImageBufffer(hash: string) {
  const pinataBase = process.env.PINATA_GATEWAY;
  if (!pinataBase) {
    throw 'Pinata gateway is not set up!';
  }

  const pinataUrl = `${pinataBase}${hash}`;
  const res = await axios.get(pinataUrl, {
    responseType: 'arraybuffer'
  });

  const buffer = Buffer.from(res.data);
  return buffer;
}
