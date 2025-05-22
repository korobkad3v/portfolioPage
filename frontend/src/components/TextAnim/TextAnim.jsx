// TextAnim.jsx
import React, { useEffect, useState } from "react";
import "./TextAnim.scss";

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