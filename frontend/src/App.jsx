import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TvFrame from './components/tvframe/tvFrame';
import './App.css'

function App() {
  return (
    <TvFrame>
      <h1 style={{ color: '#fff' }}>Hello !</h1>
    </TvFrame>
  );
}

export default App
