import React from "react";
import './Section.scss'
import FrameWrapper from '../../assets/FrameWrapper.svg?react';

const Section = ({children}) => {
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

export default Section