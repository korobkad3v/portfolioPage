import React from 'react'
import './LinkBtn.scss'

const LinkBtn = ({ children, anchorId, scrollToCallback }) => {
  const onClickHandler = (e) => {
    scrollToCallback(anchorId);
  }
  return (
    <a className="link-btn" onClick={onClickHandler}>
      {children}
    </a>
  );
}


export default LinkBtn;