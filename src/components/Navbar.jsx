import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="logo">
          <NavLink to="/">AI Income Hub</NavLink>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
