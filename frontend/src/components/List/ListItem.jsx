// ListItem.jsx
import React from "react";
import "./ListItem.scss";

const ListItem = ({ children }) => {
    return <li className="list__item">{children}</li>;
};

export default ListItem;