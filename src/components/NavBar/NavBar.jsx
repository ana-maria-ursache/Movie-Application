import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        <p className="nav-title">Framely</p>
        <div className="nav-options">
          <button className='nav-button'>Home</button>
          <button className='nav-button'>Watchlist</button>
        </div>
      </nav>
    </>
  );
}
