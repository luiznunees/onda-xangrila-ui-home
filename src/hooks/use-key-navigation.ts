
import { useEffect, useState, useRef } from "react";

interface KeyNavigationOptions {
  gridMode?: boolean;
  columns?: number;
  onSelect?: (index: number) => void;
  onBack?: () => void;
  itemCount: number;
  initialFocus?: number;
  wrapNavigation?: boolean;
}

export function useKeyNavigation({
  gridMode = false,
  columns = 3,
  onSelect,
  onBack,
  itemCount,
  initialFocus = 0,
  wrapNavigation = true,
}: KeyNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState(initialFocus);
  const lastKeyPressTime = useRef(0);
  const THROTTLE_MS = 100; // Prevent too rapid navigation

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Throttle key presses
      const now = Date.now();
      if (now - lastKeyPressTime.current < THROTTLE_MS) return;
      lastKeyPressTime.current = now;

      // Handle key navigation
      switch (e.key) {
        case "ArrowUp":
          if (gridMode) {
            setFocusedIndex((prev) => {
              const newIndex = prev - columns;
              if (newIndex < 0) {
                return wrapNavigation ? itemCount - (itemCount % columns) + prev : prev;
              }
              return newIndex;
            });
          } else {
            setFocusedIndex((prev) => 
              prev > 0 ? prev - 1 : (wrapNavigation ? itemCount - 1 : prev)
            );
          }
          break;
          
        case "ArrowDown":
          if (gridMode) {
            setFocusedIndex((prev) => {
              const newIndex = prev + columns;
              if (newIndex >= itemCount) {
                return wrapNavigation ? prev % columns : prev;
              }
              return newIndex;
            });
          } else {
            setFocusedIndex((prev) => 
              prev < itemCount - 1 ? prev + 1 : (wrapNavigation ? 0 : prev)
            );
          }
          break;
          
        case "ArrowLeft":
          if (gridMode) {
            setFocusedIndex((prev) => {
              // If at left edge of grid row
              if (prev % columns === 0) {
                return wrapNavigation ? prev + columns - 1 : prev;
              }
              return prev - 1;
            });
          }
          break;
          
        case "ArrowRight":
          if (gridMode) {
            setFocusedIndex((prev) => {
              // If at right edge of grid row
              if ((prev + 1) % columns === 0) {
                return wrapNavigation ? prev - columns + 1 : prev;
              }
              return prev + 1;
            });
          }
          break;
          
        case "Enter":
        case " ":
          if (onSelect) onSelect(focusedIndex);
          break;
          
        case "Backspace":
        case "Escape":
          if (onBack) onBack();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gridMode, columns, itemCount, focusedIndex, onSelect, onBack, wrapNavigation]);

  return { focusedIndex, setFocusedIndex };
}
