import React from 'react';
import Header from '../../layout/header/Header';
import NavMenu from '../../layout/header/navMenu/NavMenu';
import NavMenuItem from '../../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../../layout/section/Section';
import LinkBtn from '../../components/linkBtn/LinkBtn';
import './Home.scss';

const Home = () => {
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
      <Section id="showcase">
        <div className="showcase">
          <h2 className="showcase__title">&gt;Let's make our ideas bloom together - your vision, my craft.</h2>
        </div>
      </Section>
    </>
  );
};

export default Home;

