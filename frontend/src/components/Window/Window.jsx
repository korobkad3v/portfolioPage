// Window.jsx
import { useRef, useState, useEffect, } from "react";
import "./Window.scss";

const Window = ({children, id, containerRef, windowsRef, name="Drag Me", className="", initialPosition = { x: 0.5, y: 0.5 }}) => {
    const windowRef = useRef(null);

    // Dragging
    const isDraggable = useRef(true);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    // Maximize
    const [isMaximized, setIsMaximized] = useState(false);

    // Focus (Bring to front when clicked)
    const [isFocused, setIsFocused] = useState(false);

    // set initial position, intial position is relative to container
    const setInialPosition = () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const windowRect = windowRef.current.getBoundingClientRect();

        let newX = initialPosition.x * containerRect.width - windowRect.width / 2;
        let newY = initialPosition.y * containerRect.height - windowRect.height / 2;

        const maxX = containerRect.width - windowRect.width;
        const maxY = containerRect.height - windowRect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setPosition({ x: newX, y: newY });
    }
    
    useEffect(() => {
        setInialPosition();
        window.addEventListener("resize", setInialPosition);
        return () => window.removeEventListener("resize", setInialPosition);
    }, [])

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) 
                {
                    return;    
                };
            
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
        const handleMouseUp = () => {setDragging(false); containerRef.current.classList.remove("--grab-cursor");}
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    // Maximize/Minimize
    useEffect(() => {
        if (isMaximized) {
            windowRef.current.classList.add("window--maximized");
            setPosition({ x: 0, y: 0 });
            isDraggable.current = false;
        }
        else {
            windowRef.current.classList.remove("window--maximized");
            isDraggable.current = true;
            setInialPosition();
        }
    }, [isMaximized]);

    useEffect(() => {
        if (isFocused) {
            windowRef.current.classList.add("window--focused");
        }
        else {
            windowRef.current.classList.remove("window--focused");
        }
    }, [isFocused]);

    const handleMouseDown = (e) => {
        if (e.target.closest("button")) return;
        windowRef.current.focus();
        if (!isDraggable.current) return;
        setDragging(true);
        containerRef.current.classList.add("--grab-cursor");
        const rect = windowRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };    };
    
    const handleOnFocus = () => {
        setIsFocused(true);
    }

    const handleOnBlur = () => {
        setIsFocused(false);
    }

    const handleOnClose = () => {
        windowRef.current.classList.remove("window--opened");
        setInialPosition();
        setIsMaximized(false);
    }

    const handleOnMaximize = () => {
        setIsMaximized(!isMaximized);
    }

    return (
          <div
            ref={windowRef}
            id={id}
            className={"window" + " " + className}
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px)`, 
                }}
            tabIndex="-1"
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          >
            <div className="window__header" onMouseDown={handleMouseDown}>
                <div className="window__title">{name}</div>
                <ul className="window-controls">
                    {/* <li className="window-controls__item">
                        <button className="window-controls__button">🗕</button>
                    </li> */}
                    <li className="window-controls__item">
                        <button className="window-controls__button" onClick={handleOnMaximize}>🗖</button>
                    </li>
                    <li className="window-controls__item">
                        <button className="window-controls__button" onClick={handleOnClose}>🗙</button>
                    </li>
                </ul>
            </div>
            <div className="window__content">
                {children}
            </div>
          </div>
      );
}



export default Window;