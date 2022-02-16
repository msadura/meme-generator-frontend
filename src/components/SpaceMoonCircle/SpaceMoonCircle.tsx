import React from 'react';
import Image from 'next/image';
import Moon from './moon.png';
import { SpaceRocket } from '@app/components/SpaceRocket/SpaceRocket';
import styles from './styles.module.css';
import classNames from 'classnames';

export const SpaceMoonCircle = () => {
  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center">
      <div className={classNames('absolute inset-0', styles['stars-container'])}>
        <div className={classNames(styles.stars)}></div>
        <div className={classNames(styles.stars2)}></div>
        <div className={classNames(styles.stars3)}></div>
      </div>
      <div className="relative w-[170px] h-[170px]">
        <img src={Moon.src} />
      </div>

      <div className={classNames('absolute', styles['rocket-circle'])}>
        <div className="scale-[.3] rotate-60">
          <SpaceRocket />
        </div>
      </div>
    </div>
  );
};
