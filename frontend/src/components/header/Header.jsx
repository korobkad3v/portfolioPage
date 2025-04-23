import React from 'react'
import './Header.scss'

const Header = ({NavMenu}) => {
  return (
    <header className="header">
      {NavMenu ? <NavMenu /> : <p>No nav menu</p>}
    </header>
  )
}

export default Header
