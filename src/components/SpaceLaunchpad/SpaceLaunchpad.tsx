import React from 'react';
import Image from 'next/image';
import Launchpad from './launchpad.jpg';
import Pad1 from './pad1.svg';
import { SpaceRocket } from '@app/components/SpaceRocket/SpaceRocket';
import styles from './styles.module.css';
import classNames from 'classnames';

type Props = {};

export const SpaceLaunchpad = (props: Props) => {
  return (
    <div className="relative w-[1000px] h-[833px] -scale-x-100">
      <Image src={Launchpad} layout="fill" />
      <div className="absolute left-[29%] bottom-[25%] top-0 flex items-end justify-center overflow-hidden">
        <div className={styles['launchpad-go']}>
          <div className={styles['launchpad-go']}>
            <SpaceRocket flipped />
          </div>
        </div>
      </div>
      <div className="absolute bottom-[20.5%] left-[14.7%]">
        <Image src={Pad1} width={495} height={60} />
      </div>
    </div>
  );
};
