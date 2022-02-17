import { useCallback, useEffect, useState } from 'react';

export enum BreakPoint {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl'
}

const BREAKPOINTS_WIDTHS = {
  [BreakPoint.sm]: 640,
  [BreakPoint.md]: 768,
  [BreakPoint.lg]: 1024,
  [BreakPoint.xl]: 1280
};

const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getScreenVariant = useCallback(() => {
    const width = isClient ? window.innerWidth : 0;

    if (width >= BREAKPOINTS_WIDTHS.lg) {
      return BreakPoint.lg;
    }

    if (width >= BREAKPOINTS_WIDTHS.lg) {
      return BreakPoint.lg;
    }

    if (width >= BREAKPOINTS_WIDTHS.md) {
      return BreakPoint.md;
    }

    return BreakPoint.sm;
  }, [isClient]);

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
      screen: getScreenVariant()
    };
  }, [isClient, getScreenVariant]);

  const [screenSize, setScreenSize] = useState(getSize);

  const hasSize = useCallback(
    (size?: BreakPoint) => {
      if (!size || size === BreakPoint.sm) {
        return true;
      }

      if (size === BreakPoint.xl && screenSize.screen === BreakPoint.xl) {
        return true;
      }

      if (size === BreakPoint.lg && [BreakPoint.xl, BreakPoint.lg].includes(screenSize.screen)) {
        return true;
      }

      if (
        size === BreakPoint.md &&
        [BreakPoint.xl, BreakPoint.lg, BreakPoint.md].includes(screenSize.screen)
      ) {
        return true;
      }

      return false;
    },
    [screenSize.screen]
  );

  const isVisible = useCallback(
    (minSize?: BreakPoint) => {
      return hasSize(minSize);
    },
    [hasSize]
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => {
      setScreenSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getSize, isClient]);

  return { size: screenSize, isVisible, hasSize };
};

export default useWindowSize;
