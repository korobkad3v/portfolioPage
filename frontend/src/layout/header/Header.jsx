// Header.jsx
import React from 'react'
import './Header.scss'

/**
 * The main header component. This component is a simple wrapper around an
 * HTML5 <header> element. It is intended to be used as a top-level component
 * in the app's layout.
 *
 * @param {Object} props - The properties of the component.
 * @param {*} props.children - The children of the component. This is the content
 * that will be displayed inside the header.
 *
 * @returns {React.ReactElement} The rendered header component.
 */
const Header = ({children}) => {
  return (
    <header className="header">
      {children}
    </header>
  )
}

export default Header
