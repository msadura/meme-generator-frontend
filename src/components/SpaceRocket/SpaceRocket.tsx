import React from 'react';
import Image from 'next/image';
import Rocket from './SVG/rocket.svg';
import classNames from 'classnames';
import styles from './styles.module.css';

type Props = {
  flipped?: boolean;
};

export const SpaceRocket = ({ flipped }: Props) => {
  return (
    <div className="w-[186px] h-[300px] relative flex justify-center">
      <div
        className={classNames(
          'scale-[.6] absolute -bottom-[15%] left-[5%]',
          styles['flames-burn']
        )}>
        <div className={classNames(styles['flame-container'])}>
          <div className={classNames(styles.flame, styles.red)}></div>
          <div className={classNames(styles.flame, styles.orange)}></div>
          <div className={classNames(styles.flame, styles.yellow)}></div>
          <div className={classNames(styles.flame, styles.white)}></div>
          <div className={classNames(styles.circle, styles.blue)}></div>
          {/* <div className="black circle"></div> */}
        </div>
      </div>

      <div
        className={classNames(
          'scale-[.6] absolute -bottom-[15%] right-[13%]',
          styles['flames-burn']
        )}>
        <div className={classNames(styles['flame-container'])}>
          <div className={classNames(styles.flame, styles.red)}></div>
          <div className={classNames(styles.flame, styles.orange)}></div>
          <div className={classNames(styles.flame, styles.yellow)}></div>
          <div className={classNames(styles.flame, styles.white)}></div>
          <div className={classNames(styles.circle, styles.blue)}></div>
          {/* <div className="black circle"></div> */}
        </div>
      </div>
      <Image src={Rocket} layout="fill" />
      <span
        className={classNames(
          'absolute font-bold text-3xl top-[15%] left-[32%] text-black-primary',
          { '-scale-x-100': flipped }
        )}>
        DAC
      </span>
      <span
        className={classNames(
          'absolute tracing-widest text-xl top-[60%] left-[28%] opacity-70 text-white-primary -rotate-90',
          { '-scale-x-100': flipped }
        )}>
        DOGE-1
      </span>
    </div>
  );
};
