import { useState } from 'react';

import NavBar from './components/navbar/NavBar';
import MoviesContainer from './components/MoviesContainer/MoviesContainer';

import './App.css';

function App() {
  return (
    <div className="mainContainer">
      <NavBar />
      <MoviesContainer />

      <footer>
        <p className="footer-text">&copy; 2026 Framely. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
