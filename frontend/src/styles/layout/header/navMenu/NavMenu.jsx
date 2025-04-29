import React from 'react'
import './NavMenu.scss'

const NavMenu = ({children}) => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        {children}
      </ul>
    </nav>
  )
}

export default NavMenu
