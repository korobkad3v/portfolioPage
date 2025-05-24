// TextAnim.jsx
import React, { useEffect, useState } from "react";
import "./TextAnim.scss";

/**
 * A React component that animates text frames in a sequence.
 *
 * @param {Array<string>} frames - An array of strings representing the frames to animate.
 * @param {number} delay - The delay in milliseconds between frame changes.
 * @param {string} className - Additional CSS class names to apply to the element.
 * @return {JSX.Element} A JSX element that displays the animated frames.
 */

const TextAnim = ({ frames = [".", "..", "..."], delay = 150, className = "" }) => {
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % frames.length);

        }, delay);
        return () => clearInterval(interval);

    }, []);

    return (
        <span className={"dot-anim" + (className ? " " + className : "")}>
            {frames[index]}
        </span>
    );
};

export default TextAnim;