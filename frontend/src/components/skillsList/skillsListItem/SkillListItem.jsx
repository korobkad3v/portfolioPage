// SkillListItem.jsx
import FolderIcon from '../../icons/Folder.svg?react';

import "./SkillListItem.scss";
/**
 * A list item for the skills list, which when clicked, opens the specified window.
 * @deprecated Will be replaced by ListItem component in future updates.
 * @param {{children: React.ReactNode, windowId: string}} props
 * @param {React.ReactNode} props.children The text to render inside the button.
 * @param {string} props.windowId The id of the window to open.
 * @returns {React.ReactElement} The list item element.
 */
const SkillListItem = ({ children, windowId }) => {
    /**
     * Handles the click event for the list item. Opens the window with the
     * given id and focuses it.
     * @returns {void}
     */
    const onClick = () => {
        const window = document.getElementById(windowId);
        window.classList.add("window--opened");
        window.focus();
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