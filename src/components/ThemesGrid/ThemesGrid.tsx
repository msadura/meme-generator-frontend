import { ThemeItem } from '@app/components/ThemesGrid/ThemeItem/ThemeItem';
import { Theme } from '@app/types';
import { shuffle } from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CSSGrid, measureItems, makeResponsive, layout } from 'react-stonecutter';

type Props = {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
};

export function ThemesGrid({ themes, onSelect }: Props): JSX.Element | null {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridThemes, setGridThemes] = useState(themes);

  const measureContainer = useRef(() => {
    const width = containerRef.current?.clientWidth;
    setContainerWidth(width || 0);
  }).current;

  const Grid = useMemo(() => {
    if (!containerWidth) {
      return null;
    }

    return makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: containerWidth,
      minPadding: 0
    });
  }, [containerWidth]);

  useEffect(() => {
    if (themes.length) {
      measureContainer();
    }
  }, [measureContainer, themes.length]);

  useEffect(() => {
    window.addEventListener('resize', measureContainer);
    () => window.removeEventListener('resize', measureContainer);
  }, [measureContainer]);

  useEffect(() => {
    if (Grid) {
      setTimeout(() => setGridThemes(shuffle(themes)));
    }
  }, [Grid, themes]);

  useEffect(() => {
    setGridThemes(themes);
  }, [themes]);

  if (!themes.length) {
    return null;
  }

  return (
    <div className="w-full h-full absolute inset-0 overflow-y-auto" ref={containerRef}>
      <p className="text-accent-focus text-lg mb-3">
        Need inspiration? Pick some of trending themes:
      </p>
      {Grid && (
        <Grid
          component="ul"
          columns={4}
          columnWidth={150}
          gutterWidth={0}
          gutterHeight={0}
          layout={layout.pinterest}
          duration={800}
          easing="ease-out">
          {gridThemes.map((t) => (
            <li
              key={t.id}
              className="relative"
              style={{
                width: 150,
                height: 'auto'
              }}>
              <ThemeItem item={t} onClick={onSelect} />
            </li>
          ))}
        </Grid>
      )}
    </div>
  );
}
