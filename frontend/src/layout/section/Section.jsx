// Sections.jsx
import React from "react";
import FrameWrapper from '../../assets/FrameWrapper.svg?react';
import './Section.scss'
/**
 * Section component
 * 
 * @param {Object} props - Component props.
 * @param {string} props.id - The id for the section element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the section.
 * @param {React.Ref} ref - Ref to be forwarded to the section-content div.
 * @returns {React.ReactElement} The React component.
 */

const Section = React.forwardRef(({id, children}, ref) => {
    return (
        <section id={id}  className={`section`}>
            <FrameWrapper className="section__frame"/>
            <div className="section-content" ref={ref}>
                <div className="section-content__inner">
                    {children}
                </div>
            </div>
        </section>
    );
});

export default Section