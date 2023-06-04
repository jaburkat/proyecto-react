import React from "react";
import { Link } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container">
          <Link className="navbar-brand logo" to="/">
            PONTOCOLOR
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span role="button">
              <i className="navbar-toggler-icon" aria-hidden="true"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categoria/Accesorios">
                  Accesorios
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categoria/Pinturas">
                  Pinturas
                </Link>
              </li>
            </ul>
            <Link className="link" to="/cart">
              <CartWidget />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
