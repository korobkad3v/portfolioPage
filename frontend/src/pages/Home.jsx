import React from 'react';
import Header from '../layout/header/Header';
import NavMenu from '../layout/header/navMenu/NavMenu';
import NavMenuItem from '../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../layout/section/Section';
import LinkBtn from '../components/linkBtn/LinkBtn';
import ScrollSequenceAnimCanvas from '../components/scrollSequenceAnimCanvas/ScrollSequenceAnimCanvas';
import Window from '../components/Window/Window';
import SkillsList from '../components/skillsList/SkillsList';
import ProgressBar from '../components/progressBar/ProgressBar';
import './Home.scss';

import { useRef, useEffect, useState } from "react";

const Home = () => {
  const WindowContainerRef = useRef(null);
  const canCanvasAnimate = useRef(false);
  const currentSectionIndex = useRef(0);
  const triggerRef = useRef(null);
  const sections = useRef(null);
  const canvasAtStart = useRef(true);
  const canvasAtEnd = useRef(false);
  const timeout = useRef(null);

  // touch
  const touchStartY = useRef(0);
  const touchScrollTreshold = window.innerHeight * 0.1;

  const touchDelta = useRef(0);
  

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
  const handleEdgeChange = ({ atStart, atEnd }) => {
    canvasAtStart.current = atStart;
    canvasAtEnd.current = atEnd;
  };

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
      const direction = e.deltaY > 0 ? 1 : -1;

      if (canCanvasAnimate.current) {
        if ((direction === 1 && !canvasAtEnd.current) ||
          (direction === -1 && !canvasAtStart.current)) {
          return;
        }
      }

      scrollSnap(direction);
    }

    const handleTouchStart = (e) => {
      e.preventDefault();
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (timeout.current) return;
      

      const currentY = e.changedTouches[0].clientY;
      touchDelta.current = currentY - touchStartY.current;
      if (Math.abs(touchDelta.current) < touchScrollTreshold) return;
      if (canCanvasAnimate.current) {
        if ((scrollDirection === 1 && !canvasAtEnd.current) ||
          (scrollDirection === -1 && !canvasAtStart.current)) {
          
          return;
        }
      }
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
              Lorem ipsum dolor,
              sit.
            </h1>
            <LinkBtn anchorId="links">Contact Me</LinkBtn>
          </div>

          <picture className="intro__image">
            <source srcSet="images/placeholder.avif" type="image/avif" />
            <img src="images/placeholder.png" alt="Profile photo" loading="lazy" />
          </picture>

        </div>
      </Section>


      <Section id="showcase" ref={triggerRef}>
        <div className="showcase">
          <h2 className="showcase__title">Let's make our ideas bloom together - your <span>vision</span>, my <span>craft</span>.</h2>
          <ScrollSequenceAnimCanvas canAnimate={canCanvasAnimate} onEdgeChange={handleEdgeChange} />

        </div>
      </Section>

      <Section id="skills" ref={WindowContainerRef}>
        <div className="skills" >
          <h2 className="skills__title">see my skills.../</h2>
          <SkillsList />

          {/* Hints */}
          <Window id="hint-click" name="Hint" className="window--opened" containerRef={WindowContainerRef}
            initialPosition={{ x: 0.8, y: 0.3 }}>
            Click on folder icons.
          </Window>
          <Window id="hint-drag" name="Drag Me" className="window--opened" containerRef={WindowContainerRef}
            initialPosition={{ x: 0.8, y: 0.3 }}>
            We are draggable!
          </Window>



          <Window id="web-dev" name="Web dev&design" className="window-web-dev" containerRef={WindowContainerRef}
            initialPosition={{ x: 0.1, y: 0.4 }}>
            <div className="window-web-dev__skill-block">
              <h4>Design</h4>
              <ProgressBar label="Photoshop" level={80} />
              <ProgressBar label="Figma" level={60} />
            </div>


            <div className="window-web-dev__skill-block">
              <h4>Frontend</h4>
              <ProgressBar label="HTML&CSS" level={99} />
              <ProgressBar label="JS" level={70} />
              <ProgressBar label="SCSS/SASS" level={70} />
              <ProgressBar label="React" level={60} />
            </div>

            <div className="window-web-dev__skill-block">

              <h4>Backend</h4>
              <ProgressBar label="NodeJS" level={50} />
              <ProgressBar label="Express.JS" level={40} />
              <ProgressBar label="MongoDB" level={50} />
              <ProgressBar label="MySQL" level={50} />
            </div>
          </Window>

          <Window id="easter-egg" name="?" className="easter-egg window--opened" containerRef={WindowContainerRef} initialPosition={{ x: 1, y: 1 }}>
            <picture className="easter-egg__image">
              <source srcSet="images/placeholder.avif" type="image/avif" />
              <img src="images/placeholder.png" alt="?" loading="lazy" />
            </picture>
          </Window>
        </div>
      </Section>
      <Section id="links">
        <div className="links">
          <h2 className="links__title">Links</h2>
        </div>
      </Section>

    </>
  );
};

export default Home;

