import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { useCollapse } from '@app/components/Collapse/useCollapse';

import { CollapseProps } from './types';

export const Collapse = ({ children, className, title }: CollapseProps) => {
  const { isActive, contentRef, toggle, maxHeightStyle } = useCollapse();

  return (
    <div
      className={classNames(
        'flex flex-col h-max bg-base-200 px-4 py-3 rounded border-solid border border-accent',
        // isActive ? 'border-accent' : ' border-transparent',
        className
      )}>
      <div
        className="flex box-border w-full appearance-none cursor-pointer focus:outline-none justify-between items-center"
        onClick={toggle}>
        {typeof title === 'string' ? <span className="text-lg">{title}</span> : title}
        <ChevronDownIcon
          className={classNames('transform duration-300 ease inline-block w-5 h-5', {
            '-rotate-180': isActive
          })}
        />
      </div>

      <div
        className="overflow-auto overflow-y-hidden duration-300 ease-in-out transition-max-height"
        ref={contentRef}
        style={maxHeightStyle}>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
