import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TvFrame from './components/tvframe/tvFrame';
import Header from './components/header/Header';
import './styles/main.scss';

function App() {
  return (
    <div>

      <TvFrame><Header/><h1>Hello</h1></TvFrame>
     
    </div>
  );
}

export default App
