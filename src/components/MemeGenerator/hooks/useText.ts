import { useDebounce } from '@app/hooks/useDebounce';
import { useState, useMemo } from 'react';

export type MemeText = {
  top: string;
  bottom: string;
  size: number;
  stroke: string;
  color: string;
};

export function useText() {
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [size, setSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [stroke, setStroke] = useState('#000000');
  const debouncedTextTop = useDebounce(textTop);
  const debouncedTextBottom = useDebounce(textBottom);
  const debouncedSize = useDebounce(size);

  const text = useMemo<MemeText>(
    () => ({
      top: debouncedTextTop,
      bottom: debouncedTextBottom,
      size: debouncedSize,
      stroke,
      color
    }),
    [color, debouncedSize, debouncedTextBottom, debouncedTextTop, stroke]
  );

  return {
    textTop,
    setTextTop,
    textBottom,
    setTextBottom,
    size,
    setSize,
    color,
    setColor,
    stroke,
    setStroke,
    debouncedTextTop,
    debouncedTextBottom,
    debouncedSize,
    text
  };
}
