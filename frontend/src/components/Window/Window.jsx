// Window.jsx
import { useRef, useState, useEffect, } from "react";
import "./Window.scss";

/**
 * A Window component that can be dragged, maximized, and focused.
 * 
 * @param {React.ReactNode} children The content of the window.
 * @param {string} id The id of the window.
 * @param {React.RefObject<HTMLElement>} containerRef A reference to the container element that the window is a part of.
 * @param {string} name The title of the window.
 * @param {string} className Additional CSS classes to add to the window.
 * @param {{x: number, y: number}} initialPosition The initial position of the window, relative to the container.
 * @param {boolean} isDraggable Whether the window can be dragged.
 * 
 * @returns {React.ReactElement} The Window component element.
 */
const Window = ({ children, id, containerRef, name = "Drag Me", className = "", initialPosition = { x: 0.5, y: 0.5 }, isDraggable = true }) => {
    const windowRef = useRef(null);

    // Dragging
    const canDrag = useRef(true);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    // Maximize
    const [isMaximized, setIsMaximized] = useState(false);

    // Focus (Bring to front when clicked)
    const [isFocused, setIsFocused] = useState(false);



    /**
     * Sets the initial position of the window. If the window is not draggable, then it is maximized.
     * The position is relative to the container, and is calculated so that the window is centered
     * in the container.
     */
    const setInialPosition = () => {
        if (!isDraggable) setIsMaximized(true);
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
        /**
         * Handles the mouse move event to update the position of the window during dragging.
         * 
         * @param {MouseEvent} e - The mouse event triggered on mouse move.
         * 
         * This function calculates the new position of the window based on the current mouse
         * position and the initial offset when dragging started. It ensures that the window
         * remains within the boundaries of the container.
         */

        const handleMouseMove = (e) => {
            if (!dragging) {
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

        /**
         * Handles the mouse up event to stop the dragging of the window.
         * 
         * This function is triggered when the mouse button is released. It sets the
         * dragging state to false and removes the grab cursor class from the container
         * to indicate that the window is no longer being dragged.
         */


        const handleMouseUp = () => { setDragging(false); containerRef.current.classList.remove("--grab-cursor"); }

        if (isDraggable) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            if (isDraggable) {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };
    }, [dragging]);

    // Maximize/Minimize
    useEffect(() => {
        if (isMaximized) {
            windowRef.current.classList.add("window--maximized");
            setPosition({ x: 0, y: 0 });
            canDrag.current = false;
        }
        else {
            windowRef.current.classList.remove("window--maximized");
            canDrag.current = true;
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

    /**
     * Handles the mouse down event to initiate dragging of the window.
     * 
     * If the target element is a button, the function returns immediately.
     * Otherwise, it focuses the window and checks if dragging is allowed.
     * If dragging is permitted, it sets the dragging state to true and
     * adds a grab cursor class to the container. It also calculates the
     * offset for dragging based on the current mouse position.
     * 
     * @param {MouseEvent} e - The mouse event triggered by the user.
     */

    const handleMouseDown = (e) => {
        if (e.target.closest("button")) return;
        windowRef.current.focus();
        if (!canDrag.current) return;
        setDragging(true);
        containerRef.current.classList.add("--grab-cursor");
        const rect = windowRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    /**
     * Handles the focus event to set the window as focused and maximize it if it is not draggable.
     * 
     * This function is triggered when the window gains focus. It sets the focused state to true
     * and if the window is not draggable, it sets the maximized state to true as well.
     */
    const handleOnFocus = () => {
        if (!isDraggable) setIsMaximized(true);
        setIsFocused(true);
    }

    /**
     * Handles the blur event to set the window as unfocused and restore it if it is not draggable.
     * 
     * This function is triggered when the window loses focus. It sets the focused state to false
     * and if the window is not draggable, it sets the maximized state to false as well.
     */
    const handleOnBlur = () => {
        if (!isDraggable) setIsMaximized(false);
        setIsFocused(false);
    }


    /**
     * Handles the close event of the window.
     * 
     * This function is triggered when the close button of the window is clicked.
     * It sets the maximized state to false, restores the window's initial position,
     * and removes the "window--opened" class from the window element.
     */
    const handleOnClose = () => {
        setIsMaximized(false);
        setInialPosition();
        windowRef.current.classList.remove("window--opened");

    }

    /**
     * Toggles the maximized state of the window.
     * 
     * This function is triggered when the maximize button is clicked.
     * It inverts the current maximized state, either maximizing the
     * window if it is currently not maximized, or restoring it if it 
     * is maximized.
     */

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
                    <li id="maximize" className="window-controls__item">
                        <button className="window-controls__button" onClick={handleOnMaximize}>🗖</button>
                    </li>
                    <li id="close" className="window-controls__item">
                        <button className="window-controls__button" onClick={handleOnClose}>X</button>
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