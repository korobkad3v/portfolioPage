import React from "react";

import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import './NavMenuItem.scss';

const NavMenuItem = ({ to, children }) => {

  if (to.startsWith("#")) {
    
    return (
      <li className="nav-menu__item">
        <Link
          to={to.slice(1)}
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className="nav-menu__link"
          activeClass="active"
        >
          {children}
        </Link>
      </li>

    );
  }
  else {
    return (
      <li className="nav-menu__item">
        <NavLink
          to={to}
          className="nav-menu__link"
        >
          {children}
        </NavLink>
      </li>

    );
  }

};

export default NavMenuItem  