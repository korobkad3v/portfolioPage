import { useState } from 'react'
import TvFrame from './components/tvframe/tvFrame';
import Header from './components/header/Header';
import NavMenu from './components/header/navMenu/NavMenu';
import './styles/main.scss';

function App() {
  return (
    <div>
      <TvFrame><Header NavMenu={NavMenu}/></TvFrame>
    </div>
  );
}

export default App
