// ProgressBar.jsx
import React from "react";
import "./ProgressBar.scss";

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