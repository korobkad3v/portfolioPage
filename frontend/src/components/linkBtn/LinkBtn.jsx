import React from 'react'
import './LinkBtn.scss'

const Button = ({ children, anchorId }) => (
  <a href={`#${anchorId}`} className='link-btn'>
    {children}
  </a>
)

export default Button