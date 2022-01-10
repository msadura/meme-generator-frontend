import pinataSDK from '@pinata/sdk';

export const pinata = pinataSDK(
  process.env.PINATA_KEY as string,
  process.env.PINATA_SECRET as string
);

export async function testAuth() {
  return pinata
    .testAuthentication()
    .then((result) => {
      //handle successful authentication here
      console.log(result);
    })
    .catch((err) => {
      //handle error here
      console.log(err);
    });
}

export async function upload(file: any) {
  const res: any = await pinata.pinFileToIPFS(file);
  return { hash: res.IpfsHash, isDuplicate: res.isDuplicate };
}
