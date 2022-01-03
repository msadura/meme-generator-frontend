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
    <div className="relative flex flex-col form-control ">
      {!!label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="flex flex-1 items-center">
        <button
          className="w-12 h-8 rounded"
          style={{ backgroundColor: value }}
          onClick={() => setIsVisible((v) => !v)}></button>
      </div>

      {isVisible && (
        <div className="absolute top-full z-20">
          <div className="fixed inset-0" onClick={() => setIsVisible(false)} />
          <CompactPicker color={value} onChangeComplete={({ hex }) => onChange(hex)} />
        </div>
      )}
    </div>
  );
}
