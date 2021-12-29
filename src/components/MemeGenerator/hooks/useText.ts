import { useDebounce } from '@app/hooks/useDebounce';
import { useState } from 'react';

export function useText() {
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [size, setSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [stroke, setStroke] = useState('#000000');
  const debouncedTextTop = useDebounce(textTop);
  const debouncedTextBottom = useDebounce(textBottom);
  const debouncedSize = useDebounce(size);

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
    debouncedSize
  };
}
