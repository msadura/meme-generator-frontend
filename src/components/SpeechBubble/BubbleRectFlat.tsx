import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  rightSide?: boolean;
  bgClassName?: string;
  strokeClassName?: string;
  bgOpacity?: number;
};

export const BubbleRectFlat = ({ bgOpacity = 1, rightSide = false, className }: Props) => {
  return (
    <svg
      viewBox="0 0 124.13 68.41"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className={classNames(className || 'stroke-current fill-white', 'drop-shadow-bubble')}>
      <g>
        <path
          id="path710"
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 0.5,
            fillOpacity: bgOpacity
          }}
          d="M8.2.5C3.93.5.5,3.67.5,7.59V41.35c0,3.93,3.43,7.1,7.7,7.1h4.57C7.22,60,8.07,57.74,4.18,67.91c15-10.54,11.28-7.93,25.28-19.46h86.48a7.4,7.4,0,0,0,7.69-7.1V7.59c0-3.92-3.43-7.09-7.69-7.09Z"
        />
      </g>
    </svg>
  );
};
