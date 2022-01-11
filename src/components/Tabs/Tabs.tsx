import { MemeText } from '@app/components/MemeText/MemeText';
import PepePicker from '@app/components/PepePicker/PepePicker';
import useTabs, { TAB_OPTIONS } from '@app/components/Tabs/hooks/useTabs';
import { classNames } from '@app/utils/classNames';
import React from 'react';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';

type Props = {};

export default function Tabs(props: Props): JSX.Element {
  const { tab, setTab } = useTabs();
  const { addImage } = useCanvas();

  return (
    <div>
      <div className="tabs mb-5">
        {TAB_OPTIONS.map((t) => (
          <a
            key={t}
            className={classNames(
              'tab tab-bordered flex-1 uppercase',
              t === tab && 'font-bold text-secondary-focus opacity-1 border-secondary-focus'
            )}
            onClick={() => setTab(t)}>
            {t}
          </a>
        ))}
      </div>

      {tab === 'text' && <MemeText />}
      {tab === 'pepe' && <PepePicker onSelect={addImage} />}
      {tab === 'faces' && <span>faces images</span>}
    </div>
  );
}
