import { RefObject, useEffect, useState } from "react";

export function useSticky(refElement: RefObject<HTMLElement>) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const header = refElement.current?.getBoundingClientRect();

    const handleScroll = () => {
      if (!header) return;

      setIsSticky(window.pageYOffset > header.height * 0.8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isSticky };
}
