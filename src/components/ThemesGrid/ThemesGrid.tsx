import { ThemeItem } from '@app/components/ThemesGrid/ThemeItem/ThemeItem';
import { Theme } from '@app/types';
import { shuffle } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  themes: Theme[];
  onSelect: (theme: Theme) => void;
};

export function ThemesGrid({ themes, onSelect }: Props): JSX.Element | null {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridThemes, setGridThemes] = useState(themes);

  useEffect(() => {
    setGridThemes(shuffle(themes));
  }, [themes]);

  if (!themes.length) {
    return null;
  }

  return (
    <div className="w-full h-full absolute inset-0 overflow-y-auto" ref={containerRef}>
      <p className="text-accent-focus text-lg mb-3">
        Need inspiration? Pick some of trending themes:
      </p>
      <div className="masonry sm:masonry-sm md:masonry-md md:masonry-lg">
        {gridThemes.map((t) => (
          <ThemeItem key={t.id} item={t} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
}
