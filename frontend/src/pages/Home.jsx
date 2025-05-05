import React from 'react';
import Header from '../layout/header/Header';
import NavMenu from '../layout/header/navMenu/NavMenu';
import NavMenuItem from '../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../layout/section/Section';
import LinkBtn from '../components/linkBtn/LinkBtn';
import ScrollSequenceAnimCanvas from '../components/scrollSequenceAnimCanvas/ScrollSequenceAnimCanvas';
import ScrollBox from '../components/scrollBox/ScrollBox';
import useScrollSnap from '../components/useScrollSnap';

import './Home.scss';
import { useRef, useEffect } from "react";

const Home = () => {
  const triggerRef = useRef(null);
  const scrollBoxRef = useRef(null);
  useScrollSnap([scrollBoxRef]);

  // useEffect(() => {
  //   const scollBoxRect = scrollBoxRef.current.getBoundingClientRect();
  //   console.log(scollBoxRect);
  //   const disableStart = scollBoxRect.top + window.scrollY;
  //   const disableEnd = scollBoxRect.bottom + window.scrollY - window.innerHeight;
  //   const handleScroll = (e) => {
  //     const currentScrollPosition = window.scrollY;
      
  //     console.log(`Disable scroll between ${disableStart}px and ${disableEnd}px`);
  //     console.log(currentScrollPosition);

  //     if (currentScrollPosition > disableStart && currentScrollPosition < disableEnd) {
  //       console.log("Disabled");
  //       return;
  //     }
  //     e.preventDefault();
  //       //console.log(e.deltaY);
  //       if (e.deltaY > 0) {
  //         //console.log("Scrolling down");
  //         window.scrollTo({
  //           top: window.scrollY + window.innerHeight,
  //           behavior: 'smooth',
  //         });
  //       } else if (e.deltaY < 0)
  //       {
  //         //console.log("Scrolling up");
  //         window.scrollTo({
  //           top: window.scrollY - window.innerHeight,
  //           behavior: 'smooth',
  //         });
  //       }
      
  //   };

  //   window.addEventListener('wheel', handleScroll, { passive: false });

  //   return () => {
  //     window.removeEventListener('wheel', handleScroll);
  //   };
  // }, []);

  return (
    <>
      <Section id="hi">
        <Header>
            <NavMenu>
              <NavMenuItem to="#hi">Main</NavMenuItem>
              <NavMenuItem to="#skills">Skills</NavMenuItem>
              <NavMenuItem to="#links">Links</NavMenuItem>
            </NavMenu>
        </Header>
        <div className="intro">
          <div className="intro__content">
            <h1 className="intro__title">
              &gt;Hello, my na
              I'm a web developer.
            </h1>
            <LinkBtn anchorId="links">Contact Me</LinkBtn>
          </div>
          
          <picture className="intro__image">
            <source srcSet="images/placeholder.avif" type="image/avif" />
            <img src="images/placeholder.png"  alt="Profile photo" loading="lazy"/>
          </picture>

        </div>
      </Section>
      
      <div style={{height: "400vh"}} ref={scrollBoxRef} >
        <Section id="showcase" ref={triggerRef} className='--sticky-top'>
          <div className="showcase">
            <h2 className="showcase__title">&gt;Let's make our ideas bloom together - your vision, my craft.</h2>
            <ScrollSequenceAnimCanvas triggerRef={triggerRef} scrollBoxRef={scrollBoxRef}/>
            
          </div>
        </Section>
      </div>
      <Section id="skills">
        <div className="skills">
          <h2 className="skills__title">&gt;Skills</h2>
          
        </div>
      </Section>
      <Section id="links">
        <div className="links">
          <h2 className="links__title">&gt;Links</h2>
          
        </div>
      </Section>
      
    </>
  );
};

export default Home;

