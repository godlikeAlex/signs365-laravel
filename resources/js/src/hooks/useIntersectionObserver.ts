import { useCallback, useRef } from "react";

export default function useIntersectionObserver(onIntersect: () => void) {
  const unsubscribe = useRef(() => {});

  return useCallback((node: HTMLElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect();
        }
      });
    });

    if (node) {
      observer.observe(node);
      unsubscribe.current = () => observer.disconnect();
    } else {
      unsubscribe.current();
    }
  }, []);
}
