// SkillList.jsx
import React from "react";
import SkillsListItem from "./skillsListItem/SkillListItem";

import "./SkillsList.scss";
const SkillsList = () => {
    return (
        <ul className="skills-list">
            <SkillsListItem windowId="web-dev">WebDesign</SkillsListItem>
            <SkillsListItem windowId="webdev">Coding</SkillsListItem>
            <SkillsListItem windowId="webdev">GameDev</SkillsListItem>
            <SkillsListItem windowId="webdev">3D</SkillsListItem>
            <SkillsListItem windowId="webdev">Other</SkillsListItem>
        </ul>
    );
};

export default SkillsList;