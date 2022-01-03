import { useDebounce } from '@app/hooks/useDebounce';
import { MemeText } from '@app/types';
import { useState, useRef, useCallback } from 'react';

export const DEFAULT_TEXT = { content: '', size: 30, color: '#ffffff', stroke: '#000000' };

export function useTexts(canvas: fabric.Canvas | null) {
  const [texts, setTexts] = useState<MemeText[]>([]);
  // const [canvasTexts, setCanvasTexts] = useState<fabric.Textbox[]>([]);
  const canvasTextsRef = useRef<fabric.Textbox[]>([]);

  const updateText = useCallback(
    (index: number, update: Partial<MemeText>) => {
      console.log('🔥', index, update);
      setTexts((v) => {
        if (!v[index]) {
          return v;
        }

        const updated = [...v];
        updated[index] = { ...updated[index], ...update };

        return updated;
      });

      if (!canvasTextsRef.current[index]) {
        return;
      }

      const canvasText = canvasTextsRef.current[index];

      if ('content' in update) {
        canvasText.text = update.content;
      }

      if ('size' in update) {
        canvasText.fontSize = update.size;
      }

      if ('color' in update) {
        (canvasText as any).set('fill', update.color);
      }

      if ('stroke' in update) {
        (canvasText as any).set('stroke', update.stroke);
      }

      canvas?.renderAll();
    },
    [canvas]
  );

  const insertText = useCallback((canvasText: fabric.Textbox) => {
    setTexts((v) => {
      return [...v, { ...DEFAULT_TEXT }];
    });
    canvasTextsRef.current.push(canvasText);
  }, []);

  const deleteText = useCallback(
    (index: number) => {
      setTexts((v) => {
        return v.filter((_, i) => i !== index);
      });
      canvas?.remove(canvasTextsRef.current[index]);
      canvasTextsRef.current.filter((_, i) => i !== index);
    },
    [canvas]
  );

  const clear = useCallback(() => {
    setTexts([]);
    canvasTextsRef.current = [];
  }, []);

  return {
    texts,
    updateText,
    insertText,
    deleteText,
    clear,
    canvasTextsRef
  };
}
