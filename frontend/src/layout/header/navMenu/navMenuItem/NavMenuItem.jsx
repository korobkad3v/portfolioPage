// NavMenuItem.jsx
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import './NavMenuItem.scss';

/**
 * A nav menu item. If the `to` prop starts with a #, it will be treated as a link to an anchor on the same page, and
 * an IntersectionObserver will be used to apply the "active" class to the link when the anchor is visible.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.to - The link target. If it starts with a #, it will be treated as an anchor link.
 * @param {React.ReactNode} props.children - The text to be rendered inside the link.
 * @param {Function} props.scrollToCallback - A callback to be called when a link to an anchor is clicked. It should
 *   take the id of the anchor as its argument.
 * @returns {React.ReactElement} The React component.
 */
const NavMenuItem = ({ to, children, scrollToCallback = () => { } }) => {
  if (to.startsWith("#")) {
    const thisLink = useRef(null);
    const id = to.slice(1);

/**
 * Handles the click event for the nav menu item link. Prevents the default
 * link behavior and calls the scrollToCallback with the anchor id to
 * scroll to the appropriate section.
 * 
 * @param {Event} e - The click event.
 */

    const onClickHandler = (e) => {
      e.preventDefault();
      scrollToCallback(id);
    }

    // init observer
    useEffect(() => {
      const anchorEl = document.getElementById(id);
      if (!anchorEl) return;
      const observer = new IntersectionObserver(([entry]) => {
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