// SkillList.jsx
import React from "react";
import SkillsListItem from "./skillsListItem/SkillListItem";

import "./SkillsList.scss";
/**

 * A component that renders a list of clickable items, each representing a category of skills.
 * When clicked, the corresponding window will be opened.
 * @deprecated Will be replaced by List component in future updates.
 * @returns {React.ReactElement} The list of clickable items.
 */
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