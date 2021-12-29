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

export function MemeGenerator(): JSX.Element {
  const drawer = useDrawer();
  const [preview, setPreview] = useState('');

  const { image, selectImage, remoteUrl, setRemoteUrl } = useImage();
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
    debouncedTextBottom,
    debouncedTextTop,
    debouncedSize
  } = useText();
  const { inputRef, onFileChange, openFilePicker } = useFilePicker(selectImage);

  const loadPreview = useCallback(async () => {
    try {
      const res = await drawer?.getMemeSvg([
        image.base64,
        image.width,
        image.height,
        debouncedTextTop,
        debouncedTextBottom,
        debouncedSize,
        color,
        stroke
      ]);
      console.log('🔥', 'prev loaded', res);
      setPreview(`data:image/svg+xml,${encodeURIComponent(res)}`);
    } catch (e) {
      console.log('🔥', 'fail');
    }
  }, [
    color,
    debouncedTextBottom,
    debouncedTextTop,
    drawer,
    image.base64,
    image.height,
    image.width,
    debouncedSize,
    stroke
  ]);

  useEffect(() => {
    if (image.base64 && image.width && image.height) {
      loadPreview();
    }
  }, [image.base64, image.height, image.width, loadPreview]);

  useEffect(() => {
    setPreview('');
  }, [image.base64]);

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

        <Button className="btn-primary" onClick={openFilePicker}>
          Pick image
        </Button>

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

        <span className="text-lg mt-5 italic">Got your image? give it a bit of life!</span>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Top text</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={textTop}
              placeholder="top text"
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
              placeholder="bottom text"
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

      <div className="flex flex-1 relative items-center justify-center">
        {!!preview && (
          <div>
            <Img
              src={preview}
              alt="Meme preview"
              layout="fill"
              objectFit="contain"
              objectPosition="50% 50%"
            />
          </div>
        )}

        {!preview && (
          <div className="opacity-50">
            <Img
              src={DogePlaceholder}
              alt="Meme preview"
              layout="fill"
              objectFit="contain"
              objectPosition="50% 50%"
            />

            <div className="flex absolute left-0 right-0 top-10 w-full items-center justify-center">
              <p className="font-impact text-5xl tracking-wider absolute tstroke">
                Wut you lookin&apos;s at?
              </p>
            </div>

            <div className="flex absolute left-0 right-0 bottom-10 w-full items-center justify-center">
              <p className="font-impact text-5xl tracking-wider absolute tstroke">
                This is just placeholder
              </p>
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
          <Spinner className="w-16 h-16 md:w-28 md:h-28 text-primary" />
        </div>
      </div>
    </div>
  );
}
