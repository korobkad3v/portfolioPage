// List.jsx
import React from "react";
import ListItem from "../ListItem/ListItem";
import "./List.scss";

const List = ({ className = "",
    list = [],
    type = "link",
    renderItem = () => { }
}) => {
    const createItem = (item, index) => {
        let content;
        if (typeof renderItem === "function") {
            content = renderItem(item, index);
        } else if (type === "link") {
            content = <a href={item.href || item}>{item.label || item}</a>;
        } else {
            content = item.label || item;
        }
        return <ListItem key={item.id || index}>{content}</ListItem>;
    }

    return (
        <ul className={"list" + (className ? " " + className : "")}>
            {list.map(createItem)}
        </ul>);
};

export default List;