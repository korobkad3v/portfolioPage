import React from 'react'
import './NavMenu.scss'

const NavMenu = ({children}) => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        {/* <li className="nav-menu__item">
          <a href="#" className="nav-menu__link active">
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
        </li> */}
        {children}
      </ul>
    </nav>
  )
}

export default NavMenu
