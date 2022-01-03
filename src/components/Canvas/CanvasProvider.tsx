import { FC, createContext, useEffect, useState, useMemo, useContext, useCallback } from 'react';
import { fabric } from 'fabric';
import { EMPTY_MEME_IMAGE, MemeImage } from '@app/components/MemeGenerator/hooks/useImage';
import { useText } from '@app/components/MemeGenerator/hooks/useText';
import { MemeTextAttrs } from '@app/types';
import initFabricHandlers from '@app/components/Canvas/utils/initFabricHandlers';
import { useTexts } from '@app/components/MemeGenerator/hooks/useTexts';
import { DEFAULT_TEXT } from '../MemeGenerator/hooks/useTexts';

export type CanvasContextType = {
  setCanvas: (canvas: null | fabric.Canvas) => void;
  canvas: null | fabric.Canvas;
  selected: fabric.Object | null;
  bgImg: null | fabric.Image;
  setBackgroundImg: (img: null | MemeImage) => void;
  addText: (text: string) => void;
  texts: ReturnType<typeof useTexts>;
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

  useEffect(() => {
    initFabricHandlers();
  }, []);

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
  const texts = useTexts(canvas);
  const { insertText, clear, canvasTextsRef } = texts;

  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelected(null);
        text.setFromCanvasObject(null);
      });

      canvas.on('selection:created', (e: any) => {
        setSelected(e.selected[0]);
        console.log('🔥ss', e.selected[0]);
      });

      canvas.on('selection:updated', (e: any) => {
        setSelected(e.selected[0]);
      });

      canvas.on('text:changed', (e: any) => {
        setSelected(e.target);
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
    (text: string) => {
      const lastText = canvasTextsRef.current.length
        ? canvasTextsRef.current[canvasTextsRef.current.length - 1]
        : null;
      const topInset = lastText ? lastText.aCoords?.bl.y || 0 : 0;

      const PADDING = 10;
      const HANDLERS_INSET = 8;
      const TEXT = {
        type: 'text',
        left: PADDING + HANDLERS_INSET,
        top: topInset + PADDING + HANDLERS_INSET,
        fontSize: DEFAULT_TEXT.size,
        fontFamily: 'Impact',
        fill: DEFAULT_TEXT.color,
        stroke: DEFAULT_TEXT.stroke,
        width: (canvas?.getWidth() || 0) * (1 / getCanvasScale()) - 2 * (PADDING + HANDLERS_INSET),
        textAlign: 'center',
        padding: PADDING,
        editable: false
      };

      const object = new fabric.Textbox(text, { ...TEXT });
      object.set({ text });
      canvas?.add(object);
      canvas?.setActiveObject(object);

      insertText(object);
    },
    [canvas, canvasTextsRef, getCanvasScale, insertText]
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
      addText('');
    }
  }, [canvas, bgImg, addText]);

  useEffect(() => {
    if (!canvas) {
      setSelected(null);
      clear();
    }
  }, [canvas, clear]);

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
      texts
    };
  }, [addText, bgImg, canvas, deselectAll, removeSelected, selected, setBackgroundImg, texts]);

  return <CanvasContext.Provider value={provider}>{children}</CanvasContext.Provider>;
};

export { CanvasProvider };
