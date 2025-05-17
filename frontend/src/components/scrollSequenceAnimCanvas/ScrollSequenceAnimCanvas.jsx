// ScrollSequenceAnimCanvas.jsx
// Refactor this later

import { useEffect, useRef, useMemo } from "react";
import { throttle } from 'lodash';
import "./ScrollSequenceAnimCanvas.scss";
import { useUA } from 'use-ua-parser-js';

const ScrollSequenceAnimCanvas = ({ 
  scrollBoost=0.25, 
  friction=0.925, 
  canAnimate={current: false}, 
  onEdgeChange = () => {}}
) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCount = 119;
    const currentFrameIndex = useRef(0);
    const velocity = useRef(0);
    const isAnimating = useRef(false);
    const scrollDirection = useRef(0);
    const lastEdgeState = useRef({ atStart: true, atEnd: false });

    // touch
    const touchStartY = useRef(0);
    const touchDelta = useRef(0);
    
    const currentFrame = (index) => 
        `/images/frames/result_${index.toString()}.png`;

    const lerp = (start, end, t) => {
      return start + (end - start) * t;
    };

    const userAgentDevice = useUA().device || 'unknown';
    console.log("userAgentDevice", userAgentDevice)

    const preloadImagesAround = (index, radius = 5) => {
      const start = Math.max(1, index - radius);
      const end = Math.min(frameCount, index + radius);

      for (let i = start; i <= end; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = currentFrame(i);
          imagesRef.current[i] = img;
        }
      }
    }

    const drawCoverImage = (ctx, img, canvasWidth, canvasHeight) => {
      const imgRatio = img.width / img.height;
      const canvasRatio = canvasWidth / canvasHeight;
      let drawWidth, drawHeight;
    
      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = img.width * (canvasHeight / img.height);
      } else {
        drawWidth = canvasWidth;
        drawHeight = img.height * (canvasWidth / img.width);
      }
    
      const offsetX = (canvasWidth - drawWidth) / 2;
      const offsetY = (canvasHeight - drawHeight) / 2;
    
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;

        //const savedIndex = parseInt(localStorage.getItem("scrollSequenceFrame"));
        //currentFrameIndex.current = !isNaN(savedIndex) ? Math.min(Math.max(savedIndex, 0), frameCount - 1) : 0;
        
        const setCanvasSize = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          let dpr = window.devicePixelRatio || 1;

          if (userAgentDevice.type === "mobile" || userAgentDevice.type === "tablet") {
            dpr = Math.min(dpr, 2);
          }

          const rect = canvas.parentElement.getBoundingClientRect();
          // aspect ratio 1:1, take the avg
          const size = (rect.width + rect.height) / 2;

          const width = size * dpr;
          const height = size * dpr;

          canvas.width = width;
          canvas.height = height;
          canvas.style.width = `${size}px`;
          canvas.style.height = `${size}px`;
        }

        const render = (index) => {
            preloadImagesAround(index, 5);
            const img = imagesRef.current[index];
            if (!img) return;
            if (img && img.complete && img.naturalWidth !== 0) {
              drawCoverImage(ctx, img, canvas.width, canvas.height);
            } else {
              img.onload = () => {
                drawCoverImage(ctx, img, canvas.width, canvas.height);
              }
            }
        };

        const reportEdgeState = () => {
      const atStart = Math.round(currentFrameIndex.current) === 0;
      const atEnd = Math.round(currentFrameIndex.current) === frameCount - 1;
      const newState = { atStart, atEnd };

      if (
        newState.atStart !== lastEdgeState.current.atStart ||
        newState.atEnd !== lastEdgeState.current.atEnd
      ) {
        lastEdgeState.current = newState;
        onEdgeChange(newState);
      }
    };

        const animate = () => {
          if (Math.abs(velocity.current) < 0.02) {
            velocity.current = 0;
            isAnimating.current = false;
            //localStorage.setItem("scrollSequenceFrame", currentFrameIndex.current);
            return;
          }

          currentFrameIndex.current += velocity.current;
        
          if (currentFrameIndex.current < 0) {
            currentFrameIndex.current = 0;
          }
          if (currentFrameIndex.current > frameCount - 1) {
            currentFrameIndex.current = frameCount - 1;
          }
      
          render(Math.round(currentFrameIndex.current));    
          velocity.current = lerp(velocity.current, 0, 1 - friction);
          reportEdgeState();  
          requestAnimationFrame(animate);
        };

        const startAnimate = () => {
          velocity.current += scrollDirection.current * scrollBoost;
          const atStart = Math.round(currentFrameIndex.current) === 0;
          const atEnd = Math.round(currentFrameIndex.current) === frameCount - 1;
          onEdgeChange({ atStart, atEnd });
          if ((scrollDirection.current === -1 && atStart) || (scrollDirection.current === 1 && atEnd)) {
              return;

            }
          
            if (!canAnimate.current) {
              return;
            }

            if (!isAnimating.current) {
              console.log("Animate")
              isAnimating.current = true;
              requestAnimationFrame(animate);
            }
        }

        // touch
        const handleTouchStart = (e) => {
          touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
          e.preventDefault();

          const currentY = e.changedTouches[0].clientY;
          touchDelta.current = currentY - touchStartY.current;
          
          scrollDirection.current = touchDelta.current < 0 ? 1 : -1;
          startAnimate();
        };

        const handleScroll = (e) => {  
            e.preventDefault();
            scrollDirection.current = e.deltaY > 0 ? 1 : -1;
            startAnimate();
          };
        const handleResize = () => {
            setCanvasSize();
            render(currentFrameIndex.current);
        };

        setCanvasSize();
        render(currentFrameIndex.current);
        reportEdgeState();

        const callEvery = 100;
        const throttledTouchStart = throttle(handleTouchStart, callEvery);
        const throttledTouchMove = throttle(handleTouchMove, callEvery);
        const throttledScroll = throttle(handleScroll, callEvery);
        
        if (userAgentDevice.type === "mobile" || userAgentDevice.type === "tablet") {
          
          window.addEventListener("touchstart", throttledTouchStart, { passive: false });
          window.addEventListener("touchend", throttledTouchMove, { passive: false });
        }
        else {
          
          window.addEventListener("wheel", throttledScroll, { passive: false });
        }
      
        window.addEventListener("resize", handleResize);
        
        return () => {
            //localStorage.setItem("scrollSequenceFrame", currentFrameIndex.current);
            if (userAgentDevice.type === "mobile" || userAgentDevice.type === "tablet") {
              window.removeEventListener("touchstart", throttledTouchStart);
              window.removeEventListener("touchend", throttledTouchMove);
            }
            else {
              window.removeEventListener("wheel", throttledScroll);
            }
            window.removeEventListener("resize", handleResize);
          };
        }, []);

        return (
          <div className="scroll-sequence-anim-canvas__wrapper">
            <canvas
              ref={canvasRef}
              className="scroll-sequence-anim-canvas"
            />
          </div>
          );
};

export default ScrollSequenceAnimCanvas;