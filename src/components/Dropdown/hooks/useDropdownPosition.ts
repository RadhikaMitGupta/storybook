import {
  useCallback,
  useState,
} from 'react';
import type { LayoutRectangle } from 'react-native';
export interface MenuPosition {
  left: number;
  top: number;
  width: number;
  maxHeight: number;
}
export function useDropdownPosition(
  screenWidth: number,
  screenHeight: number,
  preferredHeight: number,
) {
  const [position, setPosition] =
    useState<MenuPosition | null>(null);

  const measure = useCallback(
    (rect: LayoutRectangle) => {
      const margin = 12;

      const width = Math.min(
        rect.width,
        screenWidth - margin * 2,
      );

      const left = Math.max(
        margin,
        Math.min(
          rect.x,
          screenWidth - width - margin,
        ),
      );

      const below = Math.max(
        0,
        screenHeight - rect.y - rect.height - 8,
      );

      const above = Math.max(0, rect.y - 8);

      const openAbove =
        below < Math.min(120, preferredHeight) &&
        above > below;

      const maxHeight = Math.min(
        preferredHeight,
        openAbove ? above : below,
      );

      const top = openAbove
        ? Math.max(8, rect.y - maxHeight - 4)
        : rect.y + rect.height + 4;

      setPosition({
        left,
        top,
        width,
        maxHeight,
      });
    },
    [preferredHeight, screenHeight, screenWidth],
  );

  const clear = useCallback(() => {
    setPosition(null);
  }, []);

  return {
    position,
    measure,
    clear,
  };
}