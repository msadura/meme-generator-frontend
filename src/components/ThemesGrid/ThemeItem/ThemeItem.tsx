import React from 'react';
import { Theme } from '@app/types';

type Props = { item: Theme; onClick: (theme: Theme) => void };

export function ThemeItem({ item, onClick }: Props): JSX.Element {
  return (
    <div className="cursor-pointer relative overflow-hidden" onClick={() => onClick(item)}>
      <img src={item.url} className="transition-transform hover:scale-125" />
    </div>
  );
}
