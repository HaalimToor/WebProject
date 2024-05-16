import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Sidebar({ routes }) {
  const location = useLocation();

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "grey" }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="sidebar-header">
            <a href="/" className="logo d-flex align-items-center w-auto">
  <span className="d-none d-lg-block custom-expense-text" style={{ color: "white" }}>Homely Heroes</span>
</a>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/user-profile" className="nav-link">Profile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="sidebar">
        <aside className="sidebar" style={{ backgroundColor: "grey" }}>
          <ul className="sidebar-nav" id="sidebar-nav">
            {routes.map((route, key) => (
              <li key={key} className="nav-item">
                <NavLink
                  to={route.path}
                  className="nav-link collapsed"
                  activeClassName="active"
                >
                  <span>{route.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}

export default Sidebar;
