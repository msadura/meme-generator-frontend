import React from 'react';

type Props = {
  children: any;
};

export function Header({ children }: Props): JSX.Element {
  return (
    <h2 className="underline card-title text-secondary-focus bita text-2xl md:text-4xl tracking-wider uppercase">
      {children}
    </h2>
  );
}
