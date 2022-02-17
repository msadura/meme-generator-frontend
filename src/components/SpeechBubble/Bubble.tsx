import classNames from 'classnames';
import React from 'react';

type Props = {
  className?: string;
  rightSide?: boolean;
  bgClassName?: string;
  strokeClassName?: string;
  bgOpacity?: number;
};

const pathLeft =
  'm297.51 546.91 78.114 5.5608c8.3853 0 15.112 6.722 15.112 15.102l-4.8101 47.434c0 8.3801-5.364 14.464-13.749 14.464l-17.07 0.29783 4.0163 17.583-25.215-17.243-26.023 0.72317c-8.3853 0-19.261-7.4521-19.261-15.832l-7.615-50.192c0-8.3801 8.1161-17.898 16.501-17.898z';
const pathRight =
  'M472.42,2c42.31,0,83.26,48,83.26,90.31L517.26,345.58c0,42.29-54.88,79.89-97.2,79.89l-131.31-3.65-127.23,87,20.26-88.73-86.13-1.5c-42.31,0-69.38-30.7-69.38-73L2,106.27A76,76,0,0,1,78.26,30.06L472.42,2Z';

export const Bubble = ({ bgOpacity = 1, rightSide = false, className }: Props) => {
  return (
    <svg
      viewBox="0 0 117.97 107.3"
      version="1.1"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className={classNames(className || 'stroke-current fill-white', 'drop-shadow-bubble')}>
      <g id="layer1" transform="translate(-280.01 -545.91)" width="100%" height="100%">
        <path
          style={{
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 0.5,
            fillOpacity: bgOpacity
          }}
          d={pathLeft}
        />
      </g>
    </svg>
  );
};
