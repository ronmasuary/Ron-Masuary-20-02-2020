import React from "react";
import {Link} from "react-router-dom";

export default function NavBar({ pickCity }) {
  return (
    <div>
      <nav className="navbar navbar-light bg-dark rounded-bottom">
        <Link to="/">
          <button className="btn btn-primary">Home</button>
        </Link>
        <Link to="/favorites">
          <button className="btn btn-primary">Favorites</button>
        </Link>
      </nav>
    </div>
  );
}
