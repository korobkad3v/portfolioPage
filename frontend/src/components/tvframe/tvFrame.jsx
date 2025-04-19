import React from "react";
import './tvFrame.scss';
import FrameWrapper from '../../assets/FrameWrapper.svg?react';

const tvFrame = ({children}) => {
    return (
        <div className="tv-frame-container" >
            <FrameWrapper className="tv-frame"/>
            {children}
        </div>
        
    );
};

export default tvFrame