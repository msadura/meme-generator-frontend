import { FC, createContext, useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { fabric } from 'fabric';
import { EMPTY_MEME_IMAGE, MemeImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useText } from '@app/components/MemeGenerator/hooks/useText';
import { MemeTextAttrs } from '@app/types';

export type CanvasContextType = {
  setCanvas: (canvas: null | fabric.Canvas) => void;
  canvas: null | fabric.Canvas;
  selected: fabric.Object | null;
  bgImg: null | fabric.Image;
  setBackgroundImg: (img: null | MemeImage) => void;
  addText: (text: string, attrs: MemeTextAttrs) => void;
  text: ReturnType<typeof useText>;
  hasMemeSelected: boolean;
  hasNonTextLayerSelected: boolean;
  removeSelected: () => void;
  deselectAll: () => void;
};

const CanvasContext = createContext<CanvasContextType>({} as CanvasContextType);

export const useCanvas = () => useContext(CanvasContext);

const CanvasProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null);
  const [selected, setSelected] = useState<fabric.Object | null>(null);
  const [bgImg, setBgImg] = useState<null | fabric.Image>(null);

  const setValue = useCallback(
    (key: keyof fabric.Object, value: string | number) => {
      if (canvas?.getActiveObject() != null) {
        var activeText = canvas.getActiveObject();
        activeText.set(key, value);
        canvas.renderAll();
      }
    },
    [canvas]
  );

  const text = useText(setValue);

  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelected(null);
        text.setFromCanvasObject(null);
      });

      canvas.on('selection:created', (e: any) => {
        setSelected(e.selected[0]);
        text.setFromCanvasObject(e.selected[0]);
      });

      canvas.on('selection:updated', (e: any) => {
        setSelected(e.selected[0]);
        text.setFromCanvasObject(e.selected[0]);
      });

      canvas.on('text:changed', (e: any) => {
        setSelected(e.target);
        text.setFromCanvasObject(e.target);
      });
    };

    if (canvas) {
      console.log('🔥', 'bind canvas');
      bindEvents(canvas);
    } else {
      console.log('🔥', 'no canvass');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);

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

  const getCanvasScale = useCallback(() => {
    const cw = canvas?.getWidth();
    const bgw = bgImg?.width;
    if (!bgw || !cw) {
      return 1;
    }

    return cw / bgw;
  }, [bgImg?.width, canvas]);

  const addText = useCallback(
    (text: string, attrs: MemeTextAttrs) => {
      const PADDING = 10;
      const HANDLERS_INSET = 8;
      const TEXT = {
        type: 'text',
        left: PADDING + HANDLERS_INSET,
        top: PADDING + HANDLERS_INSET,
        fontSize: attrs.size,
        fontFamily: 'Impact',
        fill: attrs.color,
        stroke: attrs.stroke,
        width: (canvas?.getWidth() || 0) * (1 / getCanvasScale()) - 2 * (PADDING + HANDLERS_INSET),
        textAlign: 'center',
        padding: PADDING
      };

      const object = new fabric.Textbox(text, { ...TEXT });
      object.set({ text });
      canvas?.add(object);
      canvas?.setActiveObject(object);
    },
    [canvas, getCanvasScale]
  );

  const removeSelected = useCallback(() => {
    canvas?.remove(canvas?.getActiveObject());
  }, [canvas]);

  const deselectAll = useCallback(() => {
    canvas?.discardActiveObject().renderAll();
  }, [canvas]);

  useEffect(() => {
    if (canvas && bgImg) {
      canvas.setBackgroundImage(bgImg, () => canvas?.renderAll());
    }
  }, [canvas, bgImg]);

  useEffect(() => {
    if (!canvas) {
      setSelected(null);
    }
  }, [canvas]);

  useEffect(() => {
    if (!selected || selected.type === 'text') {
      text.setFromCanvasObject(selected as fabric.Text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const provider = useMemo(() => {
    return {
      canvas,
      setCanvas,
      selected,
      setBackgroundImg,
      bgImg,
      addText,
      removeSelected,
      deselectAll,
      hasMemeSelected: !!bgImg,
      hasNonTextLayerSelected: !!selected && selected.type !== 'text',
      text
    };
  }, [addText, bgImg, canvas, deselectAll, removeSelected, selected, setBackgroundImg, text]);

  return <CanvasContext.Provider value={provider}>{children}</CanvasContext.Provider>;
};

export { CanvasProvider };
