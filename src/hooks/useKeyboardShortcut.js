import { useEffect } from "react";

export function useKeyboardShortcut({ key, onKeyPressed }) {
  useEffect(() => {
    function keyDownHandler(e) {
      if (e.key === key) {
        e.preventDefault();
        onKeyPressed();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [key, onKeyPressed]);
}