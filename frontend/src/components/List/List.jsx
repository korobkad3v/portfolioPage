// List.jsx
import React from "react";
import ListItem from "./ListItem";
import "./List.scss";

const List = ({ className = "",
    list = [],
    type = "link", // text
    renderItem = () => { }
}) => {
    const createItem = (item, index) => {
        let content;
        if (typeof renderItem === "function" && type === "custom") {
            content = renderItem(item, index);
        } else if (type === "link") {
            content = <a className={"list-item__link" + (className ? " " + className + "__link" : "")} href={item.href || item}>{item.text || item}</a>;
        } else {
            content = item.text || item;
        }
        return <ListItem key={item.id || index} className={className ? " " + className + "-item" : ""}>{content}</ListItem>;
    }

    return (
        <ul className={"list" + (className ? " " + className : "")}>
            {list.map(createItem)}
        </ul>);
};

export default List;