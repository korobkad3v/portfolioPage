import { useEffect, useRef } from "react";


const ScrollSequenceAnimCanvas = ({ triggerRef }) => {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const triggered = useRef(false);
    const imgRef = useRef(new Image());

    const frameCount = 119;
    const currentFrame = (index) => 
        `/images/frames/result_${index.toString()}.png`;


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            imagesRef.current.push(img);
          }

        const render = (index) => {
            const img = imagesRef.current[index];
            console.log(index);
            if (img && img.complete) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
            
        };
        const handleScroll = () => {
            
            const triggerTop = triggerRef.current?.offsetTop || 0;
            
            const scrollTop = window.scrollY;
            console.log(scrollTop);
            console.log(triggerTop);
            if (scrollTop >= triggerTop) {
                triggered.current = true;
            }

            if (!triggered.current) return;

            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const progress = scrollTop / maxScroll;
            console.log(progress);
            const frameIndex = Math.min(frameCount - 1, Math.floor(progress * frameCount));
            requestAnimationFrame(() => render(frameIndex));
          };
        
        window.addEventListener("scroll", handleScroll);

        imgRef.current.src = currentFrame(0);
        imgRef.current.onload = () => {
        ctx.drawImage(imgRef.current, 0, 0, canvas.width, canvas.height);
        };

        return () => {
            window.removeEventListener("scroll", handleScroll);
          };
        }, []);

        return (
            <canvas
              ref={canvasRef}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />
          );
};

export default ScrollSequenceAnimCanvas;