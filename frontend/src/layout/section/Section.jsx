import React from "react";

import './Section.scss'
import FrameWrapper from '../../assets/FrameWrapper.svg?react';

const Section = React.forwardRef(({id, children}, ref) => {
    return (
        <section id={id} ref={ref} className="section">
            <FrameWrapper className="section__frame"/>
            <div className="section-content">
                <div className="section-content__inner">
                    {children}
                </div>
            </div>
        </section>
    );
});

export default Section