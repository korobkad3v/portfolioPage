import { useEffect, useRef, useState } from "react";
import "./ScrollSequenceAnimCanvas.scss";

const ScrollSequenceAnimCanvas = ({ children, scrollBoost=0.25,friction=0.95}) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCount = 119;
    const currentFrameIndex = useRef(0);
    const velocity = useRef(0);
    const isAnimating = useRef(false);
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
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

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
            }
            
        };

        const getDirection = (deltaY) => {
            return deltaY > 0 ? 1 : -1;
        }

        const animate = () => {
          if (Math.abs(velocity.current) < 0.01) {
            velocity.current = 0;
            isAnimating.current = false;
            return;
          }
        
          currentFrameIndex.current += velocity.current;
        
          if (currentFrameIndex.current < 0) currentFrameIndex.current = 0;
          if (currentFrameIndex.current > frameCount - 1) currentFrameIndex.current = frameCount - 1;
        
          render(Math.round(currentFrameIndex.current));
        
          velocity.current *= friction;
        
          requestAnimationFrame(animate);
        };

        const handleScroll = (e) => {  
            e.preventDefault();

            const dir = e.deltaY > 0 ? 1 : -1;
            velocity.current += dir * scrollBoost; 
          
            if (!isAnimating.current) {
              isAnimating.current = true;
              requestAnimationFrame(animate);
            }
            
          };
        const handleResize = () => {
            setCanvasSize();
            handleScroll();
        };

        loadImages();
        setCanvasSize();

        imagesRef.current[0].onload = () => {
          render(0);
        };

        window.addEventListener("wheel", handleScroll, { passive: false });
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("wheel", handleScroll);
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