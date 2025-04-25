import React from 'react';
import Header from '../layout/header/Header';
import NavMenu from '../layout/header/navMenu/NavMenu';
import NavMenuItem from '../layout/header/navMenu/navMenuItem/NavMenuItem';
import Section from '../../components/section/Section';

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
        
      </Section>
      
    </>
  );
};

export default Home;

