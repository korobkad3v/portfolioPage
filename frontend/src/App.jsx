import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './styles/pages/Home';

import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App
