import { useState } from 'react';

import NavBar from './components/navbar/NavBar';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';

import './App.css';

function App() {
  return (
    <div className='mainContainer'>
      <NavBar />
      <MoviesContainer />
    </div>
  );
}

export default App;
