import './Layout.css';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

export default function Layout() {
  return (
    <div className="main-container">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <footer>
        <p className="footer-text">&copy; 2026 Framely. All rights reserved.</p>
      </footer>
    </div>
  );
}
