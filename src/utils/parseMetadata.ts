import { Attribute, Meme } from '@app/types';

export function parseMetadata(metadataString: string, tokenId: number): Meme {
  const data = metadataString.replace(/^data:application\/json;base64,/, '');
  const buff = Buffer.from(data, 'base64');
  const metadata = JSON.parse(buff.toString());

  const theme = getTheme(metadata.attributes);
  //TODO - handle hashtags
  const hashtags: string[] = [];
  const imageHash = metadata.image.replace('ipfs://', '');

  return {
    id: Number(tokenId),
    imageHash,
    theme,
    hashtags,
    name: metadata.name,
    width: Number(metadata.width) || 0,
    height: Number(metadata.height) || 0
  };
}

function getTheme(attributes: Attribute[]) {
  const attr = attributes.find((a) => a.trait_type === 'Theme');
  return attr?.value || '';
}
