import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';

import './styles/main.scss';

function App() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-size', `${scrollbarWidth}px`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}   />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
