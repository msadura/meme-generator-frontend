import { TextAlign } from '@app/types';
import React from 'react';
import Image from 'next/image';
import AlignLeft from '@public/text-left.svg';
import AlignCenter from '@public/text-center.svg';
import AlignRight from '@public/text-right.svg';
import { classNames } from '@app/utils/classNames';

type Props = {
  value: TextAlign;
  onChange: (val: TextAlign) => void;
  label?: string;
};

export function AlignPicker({ label, value, onChange }: Props): JSX.Element {
  return (
    <div className="relative flex flex-col form-control ">
      {!!label && (
        <label className="label">
          <span className="label-text text-xs uppercase">{label}</span>
        </label>
      )}
      <div className="btn-group flex flex-row">
        <button
          className={classNames('btn', value === TextAlign.left && 'btn-active')}
          onClick={() => onChange(TextAlign.left)}>
          <Image src={AlignLeft} width={20} height={20} alt="text left" />
        </button>
        <button
          className={classNames('btn', value === TextAlign.center && 'btn-active')}
          onClick={() => onChange(TextAlign.center)}>
          {' '}
          <Image src={AlignCenter} width={20} height={20} alt="text center" />
        </button>
        <button
          className={classNames('btn', value === TextAlign.right && 'btn-active')}
          onClick={() => onChange(TextAlign.right)}>
          {' '}
          <Image src={AlignRight} width={20} height={20} alt="text right" />
        </button>
      </div>
    </div>
  );
}
