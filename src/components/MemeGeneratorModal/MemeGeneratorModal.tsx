import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import Img from 'next/image';
import { useMeme } from '@app/components/MemeProvider/MemeProvider';
import Button from '@app/components/Button/Button';
import Link from 'next/link';
import ShareSection from '@app/components/ShareSection/ShareSection';
import { Dialog, Transition } from '@headlessui/react';
import { Modal } from '@app/components/Modal/Modal';
import { BubbleRectFlat } from '@app/components/SpeechBubble/BubbleRectFlat';
import { SpeechBubbleFlat } from '@app/components/SpeechBubble/SpeechBubbleFlat';
import Image from 'next/image';
import { IMG_CLOUDFRONT } from '@app/constants';
import { SpaceLaunchpad } from '@app/components/SpaceLaunchpad/SpaceLaunchpad';
import { SpaceMoonCircle } from '@app/components/SpaceMoonCircle/SpaceMoonCircle';
import useWindowSize, { BreakPoint } from '@app/hooks/useWindowSize';
import classNames from 'classnames';
import { usePrevious } from '@app/hooks/usePrevious';

type Props = {
  onMakeAnother?: () => void;
  isMinting?: boolean;
  isUploading?: boolean;
};

const textUploading = 'Woof! Time to launch your meme! Uploading...';
const textMinting = 'Woof! Your meme will land on blockchain! Confirm the transaction...';

export function MemeGeneratorModal({ isMinting, isUploading }: Props): JSX.Element | null {
  const { hasSize } = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const { mintStatus } = useMeme();
  const prevMintStatus = usePrevious(mintStatus);
  const [uploadingSlide, setUploadingSlide] = useState(() => mintStatus !== 'minting');
  const [text, setText] = useState(() => (mintStatus !== 'minting' ? textUploading : textMinting));

  useEffect(() => {
    if (prevMintStatus === 'uploading' && mintStatus === 'minting') {
      setTimeout(() => {
        setUploadingSlide(false);
        setText(textMinting);
      }, 500);
    }
  }, [mintStatus, prevMintStatus]);

  useEffect(() => {
    if (mintStatus === 'minting' || mintStatus === 'uploading') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isOpen, mintStatus]);

  if (!isOpen) {
    return null;
  }

  return (
    <Modal className="!p-0" isOpen={isOpen} sizeClass="max-w-[400px] md:max-w-[700px]">
      <div className="flex flex-col max-w-5xl flex-1 relative">
        <div className="flex flex-col max-h-[263px] md:max-h-[460px] overflow-hidden">
          <div
            className={classNames({
              '-translate-y-[263px] md:-translate-y-[460px]': uploadingSlide,
              'transition-transform duration-700': true
            })}>
            <div className="min-h-[263px] md:min-h-[460px]">
              <SpaceMoonCircle width={hasSize(BreakPoint.md) ? 700 : 400} />
            </div>
            <div className="min-h-[263px] md:min-h-[460px]">
              <SpaceLaunchpad width={hasSize(BreakPoint.md) ? 700 : 400} />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-1">
          <div className="relative w-full max-w-[40%] flex mt-10 flex-1">
            <Image
              src={`${IMG_CLOUDFRONT}doges/dogespace.png`}
              layout="fill"
              objectFit="contain"
              objectPosition="left bottom"
            />
          </div>
        </div>

        <div className="left-[10%] right-auto md:left-auto md:right-[20%] max-w-[400px] absolute pt-2 md:pt-8 px-6">
          <SpeechBubbleFlat dark>
            <div className="text-xs md:text-lg md:mb-5">{text}</div>
          </SpeechBubbleFlat>
        </div>
      </div>
    </Modal>
  );
}
