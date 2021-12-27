import Button from '@app/components/Button/Button';
import { useDrawer } from '@app/hooks/useDrawer';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Img from 'next/image';
import debounce from 'lodash/debounce';
import DogePlaceholder from '@public/doge1.png';

type Props = {};

export function MemeGenerator(): JSX.Element {
  const drawer = useDrawer();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState({ base64: '', width: 0, height: 0 });
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [size, setSize] = useState(30);
  const color = '#ffffff';
  const stroke = '#000000';

  const loadPreview = useCallback(async () => {
    console.log('🔥', 'load prev', textTop, textBottom, size);
    try {
      const res = await drawer?.getMemeSvg([
        image.base64,
        image.width,
        image.height,
        textTop,
        textBottom,
        size,
        color,
        stroke
      ]);
      console.log('🔥', 'prev loaded', res);
      setPreview(`data:image/svg+xml,${encodeURIComponent(res)}`);
    } catch (e) {
      console.log('🔥', 'fail');
    }
  }, [drawer, image.base64, image.height, image.width, size, textBottom, textTop]);

  const loadPreviewDebounced = useMemo(() => debounce(loadPreview, 300), [loadPreview]);

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();

    var file = event.target.files?.[0];
    if (file) {
      const imgDimensions = await getFileDimensions(file);
      const base64 = await getBase64(file);
      setImage({ ...imgDimensions, base64 });
    }
  };

  const getFileDimensions = async (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    const imgLoadPromise = new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
    });
    img.src = url;
    await imgLoadPromise;

    return { width: img.naturalWidth, height: img.naturalHeight };
  };

  const getBase64 = async (file: File) => {
    return new Promise<string>((resolve) => {
      let baseURL = '';
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        baseURL = reader.result as string;
        resolve(baseURL);
      };
    });
  };

  useEffect(() => {
    if (image.base64 && image.width && image.height) {
      loadPreviewDebounced();
    }
  }, [image.base64, image.height, image.width, loadPreviewDebounced]);

  useEffect(() => {
    setPreview('');
  }, [image.base64]);

  return (
    <div className="flex flex-col flex-1 md:flex-row gap-5">
      <div className="flex flex-col flex-initial w-96 gap-5">
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
          <input
            type="text"
            value={textTop}
            placeholder="PASTE IMAGE URL"
            className="input input-bordered"
            onChange={(e) => setTextTop(e.target.value)}
          />
        </div>

        <span className="text-lg mt-8">Got your image? give it a bit of life!</span>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Top text</span>
          </label>
          <input
            type="text"
            value={textTop}
            placeholder="top text"
            className="input input-bordered"
            onChange={(e) => setTextTop(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Bottom text</span>
          </label>
          <input
            type="text"
            value={textBottom}
            placeholder="bottom text"
            className="input input-bordered"
            onChange={(e) => setTextBottom(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Font size</span>
          </label>
          <input
            type="number"
            value={size}
            placeholder="size"
            className="input input-bordered"
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-1 relative">
        {!!preview && (
          <Img
            src={preview}
            alt="Meme preview"
            layout="fill"
            objectFit="contain"
            objectPosition="left 50%"
          />
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
          </div>
        )}
      </div>
    </div>
  );
}
