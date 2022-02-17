import React from 'react';
import Image from 'next/image';
import Moon from './moon.png';
import { SpaceRocket } from '@app/components/SpaceRocket/SpaceRocket';
import styles from './styles.module.css';
import classNames from 'classnames';
import StarBg from './stars1.jpg';

type Props = {
  width?: number;
};

const hRatio = 0.6584;

export const SpaceMoonCircle = ({ width = 700 }: Props) => {
  const height = hRatio * width;
  const scale = width / 700;

  return (
    <div className="pl-20 relative flex items-center justify-end" style={{ width, height }}>
      <Image src={StarBg} layout="fill" objectFit="cover" />
      <div className={classNames('absolute inset-0', styles['stars-container'])}>
        <div className={classNames(styles.stars)}></div>
        <div className={classNames(styles.stars2)}></div>
        <div className={classNames(styles.stars3)}></div>
      </div>

      <div className="absolute right-[25%] top-[40%]">
        <div className="relative" style={{ width: 140 * scale, height: 140 * scale }}>
          <Image src={Moon} />
        </div>
      </div>

      <div className={classNames('absolute', styles['rocket-circle'])}>
        <div className="scale-[.3] rotate-60">
          <div style={{ transform: `scale(${scale})` }}>
            <SpaceRocket />
          </div>
        </div>
      </div>
    </div>
  );
};
