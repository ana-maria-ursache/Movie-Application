import { useState } from 'react';

import NavBar from './components/navbar/NavBar';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';

import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <MoviesContainer />
    </>
  );
}

export default App;
