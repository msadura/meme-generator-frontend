import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useCanvas } from '@app/components/Canvas/CanvasProvider';

export interface Props {
  className?: string;
  onReady?: (canvas: fabric.Canvas) => void;
}

/**
 * Fabric canvas as component
 */
export const Canvas = ({ className }: Props) => {
  const { setCanvas, canDisplayCanvas, bgImg } = useCanvas();
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const canvasElParent = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<null | fabric.Canvas>(null);
  const resizeRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!bgImg) {
      return;
    }

    let canvas = fabricCanvasRef.current;
    if (!canvas) {
      canvas = new fabric.Canvas(canvasEl.current);
      fabricCanvasRef.current = canvas;
    }

    const setCurrentDimensions = () => {
      if (!canvasElParent.current?.clientWidth || !canvas) {
        return;
      }

      const width =
        (canvasElParent.current?.clientWidth || 0) > (bgImg.width || 0)
          ? bgImg.width || 0
          : canvasElParent.current?.clientWidth;
      const height = ((width || 0) * (bgImg.height || 0)) / (bgImg.width || 0);
      const scale = bgImg.width ? width / bgImg.width : 1;

      canvas.setDimensions({ width, height });
      canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
    };
    resizeRef.current = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener('resize', resizeRef.current, false);

    setCanvas(canvas);
  }, [bgImg, setCanvas]);

  useEffect(() => {
    if (!bgImg) {
      setCanvas(null);
      fabricCanvasRef.current?.dispose();
      fabricCanvasRef.current = null;
      if (resizeRef.current) {
        window.removeEventListener('resize', resizeRef.current);
      }
      resizeRef.current = () => {};
    }
  }, [bgImg, setCanvas]);

  if (!bgImg) {
    return null;
  }

  return (
    <div ref={canvasElParent} className={className} id="fabric-canvas-wrapper">
      <canvas ref={canvasEl} />
    </div>
  );
};
