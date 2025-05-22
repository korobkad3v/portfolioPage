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
import List from '../components/List/List';
import TextAnim from '../components/TextAnim/TextAnim';
import { Typewriter } from 'react-simple-typewriter'
import './Home.scss';

import { useRef, useEffect, useState } from "react";
import { delay } from 'lodash';

const Home = ({ AgentDevice = { type: "mobile" } }) => {
  const WindowContainerRef = useRef(null);
  const isOnCanvasSection = useRef(false);
  const currentSectionIndex = useRef(0);
  const triggerRef = useRef(null);
  const sections = useRef(null);
  const canvasAtStart = useRef(true);
  const canvasAtEnd = useRef(false);
  const timeout = useRef(null);

  // touch
  const touchStartY = useRef(0);
  const touchScrollTreshold = window.innerHeight * 0.25;
  const touchDelta = useRef(0);

  const isWindowDraggable = AgentDevice.type === undefined;

  const scrollTo = (arg) => {
    let section;
    let index;
    if (typeof arg === "number") {
      index = arg;
      section = sections.current[index];
    }
    else if (typeof arg === "string") {
      index = Array.from(sections.current).findIndex(el => el.id === arg);
      section = sections.current[index];
    }

    if (!section) return;

    if (currentSectionIndex.current !== index) {
      currentSectionIndex.current = index;
    }
    section.scrollIntoView({ behavior: "smooth" });
  }

  const isInteractiveElement = (el) => {
    return el.closest('a, button, input, textarea, select, [tabindex]');
  };

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
        isOnCanvasSection.current = entry.intersectionRatio === 1;
        console.log("isOnCanvasSection", isOnCanvasSection.current)
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

    const cantScrollSnap = (direction) => {
      return isOnCanvasSection.current
        ? (((direction === 1 && !canvasAtEnd.current) || (direction === -1 && !canvasAtStart.current)))
        : false
    }


    const handleWheel = (e) => {
      e.preventDefault();
      if (timeout.current) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      if (cantScrollSnap(direction)) return;
      scrollSnap(direction);
    }

    const handleTouchStart = (e) => {
      if (isInteractiveElement(e.target)) return;
      e.preventDefault();
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isInteractiveElement(e.target)) return;
      e.preventDefault();
      if (timeout.current) return;

      const currentY = e.changedTouches[0].clientY;
      touchDelta.current = currentY - touchStartY.current;
      if (Math.abs(touchDelta.current) < touchScrollTreshold) return;

      const direction = touchDelta.current < 0 ? 1 : -1;
      if (cantScrollSnap(direction)) return;

      scrollSnap(direction);
    }

    const handleResize = () => {
      if (timeout.current) return;
      scrollTo(currentSectionIndex.current);
    }

    if (AgentDevice.type === 'mobile' || AgentDevice.type === 'tablet') {
      window.addEventListener("touchstart", handleTouchStart, { passive: false });
      window.addEventListener("touchend", handleTouchEnd, { passive: false });
    }
    else {
      window.addEventListener("wheel", handleWheel, { passive: false });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      if (AgentDevice.type === 'mobile' || AgentDevice.type === 'tablet') {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
      }
      else {
        window.removeEventListener("wheel", handleWheel);
      }

      window.addEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      <Section id="hi">
        <Header>
          <NavMenu>
            <NavMenuItem to="#hi" scrollToCallback={scrollTo}>Home</NavMenuItem>
            <NavMenuItem to="#skills" scrollToCallback={scrollTo}>Skills</NavMenuItem>
            <NavMenuItem to="#links" scrollToCallback={scrollTo}>Links</NavMenuItem>
          </NavMenu>
        </Header>
        <div className="intro">
          <div className="intro__content">
            <h1 className="intro__title">
              Hello, my name is <a href="#" className="highlight">@vilemiku</a>.
              <br></br>
              I'm <span className="highlight">
                <Typewriter
                  words={[
                    "a web developer.",
                    "a JS coder.",
                    "a React developer.",
                    "a C# coder.",
                    "a Python programmer.",
                    "a game developer.",
                    "a Unity enjoyer.",
                    "a Blender enthusiast.",
                    "a SCSS lover ♥",
                    "a problem solver.",
                    "a bug hunter.",
                    "an one-man-army :]",
                    "a creative coder.",
                    "a linux fan"
                  ]}

                  loop={true}
                  cursor={true}
                  cursorStyle="|"
                  typeSpeed={120}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <LinkBtn anchorId="links" scrollToCallback={scrollTo}>Contact Me</LinkBtn>
          </div>

          <picture className="intro__image">
            <source srcSet="images/placeholder.avif" type="image/avif" />
            <img src="images/placeholder.png" alt="Profile photo" loading="lazy" />
          </picture>

        </div>
      </Section>


      <Section id="showcase" ref={triggerRef}>
        <div className="showcase">
          <h2 className="showcase__title">
            Let's make our ideas bloom together - your <span className="highlight">vision</span>, 
            my <span className="highlight">craft</span>.
            </h2>
          <ScrollSequenceAnimCanvas AgentDevice={AgentDevice} canAnimate={isOnCanvasSection} onEdgeChange={handleEdgeChange} />

        </div>
      </Section>

      <Section id="skills" ref={WindowContainerRef}>
        <div className="skills" >
          <h2 className="skills__title">showing skills...<TextAnim className="skills__title-slash" frames={["/", "—", "\\", "|"]} delay={500} /></h2>
          <SkillsList />

          {/* Hints */}
          <Window id="hint-click" name="Hint" className="hint window--opened" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.8, y: 0.3 }}>
            Click on folder icons.
          </Window>
          <Window id="hint-drag" name="Drag Me" className="hint window--opened" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.8, y: 0.3 }}>
            We are draggable!
          </Window>



          <Window id="web-dev" name="Web dev&design" className="window-skill window--opened" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <h4>Design</h4>
              <ProgressBar label="Photoshop" level={80} />
              <ProgressBar label="Figma" level={60} />
            </div>


            <div className="window__skill-block">
              <h4>Frontend</h4>
              <ProgressBar label="HTML&CSS" level={99} />
              <ProgressBar label="JS" level={70} />
              <ProgressBar label="SCSS/SASS" level={70} />
              <ProgressBar label="React" level={60} />
            </div>

            <div className="window__skill-block">

              <h4>Backend</h4>
              <ProgressBar label="NodeJS" level={50} />
              <ProgressBar label="Express.JS" level={40} />
              <ProgressBar label="MongoDB" level={50} />
              <ProgressBar label="MySQL" level={50} />
            </div>
          </Window>

          <Window id="coding" name="Coding" className="window-skill" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <ProgressBar label="Python" level={80} />
              <ProgressBar label="JavaScript" level={60} />
              <ProgressBar label="C#" level={70} />
              <ProgressBar label="C++" level={40} />
            </div>
          </Window>

          <Window id="game-dev" name="GameDev" className="window-skill" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <ProgressBar label="Unity" level={70} />
              <ProgressBar label="RenPy" level={60} />
              <ProgressBar label="Unreal" level={30} />
              <ProgressBar label="Godot" level={30} />
            </div>
          </Window>

          <Window id="3D" name="3D" className="window-skill" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <ProgressBar label="Blender" level={60} />
            </div>
          </Window>

          <Window id="lang" name="Languages" className="window-skill" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <ProgressBar label="English" level={70} />
              <ProgressBar label="Ukranian" level={80} />
              <ProgressBar label="Russian" level={90} />
            </div>
          </Window>

          <Window id="other" name="Other" className="window-skill" containerRef={WindowContainerRef}
            isDraggable={isWindowDraggable}
            initialPosition={{ x: 0.5, y: 0.5 }}>
            <div className="window__skill-block">
              <ProgressBar label="Prompt-Engineering" level={70} />
            </div>
          </Window>

          <Window id="easter-egg" name="?" className="easter-egg window--opened" containerRef={WindowContainerRef} 
          isDraggable={isWindowDraggable}
          initialPosition={{ x: 1, y: 1 }}>
            <picture className="easter-egg__image">
              <source srcSet="images/placeholder.avif" type="image/avif" />
              <img src="images/placeholder.png" alt="?" loading="lazy" />
            </picture>
          </Window>
        </div>
      </Section>
      <Section id="links">
        <div className="links">
          <h2 className="links__title">Getting in touch<TextAnim className="links__title-dots" frames={[".", "..", "..."]} delay={300} /></h2>
          
          <List 
          className="links-list"
          type="link" 
          list={[
            { id: "github", text: "GitHub", href: "https://github.com/korobkad3v" },
            { id: "itch.io", text: "Itch.io", href: "https://vilemiku.itch.io/" },
            { id: "telegram", text: "Telegram", href: "" },
            { id: "instagram", text: "Instagram", href: "" },  
            { id: "discord", text: "Discord", href: "" },
            
          ]}/>
        </div>
      </Section>
                  
    </>
  );
};

export default Home;

