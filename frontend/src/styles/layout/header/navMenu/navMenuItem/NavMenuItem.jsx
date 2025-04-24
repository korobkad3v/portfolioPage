import React from "react";
import { NavLink } from "react-router-dom";
import './NavMenuItem.scss';

const NavMenuItem = ({to, children}) => {
    return (
        <NavLink
        to={to}
        className={({ isActive }) => isActive ? "nav-menu__item active" : "nav-menu__item"}>
        {children}
      </NavLink>
    );
};

export default NavMenuItem