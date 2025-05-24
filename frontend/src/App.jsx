import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUA } from 'use-ua-parser-js';

import Home from './pages/Home';
import './styles/main.scss';
import Projects from "./pages/Projects";

/**
 * The root component of the application.
 * 
 * It uses `useUA()` to detect the type of device from the user agent, and sets the
 * `--scrollbar-size` CSS variable to the width of the scrollbar. The BrowserRouter
 * component is used to handle client-side routing, and the Routes component is
 * used to define the routes. The Home component is rendered at the root route.
 * 
 * @returns {React.ReactElement} The root component of the application.
 */
function App() {
  const userAgentDevice = useUA().device || undefined;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-size', `${scrollbarWidth}px`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home AgentDevice={userAgentDevice}/>}/>
        <Route path="/projects" element={<Projects AgentDevice={userAgentDevice}/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
