import { useEffect, useRef } from "react";


const useScrollSnap = (disabledRef) => {
    const isSnapping = useRef(false);
    const timeout = useRef(null);
    const touchStartY = useRef(null);
  
    useEffect(() => {
      const getBounds = () => {
        if (!disabledRef.current) return { top: 0, bottom: 0 };
        const rect = disabledRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        return {
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY - window.innerHeight,
        };
      };
  
      const isInDisabledArea = (deltaY) => {
        const { top, bottom } = getBounds();
        const scrollY = window.scrollY;
        return scrollY >= top && scrollY  < bottom;
      };
      

      const snapScroll = (direction) => {
        
        isSnapping.current = true;
        window.scrollTo({
          top: window.scrollY + direction * window.innerHeight,
          behavior: "smooth",
        });
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          isSnapping.current = false;
        }, 600);
      };
  
      const onWheel = (e) => {
        console.log(window.scrollY);
        console.log(getBounds());
        if (isInDisabledArea(e.deltaY)) return;
        if (isSnapping.current) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        snapScroll(direction);
      };
  
      const onTouchStart = (e) => {
        if (e.touches.length === 1) {
          touchStartY.current = e.touches[0].clientY;
        }
      };
  
      const onTouchEnd = (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const delta = touchStartY.current - touchEndY;
        if (isInDisabledArea(delta) || isSnapping.current || touchStartY.current === null) return;
  
        
        
  
        if (Math.abs(delta) > 50) {
          const direction = delta > 0 ? 1 : -1;
          snapScroll(direction);
        }
  
        touchStartY.current = null;
      };
  
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
  
      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchend", onTouchEnd);
      };
    }, [disabledRef]);
  };
  
  export default useScrollSnap;