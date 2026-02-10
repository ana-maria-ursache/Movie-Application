import './NavBar.css';

export default function NavBar() {
  return (
    <>
      <nav className="navbar">
        {/* <p className="nav-title">Framely</p> */}
        <div className="nav-options">
          <button>Home</button>
          <button>Watchlist</button>
        </div>
      </nav>
    </>
  );
}
