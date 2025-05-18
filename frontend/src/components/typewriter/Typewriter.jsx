// Typewriter.jsx
import React from "react";
import { useState, useEffect } from "react";
const Typewriter = ({ text, speed=100, className="" }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prevText) => prevText + text[currentIndex]);
            currentIndex++;
            if (currentIndex >= text.length - 1) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);
    return <span className={"typewriter " + " " + className }>{displayedText}</span>;
};

export default Typewriter;