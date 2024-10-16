import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      function Keypress(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", Keypress);
      return function () {
        document.removeEventListener("keydown", Keypress);
      };
    },
    [action, key]
  );
}
