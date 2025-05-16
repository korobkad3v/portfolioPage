import React from 'react';
import Header from '../layout/header/Header';
import NavMenu from '../layout/header/navMenu/NavMenu';
import NavMenuItem from '../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../layout/section/Section';
import LinkBtn from '../components/linkBtn/LinkBtn';
import ScrollSequenceAnimCanvas from '../components/scrollSequenceAnimCanvas/ScrollSequenceAnimCanvas';
import Window from '../components/Window/Window';
import FolderIcon from '../components/icons/Folder.svg?react';
import SkillsList from '../components/skillsList/SkillsList';
import './Home.scss';

import { useRef, useEffect, useState } from "react";

const Home = () => {
  const WindowContainerRef = useRef(null);
  const canCanvasAnimate = useRef(false);
  const currentSectionIndex = useRef(0);
  const triggerRef = useRef(null);
  const sections = useRef(null);
  
  const timeout = useRef(null);

  // touch
  const touchStartY = useRef(0);
  const touchDelta = useRef(0);
  const touchScrollTreshold = window.innerHeight * 0.1;

  const scrollTo = (index) => {
    const section = sections.current[index];
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });
  }

  // init 
  useEffect(() => {
    console.log(currentSectionIndex.current)
    sections.current = Array.from(document.querySelectorAll("section"));
    scrollTo(currentSectionIndex.current);
  }, []);


  // check if in trigger to enable canvas animation
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        canCanvasAnimate.current = entry.intersectionRatio === 1;
        console.log("canCanvasAnimate", canCanvasAnimate.current)
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
    const scrollSnap = (direction) => {
      const nextIndex =
      currentSectionIndex.current + direction > -1 &&
      currentSectionIndex.current + direction < sections.current.length
          ? currentSectionIndex.current + direction
          : currentSectionIndex.current;
      if (nextIndex !== currentSectionIndex) {
        scrollTo(nextIndex);
        currentSectionIndex.current = nextIndex;
        timeout.current = setTimeout(() => {
          timeout.current = null;
        }, 800);
      }
    }

    const handleWheel = (e) => {
      e.preventDefault();
      if (timeout.current) return;
      if(canCanvasAnimate.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      
      scrollSnap(direction);
    }

    const handleTouchStart = (e) => {
      e.preventDefault();
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (timeout.current) return;
      if(canCanvasAnimate.current) return;

      const currentY = e.changedTouches[0].clientY;
      touchDelta.current = currentY - touchStartY.current;
      if (Math.abs(touchDelta.current) < touchScrollTreshold) return;
      console.log(touchScrollTreshold)
      
      console.log("scroll")
      const direction = touchDelta.current < 0 ? 1 : -1;
      scrollSnap(direction);
    }

    const handleResize = () => {
      if (timeout.current) return;
      scrollTo(currentSectionIndex.current);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchend", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchMove);
      window.addEventListener("resize", handleResize);
    }
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
      
      
      <Section id="showcase" ref={triggerRef}>
        <div className="showcase">
          <h2 className="showcase__title">&gt;Let's make our ideas bloom together - your vision, my craft.</h2>
          <ScrollSequenceAnimCanvas canAnimate={canCanvasAnimate} />
          
        </div>
      </Section>

      <Section id="skills" ref={WindowContainerRef}>
        <div className="skills" >
          <h2 className="skills__title">&gt;see my skills.../</h2>
          <SkillsList/>
          <Window id="web-dev" name="Web dev&design" containerRef={WindowContainerRef} 
          initialPosition={{ x: 0.2, y: 0.4}}
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium repellendus eligendi doloribus incidunt sunt quia autem a? Dicta, quidem quo sequi earum delectus eaque ut porro voluptas adipisci dolor animi.
          </Window>
          <Window id="easter-egg" name="?" className="easter-egg" containerRef={WindowContainerRef} initialPosition={{ x: 1, y: 1 }}>
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

