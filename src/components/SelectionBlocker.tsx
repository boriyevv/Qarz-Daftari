"use client";

import { useEffect } from "react";

export function SelectionBlocker() {
  useEffect(() => {
    // Barcha selection eventlarini bloklash
    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Selection eventlari
    document.addEventListener('selectstart', preventDefault, true);
    document.addEventListener('selectionchange', preventDefault, true);
    
    // Context menu
    document.addEventListener('contextmenu', preventDefault, true);

    // iOS Safari uchun
    document.addEventListener('touchstart', () => {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }
    }, { passive: true });

    return () => {
      document.removeEventListener('selectstart', preventDefault, true);
      document.removeEventListener('selectionchange', preventDefault, true);
      document.removeEventListener('contextmenu', preventDefault, true);
    };
  }, []);

  return null;
}