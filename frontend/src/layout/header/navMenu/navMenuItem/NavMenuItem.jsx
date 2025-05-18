// NavMenuItem.jsx
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import './NavMenuItem.scss';

const NavMenuItem = ({ to, children, scrollToCallback = () => { } }) => {
  if (to.startsWith("#")) {
    const thisLink = useRef(null);
    const id = to.slice(1);

    const onClickHandler = (e) => {
      e.preventDefault();
      scrollToCallback(id);
    }

    // init observer
    useEffect(() => {
      const anchorEl = document.getElementById(id);
      if (!anchorEl) return;
      const observer = new IntersectionObserver(([entry]) => {
         console.log(entry.isIntersecting, thisLink.current)
        if (entry.isIntersecting) {
         
          thisLink.current.classList.add("active");
        }
        else {
          thisLink.current.classList.remove("active");
        }
      },
        {
          root: null,
          threshold: 0,
        }
      );

      observer.observe(anchorEl);
      return () => {
        observer.unobserve(anchorEl);
        observer.disconnect();
      };
    }, []);

    return (
      <li className="nav-menu__item" onClick={onClickHandler}>

        <a ref={thisLink} href={to} className="nav-menu__link" >{children}</a>

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

export default NavMenuItem;