import classNames from 'classnames';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const SecondaryBox = ({ children, className }: Props) => (
  <div
    className={classNames(
      'border-2 flex text-center border-black-primary py-3 px-4 lg:px-8 text-black-primary bg-secondary-focus font-comic tracking-widest text-lg items-center justify-center',
      className
    )}>
    {children}
  </div>
);
