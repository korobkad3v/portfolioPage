import React from 'react';
import Header from '../layout/header/Header';
import NavMenu from '../layout/header/navMenu/NavMenu';
import NavMenuItem from '../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../layout/section/Section';
import LinkBtn from '../components/linkBtn/LinkBtn';
import ScrollSequenceAnimCanvas from '../components/scrollSequenceAnimCanvas/ScrollSequenceAnimCanvas';
import Window from '../components/Window/Window';
import FolderIcon from '../components/icons/Folder.svg?react';
import './Home.scss';


import { useRef, useEffect, useState } from "react";

const Home = () => {
  const WindowContainerRef = useRef(null);
  const canCanvasAnimate = useRef(false);
  const currentSectionIndex = useRef(0);
  const triggerRef = useRef(null);
  const sections = useRef(null);
  const windows = useRef(null);
  const timeout = useRef(null);


  const scrollTo = (index) => {
    const section = sections.current[index];
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  }

  // init 
  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll("section"));
    windows.current = Array.from(document.querySelectorAll("window"));
  }, []);


  // check if in trigger to enable canvas animation
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        canCanvasAnimate.current = entry.intersectionRatio >= 0.5;
      },
      {
        root: null,
        threshold: [0, 0.5, 1],
      }
    );
  
    observer.observe(el);
  
    return () => {
      observer.unobserve(el);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (timeout.current) return;
      if(canCanvasAnimate.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex =
      currentSectionIndex.current + direction > -1 &&
      currentSectionIndex.current + direction < sections.current.length
          ? currentSectionIndex.current + direction
          : currentSectionIndex.current;
      localStorage.setItem("currentSectionIndex", currentSectionIndex.current)
      if (nextIndex !== currentSectionIndex) {
        scrollTo(nextIndex);
        currentSectionIndex.current = nextIndex;
        timeout.current = setTimeout(() => {
          timeout.current = null;
        }, 800);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

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
              &gt;Lorem ipsum dolor, 
              sit. 
            </h1>
            <LinkBtn anchorId="links">Contact Me</LinkBtn>
          </div>
          
          <picture className="intro__image">
            <source srcSet="images/placeholder.avif" type="image/avif" />
            <img src="images/placeholder.png"  alt="Profile photo" loading="lazy"/>
          </picture>

        </div>
      </Section>
      
      
      <Section id="showcase" ref={triggerRef} className=''>
        <div className="showcase">
          <h2 className="showcase__title">&gt;Let's make our ideas bloom together - your vision, my craft.</h2>
          <ScrollSequenceAnimCanvas canAnimate={canCanvasAnimate} />
          
        </div>
      </Section>

      <Section id="skills" ref={WindowContainerRef}>
        <div className="skills" >
          <h2 className="skills__title">&gt;see my skills.../</h2>
          <ul className="skills-list">
            <li className="skills-list__item">
              <button className="skills-list__btn">
                <FolderIcon className="skills-list__icon" />
                Web dev&design
              </button>
              
            </li>



          </ul>
          <Window containerRef={WindowContainerRef}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium repellendus eligendi doloribus incidunt sunt quia autem a? Dicta, quidem quo sequi earum delectus eaque ut porro voluptas adipisci dolor animi.</Window>
          <Window name="?" className="easter-egg" containerRef={WindowContainerRef} initialPosition={{ x: 1, y: 1 }}>
            <picture className="easter-egg__image">
              <source srcSet="images/placeholder.avif" type="image/avif" />
              <img src="images/placeholder.png"  alt="?" loading="lazy"/>
            </picture>
          </Window>
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

