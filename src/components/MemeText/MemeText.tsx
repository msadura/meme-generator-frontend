import { useCanvas } from '@app/components/Canvas/CanvasProvider';
import { ColorPicker } from '@app/components/ColorPicker/ColorPicker';
import React, { useRef } from 'react';
import Img from 'next/image';
import TrashIcon from '@public/trash.svg';
import Button from '@app/components/Button/Button';
import AddTextIcon from '@public/add-text.svg';
import { AlignPicker } from '@app/components/AlignPicker/AlignPicker';
import { TextAlign } from '@app/types';

type Props = {};

export function MemeText(props: Props): JSX.Element | null {
  const { hasMemeSelected, texts, addText } = useCanvas();
  const textInputRef = useRef<HTMLInputElement>(null);

  if (!hasMemeSelected) {
    return null;
  }

  return (
    <>
      {texts.texts.map((text, index) => (
        <div key={index} className="mb-5">
          <div className="form-control">
            {/* <label className="label">
          <span className="label-text">Text #{index + 1}:</span>
        </label> */}
            <div className="relative">
              <input
                ref={textInputRef}
                type="text"
                value={text?.content}
                placeholder={`Text #${index + 1}`}
                className="w-full pr-12 input input-bordered"
                onChange={(e) => texts.updateText(index, { content: e.target.value })}
                disabled={!hasMemeSelected}
              />
              {!!text?.content && (
                <button
                  className="absolute top-0 right-0 rounded-l-none btn btn-primary"
                  onClick={() => texts.updateText(index, { content: '' })}>
                  X
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-3 flex-wrap mt-1">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xs uppercase">Font size</span>
              </label>
              <div className="flex flex-row flex-1 items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={text?.size}
                  className="flex-1 flex range range-sm"
                  onChange={(e) => texts.updateText(index, { size: Number(e.target.value) })}
                />
              </div>
            </div>

            <ColorPicker
              value={text?.color}
              onChange={(color: string) => texts.updateText(index, { color })}
              label="Color"
            />
            <ColorPicker
              value={text?.stroke}
              onChange={(stroke: string) => texts.updateText(index, { stroke })}
              label="Stroke"
            />
            <AlignPicker
              value={text?.align}
              onChange={(align: TextAlign) => texts.updateText(index, { align })}
              label="Align"
            />
            <div className="flex flex-1 justify-end ml-3">
              <button
                className="rounded btn btn-error p-3 text-accent-content self-end"
                onClick={() => texts.deleteText(index)}>
                <Img src={TrashIcon} width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {texts.texts.length < 4 && (
        <div className="flex flex-row gap-3">
          <Button className="btn-accent flex flex-1" onClick={() => addText('')}>
            <Img src={AddTextIcon} width={23} height={23} />
            <span className="ml-3">Add text</span>
          </Button>
        </div>
      )}
    </>
  );
}
