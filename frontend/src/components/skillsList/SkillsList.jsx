// SkillList.jsx
import React from "react";
import SkillsListItem from "./skillsListItem/SkillListItem";

import "./SkillsList.scss";
const SkillsList = () => {
    return (
        <ul className="skills-list">
            <SkillsListItem windowId="web-dev">WebDev</SkillsListItem>
            <SkillsListItem windowId="coding">Coding</SkillsListItem>
            <SkillsListItem windowId="game-dev">GameDev</SkillsListItem>
            <SkillsListItem windowId="3D">3D</SkillsListItem>
            <SkillsListItem windowId="lang">Languages</SkillsListItem>
            <SkillsListItem windowId="other">Other</SkillsListItem>
        </ul>
    );
};

export default SkillsList;