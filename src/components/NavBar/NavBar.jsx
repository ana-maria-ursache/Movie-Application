import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <p className="nav-title">Framely</p>
        <div className="nav-options">
          <NavLink to="/" className="nav-button">
            Home
          </NavLink>
          <NavLink to="/watchlist" className="nav-button">
            Watchlist
          </NavLink>
        </div>
      </nav>
    </>
  );
}
