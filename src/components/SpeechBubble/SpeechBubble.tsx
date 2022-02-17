import classNames from 'classnames';
import React, { ReactNode } from 'react';
import style from './bubble.module.css';
import Image from 'next/image';

import { Bubble } from './Bubble';
import { BubbleRect } from '@app/components/SpeechBubble/BubbleRect';

export type SpeechBubbleProps = {
  children: ReactNode;
  rightSide?: boolean;
  bubbleClassName?: string;
  bgOpacity?: number;
};

export const SpeechBubble = ({
  children,
  rightSide,
  bubbleClassName,
  bgOpacity = 0.8
}: SpeechBubbleProps) => {
  return (
    <div className={classNames('relative pt-5 pl-5 pr-5 lg:px-20 lg:pt-16 pb-5 flex-col')}>
      <div className="relative z-10">{children}</div>
      <div
        className={classNames(
          'hidden lg:block absolute top-0 -bottom-[35%] -left-[5%] -right-[5%]',
          { '-scale-x-100': rightSide }
        )}>
        <Bubble
          rightSide={rightSide}
          bgOpacity={bgOpacity}
          className={classNames(bubbleClassName, { 'fill-blue-dark stroke-white': rightSide })}
        />
      </div>

      <div className={classNames('lg:hidden absolute top-0 -bottom-[45%] left-0 right-0')}>
        <BubbleRect
          rightSide={rightSide}
          bgOpacity={bgOpacity}
          className={classNames(bubbleClassName, { 'fill-blue-dark stroke-white': rightSide })}
        />
      </div>
    </div>
  );
};
