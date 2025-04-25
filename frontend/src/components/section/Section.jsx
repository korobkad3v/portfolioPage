import React from "react";
import './Section.scss'
import FrameWrapper from '../../assets/FrameWrapper.svg?react';
import { Element } from "react-scroll";

const Section = ({id, children}) => {
    return (
        
        <section id={id} className="tv-frame-container"  >
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