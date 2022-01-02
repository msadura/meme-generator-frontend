import { FC, createContext, useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { fabric } from 'fabric';
import { EMPTY_MEME_IMAGE, MemeImage } from '@app/components/MemeGenerator/hooks/useImage';

export type CanvasContextType = {
  setCanvas: (canvas: null | fabric.Canvas) => void;
  canvas: null | fabric.Canvas;
  selectedObjects: fabric.Object[];
  bgImg: null | fabric.Image;
  setBackgroundImg: (img: null | MemeImage) => void;
  canDisplayCanvas: boolean;
};

const CanvasContext = createContext<CanvasContextType>({} as CanvasContextType);

export const useCanvas = () => useContext(CanvasContext);

const EMPTY_BG_IMG = { base64: '', width: 0, height: 0, imgObject: null };

const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([]);
  const [bgImg, setBgImg] = useState<null | fabric.Image>(null);

  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([]);
      });
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected);
      });
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected);
      });
    };

    if (canvas) {
      console.log('🔥', 'bind canvas');
      bindEvents(canvas);
    } else {
      console.log('🔥', 'no canvas');
    }
  }, [canvas]);

  useEffect(() => {
    if (canvas && bgImg) {
      canvas.setBackgroundImage(bgImg, () => canvas?.renderAll());
    }
  }, [canvas, bgImg]);

  const setBackgroundImg = useCallback((img: MemeImage | null) => {
    if (!img?.base64) {
      setBgImg(null);
      return;
    }

    fabric.Image.fromURL(img.base64, (img: fabric.Image) => {
      img.set({ left: 0, top: 0 });

      setBgImg(img);
    });
  }, []);

  const provider = useMemo(() => {
    return {
      canvas,
      setCanvas,
      selectedObjects,
      setBackgroundImg,
      bgImg,
      canDisplayCanvas: !!bgImg
    };
  }, [bgImg, canvas, selectedObjects, setBackgroundImg]);

  return <CanvasContext.Provider value={provider}>{children}</CanvasContext.Provider>;
};

export { CanvasProvider };
