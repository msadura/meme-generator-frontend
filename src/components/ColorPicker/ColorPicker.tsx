import React, { useState } from 'react';
import { CompactPicker } from 'react-color';

type Props = {
  value: string;
  onChange: (val: string) => void;
  label?: string;
};

export function ColorPicker({ value, onChange, label }: Props): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative flex flex-col form-control">
      {!!label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <button
        className="w-16 h-8"
        style={{ backgroundColor: value }}
        onClick={() => setIsVisible((v) => !v)}></button>

      {isVisible && (
        <div className="absolute top-full">
          <CompactPicker color={value} onChangeComplete={({ hex }) => onChange(hex)} />
        </div>
      )}
    </div>
  );
}
