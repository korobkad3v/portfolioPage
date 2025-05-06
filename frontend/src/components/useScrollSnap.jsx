// useScrollSnap.js
import { useEffect, useRef, useState } from "react";

const useScrollSnap = (ignoreRefs = []) => {
  const [canCanvasAnimate, setCanAnimate] = useState(false);
  const sections = useRef(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isInIgnoreZone, setIsInIgnoreZone] = useState(false);

  // init sections elements
  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll("section"));
  }, []);

  const checkIsInIgnoreZone = (deltaY) => {
    return ignoreRefs.some(ref => {
      if (!ref.current) return false;
      
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const nextScrollY = scrollY + deltaY;
      console.log("Next Scroll Y:", nextScrollY);
      console.log("scrollY", scrollY);
      const rect = ref.current.getBoundingClientRect();
      const absoluteTop = rect.top + scrollY;
      const absoluteBottom = rect.bottom + scrollY - window.innerHeight;

      // console.log("Scroll Y:", scrollY);
      console.log("Absolute Top:", absoluteTop);
      console.log("Absolute Bottom:", absoluteBottom);
      // console.log("Result:", absoluteTop <= scrollY && absoluteBottom >= scrollY);
      const inCurrent = scrollY >= absoluteTop && scrollY <= absoluteBottom;
      const inNext = nextScrollY >= absoluteTop && nextScrollY <= absoluteBottom;
      return inCurrent & inNext;
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInIgnoreZone(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1, // виден хотя бы на 10%
      }
    );
  
    ignoreRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });
  
    return () => {
      ignoreRefs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [ignoreRefs]);

  const getDirection = (deltaY) => {
    return deltaY > 0 ? 1 : -1;
  }

  const scrollTo = (index) => {
    const section = sections.current[index];
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const direction = getDirection(e.deltaY);
      const nextIndex =
      currentSectionIndex + direction > -1 &&
      currentSectionIndex + direction < sections.current.length
        ? currentSectionIndex + direction
        : currentSectionIndex;

      if (nextIndex !== currentSectionIndex) {
        scrollTo(nextIndex);
        setCurrentSectionIndex(nextIndex);
      }

      

    };
    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [ignoreRefs, currentSectionIndex]);


};

export default useScrollSnap;