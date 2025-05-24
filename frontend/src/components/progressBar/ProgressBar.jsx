// ProgressBar.jsx
import React from "react";
import "./ProgressBar.scss";

/**
 * Renders a progress bar with a label and a filled percentage.
 *
 * @param {{label: string, level: number}} props
 * @param {string} props.label The label to render next to the progress bar.
 * @param {number} props.level A number between 0 and 100 indicating the percentage of the bar that should be filled.
 * @return {JSX.Element} A JSX element representing the progress bar.
 */
const ProgressBar = ({label, level}) => {
    const totalBlocks = 10;
    const filled = Math.round((level / 100) * totalBlocks);
    const empty = totalBlocks - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    return (
        <div className="progress-bar">
            <span className="progress-bar__label">{label}</span>
            <div className="progress-bar__inner">
                [{bar}] <span className="progress-bar__level">{level}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;