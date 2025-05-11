import React, { useRef, useState, useEffect } from "react";
import "./Window.scss";

const Window = ({children, id, containerRef, name="Drag Me", bringToFront}) => {
    const windowRef = useRef(null);
    // Dragging
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const windowRect = windowRef.current.getBoundingClientRect();

            let newX = e.clientX - offset.current.x;
            let newY = e.clientY - offset.current.y;

            const maxX = containerRect.width - windowRect.width;
            const maxY = containerRect.height - windowRect.height;

            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));

            setPosition({ x: newX, y: newY });
        }
        setIsMaximized(false);
        const handleMouseUp = () => setDragging(false);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);
    const handleMouseDown = (e) => {
        windowRef.current.focus();
        setDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };    };
    
    const onFocus = () => {
        windowRef.current.classList.add("window--focused");
    }

    const onBlur = () => {
        windowRef.current.classList.remove("window--focused");
    }

    return (
       
          <div
            ref={windowRef}
            className="window"
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px)`, 
                }}
            tabindex="-1"
            onFocus={onFocus}
            onBlur={onBlur}
            id={id}
          >
            <div className="window__header" onMouseDown={handleMouseDown}>
                <div className="window__title">{name}</div>
                <ul className="window-controls">
                    <li className="window-controls__item">
                        <button className="window-controls__button">
                        🗕
                        </button>
                    </li>
                    <li className="window-controls__item">
                        <button className="window-controls__button">
                        🗖
                        </button>
                    </li>
                    <li className="window-controls__item">
                        <button className="window-controls__button">
                        🗙
                        </button>
                    </li>
                </ul>
            </div>
            <div className="window__content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium repellendus eligendi doloribus incidunt sunt quia autem a? Dicta, quidem quo sequi earum delectus eaque ut porro voluptas adipisci dolor animi.</div>
          </div>

      );
}



export default Window;