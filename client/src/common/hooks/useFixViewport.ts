import { useEffect } from "react";

export const useFixViewPort = () => {
  useEffect(() => {
    setTimeout(function () {
      let viewheight = window.innerHeight;
      let viewwidth = window.innerWidth;
      let viewport = document.querySelector("meta[name=viewport]");
      if (!viewport) return;
      viewport.setAttribute(
        "content",
        "height=" +
          viewheight +
          "px, width=" +
          viewwidth +
          "px, initial-scale=1.0"
      );
    }, 300);
  }, []);
};
