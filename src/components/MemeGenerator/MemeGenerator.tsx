import Button from '@app/components/Button/Button';
import { useDrawer } from '@app/hooks/useDrawer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Img from 'next/image';
import DogePlaceholder from '@public/doge1.png';
import { useImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useFilePicker } from '@app/components/MemeGenerator/hooks/useFilePicker';
import { useText } from '@app/components/MemeGenerator/hooks/useText';
import { ColorPicker } from '@app/components/ColorPicker/ColorPicker';
import Spinner from '@app/components/Spinner';
import { usePreview } from '@app/components/MemeGenerator/hooks/usePreview';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { Canvas } from '@app/components/Canvas/Canvas';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';

export function MemeGenerator(): JSX.Element {
  const { image, selectImage, remoteUrl, setRemoteUrl, clearImage } = useImage();
  const { setBackgroundImg, canDisplayCanvas } = useCanvas();
  const {
    size,
    color,
    setColor,
    stroke,
    textTop,
    textBottom,
    setTextTop,
    setTextBottom,
    setSize,
    setStroke,
    text
  } = useText();
  const { signer } = useBlockchain();
  const { inputRef, onFileChange, openFilePicker } = useFilePicker(selectImage);

  useEffect(() => {
    setBackgroundImg(image);
  }, [image, setBackgroundImg]);

  return (
    <div className="flex flex-col flex-1 md:flex-row gap-5">
      <div className="flex flex-col flex-initial md:w-1/3 gap-3">
        <span className="text-lg italic">
          Create your awesome meme!
          <br />
          First, let&apos;s select image:
        </span>
        <input
          type="file"
          id="meme-file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
        />
        <div className="flex gap-3">
          <Button className="btn-primary flex flex-1" onClick={openFilePicker}>
            Pick image
          </Button>
          {!!image.base64 && (
            <Button className="btn-warning flex" onClick={clearImage}>
              Clear
            </Button>
          )}
        </div>
        <div className="flex justify-center">
          <span className="text-lg">⎯⎯⎯⎯⎯&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;⎯⎯⎯⎯⎯</span>
        </div>

        <div className="form-control">
          <div className="relative">
            <input
              type="text"
              value={remoteUrl}
              placeholder="PASTE IMAGE URL"
              className="w-full pr-12 input input-primary input-bordered"
              onChange={(e) => setRemoteUrl(e.target.value)}
            />
            {!!remoteUrl && (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() => setRemoteUrl('')}>
                X
              </button>
            )}
          </div>
        </div>

        <span className="text-lg mt-5 italic">Got your image? give it a bit of fun!</span>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Top text</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={textTop}
              placeholder="what does doge say?"
              className="w-full pr-12 input input-bordered"
              onChange={(e) => setTextTop(e.target.value)}
            />
            {!!textTop && (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() => setTextTop('')}>
                X
              </button>
            )}
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bottom text</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={textBottom}
              placeholder="woof woof!"
              className="w-full pr-12  input input-bordered"
              onChange={(e) => setTextBottom(e.target.value)}
            />
            {!!textBottom && (
              <button
                className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                onClick={() => setTextBottom('')}>
                X
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-3 flex-wrap">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Font size</span>
            </label>
            <div className="flex flex-row items-center gap-3">
              <input
                type="range"
                min="10"
                max="150"
                value={size}
                className="flex-1 flex range range-sm"
                onChange={(e) => setSize(Number(e.target.value))}
              />
              <input
                type="number"
                value={size}
                placeholder="size"
                className="w-20 input input-bordered"
                onChange={(e) => setSize(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <ColorPicker value={color} onChange={setColor} label="Color" />
            <ColorPicker value={stroke} onChange={setStroke} label="Stroke" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 w-11/12 md:w-2/3 relative items-center justify-center self-center">
        <Canvas className="flex flex-1 w-full h-full items-center justify-center" />

        {!canDisplayCanvas && (
          <div className="opacity-50 flex w-full h-full items-center justify-center">
            <div className="max-w-screen-md">
              <Img
                src={DogePlaceholder}
                alt="Meme preview"
                objectFit="contain"
                objectPosition="50% 50%"
                width={1000}
                height={1000}
              />
            </div>

            <div className="flex absolute left-0 right-0 top-10 w-full items-center justify-center">
              <p className="font-impact text-xl md:text-3xl lg:text-5xl tracking-wider absolute tstroke">
                Wut you lookin&apos; at?
              </p>
            </div>

            <div className="flex absolute left-0 right-0 bottom-10 w-full items-center justify-center">
              <p className="font-impact text-xl md:text-3xl lg:text-5xl tracking-wider absolute tstroke">
                This is just placeholder
              </p>
            </div>
          </div>
        )}

        {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
          {isLoading && <Spinner className="w-16 h-16 md:w-28 md:h-28 text-primary" />}
        </div> */}
      </div>
    </div>
  );
}
