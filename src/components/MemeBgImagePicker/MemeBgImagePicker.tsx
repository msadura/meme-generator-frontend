import Button from '@app/components/Button/Button';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import { useFilePicker } from '@app/components/MemeGenerator/hooks/useFilePicker';
import React from 'react';

type Props = {
  selectImage: (img: File | string) => void;
  setRemoteUrl: (url: string) => void;
  remoteUrl: string;
};

export default function MemeBgImagePicker({
  selectImage,
  remoteUrl,
  setRemoteUrl
}: Props): JSX.Element {
  const { inputRef, onFileChange, openFilePicker } = useFilePicker(selectImage);
  const { bgImg } = useCanvas();

  return (
    <>
      {!bgImg && (
        <>
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
        </>
      )}
    </>
  );
}
