import React from "react";
import './tvFrame.scss';

const tvFrame = ({ children }) => {
    return (
        <div className="tv-outer">
            <div className="tv-middle">
                <div className="tv-inner">
                    {children}
                </div>
            </div>
        </div>)
};

export default tvFrame