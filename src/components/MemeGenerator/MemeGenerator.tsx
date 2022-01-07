import Button from '@app/components/Button/Button';
import React, { useEffect, useRef } from 'react';
import Img from 'next/image';
import DogePlaceholder from '@public/doge1.png';
import { useImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useFilePicker } from '@app/components/MemeGenerator/hooks/useFilePicker';
import { ColorPicker } from '@app/components/ColorPicker/ColorPicker';
import { useBlockchain } from '@app/blockchain/useBlockchain';
import { Canvas } from '@app/components/Canvas/Canvas';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import TrashIcon from '@public/trash.svg';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import { classNames } from '@app/utils/classNames';
import { MemeGeneratedModal } from '@app/components/MemeGeneratedModal/MemeGeneratedModal';
import useResetLastMinted from '@app/components/MemeGenerator/hooks/useResetLastMinted';

export function MemeGenerator(): JSX.Element {
  const { image, selectImage, remoteUrl, setRemoteUrl, clearImage } = useImage();
  const { setBackgroundImg, hasMemeSelected, bgImg, addText, texts, getImageUrl } = useCanvas();
  const { isConnectedWithWeb3 } = useBlockchain();
  const { inputRef, onFileChange, openFilePicker } = useFilePicker(selectImage);
  const textInputRef = useRef<HTMLInputElement>(null);
  const { generate, isUploading, isMinting, resetLastMinted } = useMeme();

  useResetLastMinted();

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
        <div className="flex gap-1">
          <Button className="btn-primary flex flex-1" onClick={openFilePicker}>
            Pick image
          </Button>
          {!!bgImg && (
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

        {hasMemeSelected && (
          <span className="text-lg mt-5 italic">Got your image? give it a bit of fun!</span>
        )}

        {texts.texts.map((text, index) => (
          <div key={index} className="mb-5">
            <div className="form-control">
              {/* <label className="label">
                <span className="label-text">Text #{index + 1}:</span>
              </label> */}
              <div className="relative">
                <input
                  ref={textInputRef}
                  type="text"
                  value={text?.content}
                  placeholder={`Text #${index + 1}`}
                  className="w-full pr-12 input input-bordered"
                  onChange={(e) => texts.updateText(index, { content: e.target.value })}
                  disabled={!hasMemeSelected}
                />
                {!!text?.content && (
                  <button
                    className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                    onClick={() => texts.updateText(index, { content: '' })}>
                    X
                  </button>
                )}
              </div>
            </div>

            {/* <div className="form-control">
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
        </div> */}

            <div className="flex flex-row gap-3 flex-wrap">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Font size</span>
                </label>
                <div className="flex flex-row flex-1 items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="150"
                    value={text?.size}
                    className="flex-1 flex range range-sm"
                    onChange={(e) => texts.updateText(index, { size: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3 items-end justify-between flex-1">
                <div className="flex flex-row gap-3">
                  <ColorPicker
                    value={text?.color}
                    onChange={(color: string) => texts.updateText(index, { color })}
                    label="Color"
                  />
                  <ColorPicker
                    value={text?.stroke}
                    onChange={(stroke: string) => texts.updateText(index, { stroke })}
                    label="Stroke"
                  />
                </div>
                <button
                  className="rounded btn btn-error p-3 text-accent-content"
                  onClick={() => texts.deleteText(index)}>
                  <Img src={TrashIcon} width={20} height={20} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {hasMemeSelected && texts.texts.length < 4 && (
          <div className="flex flex-row gap-3">
            <Button className="btn-accent flex flex-1" onClick={() => addText('')}>
              Add another text
            </Button>
          </div>
        )}

        {hasMemeSelected && (
          <div className="flex flex-row gap-3">
            <Button
              disabled={!isConnectedWithWeb3}
              className={classNames(
                'btn-primary flex flex-1 mt-3',
                (isUploading || isMinting) && 'loading'
              )}
              onClick={() => generate(getImageUrl())}>
              {!isConnectedWithWeb3 && 'CONNECT TO GENERATE'}
              {isConnectedWithWeb3 && !isUploading && !isMinting && 'GENERATE MEME'}
              {isUploading && 'UPLOADING'}
              {isMinting && 'MINTING'}
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-1 w-11/12 md:w-2/3 relative justify-center">
        <Canvas className="flex flex-1 w-full h-full justify-center" />

        {!hasMemeSelected && (
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

      <MemeGeneratedModal />
    </div>
  );
}
