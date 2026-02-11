import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <p className="nav-title">Framely</p>
        <div className="nav-options">
          <Link to="/" className="nav-button">
            Home
          </Link>
          <Link to="/watchlist" className="nav-button">
            Watchlist
          </Link>
        </div>
      </nav>
    </>
  );
}
