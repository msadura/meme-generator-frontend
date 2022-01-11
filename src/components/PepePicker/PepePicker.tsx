import Image from 'next/image';
import React from 'react';
import { PEPE_IMAGES } from './pepePicker.consts';

type Props = {
  onSelect: (img: string) => void;
};

export default function PepePicker({ onSelect }: Props): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2">
      {PEPE_IMAGES.map((img) => (
        <div
          className="w-24 h-24 cursor-pointer mb-3 transition-transform hover:scale-125"
          key={img.src}
          onClick={() => onSelect(img.src)}>
          <Image src={img} alt="pepe" />
        </div>
      ))}
    </div>
  );
}
