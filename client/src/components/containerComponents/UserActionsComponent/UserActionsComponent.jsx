//DONE adding only meaningful necessary comments

import React from "react";
import {
  faRightFromBracket,
  faUserPlus,
  faMessage,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./UserActionsComponent.module.css";
import NavigateFontAwesomeIcon from "../../reuseableComponents/NavigateFontAwesomeIcon/NavigateFontAwesomeIcon";

/**
 * Container to hold and render all user related actions:
 links to 1) invite users, 2) send feedback, 3) tutorial, 4) delete groupCode from device
 *
 * @param {string} props.groupCode - The code of the group.
 * @param {string} props.groupName - The name of the group.
 */
const UserActionsContainer = ({ groupCode, groupName }) => {
  return (
    <div className={styles.container}>
      <NavigateFontAwesomeIcon
        icon={faUserPlus}
        route={`/share-group/${groupName}/${groupCode}`}
        tooltip='Invite & share group'
      />
      <NavigateFontAwesomeIcon
        icon={faMessage}
        route={`/feedback/${groupCode}`}
        tooltip='Feedback'
      />
      <NavigateFontAwesomeIcon
        icon={faCircleQuestion}
        route={`/tutorial/${groupName}/${groupCode}`}
        tooltip='Tutorial'
      />
      <NavigateFontAwesomeIcon
        icon={faRightFromBracket}
        route={`/leave-group/${groupName}/${groupCode}`}
        tooltip='Leave group'
      />
    </div>
  );
};

export default UserActionsContainer;
