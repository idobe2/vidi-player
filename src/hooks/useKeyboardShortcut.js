import { useEffect } from "react";

export function useKeyboardShortcut({ key, onKeyPressed }) {
  useEffect(() => {
    function keyDownHandler(e) {
      const targetTag = e.target.tagName.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") {
        return;
      }

      if (e.key === key) {
        e.preventDefault()
        onKeyPressed();
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [key, onKeyPressed]);
}
