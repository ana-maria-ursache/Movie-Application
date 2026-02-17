import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <p className="nav-title">Framely</p>
        <div className="nav-options">
          <NavLink to="/" className="nav-button">
            {({ isActive }) => <span className={isActive ? 'active' : ''}>Home</span>}
          </NavLink>
          <NavLink to="/watchlist" className="nav-button">
            {({ isActive }) => <span className={isActive ? 'active' : ''}>Watchlist</span>}
          </NavLink>
        </div>
      </nav>
    </>
  );
}
