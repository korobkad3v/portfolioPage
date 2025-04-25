import React from "react";
import './Section.scss'
import FrameWrapper from '../../assets/FrameWrapper.svg?react';
import { Element } from "react-scroll";

const Section = ({id, children}) => {
    return (
        
        <section id={id} className="section-container"  >
            <FrameWrapper className="section"/>
            <div className="section-content">
                <div className="section-content__inner">
                    {children}
                </div>
            </div>
        </section>
        
    );
};

export default Section