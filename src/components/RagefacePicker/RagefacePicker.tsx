import Image from 'next/image';
import React from 'react';
import { RAGEFACE_IMAGES } from './ragefacePicker.consts';

type Props = {
  onSelect: (img: string) => void;
};

export default function RagefacePicker({ onSelect }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {RAGEFACE_IMAGES.map((img) => (
        <div
          className="w-24 h-24 cursor-pointer mb-3 transition-transform hover:scale-125 relative"
          key={img.src}
          onClick={() => onSelect(img.src)}>
          <Image src={img} alt="rageface" layout="fill" objectFit="contain" />
        </div>
      ))}
    </div>
  );
}
