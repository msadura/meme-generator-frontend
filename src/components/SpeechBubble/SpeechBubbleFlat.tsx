import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { BubbleRectFlat } from '@app/components/SpeechBubble/BubbleRectFlat';

export type SpeechBubbleProps = {
  children: ReactNode;
  rightSide?: boolean;
  bubbleClassName?: string;
  bgOpacity?: number;
  dark?: boolean;
};

export const SpeechBubbleFlat = ({
  children,
  rightSide,
  bubbleClassName,
  bgOpacity = 0.8,
  dark
}: SpeechBubbleProps) => {
  return (
    <div className={classNames('relative pt-5 pl-5 pr-5 pb-10 flex-col')}>
      <div className="relative z-10">{children}</div>
      <div
        className={classNames('absolute top-0 left-0 bottom-0 right-0 drop-shadow-xl', {
          '-scale-x-100': rightSide
        })}>
        <BubbleRectFlat
          rightSide={rightSide}
          bgOpacity={bgOpacity}
          className={classNames(bubbleClassName, {
            'fill-accent-focus stroke-white': rightSide || dark
          })}
        />
      </div>
    </div>
  );
};
