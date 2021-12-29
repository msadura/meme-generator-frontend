import { useState } from 'react';

export function useText() {
  const [textTop, setTextTop] = useState('');
  const [textBottom, setTextBottom] = useState('');
  const [size, setSize] = useState(30);
  const [color, setColor] = useState('#ffffff');
  const [stroke, setStroke] = useState('#000000');

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
    setStroke
  };
}
