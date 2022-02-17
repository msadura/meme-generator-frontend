import React from 'react';
import Image from 'next/image';
import Launchpad from './launchpad.jpg';
import Pad1 from './pad1.png';
import { SpaceRocket } from '@app/components/SpaceRocket/SpaceRocket';
import styles from './styles.module.css';
import classNames from 'classnames';

type Props = {
  width?: number;
};

const hRatio = 0.6584;

export const SpaceLaunchpad = ({ width = 1000 }: Props) => {
  const height = hRatio * width;
  const imgScale = width / 1000;

  const left = 0.41 * imgScale;
  const bottomScale = width <= 400 ? 0.8 : 1;
  const bottom = -0.15 * (bottomScale * imgScale);

  return (
    <div className="relative -scale-x-100" style={{ width, height }}>
      <Image src={Launchpad} layout="fill" />
      <div
        className="absolute top-0 flex items-end justify-center overflow-hidden"
        style={{ left: `${left * 100}%`, bottom: `${bottom * 100}%` }}>
        <div className={styles['launchpad-go']}>
          <div className={styles['launch-vibrate']}>
            <div style={{ transform: `scale(${imgScale * 0.8})` }}>
              <SpaceRocket flipped />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[1px] left-[14.7%] flex items-end">
        <Image
          src={Pad1}
          width={495 * imgScale}
          height={60 * imgScale}
          objectPosition="bottom bottom"
        />
      </div>
    </div>
  );
};
