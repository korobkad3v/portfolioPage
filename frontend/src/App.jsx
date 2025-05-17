import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUA } from 'use-ua-parser-js';

import Home from './pages/Home';
import './styles/main.scss';

function App() {
  const userAgentDevice = useUA().device || 'undefined';
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-size', `${scrollbarWidth}px`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home AgentDevice={userAgentDevice}/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
