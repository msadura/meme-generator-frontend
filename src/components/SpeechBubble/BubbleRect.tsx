import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  rightSide?: boolean;
  bgClassName?: string;
  strokeClassName?: string;
  bgOpacity?: number;
};

export const BubbleRect = ({ bgOpacity = 1, rightSide = false, className }: Props) => {
  return (
    <svg
      viewBox="0 0 124.13 114.99"
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
          d="M8.2.5C3.93.5.5,3.67.5,7.59v64.7c0,3.92,3.43,7.09,7.7,7.09h4.57c8.38,9.88,9.87,9.56,18.18,19.47-2.2-14.46-.56-6.27-3.26-19.47h88.25c4.26,0,7.69-3.17,7.69-7.09V7.59c0-3.92-3.43-7.09-7.69-7.09Z"
        />
      </g>
    </svg>
  );
};
