import { useEffect, useRef } from "react";
import "./ScrollSequenceAnimCanvas.scss";

const ScrollSequenceAnimCanvas = ({ triggerRef, scrollBoxRef }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameCount = 119;
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
        const start = triggerRef.current.offsetTop;
        const end = scrollBoxRef.current.offsetHeight + scrollBoxRef.current.offsetTop - window.innerHeight;

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
        const handleScroll = (e) => {  
            e.preventDefault();
            const scrollTop = window.scrollY;
           
            if (scrollTop < start) return;
            
            const maxScroll = end - start;
            const progress = Math.min(1, Math.max(0, (scrollTop - start) / maxScroll));
            // console.log(`Start: ${start}`);
            // console.log(`End: ${end}`);
            // console.log(`Max Scroll: ${maxScroll}`);
            // console.log(`Progress: ${progress}`);
                      
            const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
            requestAnimationFrame(() => render(frameIndex));
            //console.log(`Frame Index: ${frameIndex}`);
            
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