import React from "react";
import './tvFrame.scss';
import FrameWrapper from '../../assets/FrameWrapper.svg?react';

const tvFrame = ({children}) => {
    return (
        <section className="tv-frame-container" >
            <FrameWrapper className="tv-frame"/>
            <div className="tv-frame-content">
                <div className="tv-frame-content__inner">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default tvFrame