// useScrollSnap.js
import { useEffect, useRef, useState } from "react";

/**
 * Hook to implement scroll snapping with exclusion zones
 * @param {Array} ignoreRefs - Array of refs to elements that should maintain native scrolling
 * @param {number} threshold - Threshold for scroll detection (default: 0.1)
 * @param {number} delay - Debounce delay for scroll events in ms (default: 100)
 */
const useScrollSnap = (ignoreRefs = [], threshold = 0.1, delay = 100) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const scrollTimeout = useRef(null);
  const sections = useRef([]);
  const isUserScrolling = useRef(false);

  // Initialize section elements
  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll("section"));
    console.log(sections.current);
  }, []);

  const isInIgnoreZone = () => {
    return ignoreRefs.some(ref => {
      if (!ref.current) return false;
      
      const rect = ref.current.getBoundingClientRect();
      console.log(rect);
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isInIgnoreZone()) {
        console.log("In ignore zone");
        return;
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  })

  // Check if current scroll position is inside an ignore zone
  // const isInIgnoreZone = () => {
  //   console.log(ignoreRefs);
  //   return ignoreRefs.some(ref => {
  //     if (!ref.current) return false;
      
  //     const rect = ref.current.getBoundingClientRect();
  //     const isVisible = 
  //       window.pageYOffset > rect.top && 
  //       window.pageYOffset < rect.bottom;
      
  //     // If we're fully inside the ignore element
  //     return isVisible
  //   });
  // };

  // // Get the nearest section based on current scroll position
  // const getNearestSection = () => {
  //   const viewportCenter = window.innerHeight / 2;
    
  //   let nearestSection = null;
  //   let minDistance = Infinity;
    
  //   sections.current.forEach((section, index) => {
  //     const rect = section.getBoundingClientRect();
  //     const sectionCenter = rect.top + rect.height / 2;
  //     const distance = Math.abs(sectionCenter - viewportCenter);
      
  //     if (distance < minDistance) {
  //       minDistance = distance;
  //       nearestSection = { index, element: section };
  //     }
  //   });
    
  //   return nearestSection;
  // };

  // // Smooth scroll to a specific section
  // const scrollToSection = (section) => {
  //   if (!section) return;
    
  //   setIsScrolling(true);
  //   isUserScrolling.current = false;
    
  //   section.element.scrollIntoView({
  //     behavior: "smooth",
  //     block: "start",
  //   });
    
  //   // Update current section index
  //   setCurrentSectionIndex(section.index);
    
  //   // Reset scrolling state after animation completes
  //   clearTimeout(scrollTimeout.current);
  //   scrollTimeout.current = setTimeout(() => {
  //     setIsScrolling(false);
  //   }, 1000); // Approximate time for smooth scroll to complete
  // };

  // // Handle scroll events
  // useEffect(() => {
  //   let lastScrollTop = window.pageYOffset;
    
  //   const handleScroll = () => {
  //     if (isScrolling || isInIgnoreZone()) {
  //       console.log("Scrolling or in ignore zone");
  //       return;
  //     }
      
  //     const currentScrollTop = window.pageYOffset;
  //     const scrollDirection = currentScrollTop > lastScrollTop ? "down" : "up";
  //     lastScrollTop = currentScrollTop;
      
  //     // Set user scrolling flag
  //     if (!isUserScrolling.current) {
  //       isUserScrolling.current = true;
  //     }
      
  //     // Debounce scroll events
  //     clearTimeout(scrollTimeout.current);
  //     scrollTimeout.current = setTimeout(() => {
  //       if (!isInIgnoreZone() && isUserScrolling.current) {
  //         const nearestSection = getNearestSection();
  //         if (nearestSection) {
  //           scrollToSection(nearestSection);
  //         }
  //       }
  //     }, delay);
  //   };
    
  //   window.addEventListener("scroll", handleScroll, { passive: true });
    
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //     clearTimeout(scrollTimeout.current);
  //   };
  // }, [isScrolling, delay]);

  // // Handle keyboard navigation
  // useEffect(() => {
  //   const handleKeyDown = (e) => {
  //     if (isScrolling || isInIgnoreZone()) return;
      
  //     if (e.key === "ArrowDown" || e.key === "ArrowRight") {
  //       e.preventDefault();
  //       const nextIndex = Math.min(currentSectionIndex + 1, sections.current.length - 1);
  //       scrollToSection({ index: nextIndex, element: sections.current[nextIndex] });
  //     } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
  //       e.preventDefault();
  //       const prevIndex = Math.max(currentSectionIndex - 1, 0);
  //       scrollToSection({ index: prevIndex, element: sections.current[prevIndex] });
  //     }
  //   };
    
  //   window.addEventListener("keydown", handleKeyDown);
    
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [currentSectionIndex, isScrolling]);

  // return { currentSectionIndex };
};

export default useScrollSnap;