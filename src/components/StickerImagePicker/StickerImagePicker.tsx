import { useFilePicker } from '@app/components/MemeGenerator/hooks/useFilePicker';
import React from 'react';
import AddImageIcon from '@public/add-image.svg';
import Button from '@app/components/Button/Button';
import Img from 'next/image';

type Props = {
  selectImage: (img: File | string) => void;
};

export function StickerImagePicker({ selectImage }: Props): JSX.Element {
  const { inputRef, onFileChange, openFilePicker } = useFilePicker(selectImage);

  return (
    <>
      <input
        type="file"
        id="meme-file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />

      <Button onClick={openFilePicker} className="btn-secondary">
        <Img src={AddImageIcon} width={25} height={25} />
        <span className="ml-3">Add your image / sticker</span>
      </Button>
    </>
  );
}
