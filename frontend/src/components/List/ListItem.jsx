// ListItem.jsx
import React from "react";

const ListItem = ({ children, className = "" }) => {
    return (
        <li 
        className={"list-item" + (className ? " " + className : "")}>
            {children}
        </li>
    );
};

export default ListItem;