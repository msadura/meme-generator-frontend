import React from 'react';
import { classNames } from '@app/utils/classNames';

type Props = Record<string, any>;

export default function Button({
  className,
  children,
  stretch,
  disabled,
  ...props
}: Props): JSX.Element {
  return (
    <button
      className={classNames('btn', className || '', stretch && 'flex-1')}
      {...props}
      disabled={disabled}>
      {children}
    </button>
  );
}
