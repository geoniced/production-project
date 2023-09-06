import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(pointer:coarse)").matches
  );

  useEffect(() => {
    const resizeHandler = () => {
      setIsMobile(window.matchMedia("(pointer:coarse)").matches);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return isMobile;
};
