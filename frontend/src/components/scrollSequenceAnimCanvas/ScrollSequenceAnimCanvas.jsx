// ScrollSequenceAnimCanvas.jsx
// Refactor this later

import { useEffect, useRef } from "react";
import "./ScrollSequenceAnimCanvas.scss";

const ScrollSequenceAnimCanvas = ({ scrollBoost=0.25, friction=0.925, canAnimate={current: false}}) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCount = 119;
    const currentFrameIndex = useRef(0);
    const velocity = useRef(0);
    const isAnimating = useRef(false);
    const scrollDirection = useRef(0);

    // touch
    const touchStartY = useRef(0);
    const touchDelta = useRef(0);
    const currentFrame = (index) => 
        `/images/frames/result_${index.toString()}.png`;

    const loadImages = () => {
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        imagesRef.current.push(img);
      }
    };

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

    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const savedIndex = parseInt(localStorage.getItem("scrollSequenceFrame"));
        const index = !isNaN(savedIndex) ? Math.min(Math.max(savedIndex, 0), frameCount - 1) : 0;
        currentFrameIndex.current = index;
        
        const setCanvasSize = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const dpr = window.devicePixelRatio || 1;
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
            const img = imagesRef.current[index];
            if (img && img.complete) {
              drawCoverImage(ctx, img, canvas.width, canvas.height);
              localStorage.setItem("scrollSequenceFrame", index);
            }
        };

        const checkImageReady = () => {
          const img = imagesRef.current[index];
          if (img && img.complete) {
            render(index);
          } else {
            setTimeout(checkImageReady, 50);
          }
        };

        const animate = () => {
          if (Math.abs(velocity.current) < 0.02) {
            
            velocity.current = 0;
            isAnimating.current = false;
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
          velocity.current *= friction;

          requestAnimationFrame(animate);
        };

        // touch
        const handleTouchStart = (e) => {
          touchStartY.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
          e.preventDefault();

          const currentY = e.touches[0].clientY;
          touchDelta.current = currentY - touchStartY.current;
          

          scrollDirection.current = touchDelta.current < 0 ? 1 : -1;

          console.log("scrollDirection", scrollDirection.current)
          velocity.current += scrollDirection.current * scrollBoost / 4;
          
          const atStart = Math.round(currentFrameIndex.current) === 0;
          const atEnd = Math.round(currentFrameIndex.current === frameCount - 1);
          
          if ((scrollDirection.current === -1 && atStart) || (scrollDirection.current === 1 && atEnd)) {
            console.log("canAnimate set false")
            canAnimate.current = false;
          }

          if (!canAnimate.current) {
            //console.log("Cannot animate")
            return;
          }
          touchStartY.current = currentY;
          if (!isAnimating.current) {
            //console.log("Animate")
            isAnimating.current = true;
            requestAnimationFrame(animate);
          }
        };

        const handleScroll = (e) => {  
            e.preventDefault();
            scrollDirection.current = e.deltaY > 0 ? 1 : -1;
            velocity.current += scrollDirection.current * scrollBoost; 
            const atStart = Math.round(currentFrameIndex.current) === 0;
            const atEnd = Math.round(currentFrameIndex.current === frameCount - 1);
            
            if ((scrollDirection.current === -1 && atStart) || (scrollDirection.current === 1 && atEnd)) {
              canAnimate.current = false;
            }
          
            if (!canAnimate.current) {
              return;
            }

            if (!isAnimating.current) {
              console.log("Animate")
              isAnimating.current = true;
              requestAnimationFrame(animate);
            }
          };
        const handleResize = () => {
            loadImages();
            setCanvasSize();
            checkImageReady();
        };

        loadImages();
        setCanvasSize();
        checkImageReady();

        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("wheel", handleScroll);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("resize", handleResize);
          };
        }, [canAnimate]);

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