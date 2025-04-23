import React from 'react'
import './NavMenu.scss'

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
          &gt; Main
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            Skills
          </a>
        </li>
        <li className="nav-menu__item">
          <a href="#" className="nav-menu__link">
            Links
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default NavMenu
