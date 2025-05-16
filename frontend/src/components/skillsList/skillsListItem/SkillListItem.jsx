// SkillListItem.jsx
import FolderIcon from '../../icons/Folder.svg?react';

import "./SkillListItem.scss";
const SkillListItem = ({ children, windowId }) => {
    const onClick = () => {
        const window = document.getElementById(windowId);
        window.classList.add("window--opened");
    }

    return (
        <li className="skills-list__item">
            <button className="skills-list__btn" onClick={onClick}>
                <FolderIcon className="skills-list__icon" />
                {children}
            </button>
        </li>
    );
};

export default SkillListItem;