import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  sizeClass?: string;
};

const noop = () => {};

export const Modal = ({ onClose, isOpen, children, sizeClass }: Props) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose || noop}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 opacity-80 bg-black" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div
                className={classNames(
                  'inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-xl bg-base-200',
                  sizeClass || 'max-w-xl'
                )}>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
