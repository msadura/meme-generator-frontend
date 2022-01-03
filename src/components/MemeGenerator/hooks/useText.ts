import { useDebounce } from '@app/hooks/useDebounce';
import { MemeText } from '@app/types';
import { useState, useMemo, useEffect, useCallback } from 'react';

export function useText(setValue: (key: keyof fabric.Object, value: string | number) => void) {
  const [content, setContent] = useState('');
  const [size, setSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [stroke, setStroke] = useState('#000000');
  const debouncedContent = useDebounce(content);
  const debouncedSize = useDebounce(size);

  useEffect(() => {
    setValue('text' as keyof fabric.Object, content);
  }, [content, setValue]);

  useEffect(() => {
    setValue('stroke' as keyof fabric.Object, stroke);
  }, [stroke, setValue]);

  useEffect(() => {
    setValue('fill' as keyof fabric.Object, color);
  }, [color, setValue]);

  useEffect(() => {
    setValue('fontSize' as keyof fabric.Object, size);
  }, [size, setValue]);

  const setFromCanvasObject = useCallback((selected: null | fabric.Text) => {
    setContent(selected?.text || '');
    if (selected) {
      setColor(selected.fill as string);
      setSize(selected.fontSize as number);
      setStroke(selected.stroke as string);
    }
  }, []);

  return {
    content,
    setContent,
    size,
    setSize,
    color,
    setColor,
    stroke,
    setStroke,
    setFromCanvasObject
  };
}
