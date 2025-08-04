import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        {/* Linkit vasemmalle */}
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://sininauhasaatio.fi"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sininauhasäätiö
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/calendar">
              Kalenteri
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">
              Ilmoittautumiset
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="https://sininauhasaatio.fi/tietosuoja/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tietosuojaseloste
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;